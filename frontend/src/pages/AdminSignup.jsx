import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";

function AdminSignup() {
  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await API.post("/admin/register", formData);
      if (!response.data.success) {
        setError(response.data.message || "Signup failed.");
        return;
      }
      // Redirect to admin login on success
      navigate("/admin/login");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to signup.");
    }
  };

  return (
    <main className="auth-page">
      <nav className="auth-navbar">
        <Link to="/" className="landing-brand">Purrfect Match</Link>
        <div className="landing-nav-right">
          <Link to="/login" className="landing-login-link">Login</Link>
          <Link to="/signup" className="landing-signup-btn">Sign-up</Link>
        </div>
      </nav>

      <section className="auth-container">
        <div className="auth-image auth-image-tall">
          <img src="/signup-cat.png" alt="Orange tabby cat" />
        </div>
        <div className="auth-form-wrapper">
          <h2 className="auth-title">Admin Sign-up</h2>
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-field">
              <label>Full Name:</label>
              <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} required />
            </div>
            <div className="auth-field">
              <label>Username:</label>
              <input type="text" name="username" value={formData.username} onChange={handleChange} required />
            </div>
            <div className="auth-field">
              <label>Password:</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="auth-field">
              <label>Confirm Password:</label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
            </div>
            <button type="submit" className="auth-submit-btn">Sign Up Admin</button>
            {error ? <p className="error-text">{error}</p> : null}
            <p className="auth-switch">
              Already an admin? <Link to="/admin/login" className="auth-switch-link">Admin Log-in</Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

export default AdminSignup;
