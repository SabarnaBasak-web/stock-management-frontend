// react
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { lazy, Suspense, useCallback, useEffect, useState } from "react";
// components
import { Box, CircularProgress, Grid } from "@mui/material";
import NavbarComponent from "../../components/NavbarComponent";
import DrawerComponent from "../../components/Drawer";

// stores constants and helpers
import { getLoggedInUserDetails } from "../../redux/employee/employeeSlice";
import { decodeToken, isTokenExpired } from "../../helper/helper";
import { RootState } from "../../redux/store";

const HomeScreen = lazy(() => import("./DashboardScreens/Home"));
const CpuScreen = lazy(() => import("./DashboardScreens/Cpu"));
const EmployeeScreen = lazy(() => import("./DashboardScreens/Employee"));
const ReportScreen = lazy(() => import("./DashboardScreens/Report"));
const AssignProduct = lazy(() => import("./DashboardScreens/AssignProduct"));
const UpsScreen = lazy(() => import("./DashboardScreens/UpsScreen"));
const VendorScreen = lazy(() => import("./DashboardScreens/VendorScreen"));

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
            <Suspense fallback={<CircularProgress />}>
              {selectedRoute
                ? routeComponent[selectedRoute].component
                : routeComponent[routes[0]].component}
            </Suspense>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default DashboardScreen;
