"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

interface clidrenProp {
  children: React.ReactNode;
}

export const Provider = ({ children }: clidrenProp) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
