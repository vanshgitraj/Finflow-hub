import { hashPassword } from './auth';
import { storage } from './storage';

export async function setupDefaultAgent() {
  try {
    // Check if default agent already exists
    const existingAgent = await storage.getAgentByEmail('agent@finflow.com');
    
    if (!existingAgent) {
      // Create default agent with hashed password
      const hashedPassword = await hashPassword('admin123');
      await storage.createAgent({
        email: 'agent@finflow.com',
        password: hashedPassword,
        name: 'Default Agent'
      });
      console.log('Default agent created successfully');
    } else {
      console.log('Default agent already exists');
    }
  } catch (error) {
    console.error('Error setting up default agent:', error);
  }
}