import {
  IEmployeeDetails,
  IEmployeeListQueryString,
  IEmployeesResponse,
  ILoggedInUserDetails,
  IRegisterEmployeeRequestPayload,
  IUpdateEmployeeRequestPayload,
} from "../redux/employee/employeeSlice";
import { baseUrl, createBaseInitialization } from "./common";

const url = `${baseUrl}/employee`;
export async function loggedInUserDetails(): Promise<ILoggedInUserDetails | null> {
  const baseInitialization = createBaseInitialization("GET");
  const result = await fetch(`${url}/loggedUser`, {
    ...baseInitialization,
  });

  const response = await result.json();
  return response;
}

export async function registerNewEmployee(
  payload: IRegisterEmployeeRequestPayload
): Promise<IEmployeeDetails | null> {
  const baseInitialization = createBaseInitialization("POST");
  const result = await fetch(url, {
    ...baseInitialization,
    body: JSON.stringify(payload),
  });

  const response = await result.json();
  return response;
}

export async function updateExistingEmployee(
  payload: IUpdateEmployeeRequestPayload
): Promise<IEmployeeDetails | null> {
  const baseInitialization = createBaseInitialization("PUT");
  const result = await fetch(`${url}/${payload.id}`, {
    ...baseInitialization,
    body: JSON.stringify(payload),
  });

  const response = await result.json();
  return response;
}

export async function fetchAllEmployees(
  payload: IEmployeeListQueryString
): Promise<IEmployeesResponse> {
  const baseInitialization = createBaseInitialization("GET");
  const { take, cursor } = payload;
  const result = await fetch(`${url}?take=${take}&cursor=${cursor}`, {
    ...baseInitialization,
  });
  const response = await result.json();

  return response;
}

export async function getEmployeeDetailsById(
  empId: string
): Promise<IEmployeeDetails> {
  const baseInitialization = createBaseInitialization("GET");
  const result = await fetch(`${url}/empId/${empId}`, {
    ...baseInitialization,
  });
  const response = await result.json();
  return response;
}
