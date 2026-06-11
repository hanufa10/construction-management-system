import { useState, useEffect } from "react";

export default function ExpensesPage({
  selectedProjectId,
  expenses,
  onAddExpense,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter States
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterDate, setFilterDate] = useState("");

  const [formData, setFormData] = useState({
    date: "",
    item: "",
    description: "",
    quantity: "",
    category: "Materials",
    unitPrice: "",
    amount: "",
    phase: "unassigned",
  });

  // Auto-calculate Total Price in Modal
  useEffect(() => {
    const qty = parseFloat(formData.quantity) || 0;
    const price = parseFloat(formData.unitPrice) || 0;
    setFormData((prev) => ({ ...prev, amount: (qty * price).toString() }));
  }, [formData.quantity, formData.unitPrice]);

  // Apply Filters
  const filtered = expenses.filter((e) => {
    const matchesProject = e.projectId === selectedProjectId;
    const matchesCategory =
      filterCategory === "All" || e.category === filterCategory;
    const matchesDate = !filterDate || e.date === filterDate;
    return matchesProject && matchesCategory && matchesDate;
  });

  // Calculate metrics based on CURRENTLY FILTERED data
  const materials = filtered.filter((e) => e.category === "Materials");
  const labour = filtered.filter((e) => e.category === "Labour");

  const totalMaterials = materials.reduce((sum, e) => sum + (e.amount || 0), 0);
  const totalLabour = labour.reduce((sum, e) => sum + (e.amount || 0), 0);
  const totalSpent = totalMaterials + totalLabour;

  const handleSubmit = (e) => {
  e.preventDefault();
  
  // If phase is empty string or only whitespace, default to "unassigned"
  const finalPhase = formData.phase && formData.phase.trim() !== "" 
    ? formData.phase 
    : "unassigned";

  onAddExpense({
    ...formData,
    phase: finalPhase, // Use the corrected phase
    projectId: selectedProjectId,
    quantity: parseFloat(formData.quantity),
    unitPrice: parseFloat(formData.unitPrice),
    amount: parseFloat(formData.amount),
    id: Date.now(),
  });
  
  setIsModalOpen(false);
  setFormData({
    date: "",
    item: "",
    description: "",
    quantity: "",
    category: "Materials",
    unitPrice: "",
    amount: "",
    phase: "unassigned", // Reset to default
  });
};
  const groupedExpenses = filtered.reduce((acc, exp) => {
    const phaseLabel = (exp.phase && exp.phase.trim() !== "") ? exp.phase : "unassigned";
    if (!acc[phaseLabel]) acc[phaseLabel] = [];
    acc[phaseLabel].push(exp);
    return acc;
  }, {});
  return (
    <div className="exp-page-layout">
      {/* LEFT: Ledger Table */}
      <div className="exp-ledger">
        <div className="exp-controls">
          <button className="exp-add-btn" onClick={() => setIsModalOpen(true)}>
            + Add Expense
          </button>

          <div className="exp-filters">
            <select
              onChange={(e) => setFilterCategory(e.target.value)}
              value={filterCategory}
            >
              <option value="All">All Categories</option>
              <option value="Materials">Materials</option>
              <option value="Labour">Labour</option>
            </select>
            <input
              type="date"
              onChange={(e) => setFilterDate(e.target.value)}
              value={filterDate}
            />
            <button
              onClick={() => {
                setFilterCategory("All");
                setFilterDate("");
              }}
              style={{ background: "grey", color: "white", border: "none" }}
            >
              Clear
            </button>
          </div>
        </div>

        {Object.keys(groupedExpenses)
        .sort((a, b) => {
            if (a === "unassigned") return 1; // Put unassigned last
            if (b === "unassigned") return -1;
            return a.localeCompare(b); // Alphabetical for others
        })
        .map((phase) => (
          <div key={phase} className="phase-section">
            <h4>{phase}</h4>
            <table className="exp-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Item</th>
                  <th>Description</th>
                  <th>Qty</th>
                  <th>Category</th>
                  <th>Unit Price</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {/* FIX: Use groupedExpenses[phase] instead of filtered */}
                {groupedExpenses[phase].map((e) => (
                  <tr key={e.id}>
                    <td>{e.date}</td>
                    <td>{e.item}</td>
                    <td>{e.description}</td>
                    <td>{e.quantity}</td>
                    <td>
                      <span className={`exp-badge ${e.category.toLowerCase()}`}>
                        {e.category}
                      </span>
                    </td>
                    <td> {(e.unitPrice || 0).toLocaleString()} ETB</td>
                    <td> {(e.amount || 0).toLocaleString()} ETB</td>
                  </tr>
                ))}
                {/* Optional: You can calculate a subtotal per phase here if you like */}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* RIGHT: Cost Split Card */}
      <div className="exp-summary-card">
        <h3>Cost Split</h3>
        <div className="summary-box mat">
          Materials: <br />
          <span className="money">
            {totalMaterials.toLocaleString()}
            {" "} ETB
          </span>{" "}
          <br />
          <span className="item">{materials.length} items</span>
        </div>
        <div className="summary-box lab">
          Labour: <br />
          <span className="money">{totalLabour.toLocaleString()} ETB</span> <br />
          <span className="item">{labour.length} items</span>
        </div>
        <div className="summary-box total">
          Total Spent: <br />
          <span className="money">{totalSpent.toLocaleString()} ETB</span>
        </div>
        <div className="summary-box remaining">
          Remaining: <br />
          <span className="money">
            {(0 - totalSpent).toLocaleString()} {" "} ETB
          </span>
        </div>
      </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="modal-overlay">
          <form className="modal-content" onSubmit={handleSubmit}>
            <h3>Add New Expense</h3>
            <input
              type="date"
              required
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Item Name"
              required
              onChange={(e) =>
                setFormData({ ...formData, item: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Description"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Quantity"
              required
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Unit Price"
              required
              onChange={(e) =>
                setFormData({ ...formData, unitPrice: e.target.value })
              }
            />
            <select
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option value="Materials">Materials</option>
              <option value="Labour">Labour</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="number"
              placeholder="Total Price"
              value={formData.amount}
              readOnly
            />
            <input
              type="text"
              placeholder="Project Phase (optional)"
              onChange={(e) =>
                setFormData({ ...formData, phase: e.target.value })
              }
            />
            <div className="modal-actions">
              <button type="submit" className="exp-submit-btn">
                Save Expense
              </button>
              <button
                type="button"
                className="exp-cancel-btn"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
