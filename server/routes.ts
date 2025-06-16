import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLoanApplicationSchema, insertAgentSchema, insertContactMessageSchema, insertCibilRequestSchema } from "../shared/schema";
import { z } from "zod";
import { body, param, query, validationResult } from "express-validator";
import { authenticateAgent, generateToken, comparePassword, type AuthenticatedRequest } from "./auth";

// Validation middleware helper
const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation error",
      errors: errors.array()
    });
  }
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Loan Application Routes
  app.post("/api/loan-applications", [
    body('fullName').isLength({ min: 2, max: 100 }).withMessage('Full name must be 2-100 characters'),
    body('mobile').matches(/^\+91[6-9]\d{4}-\d{5}$/).withMessage('Invalid mobile number format'),
    body('email').isEmail().normalizeEmail().withMessage('Invalid email address'),
    body('panCard').matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/).withMessage('Invalid PAN card format'),
    body('dateOfBirth').isISO8601().withMessage('Invalid date format'),
    body('loanType').isIn(['personal', 'home', 'business', 'professional', 'loan-against-property', 'gold', 'car', 'overdraft', 'balance-transfer']).withMessage('Invalid loan type'),
    body('loanAmount').isNumeric().isFloat({ min: 10000, max: 10000000 }).withMessage('Loan amount must be between ₹10,000 and ₹1,00,00,000'),
    body('tenure').isInt({ min: 1, max: 30 }).withMessage('Tenure must be between 1-30 years'),
    body('monthlyIncome').isNumeric().isFloat({ min: 15000 }).withMessage('Monthly income must be at least ₹15,000'),
    body('employmentType').isIn(['salaried', 'self-employed', 'business', 'retired', 'unemployed']).withMessage('Invalid employment type'),
    handleValidationErrors
  ], async (req, res) => {
    try {
      const validatedData = insertLoanApplicationSchema.parse(req.body);
      const application = await storage.createLoanApplication(validatedData);
      res.json({ success: true, applicationId: application.applicationId });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Validation error", errors: error.errors });
      } else {
        console.error("Loan application error:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.get("/api/loan-applications/:applicationId", [
    param('applicationId').isAlphanumeric().isLength({ min: 8, max: 20 }).withMessage('Invalid application ID'),
    query('mobile').matches(/^\+91[6-9]\d{4}-\d{5}$/).withMessage('Invalid mobile number format'),
    handleValidationErrors
  ], async (req, res) => {
    try {
      const { applicationId } = req.params;
      const { mobile } = req.query;

      const application = await storage.getLoanApplicationByIdAndMobile(
        applicationId,
        mobile as string
      );

      if (!application) {
        return res.status(404).json({ message: "Application not found or mobile number doesn't match" });
      }

      res.json(application);
    } catch (error) {
      console.error("Get loan application error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch("/api/loan-applications/:applicationId/status", [
    authenticateAgent,
    param('applicationId').isAlphanumeric().isLength({ min: 8, max: 20 }).withMessage('Invalid application ID'),
    body('status').isIn(['pending', 'under-review', 'approved', 'rejected', 'disbursed']).withMessage('Invalid status'),
    handleValidationErrors
  ], async (req: AuthenticatedRequest, res) => {
    try {
      const { applicationId } = req.params;
      const { status } = req.body;

      const application = await storage.updateLoanApplicationStatus(applicationId, status);

      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }

      res.json(application);
    } catch (error) {
      console.error("Update status error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Agent Routes
  app.post("/api/agents/login", [
    body('email').isEmail().normalizeEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6, max: 100 }).withMessage('Password must be 6-100 characters'),
    handleValidationErrors
  ], async (req, res) => {
    try {
      const { email, password } = req.body;

      const agent = await storage.getAgentByEmail(email);

      if (!agent) {
        // Prevent timing attacks by always comparing even if user doesn't exist
        await comparePassword(password, '$2b$12$dummy.hash.to.prevent.timing.attacks');
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isValidPassword = await comparePassword(password, agent.password);
      
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      if (!agent.isActive) {
        return res.status(401).json({ message: "Agent account is inactive" });
      }

      // Generate JWT token
      const token = generateToken({
        id: agent.id,
        email: agent.email,
        name: agent.name
      });

      res.json({ 
        success: true,
        token,
        agent: { 
          id: agent.id, 
          email: agent.email, 
          name: agent.name 
        } 
      });
    } catch (error) {
      console.error("Agent login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/agents/applications", authenticateAgent, async (req: AuthenticatedRequest, res) => {
    try {
      const applications = await storage.getAllLoanApplications();
      res.json(applications);
    } catch (error) {
      console.error("Get applications error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Contact Routes
  app.post("/api/contact", [
    body('name').isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
    body('email').isEmail().normalizeEmail().withMessage('Invalid email address'),
    body('mobile').matches(/^\+91[6-9]\d{4}-\d{5}$/).withMessage('Invalid mobile number format'),
    body('subject').isLength({ min: 5, max: 200 }).withMessage('Subject must be 5-200 characters'),
    body('message').isLength({ min: 10, max: 1000 }).withMessage('Message must be 10-1000 characters'),
    handleValidationErrors
  ], async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.json({ success: true, messageId: message.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Validation error", errors: error.errors });
      } else {
        console.error("Contact message error:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // CIBIL Score Routes
  app.post("/api/cibil-check", [
    body('fullName').isLength({ min: 2, max: 100 }).withMessage('Full name must be 2-100 characters'),
    body('mobile').matches(/^\+91[6-9]\d{4}-\d{5}$/).withMessage('Invalid mobile number format'),
    body('panCard').matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/).withMessage('Invalid PAN card format'),
    body('dateOfBirth').isISO8601().withMessage('Invalid date format'),
    handleValidationErrors
  ], async (req, res) => {
    try {
      const validatedData = insertCibilRequestSchema.parse(req.body);
      const cibilRequest = await storage.createCibilRequest(validatedData);
      res.json({ 
        success: true, 
        requestId: cibilRequest.requestId,
        score: cibilRequest.score,
        status: cibilRequest.status 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Validation error", errors: error.errors });
      } else {
        console.error("CIBIL check error:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.get("/api/cibil-check/:requestId", [
    param('requestId').isAlphanumeric().isLength({ min: 8, max: 20 }).withMessage('Invalid request ID'),
    handleValidationErrors
  ], async (req, res) => {
    try {
      const { requestId } = req.params;
      const cibilRequest = await storage.getCibilRequestById(requestId);

      if (!cibilRequest) {
        return res.status(404).json({ message: "CIBIL request not found" });
      }

      res.json(cibilRequest);
    } catch (error) {
      console.error("Get CIBIL request error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
