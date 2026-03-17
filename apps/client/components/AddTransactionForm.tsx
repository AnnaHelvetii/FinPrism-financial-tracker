"use client";

import { useState } from "react";
import { useTransactions } from "@/context/TransactionsContext";

export default function AddTransactionForm() {
	const [amount, setAmount] = useState("");
	const [type, setType] = useState("expense");
	const [category, setCategory] = useState("");
	const [note, setNote] = useState("");
	const { add } = useTransactions();

	async function handleSubmit(e: React.SubmitEvent) {
		e.preventDefault();

		try {
			await add({
				amount: Number(amount),
				type,
				category,
				note
			});
			setAmount("");
			setCategory("");
			setNote("");
			console.log("transaction added");
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="mb-10 p-6 max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-4"
		>
			<h2 className="text-xl font-semibold text-slate-800 mb-2">Новая транзакция</h2>
			<div className="grid grid-cols-2 gap-4">
				<input
					type="number"
					placeholder="Сумма"
					value={amount}
					onChange={e => setAmount(e.target.value)}
					className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
				/>
				<select
					value={type}
					onChange={e => setType(e.target.value)}
					className={`px-3 py-2 rounded-lg border border-slate-200 focus:outline-none font-medium transition-colors ${type === 'income' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
						}`}
				>
					<option value="expense">Расход</option>
					<option value="income">Доход</option>
				</select>
			</div>
			<input
				placeholder="Категория"
				value={category}
				onChange={e => setCategory(e.target.value)}
				className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
			/>
			<input
				placeholder="Заметка"
				value={note}
				onChange={e => setNote(e.target.value)}
				className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
			/>
			<button
				type="submit"
				className="mt-2 w-full bg-slate-900 text-white font-medium py-2.5 rounded-lg hover:bg-slate-800 active:scale-[0.98] transition-all"
			>
				Добавить
			</button>
		</form>
	);
}
