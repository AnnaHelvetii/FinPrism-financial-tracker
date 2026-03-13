"use client";

import { useEffect, useState } from "react";

const API_URL = "http://localhost:5174";

export default function TransactionsTable() {
	const [transactions, setTransactions] = useState<any[]>([]);
	const [month, setMonth] = useState("");

	useEffect(() => {
		loadTransactions();
	}, [month]);

	async function loadTransactions() {
		const token = localStorage.getItem("token");
		if (!token) return;

		const url = month
			? `${API_URL}/transactions?month=${month}`
			: `${API_URL}/transactions`;

		const res = await fetch(url, {
			headers: {
				Authorization: `Bearer ${token}`
			},
			cache: "no-store"
		});

		const data = await res.json();
		setTransactions(data);
	}

	return (
		<div style={{ marginTop: 40 }}>
			<h2>Transactions</h2>

			<input
				type="month"
				value={month}
				onChange={(e) => setMonth(e.target.value)}
				style={{ marginBottom: 20 }}
			/>

			<table style={{ width: "100%", borderCollapse: "collapse" }}>
				<thead>
					<tr>
						<th>Date</th>
						<th>Type</th>
						<th>Category</th>
						<th>Amount</th>
						<th>Note</th>
					</tr>
				</thead>

				<tbody>
					{transactions.map((t) => (
						<tr key={t.id}>
							<td>{new Date(t.date).toLocaleDateString()}</td>
							<td>{t.type}</td>
							<td>{t.category}</td>
							<td>{t.amount}</td>
							<td>{t.note}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}