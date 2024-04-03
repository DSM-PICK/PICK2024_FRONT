import { useMutation } from "@tanstack/react-query";
import { instance } from "..";

interface AllOutType {
  id: string;
  user_id: string;
  reason: string;
  start_time: string;
  end_time: string;
  username: string;
  grade: number;
  class_num: number;
  num: number;
}

export const AllOutList = () => {
  return useMutation<AllOutType[], Error, { status: "OK" | "QUIET" }>({
    mutationFn: async (param) => {
      try {
        const response = await instance.get(
          `application/all?status=${param.status}`
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
};
