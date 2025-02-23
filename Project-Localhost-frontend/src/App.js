import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Writeup from "./pages/Writeup";
import WriteupZone from "./pages/WriteupZone";
import FullWriteup from "./pages/FullWriteup";
import OrganizationPage from "./pages/OrganizationPage"; // ✅ Import Organization Page

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("authToken");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* ✅ Protecting Routes */}
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/writeup" element={<ProtectedRoute><Writeup /></ProtectedRoute>} />
        <Route path="/writeupzone" element={<ProtectedRoute><WriteupZone /></ProtectedRoute>} />
        <Route path="/writeup/:id" element={<ProtectedRoute><FullWriteup /></ProtectedRoute>} />
        <Route path="/organization" element={<ProtectedRoute><OrganizationPage /></ProtectedRoute>} /> {/* ✅ Added Organization Page Route */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
