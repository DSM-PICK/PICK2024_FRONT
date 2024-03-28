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

export const DayTeacher = () => {
  return useMutation<todaySelfStudy[], Error, { date: string }>({
    mutationFn: async (param) => {
      try {
        const accessToken = getToken();
        const response = await instance.get(
          `/self-study/today?date=${param.date}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        return response?.data.sort((i: any, j: any) => i.floor - j.floor);
      } catch (error) {
        throw error;
      }
    },
  });
};

export const SelfStudyCheck = () => {
  const accessToken = getToken();
  return useMutation<string, Error, null>({
    mutationFn: async () => {
      try {
        const response = await instance.get(`/self-study/admin`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
};
