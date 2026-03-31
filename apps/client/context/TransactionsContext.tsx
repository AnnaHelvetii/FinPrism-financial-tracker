"use client";

import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { getTransactions, createTransaction, deleteTransaction } from "@/lib/api";
import toast from "react-hot-toast";

type Transaction = {
	id: string;
	amount: number;
	type: "income" | "expense";
	category: string;
	note?: string;
	date: string;
};

type Summary = Record<
	string,
	{
		income: number;
		expense: number;
	}
>;

type ContextType = {
	transactions: Transaction[];
	summary: Summary;
	load: () => Promise<void>;
	add: (data: Omit<Transaction, "id" | "date">) => Promise<void>;
	remove: (id: string) => Promise<void>;
	loading: boolean;
};

const TransactionsContext = createContext<ContextType | null>(null);

function calculateSummary(transactions: Transaction[]) {
	const result: Record<string, { income: number; expense: number }> = {};

	transactions.forEach(t => {
		const month = t.date.slice(0, 7);

		if (!result[month]) {
			result[month] = { income: 0, expense: 0 };
		}

		if (t.type === "income") {
			result[month].income += t.amount;
		} else {
			result[month].expense += t.amount;
		}
	});

	return result;
}

export function TransactionsProvider({ children }: { children: React.ReactNode }) {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function load() {
		setLoading(true);
		setError(null);
		try {
			const t = await getTransactions();
			setTransactions(t);
		} catch (err) {
			console.error(err);
			setError("Не удалось загрузить транзакции");
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		load();
	}, []);

	async function add(data: Omit<Transaction, 'id' | 'date'>) {
		const tempId = crypto.randomUUID();

		const tempTx = {
			...data,
			id: tempId,
			date: new Date().toISOString()
		};
		setTransactions(prev => [tempTx, ...prev]);

		try {
			await createTransaction(data);
			toast.success('Транзакция добавлена');
		} catch (err) {
			setTransactions(prev => prev.filter(t => t.id !== tempTx.id));
			toast.error('Не удалось добавить транзакцию');
		}
	}

	async function remove(id: string) {
		const prev = transactions;
		setTransactions((prev) => prev.filter((t) => t.id !== id));

		try {
			await deleteTransaction(id);
			toast.success('Транзакция добавлена');
		} catch (err) {
			setTransactions(prev);
			toast.error('Не удалось добавить транзакцию');
		}
	}

	const summary = useMemo(
		() => calculateSummary(transactions),
		[transactions]
	);

	return (
		<TransactionsContext.Provider
			value={{ transactions, summary, load, add, remove, loading }}
		>
			{children}
		</TransactionsContext.Provider>
	);
}

export function useTransactions() {
	const ctx = useContext(TransactionsContext);
	if (!ctx) {
		throw new Error("useTransactions must be used inside provider");
	}
	return ctx;
}