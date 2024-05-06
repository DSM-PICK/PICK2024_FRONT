import { instance } from "..";
import { useQuery } from "@tanstack/react-query";
import { TypeProp, TodaySelfStudy } from "../type";
import { apiError } from "@/hook/apiError";

export const GetStudentNum = () => {
  const { handleError } = apiError();
  return useQuery<TypeProp>({
    queryKey: ["GetStudentNum"],
    queryFn: async () => {
      try {
        const response = await instance.get(`/application/status`);
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
  });
};

export const TodaySelfStudys = (date: string) => {
  const { handleError } = apiError();
  return useQuery<TodaySelfStudy[]>({
    queryKey: ["TodaySelfStudy"],
    queryFn: async () => {
      try {
        const response = await instance.get(`/self-study/today?date=${date}`);
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
  });
};
