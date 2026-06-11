import StatCard from '../components/StatCard';

export default function Dashboard({ project, expenses = [] }) {
    // 1. Calculate Budget (Initial + Adjustments)
    const initialBudget = project?.initialBudget || 0;
    const adjustments = project?.budgetAdjustments || [];
    const totalBudget = initialBudget + adjustments.reduce((sum, adj) => sum + (parseFloat(adj.amount) || 0), 0);

    // 2. Calculate Total Spent from the expenses prop
    const totalSpent = expenses
        .filter(exp => exp.projectId === project?.id)
        .reduce((sum, exp) => sum + (parseFloat(exp.amount) || 0), 0);

    // 3. Calculate Weekly Spending
    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const weeklySpending = expenses
        .filter(exp => exp.projectId === project?.id && new Date(exp.date) >= lastWeek)
        .reduce((sum, exp) => sum + (parseFloat(exp.amount) || 0), 0);

    const remaining = totalBudget - totalSpent;

    return (
        <div className="dashboard-wrapper">
            {/* Summary Cards Grid */}
            <div className="dashboard-grid">
                <StatCard title="Total Budget" amount={totalBudget.toLocaleString()} />
                <StatCard title="Total Spent" amount={totalSpent.toLocaleString()} />
                <StatCard title="Remaining" amount={remaining.toLocaleString()} />
                <StatCard title="Weekly Spending" amount={weeklySpending.toLocaleString()} highlight />
            </div>

            {/* Chart Section */}
            <div className="chart-section">
                <h2 className="chart-title">Spending Trends</h2>
                <div className="chart-placeholder">
                    <p>Chart will be rendered here (Recharts)</p>
                </div>
            </div>
        </div>
    );
}