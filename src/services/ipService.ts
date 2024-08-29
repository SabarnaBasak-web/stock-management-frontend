import {
  IIpDetails,
  IIpListQueryString,
  IIpRequestPayload,
} from "../redux/ip/ipSlice";
import { baseUrl, createBaseInitialization } from "./common";

const url = `${baseUrl}/ip`;
export async function addNewIp(
  payload: IIpRequestPayload
): Promise<IIpDetails> {
  const baseInitialization = createBaseInitialization("POST");
  const result = await fetch(url, {
    ...baseInitialization,
    body: JSON.stringify(payload),
  });
  const response = await result.json();

  return response;
}

export async function updateIpDetailsService(
  payload: IIpDetails
): Promise<IIpDetails> {
  const baseInitialization = createBaseInitialization("PUT");
  const { id } = payload;
  const result = await fetch(`${url}/${id}`, {
    ...baseInitialization,
    body: JSON.stringify(payload),
  });
  const response = await result.json();

  return response;
}

export async function getAllIps(
  payload: IIpListQueryString
): Promise<IIpDetails[]> {
  const baseInitialization = createBaseInitialization("GET");
  const { take, cursor } = payload;
  const result = await fetch(`${url}?take=${take}&cursor=${cursor}`, {
    ...baseInitialization,
  });
  const response = await result.json();

  return response;
}

export async function getUnusedIps() {
  const baseInitialization = createBaseInitialization("GET");
  const result = await fetch(`${url}/unusedIpList`, { ...baseInitialization });
  const response = await result.json();
  return response;
}
