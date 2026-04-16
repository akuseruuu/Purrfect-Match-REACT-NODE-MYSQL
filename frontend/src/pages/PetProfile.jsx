import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import API from "../api/api";

function PetProfileNavbar() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <nav className="landing-navbar">
      <Link to="/" className="landing-brand">Purrfect Match</Link>
      <div className="landing-nav-center">
        <Link to="/" className="landing-nav-item">Home</Link>
        <Link to="/pets" className="landing-nav-item">Find a Pet</Link>
        <Link to="/" className="landing-nav-item">Donate</Link>
        <Link to="/" className="landing-nav-item">About Us</Link>
      </div>
      <div className="landing-nav-right">
        {user ? (
          <>
            {user.role === "admin" && <Link to="/admin" className="landing-nav-item">Admin</Link>}
            <button
              type="button"
              className="landing-signup-btn"
              onClick={() => { localStorage.removeItem("user"); window.location.reload(); }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="landing-login-link">Login</Link>
            <Link to="/signup" className="landing-signup-btn">Sign-up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

function PetProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await API.get("/pets");
        const all = response.data.data || [];
        const found = all.find((p) => String(p.id) === String(id));
        setPet(found || null);
      } catch {
        /* silently fail */
      } finally {
        setLoading(false);
      }
    };
    fetchPet();
  }, [id]);

  const resolveImage = (img) => {
    if (!img) return null;
    if (img.startsWith("http")) return img;
    return `http://localhost:3000/${img}`;
  };

  const formatAge = (age) => {
    if (!age && age !== 0) return "";
    const num = parseInt(age, 10);
    if (num >= 12) {
      const years = Math.floor(num / 12);
      return `${years} Year${years > 1 ? "s" : ""} Old`;
    }
    return `${num} Month${num !== 1 ? "s" : ""} Old`;
  };

  if (loading) {
    return (
      <main className="landing-page">
        <PetProfileNavbar />
        <div className="pet-profile-loading">
          <div className="findpets-spinner" />
          <p>Loading...</p>
        </div>
      </main>
    );
  }

  if (!pet) {
    return (
      <main className="landing-page">
        <PetProfileNavbar />
        <div className="pet-profile-loading">
          <h2>Pet not found</h2>
          <p>The pet you're looking for doesn't exist or has been adopted.</p>
          <Link to="/pets" className="landing-cta-btn" style={{ marginTop: "16px" }}>
            Browse All Pets
          </Link>
        </div>
      </main>
    );
  }

  const imageUrl = resolveImage(pet.image);
  const tags = pet.tags
    ? pet.tags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  return (
    <main className="landing-page">
      <PetProfileNavbar />

      <section className="pet-profile-section">
        <button type="button" className="pet-profile-back" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="pet-profile-card">
          <div className="pet-profile-image-wrapper">
            {imageUrl ? (
              <img src={imageUrl} alt={pet.name} className="pet-profile-image" />
            ) : (
              <div className="featured-pet-img-placeholder" style={{ height: "100%", minHeight: 360 }}>🐾</div>
            )}
          </div>

          <div className="pet-profile-details">
            <div className="pet-profile-name-row">
              <h1 className="pet-profile-name">{pet.name}</h1>
              <span className="pet-profile-status">{pet.status || "Available"}</span>
            </div>

            <div className="pet-profile-meta">
              {pet.species && (
                <div className="pet-profile-meta-item">
                  <span className="pet-profile-meta-label">Species</span>
                  <span className="pet-profile-meta-value">{pet.species}</span>
                </div>
              )}
              <div className="pet-profile-meta-item">
                <span className="pet-profile-meta-label">Breed</span>
                <span className="pet-profile-meta-value">{pet.breed}</span>
              </div>
              <div className="pet-profile-meta-item">
                <span className="pet-profile-meta-label">Age</span>
                <span className="pet-profile-meta-value">{formatAge(pet.age)}</span>
              </div>
            </div>

            {tags.length > 0 && (
              <div className="pet-profile-tags">
                {tags.map((tag) => (
                  <span key={tag} className="featured-pet-tag">{tag}</span>
                ))}
              </div>
            )}

            <div className="pet-profile-about">
              <h3>About {pet.name}</h3>
              <p>{pet.description || "No description available."}</p>
            </div>

            <Link to="/pets" className="landing-cta-btn">
              Adopt {pet.name} 🐾
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <h3 className="landing-footer-brand">Purrfect Match</h3>
          <div className="landing-footer-links">
            <Link to="/">Privacy Policy</Link>
            <Link to="/">Terms of Services</Link>
            <Link to="/">Contact Us</Link>
          </div>
          <p className="landing-footer-copy">
            © {new Date().getFullYear()} Purrfect Match. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

export default PetProfile;
