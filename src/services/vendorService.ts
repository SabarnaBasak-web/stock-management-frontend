import { ILoggedInUserDetails } from "../redux/employee/employeeSlice";
import { IIpListQueryString } from "../redux/ip/ipSlice";
import {
  IVendor,
  IVendorListQueryString,
  IVendorResponse,
} from "../redux/vendor/vendorSlice";
import { baseUrl, createBaseInitialization } from "./common";

const url = `${baseUrl}/vendor`;
export async function fetchVendorsList(): Promise<IVendor | null> {
  const baseInitialization = createBaseInitialization("GET");
  const result = await fetch(`${url}/loggedUser`, {
    ...baseInitialization,
  });

  const response = await result.json();
  return response;
}

export async function addNewVendorService(payload: IVendor): Promise<IVendor> {
  const baseInitialization = createBaseInitialization("POST");
  const result = await fetch(url, {
    ...baseInitialization,
    body: JSON.stringify(payload),
  });
  const response = await result.json();

  return response;
}

export async function getAllVendors(
  payload: IVendorListQueryString
): Promise<IVendorResponse[]> {
  const baseInitialization = createBaseInitialization("GET");
  const { take, cursor } = payload;
  const result = await fetch(`${url}?take=${take}&cursor=${cursor}`, {
    ...baseInitialization,
  });
  const response = await result.json();

  return response;
}
