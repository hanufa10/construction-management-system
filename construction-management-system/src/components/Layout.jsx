export default function Layout({ project, title, children }) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="dashboard-container">
      {/* Consistent Header for all pages */}
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">{project ? project.name : "Select a Project"}</h1>
          <p className="dashboard-date">{today} | {title}</p>
        </div>
      </div>

      {/* The actual page content goes here */}
      <div className="page-content">
        {children}
      </div>
    </div>
  );
}