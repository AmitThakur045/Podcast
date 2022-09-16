import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Authenticate from "./pages/Authenticate/Authenticate";
import Activate from "./pages/Activate/Activate";
import Rooms from "./pages/Rooms/Rooms";

const isAuth = false;
const user = {
  activated: true,
};

const GuestRoute = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth) {
      navigate("/rooms");
    }
  }, [isAuth]);

  return <>{isAuth ? navigate("/rooms") : children}</>;
};

const SemiProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }

    if (isAuth && user.activated) {
      navigate("/rooms");
    }
  }, [isAuth]);

  return <>{isAuth && !user.activated && children}</>;
};

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }

    if (isAuth && !user.activated) {
      navigate("/activate");
    }
  }, [isAuth]);

  return <>{isAuth && user.activated && children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          exact
          element={
            <GuestRoute>
              <Home />
            </GuestRoute>
          }
        />

        <Route
          path="/authenticate"
          exact
          element={
            <GuestRoute>
              <Authenticate />
            </GuestRoute>
          }
        />

        <Route
          path="/activate"
          exact
          element={
            <SemiProtectedRoutes>
              <Activate />
            </SemiProtectedRoutes>
          }
        />

        <Route
          path="/rooms"
          exact
          element={
            <ProtectedRoute>
              <Rooms />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
