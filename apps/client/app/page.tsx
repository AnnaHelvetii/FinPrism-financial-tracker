import AddTransactionForm from "@/components/AddTransactionForm";
import CategoryPieChart from "@/components/CategoryPieChart";
import FinanceChart from "@/components/FinanceChart";
import FinanceStats from "@/components/FinanceStats";
import TransactionsTable from "@/components/TransactionsTable";

export default function Home() {
	return (
		<div style={{ maxWidth: 1200 }}>
			<h1 style={{ marginBottom: 30 }}>Dashboard</h1>
			<FinanceStats />
			<AddTransactionForm />
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					gap: 30,
					marginTop: 40
				}}
			>
				<FinanceChart />
				<CategoryPieChart />
			</div>
			<TransactionsTable />
		</div>
	);
}