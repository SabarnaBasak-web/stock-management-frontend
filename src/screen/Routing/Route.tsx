import { Route, Routes, useNavigate } from "react-router-dom";
import LoginScreen from "../Authentication/Login";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Dashboard from "../Dashboard/Dashboard";
import ErrorPage from "../Error/ErrorPage";
import { useEffect } from "react";

function RouteScreen() {
  const { accessToken } = useSelector(
    (state: RootState) => state.authentication
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/login");
    } else navigate("/dashboard");
  }, [accessToken, navigate]);

  return (
    <Routes>
      <Route
        path='/login'
        Component={LoginScreen}
        errorElement={<ErrorPage />}
      />
      <Route
        path='/dashboard'
        Component={Dashboard}
        errorElement={<ErrorPage />}
      />
    </Routes>
  );
}

export default RouteScreen;
