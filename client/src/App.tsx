import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile/Profile";
import LoginPage from "./pages/Admin/Login/Login";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route  path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
