import { ILoginPayload } from "../redux/authentication/authenticationSlice";
import { baseUrl } from "./common";

const url = `${baseUrl}/auth`;

export async function signUpUser(
  payload: ILoginPayload
): Promise<{ status: number; data: string }> {
  const result = await fetch(`${url}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const response = await result.json();
  if (result.status === 200) {
    return { status: result.status, data: response.access_token };
  } else {
    return { status: result.status, data: response.message };
  }
}
