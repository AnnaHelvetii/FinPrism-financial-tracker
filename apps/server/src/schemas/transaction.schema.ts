import { z } from "zod";

export const createTransactionSchema = z.object({
	amount: z.number().positive(),
	type: z.enum(["income", "expense"]),
	category: z.string().min(1),
	note: z.string().optional(),
	date: z.string().optional()
});

export const updateTransactionSchema = z.object({
	amount: z.number().positive().optional(),
	type: z.enum(["income", "expense"]).optional(),
	category: z.string().min(1).optional(),
	note: z.string().optional()
});