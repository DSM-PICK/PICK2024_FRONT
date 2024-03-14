import { useMutation } from "@tanstack/react-query";
import { instance } from "..";
import { getToken } from "@/utils/auth";

interface accept {
  type: "application" | "early-return";
  status: "OK" | "NO";
  ids: string[];
}

export const useOutAccept = () => {
  const accessToken = getToken();
  return useMutation<void, Error, accept>({
    mutationFn: async (param) => {
      try {
        const response = await instance.patch(
          `${param.type}/status`,
          {
            status: param.status,
            ids: param.ids,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};
