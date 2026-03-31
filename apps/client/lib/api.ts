import { apiFetch } from "./apiClient";

export function getTransactions() {
	return apiFetch("/transactions");
}

export function createTransaction(data: any) {
	return apiFetch("/transactions", {
		method: "POST",
		body: JSON.stringify(data)
	});
}

export function deleteTransaction(id: string) {
	return apiFetch(`/transactions/${id}`, {
		method: "DELETE"
	});
}

export function login(data: { email: string; password: string }) {
	return apiFetch("/login", {
		method: "POST",
		body: JSON.stringify(data)
	});
}