import { pgTable, text, serial, integer, timestamp, boolean } from "drizzle-orm/pg-core"; import { createInsertSchema } from "drizzle-zod"; import { z } from "zod";

export const users = pgTable("users", { id: serial("id").primaryKey(), username: text("username").notNull().unique(), password: text("password").notNull(), });

export const loanApplications = pgTable("loan_applications", { id: serial("id").primaryKey(), applicationId: text("application_id").notNull().unique(), fullName: text("full_name").notNull(), dateOfBirth: text("date_of_birth").notNull(), mobile: text("mobile").notNull(), email: text("email").notNull(), panCard: text("pan_card").notNull(), gender: text("gender").notNull(), currentAddress: text("current_address").notNull(), employmentType: text("employment_type").notNull(), monthlyIncome: integer("monthly_income").notNull(), companyName: text("company_name").notNull(), workExperience: text("work_experience").notNull(), existingEmis: integer("existing_emis").default(0), accountType: text("account_type").notNull(), loanType: text("loan_type").notNull(), loanAmount: integer("loan_amount").notNull(), tenure: integer("tenure").notNull(), purpose: text("purpose").notNull(), status: text("status").default("submitted"), submittedAt: timestamp("submitted_at").defaultNow(), lastUpdated: timestamp("last_updated").defaultNow(), });

export const insertLoanApplicationSchema = createInsertSchema(loanApplications).pick({
  fullName: true,
  mobile: true,
  email: true,
  loanType: true,
  loanAmount: true,
  tenure: true,
  purpose: true,
});

export const agents = pgTable("agents", { id: serial("id").primaryKey(), email: text("email").notNull().unique(), password: text("password").notNull(), name: text("name").notNull(), isActive: boolean("is_active").default(true), });

export const contactMessages = pgTable("contact_messages", { id: serial("id").primaryKey(), firstName: text("first_name").notNull(), lastName: text("last_name").notNull(), email: text("email").notNull(), phone: text("phone"), subject: text("subject").notNull(), message: text("message").notNull(), createdAt: timestamp("created_at").defaultNow(), });

export const cibilRequests = pgTable("cibil_requests", { id: serial("id").primaryKey(), requestId: text("request_id").notNull().unique(), fullName: text("full_name").notNull(), dateOfBirth: text("date_of_birth").notNull(), mobile: text("mobile").notNull(), panCard: text("pan_card").notNull(), pincode: text("pincode").notNull(), score: integer("score"), status: text("status").default("pending"), createdAt: timestamp("created_at").defaultNow(), });

// ✅ Pick only minimal fields for testing schema to avoid validation error export const insertLoanApplicationSchema = createInsertSchema(loanApplications).pick({ fullName: true, mobile: true, email: true, loanType: true, loanAmount: true, tenure: true, purpose: true, });

export const insertUserSchema = createInsertSchema(users).pick({ username: true, password: true, });

export const insertAgentSchema = createInsertSchema(agents).omit({ id: true, isActive: true, });

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({ id: true, createdAt: true, });

export const insertCibilRequestSchema = createInsertSchema(cibilRequests).omit({ id: true, requestId: true, score: true, status: true, createdAt: true, });

export type User = typeof users.$inferSelect; export type InsertUser = z.infer<typeof insertUserSchema>; export type LoanApplication = typeof loanApplications.$inferSelect; export type InsertLoanApplication = z.infer<typeof insertLoanApplicationSchema>; export type Agent = typeof agents.$inferSelect; export type InsertAgent = z.infer<typeof insertAgentSchema>; export type ContactMessage = typeof contactMessages.$inferSelect; export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>; export type CibilRequest = typeof cibilRequests.$inferSelect; export type InsertCibilRequest = z.infer<typeof insertCibilRequestSchema>;


