import {
  IAssignProductData,
  IAssignProductQueryParams,
  IAssignProductToEmpPayload,
} from "../redux/assignProduct/assignProductSlice";
import { baseUrl, createBaseInitialization } from "./common";

const url = `${baseUrl}/assigned-products`;
export async function assignProductToEmpService(
  payload: IAssignProductToEmpPayload
): Promise<IAssignProductData> {
  const baseInitialization = createBaseInitialization("POST");
  const result = await fetch(url, {
    ...baseInitialization,
    body: JSON.stringify(payload),
  });
  const response = await result.json();
  return response;
}

export async function getAssignedProductToEmpService(payload: string) {
  const baseInitialization = createBaseInitialization("GET");
  const result = await fetch(`${url}?empId=${payload}`, {
    ...baseInitialization,
  });

  const response = await result.json();

  return response;
}

export async function getAssignedProductsListService(
  payload: IAssignProductQueryParams | undefined
) {
  const baseInitialization = createBaseInitialization("GET");
  let result;
  if (payload) {
    const { take, cursor } = payload;
    result = await fetch(`${url}?take=${take}&cursor=${cursor}`, {
      ...baseInitialization,
    });
  } else {
    result = await fetch(url, {
      ...baseInitialization,
    });
  }
  const response = await result.json();

  return response;
}
