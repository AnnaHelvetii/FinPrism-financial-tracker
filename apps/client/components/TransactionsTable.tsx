"use client";

import { useState } from "react";
import { useTransactions } from "@/context/TransactionsContext";

export default function TransactionsTable() {
	const [month, setMonth] = useState("");
	const { transactions, remove, loading } = useTransactions();

	const filteredTransactions = month
		? transactions.filter(t => t.date.startsWith(month))
		: transactions;

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div style={{ marginTop: 80 }}>
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
						<th>Actions</th>
					</tr>
				</thead>

				<tbody>
					{filteredTransactions.map((t) => (
						<tr key={t.id}>
							<td>{new Date(t.date).toLocaleDateString()}</td>
							<td>{t.type}</td>
							<td>{t.category}</td>
							<td>{t.amount}</td>
							<td>{t.note}</td>
							<td>
								<button onClick={() => remove(t.id)}>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}