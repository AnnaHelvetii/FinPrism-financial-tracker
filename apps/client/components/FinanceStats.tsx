"use client";

import { useTransactions } from "@/context/TransactionsContext";

export default function FinanceStats() {
	const { transactions } = useTransactions();

	const totalIncome = transactions
		.filter(t => t.type === 'income')
		.reduce((sum, t) => sum + t.amount, 0);

	const totalExpense = transactions
		.filter(t => t.type === 'expense')
		.reduce((sum, t) => sum + t.amount, 0);

	const balance = totalIncome - totalExpense;

	return (
		<div style={{
			display: "flex",
			gap: 20,
			marginBottom: 40
		}}>
			<Stat title="Income" value={totalIncome} color="#16a34a" />
			<Stat title="Expense" value={totalExpense} color="#dc2626" />
			<Stat title="Balance" value={balance} color="#2563eb" />
		</div>
	);
}

function Stat({ title, value, color }: any) {
	return (
		<div style={{
			padding: 20,
			borderRadius: 12,
			background: "#f4f4f5",
			minWidth: 150
		}}>
			<div style={{ fontSize: 14 }}>{title}</div>

			<div
				style={{
					fontSize: 28,
					fontWeight: 600,
					color
				}}
			>
				{value}
			</div>
		</div>
	);
}