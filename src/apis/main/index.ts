import { instance } from "..";
import { useMutation } from "@tanstack/react-query";
import { getToken } from "@/utils/auth";

interface TypeProp {
  out: number;
  request: number;
  class_move: number;
}

export const GetStudentNum = () => {
  const accessToken = getToken();

  return useMutation<TypeProp, Error, null>({
    mutationFn: async () => {
      try {
        const response = await instance.get(`application/status`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  });
};
