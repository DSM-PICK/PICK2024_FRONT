"use client";
import { cookie } from "@/utils/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

interface ProviderProps {
  children: React.ReactNode;
}

export const Provider: React.FC<ProviderProps> = ({ children }) => {
  const router = useRouter();

  const accessToken = cookie.get("access_token");

  useEffect(() => {
    if (!accessToken) {
      router.push("/login");
      alert("로그인 후 이용해 주세요");
    }
  }, []);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
