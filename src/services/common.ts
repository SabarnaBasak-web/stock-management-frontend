export const baseUrl = `http://localhost:3000`;

export function createBaseInitialization(method: string) {
  const accessToken = localStorage.getItem("access_token");

  return {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${accessToken}`,
    },
  };
}
