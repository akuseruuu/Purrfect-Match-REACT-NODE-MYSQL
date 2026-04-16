import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
    role: "adopter",
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
      const response = await API.post("/register", formData);
      if (!response.data.success) {
        setError(response.data.message || "Signup failed.");
        return;
      }
      navigate("/login");
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
          <h2 className="auth-title">Sign-up</h2>
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-field">
              <label>Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="auth-field">
              <label>Phone:</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="auth-field">
              <label>Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="auth-field">
              <label>Address:</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} />
            </div>
            <div className="auth-field">
              <label>Password:</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="auth-field">
              <label>Confirm Password:</label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
            </div>
            <div className="auth-field">
              <select name="role" value={formData.role} onChange={handleChange}>
                <option value="" disabled>Select</option>
                <option value="adopter">Adopter</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="auth-submit-btn">Sign Up</button>
            {error ? <p className="error-text">{error}</p> : null}
            <p className="auth-switch">
              Already have an account? <Link to="/login" className="auth-switch-link">Log-in</Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Signup;
