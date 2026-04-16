import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";

function FindPetsNavbar() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <nav className="landing-navbar">
      <Link to="/" className="landing-brand">Purrfect Match</Link>
      <div className="landing-nav-center">
        <Link to="/" className="landing-nav-item">Home</Link>
        <Link to="/pets" className="landing-nav-item" style={{ color: "#b63d1a" }}>Find a Pet</Link>
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

function FindPets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await API.get("/pets");
        setPets(response.data.data || []);
      } catch {
        /* silently fail */
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, []);

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

  return (
    <main className="landing-page">
      <FindPetsNavbar />

      <section className="findpets-hero">
        <h1 className="findpets-hero-title">Find Your New Best Friend</h1>
        <p className="findpets-hero-subtitle">
          Browse our adorable pets waiting for a loving home. Every adoption saves a life.
        </p>
      </section>

      <section className="findpets-content">
        {loading ? (
          <div className="findpets-loading">
            <div className="findpets-spinner" />
            <p>Loading pets...</p>
          </div>
        ) : pets.length === 0 ? (
          <div className="findpets-empty">
            <p>🐾 No pets available right now. Check back soon!</p>
          </div>
        ) : (
          <div className="findpets-grid">
            {pets.map((pet) => {
              const imageUrl = resolveImage(pet.image);
              const tags = pet.tags
                ? pet.tags.split(",").map((t) => t.trim()).filter(Boolean)
                : [];

              return (
                <article key={pet.id} className="featured-pet-card" id={`pet-card-${pet.id}`}>
                  <div className="featured-pet-img-wrapper">
                    {imageUrl ? (
                      <img src={imageUrl} alt={pet.name} className="featured-pet-img" />
                    ) : (
                      <div className="featured-pet-img-placeholder">🐾</div>
                    )}
                  </div>
                  <div className="featured-pet-body">
                    <div className="featured-pet-top-row">
                      <h3 className="featured-pet-name">{pet.name}</h3>
                      <span className="featured-pet-age">{formatAge(pet.age)}</span>
                    </div>
                    {tags.length > 0 && (
                      <div className="featured-pet-tags">
                        {tags.map((tag) => (
                          <span key={tag} className="featured-pet-tag">{tag}</span>
                        ))}
                      </div>
                    )}
                    <p className="featured-pet-desc">{pet.description}</p>
                    <Link to={`/pets/${pet.id}`} className="featured-pet-learn-more">
                      Learn More
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
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

export default FindPets;
