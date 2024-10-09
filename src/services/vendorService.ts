import { ILoggedInUserDetails } from "../redux/employee/employeeSlice";
import { baseUrl, createBaseInitialization } from "./common";

const url = `${baseUrl}/vendor`;
export async function fetchVendorsList(): Promise<ILoggedInUserDetails | null> {
  const baseInitialization = createBaseInitialization("GET");
  const result = await fetch(`${url}/loggedUser`, {
    ...baseInitialization,
  });

  const response = await result.json();
  return response;
}
