import { users, loanApplications, agents, contactMessages, type User, type InsertUser, type LoanApplication, type InsertLoanApplication, type Agent, type InsertAgent, type ContactMessage, type InsertContactMessage } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createLoanApplication(application: InsertLoanApplication): Promise<LoanApplication>;
  getLoanApplicationById(applicationId: string): Promise<LoanApplication | undefined>;
  getLoanApplicationByIdAndMobile(applicationId: string, mobile: string): Promise<LoanApplication | undefined>;
  updateLoanApplicationStatus(applicationId: string, status: string): Promise<LoanApplication | undefined>;
  getAllLoanApplications(): Promise<LoanApplication[]>;
  
  getAgentByEmail(email: string): Promise<Agent | undefined>;
  createAgent(agent: InsertAgent): Promise<Agent>;
  
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private loanApplications: Map<string, LoanApplication>;
  private agents: Map<string, Agent>;
  private contactMessages: Map<number, ContactMessage>;
  private currentUserId: number;
  private currentAgentId: number;
  private currentMessageId: number;

  constructor() {
    this.users = new Map();
    this.loanApplications = new Map();
    this.agents = new Map();
    this.contactMessages = new Map();
    this.currentUserId = 1;
    this.currentAgentId = 1;
    this.currentMessageId = 1;
    
    // Add a default agent
    this.createAgent({
      email: "agent@finflow.com",
      password: "admin123",
      name: "Default Agent"
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createLoanApplication(application: InsertLoanApplication): Promise<LoanApplication> {
    const applicationId = `LN2025${Math.random().toString().substr(2, 6)}`;
    const now = new Date();
    const loanApplication: LoanApplication = {
      ...application,
      id: this.currentUserId++,
      applicationId,
      status: "submitted",
      submittedAt: now,
      lastUpdated: now,
      existingEmis: application.existingEmis ?? 0,
    };
    this.loanApplications.set(applicationId, loanApplication);
    return loanApplication;
  }

  async getLoanApplicationById(applicationId: string): Promise<LoanApplication | undefined> {
    return this.loanApplications.get(applicationId);
  }

  async getLoanApplicationByIdAndMobile(applicationId: string, mobile: string): Promise<LoanApplication | undefined> {
    const application = this.loanApplications.get(applicationId);
    if (application && application.mobile === mobile) {
      return application;
    }
    return undefined;
  }

  async updateLoanApplicationStatus(applicationId: string, status: string): Promise<LoanApplication | undefined> {
    const application = this.loanApplications.get(applicationId);
    if (application) {
      application.status = status;
      application.lastUpdated = new Date();
      this.loanApplications.set(applicationId, application);
      return application;
    }
    return undefined;
  }

  async getAllLoanApplications(): Promise<LoanApplication[]> {
    return Array.from(this.loanApplications.values());
  }

  async getAgentByEmail(email: string): Promise<Agent | undefined> {
    return Array.from(this.agents.values()).find(
      (agent) => agent.email === email,
    );
  }

  async createAgent(insertAgent: InsertAgent): Promise<Agent> {
    const id = this.currentAgentId++;
    const agent: Agent = { ...insertAgent, id, isActive: true };
    this.agents.set(agent.email, agent);
    return agent;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentMessageId++;
    const message: ContactMessage = {
      id,
      firstName: insertMessage.firstName,
      lastName: insertMessage.lastName,
      email: insertMessage.email,
      phone: insertMessage.phone || null,
      subject: insertMessage.subject,
      message: insertMessage.message,
      createdAt: new Date(),
    };
    this.contactMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
