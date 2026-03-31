"use client";

import Sidebar from "./Sidebar";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<div style={{ display: "flex" }}>
			<Sidebar />

			<main
				style={{
					flex: 1,
					padding: 40,
					background: "#fafafa",
					minHeight: "100vh"
				}}
			>
				{children}

				<Toaster
					position="top-right"
					toastOptions={{
						duration: 3000
					}}
				/>
			</main>
		</div>
	);
}