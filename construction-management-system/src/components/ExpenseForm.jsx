export default function ExpenseForm() {
  return (
    <form className="expense-form">
      <h3>Add New Expense / Update</h3>
      <input type="text" placeholder="Material Name (e.g., Cement)" />
      <input type="number" placeholder="Cost" />
      <select>
        <option>Foundation</option>
        <option>Walls</option>
        <option>Roofing</option>
      </select>
      <input type="file" accept="image/*" />
      <button type="submit">Save Update</button>
    </form>
  );
}