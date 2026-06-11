// In StatCard.jsx
export default function StatCard({ title, amount, highlight }) {
  return (
    <div className={`card ${highlight ? 'highlight' : ''}`}>
      <h3 className="card-title">{title}</h3>
      <p className="card-amount">{amount} ETB</p>
    </div>
  );
}