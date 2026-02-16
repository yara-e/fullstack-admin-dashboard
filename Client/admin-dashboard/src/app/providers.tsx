import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type  { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./store";

const queryClient = new QueryClient();

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </Provider>
  );
};
