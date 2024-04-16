import { instance } from "..";
import { useQuery } from "@tanstack/react-query";
import { TypeProp, TodaySelfStudy } from "../type";
export const GetStudentNum = () => {
  return useQuery<TypeProp>({
    queryKey: ["GetStudentNum"],
    queryFn: async () => {
      const response = await instance.get(`/application/status`);
      return response.data;
    },
  });
};

export const Test = (date: string) => {
  return useQuery<TodaySelfStudy[]>({
    queryKey: ["TodaySelfStudy"],
    queryFn: async () => {
      const response = await instance.get(`/self-study/today?date=${date}`);
      return response.data;
    },
  });
};
