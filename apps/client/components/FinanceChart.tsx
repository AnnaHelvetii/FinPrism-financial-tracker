"use client";

import { useEffect, useState } from "react";
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

type ChartData = {
	month: string;
	income: number;
	expense: number;
};

const API_URL = "http://localhost:5174";

export default function FinanceChart() {
	const [data, setData] = useState<ChartData[]>([]);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) return;

		fetch(`${API_URL}/transactions/summary`, {
			headers: {
				Authorization: `Bearer ${token}`
			},
			cache: "no-store"
		})
			.then(res => res.json())
			.then(result => {
				const chartData = Object.entries(result).map(
					([month, values]: any) => ({
						month,
						income: values.income,
						expense: values.expense
					})
				);

				setData(chartData);
			});
	}, []);

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