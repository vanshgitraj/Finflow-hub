// ✅ Step 1: Load environment variables
import dotenv from "dotenv";
dotenv.config();

// ✅ Step 2: Import dependencies
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
import * as schema from "@shared/schema"; // Make sure this path is correct

// ✅ Step 3: Configure WebSocket for Neon
neonConfig.webSocketConstructor = ws;

// ✅ Step 4: Safety check for env variable
if (!process.env.DATABASE_URL) {
  throw new Error("❌ DATABASE_URL is missing in .env file.");
}

// ✅ Step 5: Connect to PostgreSQL via Neon Pool
export const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// ✅ Step 6: Initialize Drizzle ORM with schema
export const db = drizzle({ client: pool, schema });