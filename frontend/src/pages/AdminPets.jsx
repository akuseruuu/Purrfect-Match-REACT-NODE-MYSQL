import { useEffect, useState } from "react";
import API from "../api/api";
import PetForm from "./PetForm";

function AdminPets() {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [error, setError] = useState("");

  const fetchPets = async () => {
    try {
      const response = await API.get("/pets");
      setPets(response.data.data || []);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to fetch pets.");
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleOpenAdd = () => {
    setSelectedPet(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (pet) => {
    setSelectedPet(pet);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setSelectedPet(null);
    setIsFormOpen(false);
  };

  const handleSubmit = async (formData) => {
    setError("");
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      if (selectedPet) {
        await API.put(`/pets/${selectedPet.id}`, formData, config);
      } else {
        await API.post("/pets", formData, config);
      }
      handleCloseForm();
      fetchPets();
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to save pet.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this pet? This action cannot be undone.")) return;
    setError("");
    try {
      await API.delete(`/pets/${id}`);
      fetchPets();
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to delete pet.");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  const resolveImage = (img) => {
    if (!img) return null;
    if (img.startsWith("http")) return img;
    return `http://localhost:3000/${img}`;
  };

  return (
    <div>
      <div className="admin-header">
        <h1>Manage Pets</h1>
      </div>

      {/* Stats Row */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <div className="admin-stat-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                <circle cx="4.5" cy="9.5" r="2.5" />
                <circle cx="9" cy="5.5" r="2.5" />
                <circle cx="15" cy="5.5" r="2.5" />
                <circle cx="19.5" cy="9.5" r="2.5" />
                <path d="M17.34 14.86c-.87-1.02-1.6-1.89-2.48-2.91-.46-.54-1.05-1.08-1.75-1.32-.11-.04-.22-.07-.33-.09-.25-.04-.52-.04-.78-.04s-.53 0-.79.05c-.11.02-.22.05-.33.09-.7.24-1.28.78-1.75 1.32-.87 1.02-1.6 1.89-2.48 2.91-1.31 1.31-2.92 2.76-2.62 4.79.29 1.02 1.02 2.0 2.09 2.35C7.61 22.56 9.34 22 10.5 20.75c.42-.49.78-1.07 1.12-1.63.1-.15.19-.31.38-.31.19 0 .28.16.38.31.33.56.7 1.14 1.12 1.63 1.16 1.25 2.89 1.81 4.27 1.25 1.07-.35 1.8-1.33 2.08-2.35.31-2.03-1.3-3.48-2.61-4.79z" />
              </svg>
            </div>
          </div>
          <div>
            <div className="admin-stat-title">Total Pets</div>
            <div className="admin-stat-value">{pets.length}</div>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <div className="admin-stat-icon" style={{ backgroundColor: "#fbdfdd" }}>
              <svg viewBox="0 0 24 24" fill="#d95040" width="20" height="20">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          </div>
          <div>
            <div className="admin-stat-title">Pets Adopted</div>
            <div className="admin-stat-value">0</div>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <div className="admin-stat-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
              </svg>
            </div>
          </div>
          <div>
            <div className="admin-stat-title">Pending Adoptions</div>
            <div className="admin-stat-value">0</div>
          </div>
        </div>
      </div>

      {/* Pet Catalog Table */}
      <div className="pet-catalog">
        <h3 className="pet-catalog-title">PET CATALOG</h3>
        {error ? <p className="error-text">{error}</p> : null}

        <div className="pet-table-wrapper">
          <table className="pet-table">
            <thead>
              <tr>
                <th>PET DETAILS</th>
                <th>SPECIES &amp; BREED</th>
                <th>STATUS</th>
                <th>LAST UPDATED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {pets.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "30px" }}>
                    No pets found. Click "+ ADD NEW PET" to get started.
                  </td>
                </tr>
              ) : (
                pets.map((pet) => (
                  <tr key={pet.id}>
                    <td>
                      <div className="pet-detail-cell">
                        <div className="pet-table-avatar">
                          {pet.image ? (
                            <img src={resolveImage(pet.image)} alt={pet.name} />
                          ) : (
                            <div className="pet-avatar-placeholder">🐾</div>
                          )}
                        </div>
                        <div>
                          <div className="pet-detail-name">{pet.name.toUpperCase()}</div>
                          <div className="pet-detail-id">ID: D{String(pet.id).padStart(2, "0")}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="pet-detail-name">{(pet.species || "—").toUpperCase()}</div>
                      <div className="pet-detail-id">{pet.breed}</div>
                    </td>
                    <td>
                      <span className={`pet-status-badge ${(pet.status || "Available").toLowerCase()}`}>
                        <span className="pet-status-dot"></span>
                        {pet.status || "Available"}
                      </span>
                    </td>
                    <td>{formatDate(pet.created_at)}</td>
                    <td>
                      <div className="pet-actions-cell">
                        <button type="button" className="pet-action-btn delete" onClick={() => handleDelete(pet.id)} title="Delete">
                          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                          </svg>
                        </button>
                        <button type="button" className="pet-action-btn edit" onClick={() => handleOpenEdit(pet)} title="Edit">
                          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="pet-catalog-footer">
          Showing {pets.length} of {pets.length} Animals
        </div>
      </div>

      {/* Add New Pet Button - floating */}
      <button type="button" className="add-pet-fab" onClick={handleOpenAdd}>
        + ADD NEW PET
      </button>

      <PetForm
        selectedPet={selectedPet}
        onSubmit={handleSubmit}
        onCancel={handleCloseForm}
        isOpen={isFormOpen}
        onClose={handleCloseForm}
      />
    </div>
  );
}

export default AdminPets;
