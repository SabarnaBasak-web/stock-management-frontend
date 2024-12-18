import {
  IUpdateUpsRequestPayload,
  IUpsDetails,
  IUpsListQueryString,
  IUpsRequestPayload,
  IUpsResponse,
} from "../redux/ups/upsSlice";
import { baseUrl, createBaseInitialization } from "./common";

const url = `${baseUrl}/ups`;

export async function addNewUps(
  payload: IUpsRequestPayload
): Promise<IUpsDetails> {
  const baseInitialization = createBaseInitialization("POST");
  const result = await fetch(url, {
    ...baseInitialization,
    body: JSON.stringify(payload),
  });
  const response = await result.json();

  return response;
}

export async function getAllUps(
  payload: IUpsListQueryString
): Promise<{ data: IUpsResponse[]; total: number }> {
  const baseInitialization = createBaseInitialization("GET");
  const { take, cursor } = payload;
  const result = await fetch(`${url}?take=${take}&cursor=${cursor}`, {
    ...baseInitialization,
  });
  const response = await result.json();

  return response;
}

export async function updateUpsService(
  payload: IUpdateUpsRequestPayload
): Promise<IUpsResponse> {
  const baseInitialization = createBaseInitialization("PUT");
  const { id } = payload;
  try {
    const result = await fetch(`${url}/${id}`, {
      ...baseInitialization,
      body: JSON.stringify(payload),
    });
    const response = await result.json();

    return response;
  } catch (error) {
    throw new Error("Some error occurred while updating the ups details");
  }
}
