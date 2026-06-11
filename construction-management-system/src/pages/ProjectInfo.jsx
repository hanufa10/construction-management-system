export default function ProjectInfo({ project }) {
  if (!project) return <p>Please select a project.</p>;

  return (
    <div className="project-info-container">
      <div className="info-card">
        <h3>Project Details</h3>
        <div className="info-grid">
          <p><strong>Name:</strong> {project.name}</p>
          <p><strong>Description:</strong> {project.description || "No description provided."}</p>
          <p><strong>Address:</strong> {project.address}</p>
        </div>
      </div>

      <div className="info-card">
        <h3>Contractor Information</h3>
        <div className="info-grid">
          <p><strong>Contractor Name:</strong> {project.contractorName}</p>
          <p><strong>License/Bond #:</strong> {project.licenseNumber}</p>
          <p><strong>Contact Person:</strong> {project.contactName}</p>
          <p><strong>Phone:</strong> {project.phone}</p>
          <p><strong>Website:</strong> <a href={project.website} target="_blank" rel="noreferrer">{project.website}</a></p>
          <p><strong>Address:</strong> {project.contractorAddress}</p>
        </div>
      </div>
    </div>
  );
}