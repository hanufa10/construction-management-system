// 1. Add this import at the very top
import { Link } from 'react-router-dom';

export default function Sidebar({ projects = [], selectedProject, onSelectProject }) {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h2>My Construction Hub</h2>
        <select 
          value={selectedProject || ''} 
          onChange={(e) => onSelectProject(e.target.value)}
          className="project-dropdown"
        >
          {projects && projects.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>
      
      <nav className="sidebar-nav">
        {/* Now this <Link> component will work */}
        <Link to="/" className="nav-link">Dashboard</Link>
        <Link to="/expenses" className="nav-link">Expenses & Materials</Link>
        <Link to="/finance" className="nav-link">Financial Status</Link>
        <Link to="/progress" className="nav-link">Project Photos</Link>
        <Link to="/reports" className="nav-link">Export Reports</Link>
        <Link to="/info" className="nav-link">Project Information</Link>
      </nav>
    </div>
  );
}