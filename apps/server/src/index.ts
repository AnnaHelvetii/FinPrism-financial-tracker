import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { prisma } from "./lib/prisma";
import jwt from "jsonwebtoken";
import { authenticate } from "./middleware/auth";
import { createTransactionSchema, updateTransactionSchema } from "./schemas/transaction.schema";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.json({ message: "Finance Tracker API is running 🚀" });
});

// -------------------- REGISTER --------------------
app.post("/register", async (req, res) => {
	console.log("REGISTER HIT");

	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ error: "Email and password required" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await prisma.user.create({
			data: { email, password: hashedPassword },
		});

		const { password: _, ...userWithoutPassword } = user;

		return res.status(201).json(userWithoutPassword);
	} catch (error: any) {
		console.error(error);

		if (error.code === "P2002") {
			return res.status(400).json({ error: "Email already exists" });
		}

		return res.status(500).json({ error: "Internal server error" });
	}
});

// -------------------- LOGIN --------------------
app.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ error: "Email and password required" });
		}

		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) return res.status(400).json({ error: "Invalid credentials" });

		const isValidPassword = await bcrypt.compare(password, user.password);
		if (!isValidPassword) return res.status(400).json({ error: "Invalid credentials" });

		// -------------------- JWT GENERATION --------------------
		const secret: string = process.env.JWT_SECRET!;
		if (!secret) throw new Error("JWT_SECRET is not set");

		const expiresIn = process.env.JWT_EXPIRES_IN || "1h";

		const token = jwt.sign(
			{ userId: user.id, email: user.email, role: user.role },
			secret,
			{ expiresIn } as jwt.SignOptions
		);

		const { password: _, ...userWithoutPassword } = user;

		return res.json({ token, user: userWithoutPassword });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal server error" });
	}
});

// -------------------- PROTECTED ROUTE --------------------
app.get("/me", authenticate, async (req, res) => {
	const user = await prisma.user.findUnique({ where: { id: req.user!.userId } });

	if (!user) return res.status(404).json({ error: "User not found" });

	const { password, ...userWithoutPassword } = user;
	res.json(userWithoutPassword);
});

// -------------------- SERVER START --------------------
const PORT = process.env.PORT || 5174;

app.post("/transactions", authenticate, async (req, res) => {
	try {
		const parsed = createTransactionSchema.safeParse(req.body);

		if (!parsed.success) {
			return res.status(400).json({
				error: parsed.error.flatten()
			});
		}

		const { amount, type, category, note, date } = parsed.data;

		if (!amount || !type || !category) {
			return res.status(400).json({ message: "Missing required fields" });
		}

		const transaction = await prisma.transaction.create({
			data: {
				amount,
				type,
				category,
				note,
				date: date ? new Date(date) : undefined,
				userId: req.user!.userId
			}
		});

		res.status(201).json(transaction);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
});

app.get("/transactions", authenticate, async (req, res) => {
	try {
		const { month } = req.query;

		let startDate: Date | undefined;
		let endDate: Date | undefined;

		if (month) {
			const [year, m] = (month as string).split("-");

			startDate = new Date(Number(year), Number(m) - 1, 1);
			endDate = new Date(Number(year), Number(m), 1);
		}

		const transactions = await prisma.transaction.findMany({
			where: {
				userId: req.user!.userId,
				...(startDate && {
					date: {
						gte: startDate,
						lt: endDate
					}
				})
			},
			orderBy: {
				date: "desc"
			}
		});

		res.json(transactions);

	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
});

app.get("/transactions/summary", authenticate, async (req, res) => {
	try {
		const { from, to } = req.query;
		const fromDate = from ? new Date(from as string) : undefined;
		const toDate = to ? new Date(to as string) : undefined;

		const where: any = { userId: req.user!.userId };

		if (fromDate || toDate) {
			where.date = {};
			if (fromDate) where.date.gte = fromDate;
			if (toDate) where.date.lte = toDate;
		}

		const summary = await prisma.transaction.groupBy({
			by: ["type", "date"],
			where,
			_sum: { amount: true },
		});

		const monthly: Record<string, { income: number; expense: number }> = {};

		summary.forEach(item => {
			const month = item.date.toISOString().slice(0, 7);
			if (!monthly[month]) monthly[month] = { income: 0, expense: 0 };
			if (item.type === "income") monthly[month].income += item._sum.amount ?? 0;
			else monthly[month].expense += item._sum.amount ?? 0;
		});

		res.json(monthly);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
});

app.get("/transactions/stats", authenticate, async (req, res) => {
	try {
		const transactions = await prisma.transaction.findMany({
			where: {
				userId: req.user!.userId
			}
		});

		let totalIncome = 0;
		let totalExpense = 0;

		for (const t of transactions) {
			if (t.type === "income") {
				totalIncome += t.amount;
			} else {
				totalExpense += t.amount;
			}
		}

		const balance = totalIncome - totalExpense;

		res.json({
			totalIncome,
			totalExpense,
			balance
		});

	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
});

app.get("/transactions/categories", authenticate, async (req, res) => {
	try {
		const transactions = await prisma.transaction.findMany({
			where: {
				userId: req.user!.userId,
				type: "expense"
			}
		});

		const categories: Record<string, number> = {};

		for (const t of transactions) {
			if (!categories[t.category]) {
				categories[t.category] = 0;
			}

			categories[t.category] += t.amount;
		}

		const result = Object.entries(categories).map(([name, value]) => ({
			name,
			value
		}));

		res.json(result);

	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
});

app.delete("/transactions/:id", authenticate, async (req, res) => {
	try {
		const id = req.params.id as string;;

		const transaction = await prisma.transaction.findUnique({
			where: { id }
		});

		if (!transaction || transaction.userId !== req.user!.userId) {
			return res.status(404).json({ message: "Transaction not found" });
		}

		await prisma.transaction.delete({
			where: { id }
		});

		res.json({ message: "Transaction deleted" });

	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
});

app.put("/transactions/:id", authenticate, async (req, res) => {
	try {
		const id = req.params.id as string;
		const { amount, category, note, type } = req.body;

		const transaction = await prisma.transaction.findUnique({
			where: { id }
		});

		if (!transaction || transaction.userId !== req.user!.userId) {
			return res.status(404).json({ message: "Transaction not found" });
		}

		const parsed = updateTransactionSchema.safeParse(req.body);

		if (!parsed.success) {
			return res.status(400).json({
				error: parsed.error.flatten()
			});
		}

		const data = parsed.data;

		const updated = await prisma.transaction.update({
			where: { id },
			data
		});

		res.json(updated);

	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});