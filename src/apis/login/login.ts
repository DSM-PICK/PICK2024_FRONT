import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { instance } from "..";
import { useRouter } from "next/navigation";
import { getToken } from "@/utils/auth";

interface Login {
  admin_id: string;
  password: string;
}

interface Token {
  access_token: string;
  refresh_token: string;
}

export const useLogin = () => {
  const router = useRouter();

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const loginMutation = useMutation<Token, Error, Login>({
    mutationFn: (param: Login) => {
      return instance
        .post<Token>("/admin/login", {
          ...param,
        })
        .then((response) => {
          const data = response.data;
          setAccessToken(data.access_token);
          setRefreshToken(data.refresh_token);
          return data;
        })
        .catch((error) => {
          throw error;
        });
    },
  });

  if (loginMutation.isError) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("part");
    console.error(loginMutation.error);
  }

  return {
    mutate: loginMutation.mutate,
    accessToken,
    refreshToken,
  };
};

export const GetTeacherName = () => {
  return useMutation<{ name: string }, Error, null>({
    mutationFn: async () => {
      try {
        const accessToken = getToken();
        const response = await instance.get(`/admin/my-name`, {});
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
};
