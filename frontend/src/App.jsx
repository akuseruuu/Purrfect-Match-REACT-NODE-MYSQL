import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPets from "./pages/AdminPets";
import FindPets from "./pages/FindPets";
import PetProfile from "./pages/PetProfile";

function ProtectedAdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/pets" element={<FindPets />} />
        <Route path="/pets/:id" element={<PetProfile />} />
        
        {/* Admin Routes wrapped in AdminLayout */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="pets" element={<AdminPets />} />
          <Route path="requests" element={<div className="admin-header"><h1>Adoption Requests</h1><p>Feature coming soon.</p></div>} />
          <Route path="donations" element={<div className="admin-header"><h1>Donations</h1><p>Feature coming soon.</p></div>} />
          <Route path="settings" element={<div className="admin-header"><h1>Settings</h1><p>Feature coming soon.</p></div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
