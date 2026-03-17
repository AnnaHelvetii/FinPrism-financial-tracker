import DashboardLayout from "@/components/DashboardLayout";
import { TransactionsProvider } from "@/context/TransactionsContext";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body>
				<TransactionsProvider>
					<DashboardLayout>
						{children}
					</DashboardLayout>
				</TransactionsProvider>
			</body>
		</html>
	)
}