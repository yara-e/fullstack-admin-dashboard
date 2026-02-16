import React from "react";
import ReactDOM from "react-dom/client";

import { AppProviders } from "./app/providers";
import AppRouter from "./routes";

import "./index.css";
import { Toaster } from "sonner";
import { decodeToken, getToken, isTokenExpired } from "./utils/token";
import { store } from "./app/store";
import { logout, setAuth } from "./features/auth/authSlice";
const token = getToken();

if (token) {
  if (!isTokenExpired(token)) {
    const decoded = decodeToken(token);

    store.dispatch(
      setAuth({
        user: {
          id: decoded.id,
          role: decoded.role,
        },
        token,
      })
    );
  } else {
    store.dispatch(logout());
  }
}
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProviders>
      <AppRouter />
      <Toaster richColors/>
    </AppProviders>
  </React.StrictMode>
);
