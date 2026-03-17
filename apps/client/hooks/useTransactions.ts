import { useEffect, useState } from "react";
import {
	getTransactions,
	createTransaction,
	deleteTransaction
} from "@/lib/api";

export function useTransactions(month?: any) {
	const [transactions, setTransactions] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	async function load() {
		try {
			setLoading(true);
			const data = await getTransactions(month);
			setTransactions(data);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		load();
	}, [month]);

	async function add(data: any) {
		await createTransaction(data);
		await load();
	}

	async function remove(id: string) {
		await deleteTransaction(id);
		await load();
	}

	return {
		transactions,
		loading,
		add,
		remove,
		reload: load
	};
}