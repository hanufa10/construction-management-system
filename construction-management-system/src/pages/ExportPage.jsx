import React from "react";

export default function ExportPage({ project, expenses = [] }) {
  const projectExpenses = expenses.filter(e => e.projectId === project?.id);

  const downloadCSV = () => {
    // Add Project Name as the first line of the CSV
    const csvRows = [
      [`Report for Project: {project?.name} ETB`], // Title Row
      [], // Empty line
      ["Date", "Item", "Description", "Phase", "Category", "Quantity", "Unit Price", "Total Amount"],
      ...projectExpenses.map(e => [
        e.date, e.item, e.description, e.phase, e.category, e.quantity, e.unitPrice, e.amount
      ])
    ];

    const csvContent = csvRows.map(row => row.join(",")).join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${project.name}_Report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="export-page-container">
      <h3>Export Project Reports</h3>
      
      {/* 1. Preview Table */}
      <div className="export-preview">
        <h4>Preview: {project?.name}</h4>
        <table className="exp-table">
          <thead>
            <tr>
              <th>Date</th><th>Item</th><th>Phase</th><th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {projectExpenses.map((e) => (
              <tr key={e.id}>
                <td>{e.date}</td><td>{e.item}</td><td>{e.phase}</td><td>{e.amount} ETB</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 2. Download Action */}
      <div className="export-card">
        <button className="exp-submit-btn" onClick={downloadCSV}>
          Download Full CSV Report
        </button>
      </div>
    </div>
  );
}