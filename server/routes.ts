import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLoanApplicationSchema, insertAgentSchema, insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Loan Application Routes
  app.post("/api/loan-applications", async (req, res) => {
    try {
      const validatedData = insertLoanApplicationSchema.parse(req.body);
      const application = await storage.createLoanApplication(validatedData);
      res.json({ success: true, applicationId: application.applicationId });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Validation error", errors: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.get("/api/loan-applications/:applicationId", async (req, res) => {
    try {
      const { applicationId } = req.params;
      const { mobile } = req.query;

      if (!mobile) {
        return res.status(400).json({ message: "Mobile number is required" });
      }

      const application = await storage.getLoanApplicationByIdAndMobile(
        applicationId,
        mobile as string
      );

      if (!application) {
        return res.status(404).json({ message: "Application not found or mobile number doesn't match" });
      }

      res.json(application);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch("/api/loan-applications/:applicationId/status", async (req, res) => {
    try {
      const { applicationId } = req.params;
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }

      const application = await storage.updateLoanApplicationStatus(applicationId, status);

      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }

      res.json(application);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Agent Routes
  app.post("/api/agents/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      const agent = await storage.getAgentByEmail(email);

      if (!agent || agent.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      if (!agent.isActive) {
        return res.status(401).json({ message: "Agent account is inactive" });
      }

      // In a real app, you'd set up proper session management here
      res.json({ 
        success: true, 
        agent: { 
          id: agent.id, 
          email: agent.email, 
          name: agent.name 
        } 
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/agents/applications", async (req, res) => {
    try {
      // In a real app, you'd verify agent authentication here
      const applications = await storage.getAllLoanApplications();
      res.json(applications);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Contact Routes
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.json({ success: true, messageId: message.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Validation error", errors: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
