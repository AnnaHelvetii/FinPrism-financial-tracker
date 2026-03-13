"use client";

export default function Sidebar() {
	return (
		<aside
			style={{
				width: 220,
				padding: 20,
				borderRight: "1px solid #e4e4e7",
				height: "100vh"
			}}
		>
			<h2 style={{ marginBottom: 30 }}>Finance</h2>

			<nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
				<a href="#">Dashboard</a>
				<a href="#">Transactions</a>
				<a href="#">Analytics</a>
			</nav>
		</aside>
	);
}