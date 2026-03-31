const API_URL = "http://localhost:5174";

export async function apiFetch(
	path: string,
	options: RequestInit = {}
) {
	const token = localStorage.getItem("token");

	const res = await fetch(`${API_URL}${path}`, {
		...options,
		headers: {
			"Content-Type": "application/json",
			...(token ? { Authorization: `Bearer ${token}` } : {}),
			...options.headers
		}
	});

	if (!res.ok) {
		const text = await res.text();
		throw new Error(text || "API error");
	}

	return res.json();
}