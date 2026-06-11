export default function ProjectSelector({ projects, onSelect }) {
  return (
    <div className="project-selector">
      <label>Current Project:</label>
      <select onChange={(e) => onSelect(e.target.value)}>
        {projects.map(p => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>
    </div>
  );
}