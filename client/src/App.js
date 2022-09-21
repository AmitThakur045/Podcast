import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Authenticate from "./pages/Authenticate/Authenticate";
import Activate from "./pages/Activate/Activate";
import Rooms from "./pages/Rooms/Rooms";
import { useSelector } from "react-redux";
import { useLoadingRefresh } from "./hooks/useLoadingWithRefresh";
import Loader from "./components/Loader/Loader";
import MainRoom from "./pages/MainRoom.js/MainRoom";

const GuestRoute = ({ children }) => {
  const { isAuth } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth) {
      navigate("/rooms");
    }
  }, [isAuth, navigate]);

  return <>{isAuth ? navigate("/rooms") : children}</>;
};

const SemiProtectedRoutes = ({ children }) => {
  const { user, isAuth } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }

    if (isAuth && user.activated) {
      navigate("/rooms");
    }
  }, [isAuth, user, navigate]);

  return <>{isAuth && !user.activated && children}</>;
};

const ProtectedRoute = ({ children }) => {
  const { user, isAuth } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }

    if (isAuth && !user.activated) {
      navigate("/activate");
    }
  }, [isAuth, user, navigate]);

  return <>{isAuth && user.activated && children}</>;
};

function App() {
  const { loading } = useLoadingRefresh();
  // const loading = true;
  return (
    <>
      {loading ? (
        <Loader message="Loading, please wait..." />
      ) : (
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

            <Route
              path="/rooms/:id"
              exact
              element={
                <ProtectedRoute>
                  <MainRoom />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
