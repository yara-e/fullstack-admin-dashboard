import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  id: number;
  role: string;
  exp: number;
}

const TOKEN_KEY = "access_token";

export const saveToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const decodeToken = (token: string): JwtPayload => {
  return jwtDecode<JwtPayload>(token);
};

export const isTokenExpired = (token: string) => {
  const decoded = decodeToken(token);
  return decoded.exp * 1000 < Date.now();
};
