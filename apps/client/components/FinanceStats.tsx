"use client";

import { useEffect, useState } from "react";

const API_URL = "http://localhost:5174";

export default function FinanceStats() {
	const [stats, setStats] = useState({
		totalIncome: 0,
		totalExpense: 0,
		balance: 0
	});

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) return;

		fetch(`${API_URL}/transactions/stats`, {
			headers: {
				Authorization: `Bearer ${token}`
			},
			cache: "no-store"
		})
			.then(res => res.json())
			.then(setStats);
	}, []);

	return (
		<div style={{
			display: "flex",
			gap: 20,
			marginBottom: 40
		}}>
			<Stat title="Income" value={stats.totalIncome} color="#16a34a" />
			<Stat title="Expense" value={stats.totalExpense} color="#dc2626" />
			<Stat title="Balance" value={stats.balance} color="#2563eb" />
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