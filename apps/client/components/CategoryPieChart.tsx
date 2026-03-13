"use client";

import { useEffect, useState } from "react";
import {
	PieChart,
	Pie,
	Cell,
	Tooltip,
	ResponsiveContainer
} from "recharts";

const API_URL = "http://localhost:5174";

const COLORS = [
	"#ef4444",
	"#f97316",
	"#eab308",
	"#22c55e",
	"#3b82f6",
	"#8b5cf6"
];

export default function CategoryPieChart() {
	const [data, setData] = useState<any[]>([]);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) return;

		fetch(`${API_URL}/transactions/categories`, {
			headers: {
				Authorization: `Bearer ${token}`
			},
			cache: "no-store"
		})
			.then(res => res.json())
			.then(setData);
	}, []);

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
						{data.map((entry, index) => (
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