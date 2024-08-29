import * as IconsList from "@mui/icons-material";

export interface IRouteInfo {
  text: string;
  icon: keyof typeof IconsList;
}

export const routeMap: Record<string, IRouteInfo> = {
  "/dashboard": {
    text: "Dashboard",
    icon: "Dashboard",
  },
  "/cpu": {
    text: "Cpu",
    icon: "Storage",
  },
  "/product": {
    text: "Product",
    icon: "Inventory",
  },
  "/monitor": {
    text: "Monitor",
    icon: "Monitor",
  },
  "/ups": {
    text: "Ups",
    icon: "BatteryChargingFull",
  },
  "/vendor": {
    text: "Vendor",
    icon: "Shop",
  },
  "/amc": {
    text: "Amc",
    icon: "BuildCircle",
  },
  "/user": {
    text: "User",
    icon: "AccountCircle",
  },
  "/call_log_page": {
    text: "Call Log",
    icon: "PermPhoneMsg",
  },
  "/amc_call_log_page": {
    text: "Amc Call Log",
    icon: "Engineering",
  },
  "/report": {
    text: "Report",
    icon: "BarChart",
  },
};
