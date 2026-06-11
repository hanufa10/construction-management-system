import React, { useState } from "react";

export default function ProjectPhotos({ project }) {
  const [photos, setPhotos] = useState([]);
  const [newPhoto, setNewPhoto] = useState({ name: "", desc: "", date: "", file: null });
  const [selectedPhoto, setSelectedPhoto] = useState(null); 

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPhoto({ ...newPhoto, file: URL.createObjectURL(file) });
    }
  };

  const savePhoto = () => {
    if (newPhoto.file && newPhoto.name) {
      setPhotos([...photos, { ...newPhoto, id: Date.now() }]);
      setNewPhoto({ name: "", desc: "", date: "", file: null });
    }
  };

  return (
    <div className="photos-page-container">
      <h3>Project Progress Photos: {project?.name}</h3>
      
      {/* Upload Form */}
      <div className="photo-input-form">
        <input type="file" onChange={handleFileUpload} accept="image/*" />
        <input placeholder="Name" type="text" value={newPhoto.name} onChange={(e) => setNewPhoto({...newPhoto, name: e.target.value})} />
        <input placeholder="Description" type="text" value={newPhoto.desc} onChange={(e) => setNewPhoto({...newPhoto, desc: e.target.value})} />
        <input type="date" value={newPhoto.date} onChange={(e) => setNewPhoto({...newPhoto, date: e.target.value})} />
        <button onClick={savePhoto} className="photo-btn-add">Add Photo</button>
      </div>

      {/* Uniform Photo Grid */}
      <div className="photo-grid">
        {photos.map((p) => (
          <div key={p.id} className="photo-card">
            <img src={p.file} alt={p.name} className="uniform-img" />
            <div className="photo-meta">
              <h4>{p.name}</h4>
              <small>{p.date}</small>
            </div>
              <p>{p.desc}</p>
            <button onClick={() => setSelectedPhoto(p)} className="photo-btn-view">View</button>
          </div>
        ))}
      </div>
      {selectedPhoto && (
        <div className="lightbox-overlay" onClick={() => setSelectedPhoto(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedPhoto.file} alt="Full view" />
            <button onClick={() => setSelectedPhoto(null)} className="photo-btn-close">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}