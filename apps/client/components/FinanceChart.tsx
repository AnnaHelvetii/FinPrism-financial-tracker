"use client";

import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
	ResponsiveContainer,
	Legend
} from "recharts";
import { useTransactions } from "@/context/TransactionsContext";

export default function FinanceChart() {
	const { summary } = useTransactions();

	const data = Object.entries(summary)
		.map(([month, val]: any) => ({
			month,
			income: val.income,
			expense: val. expense
		}))
		.sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month));

	const monthOrder = [
		'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
		'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
	];

	return (
		<div style={{ width: "100%", height: 400 }}>
			<h2 style={{ marginBottom: 20 }}>Monthly Finance</h2>

			<ResponsiveContainer>
				<LineChart data={data}>
					<CartesianGrid strokeDasharray="4 4" />
					<XAxis dataKey="month" />
					<YAxis />
					<Tooltip />
					<Legend />

					<Line
						type="monotone"
						dataKey="income"
						stroke="#16a34a"
						strokeWidth={3}
					/>

					<Line
						type="monotone"
						dataKey="expense"
						stroke="#dc2626"
						strokeWidth={3}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}