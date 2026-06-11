import React, { useState } from "react";
export default function FinancialStatus({
  project,
  expenses = [],
  onAddFunding,
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [newFunding, setNewFunding] = useState({
    amount: "",
    date: "",
    note: "",
  });
  const handleSave = () => {
    const amt = parseFloat(newFunding.amount);
    if (!isNaN(amt) && amt > 0 && newFunding.date) {
      onAddFunding({
        amount: amt,
        date: newFunding.date,
        note: newFunding.note,
      });
      setNewFunding({ amount: "", date: "", note: "" });
      setIsAdding(false);
    }
  };
  const initialBudget = project?.initialBudget || 0;
  const adjustments = project?.budgetAdjustments || [];

const totalBudget = initialBudget + adjustments.reduce((sum, adj) => sum + (parseFloat(adj.amount) || 0), 0);
  const totalSpent = expenses.reduce((sum, exp) => sum + (parseFloat(exp.amount) || 0), 0);
  const remaining = totalBudget - totalSpent;

  const categoryBreakdown = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + (parseFloat(exp.amount) || 0);
    return acc;
  }, {});
  const handleAddFunding = (projectId, fundingData) => {
    setProjects((prevProjects) =>
      prevProjects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              budgetAdjustments: [...(p.budgetAdjustments || []), fundingData],
            }
          : p,
      ),
    );
  };
  return (
    <div className="fin-page-container">
      <div className="fin-summary-row">
        <div className="fin-summary-item">
          <h3>Total Allotted</h3>
          <p>{totalBudget.toLocaleString()} ETB</p>
        </div>
        <div className="fin-summary-item">
          <h3>Total Used</h3>
          <p>{totalSpent.toLocaleString()} ETB</p>
        </div>
        <div className="fin-summary-item">
          <h3>Remaining</h3>
          <p>{remaining.toLocaleString()} ETB</p>
        </div>
      </div>

      <div className="fin-details-grid">
        <div className="fin-detail-block">
          <h3>Spending by Category</h3>
          {Object.entries(categoryBreakdown).map(([cat, amt]) => (
            <div key={cat} className="fin-breakdown-row">
              <span>{cat}</span>
              <span>{amt.toLocaleString()} ETB</span>
            </div>
          ))}
        </div>

        <div className="fin-detail-block">
          <h3>Budget History</h3>
          <ul className="fin-history-list">
            <li>Initial: {initialBudget.toLocaleString()} ETB</li>
            {adjustments.map((adj, i) => (
              <li key={i}>
                {adj.date}: {adj.note} -{" "}
                <strong>{adj.amount.toLocaleString()} ETB</strong>
              </li>
            ))}
          </ul>

          {isAdding ? (
            <div className="funding-input-area">
              <input
                type="number"
                placeholder="Amount"
                value={newFunding.amount}
                onChange={(e) =>
                  setNewFunding({ ...newFunding, amount: e.target.value })
                }
              />
              <input
                type="date"
                value={newFunding.date}
                onChange={(e) =>
                  setNewFunding({ ...newFunding, date: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Description/Note"
                value={newFunding.note}
                onChange={(e) =>
                  setNewFunding({ ...newFunding, note: e.target.value })
                }
              />
              <button onClick={handleSave}>Save</button>
            </div>
          ) : (
            <button className="fin-add-btn" onClick={() => setIsAdding(true)}>
              Add Funding
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
