import {
  IMonitorRequestPayload,
  IMonitorResponse,
} from "../redux/monitor/monitorSlice";
import { IUpsListQueryString } from "../redux/ups/upsSlice";
import { baseUrl, createBaseInitialization } from "./common";

const url = `${baseUrl}/monitor`;

export async function registerMonitorService(
  payload: IMonitorRequestPayload
): Promise<IMonitorResponse> {
  const baseInitialization = createBaseInitialization("POST");
  const result = await fetch(url, {
    ...baseInitialization,
    body: JSON.stringify(payload),
  });
  const response = await result.json();

  return response;
}

export async function getAllRegisteredMonitors(
  payload?: IUpsListQueryString
): Promise<{ data: IMonitorResponse[]; total: number }> {
  let result;

  const baseInitialization = createBaseInitialization("GET");
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
