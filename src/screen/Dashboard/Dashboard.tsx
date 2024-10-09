// react
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
// components
import { Box, Grid } from "@mui/material";
import NavbarComponent from "../../components/NavbarComponent";
import DrawerComponent from "../../components/Drawer";
import HomeScreen from "./DashboardScreens/Home";
import CpuScreen from "./DashboardScreens/Cpu";
import EmployeeScreen from "./DashboardScreens/Employee";
import ReportScreen from "./DashboardScreens/Report";
import AssignProduct from "./DashboardScreens/AssignProduct";
import UpsScreen from "./DashboardScreens/UpsScreen";
import VendorScreen from "./DashboardScreens/VendorScreen";
// stores constants and helpers
import { getLoggedInUserDetails } from "../../redux/employee/employeeSlice";
import { decodeToken, isTokenExpired } from "../../helper/helper";
import { RootState } from "../../redux/store";

function DashboardScreen() {
  const routeComponent: Record<
    string,
    { title: string; component: JSX.Element }
  > = {
    "/dashboard": {
      title: "Dashboard",
      component: <HomeScreen />,
    },
    "/cpu": {
      title: "Cpu",
      component: <CpuScreen />,
    },
    "/user": {
      title: "Employee",
      component: <EmployeeScreen />,
    },
    "/product": {
      title: "Product",
      component: <AssignProduct />,
    },
    "/report": {
      title: "Report",
      component: <ReportScreen />,
    },
    "/ups": {
      title: "Ups",
      component: <UpsScreen />,
    },
    "/vendor": {
      title: "Vendors",
      component: <VendorScreen />,
    },
  };

  const dispatch = useDispatch();
  const { employeeDetails } = useSelector((state: RootState) => state.employee);
  const navigate = useNavigate();

  const [selectedRoute, setSelectedRoute] = useState("");
  const token = localStorage.getItem("access_token") ?? "";

  const { username } = employeeDetails;

  const { routes } = decodeToken(token);

  const onLogoutHandler = useCallback(() => {
    localStorage.removeItem("access_token");
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    if (isTokenExpired(token ?? "") || !token) {
      onLogoutHandler();
    } else {
      dispatch(getLoggedInUserDetails());
    }
  }, [navigate, onLogoutHandler, dispatch, token]);

  const onListItemClick = useCallback(
    (route: string) => {
      if (!localStorage.getItem("access_token") || isTokenExpired(token)) {
        onLogoutHandler();
        return;
      }
      setSelectedRoute(route);
    },
    [onLogoutHandler, token]
  );

  return (
    <>
      <Grid container>
        <Grid md={2} item>
          <DrawerComponent routes={routes} onListItemClick={onListItemClick} />
        </Grid>
        <Grid md={10} item>
          <NavbarComponent
            onLogoutHandler={onLogoutHandler}
            username={username}
            title={
              selectedRoute
                ? routeComponent[selectedRoute].title
                : routeComponent[routes[0]].title
            }
          />
          <Box sx={{ p: "0.8rem", mt: "64px" }}>
            {selectedRoute
              ? routeComponent[selectedRoute].component
              : routeComponent[routes[0]].component}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default DashboardScreen;
