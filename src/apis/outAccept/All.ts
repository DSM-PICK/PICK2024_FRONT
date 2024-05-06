import { useMutation } from "@tanstack/react-query";
import { instance } from "..";
import apiError from "@/hook/apiError";

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
  const { handleError } = apiError();
  return useMutation<AllOutType[], Error, { status: "OK" | "QUIET" }>({
    mutationFn: async (param) => {
      try {
        const response = await instance.get(
          `application/all?status=${param.status}`
        );
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
  });
};

export const AllEalryList = () => {
  const { handleError } = apiError();
  return useMutation<AllOutType[], Error, { status: "OK" | "QUIET" }>({
    mutationFn: async (param) => {
      try {
        const response = await instance.get(
          `early-return/all?status=${param.status}`
        );
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
  });
};
