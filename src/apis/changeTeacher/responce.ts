import { apiError } from "@/hook/apiError";
import { useMutation } from "react-query";
import { instance } from "..";
import { getToken } from "@/utils/auth";

interface data {
  floor: number;
  teacher: string;
  date: string;
}

export const selfstudyGet = () => {
  const { handleError } = apiError();

  return useMutation<data[], Error, { month: string; year: string }>({
    mutationFn: async (param) => {
      try {
        const accessToken = getToken();
        const response = await instance.get(
          `/self-study/month?month=${param.month}&year=${param.year}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        handleError(error);
        throw error;
      }
    },
  });
};
