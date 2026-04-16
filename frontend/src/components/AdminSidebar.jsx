import { Link, useLocation, useNavigate } from "react-router-dom";

function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
          <circle cx="9.5" cy="9.5" r="1.5" />
          <circle cx="14.5" cy="9.5" r="1.5" />
          <path d="M12 17c-1.48 0-2.75-.81-3.45-2H15.45c-.7 1.19-1.97 2-3.45 2z" />
        </svg>
        <span>Purrfect Match<br/><small style={{fontWeight: "normal", fontSize: "12px"}}>Admin Dashboard</small></span>
      </div>

      <nav className="admin-nav">
        <Link to="/admin" className={`admin-nav-link ${isActive("/admin")}`}>
          <svg className="admin-nav-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
          </svg>
          Dashboard
        </Link>
        <Link to="/admin/pets" className={`admin-nav-link ${isActive("/admin/pets")}`}>
          <svg className="admin-nav-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10.87 14.28a1.5 1.5 0 011.06-.44c.4 0 .78.16 1.06.44l2.5 2.5a1.5 1.5 0 010 2.12l-2.5 2.5a1.5 1.5 0 01-2.12 0l-2.5-2.5a1.5 1.5 0 010-2.12l2.5-2.5zm7.38-2.61a3 3 0 010 4.24l-2.5 2.5a3 3 0 01-4.24 0l-2.5-2.5a3 3 0 010-4.24l2.5-2.5a3 3 0 014.24 0l2.5 2.5zm-5.26 1.06a1.5 1.5 0 00-2.12 0l-2.5 2.5a1.5 1.5 0 000 2.12l2.5 2.5a1.5 1.5 0 002.12 0l2.5-2.5a1.5 1.5 0 000-2.12l-2.5-2.5z"/>
          </svg>
          Manage Pet
        </Link>
        <Link to="/admin/requests" className={`admin-nav-link ${isActive("/admin/requests")}`}>
          <svg className="admin-nav-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
          </svg>
          Adoption Requests
        </Link>
        <Link to="/admin/donations" className={`admin-nav-link ${isActive("/admin/donations")}`}>
          <svg className="admin-nav-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          Donations
        </Link>
      </nav>

      <div className="admin-nav-bottom">
        <Link to="/admin/settings" className={`admin-nav-link ${isActive("/admin/settings")}`}>
          <svg className="admin-nav-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.06-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.73,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.06,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.43-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.49-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
          </svg>
          SETTINGS
        </Link>
        <div style={{cursor:'pointer'}} onClick={handleLogout} className="admin-nav-link">
          <svg className="admin-nav-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
          </svg>
          LOG-OUT
        </div>
      </div>
    </aside>
  );
}

export default AdminSidebar;
