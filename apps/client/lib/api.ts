const API_URL = "http://localhost:5174";

function getToken() {
	if (typeof window === "undefined") return null;
	return localStorage.getItem("token");
}

export async function apiFetch(path: string, options: RequestInit = {}) {
	const token = getToken();

	const res = await fetch(`${API_URL}${path}`, {
		...options,
		headers: {
			"Content-Type": "application/json",
			...(token ? { Authorization: `Bearer ${token}` } : {}),
			...(options.headers || {})
		}
	});

	if (!res.ok) {
		throw new Error("API error");
	}

	return res.json();
}

export const getTransactions = (month?: string) =>
	apiFetch(month ? `/transactions?month=${month}` : "/transactions");

export const getSummary = () =>
	apiFetch("/transactions/summary");

export const createTransaction = (data: any) =>
	apiFetch("/transactions", {
		method: "POST",
		body: JSON.stringify(data)
	});

export const deleteTransaction = (id: string) =>
	apiFetch(`/transactions/${id}`, {
		method: "DELETE"
	});