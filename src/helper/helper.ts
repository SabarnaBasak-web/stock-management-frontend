import { jwtDecode } from "jwt-decode";

interface IJwtToken {
  sub: number;
  username: string;
  routes: string[];
  role: string;
  iat: number;
  exp: number;
}

export const decodeToken = (token: string) => {
  const decodedToken: IJwtToken = jwtDecode(token);
  return decodedToken;
};

export const isTokenExpired = (token: string) => {
  if (!token) return true;
  const currentTime = Date.now() / 1000;
  const { exp } = decodeToken(token);
  return exp ? exp < currentTime : true;
};

export const ValidateToken = () => {
  const accessToken = localStorage.getItem("access_token") ?? "";

  if (isTokenExpired(accessToken)) {
    localStorage.removeItem("access_token");
    return true;
  }
  return false;
};
