"use client";

import {
	PieChart,
	Pie,
	Cell,
	Tooltip,
	ResponsiveContainer
} from "recharts";
import { useTransactions } from "@/context/TransactionsContext";

const COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6"];

export default function CategoryPieChart() {
	const { transactions } = useTransactions();
	const dataMap: Record<string, number> = {};

	transactions.forEach(t => {
		if (t.type === "expense") {
			dataMap[t.category] = (dataMap[t.category] || 0) + t.amount;
		}
	});

	const data = Object.entries(dataMap).map(([name, value]) => ({
		name,
		value
	}));

	return (
		<div style={{ width: "100%", height: 350 }}>
			<h2 style={{ marginBottom: 20 }}>Expenses by Category</h2>

			<ResponsiveContainer>
				<PieChart>
					<Pie
						data={data}
						dataKey="value"
						nameKey="name"
						outerRadius={120}
						label
					>
						{data.map((_, index) => (
							<Cell
								key={index}
								fill={COLORS[index % COLORS.length]}
							/>
						))}
					</Pie>
					<Tooltip />
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
}