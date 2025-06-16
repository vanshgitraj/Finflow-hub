// server/routes/loanApplicationRoute.ts

import express from 'express'; import { insertLoanApplicationSchema } from '../../shared/schema';

const router = express.Router();

router.post('/api/loan-applications', async (req, res) => { const parsed = insertLoanApplicationSchema.safeParse(req.body);

if (!parsed.success) { console.error("Validation failed:", parsed.error.format()); return res.status(400).json({ message: 'Validation error', errors: parsed.error.flatten(), }); }

const validatedData = parsed.data; console.log("Validated loan application:", validatedData);

// TODO: Insert into DB (e.g., using drizzle or Prisma) // await db.insert(loanApplications).values(validatedData);

return res.status(200).json({ message: 'Application submitted successfully' }); });

export default router;

