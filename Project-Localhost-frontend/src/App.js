import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Writeup from "./pages/Writeup";
import WriteupZone from "./pages/WriteupZone";
import FullWriteup from "./pages/FullWriteup";
import OrganizationPage from "./pages/OrganizationPage";
import LandingPage from './pages/LandingPage';
import CTFEvents from './pages/CTFEvents';
import Leaderboard from './pages/Leaderboard';
import SuggestedUsers from './pages/SuggestedUsers';
import CreateOrg from './pages/CreateOrg';
import CTFTeamsPage from './pages/CTFTeamsPage';
import SearchResults from "./pages/SearchResults";

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
        <Route path = "/" element = {<LandingPage />} /> {/*Default route */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* ✅ Protecting Routes */}
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/writeup" element={<ProtectedRoute><Writeup /></ProtectedRoute>} />
        <Route path="/writeupzone" element={<ProtectedRoute><WriteupZone /></ProtectedRoute>} />
        <Route path="/writeup/:id" element={<ProtectedRoute><FullWriteup /></ProtectedRoute>} />
        <Route path="/organization" element={<ProtectedRoute><OrganizationPage /></ProtectedRoute>} />
        <Route path = "/LandingPage" element = {<ProtectedRoute><LandingPage/></ProtectedRoute>} />
        <Route path = "/CTFEvents" element = {<ProtectedRoute><CTFEvents/></ProtectedRoute>} />
        <Route path = "/Leaderboard" element = {<ProtectedRoute><Leaderboard/></ProtectedRoute>} />
        <Route path = "/SuggestedUsers" element = {<ProtectedRoute><SuggestedUsers/></ProtectedRoute>} />
        <Route path = "/CreateOrg" element = {<ProtectedRoute><CreateOrg/></ProtectedRoute>} />
        <Route path="/OrganizationPage" element={<ProtectedRoute><OrganizationPage /></ProtectedRoute>} />
        <Route path="/CTFTeams" element={<ProtectedRoute><CTFTeamsPage/></ProtectedRoute>} />
        <Route path="/teams" element={<ProtectedRoute><CTFTeamsPage/></ProtectedRoute>} />
        <Route path="/profile/:userId" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/search-results" element={<ProtectedRoute><SearchResults /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
