import { instance } from "..";
import { useMutation } from "@tanstack/react-query";
import { getToken } from "@/utils/auth";

interface TypeProp {
  out: number;
  request: number;
  class_move: number;
}

interface todaySelfStudy {
  floor: number;
  teacher_name: string;
}

export const GetStudentNum = () => {
  return useMutation<TypeProp, Error, null>({
    mutationFn: async () => {
      try {
        const response = await instance.get(`application/status`, {});
        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  });
};

export const DayTeacher = () => {
  return useMutation<todaySelfStudy[], Error, { date: string }>({
    mutationFn: async (param) => {
      try {
        const response = await instance.get(
          `/self-study/today?date=${param.date}`,
          {}
        );
        return response?.data.sort((i: any, j: any) => i.floor - j.floor);
      } catch (error) {
        throw error;
      }
    },
  });
};

export const SelfStudyCheck = () => {
  return useMutation<string, Error, null>({
    mutationFn: async () => {
      try {
        const response = await instance.get(`/self-study/admin`, {});
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
};
