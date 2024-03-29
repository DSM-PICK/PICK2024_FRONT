import { instance } from "..";
import { useMutation } from "@tanstack/react-query";
import { getToken } from "@/utils/auth";

interface postTeacherProp {
  date: string;
  teacher: { floor: number; teacher: string };
}

interface data {
  floor: number;
  teacher: string;
  date: string;
}

export const PostTeacher = () => {
  const accessToken = getToken();
  return useMutation<void, Error, postTeacherProp>({
    mutationFn: async (param) => {
      try {
        const response = await instance.post(`/self-study/register`, param, {
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

export const SelfstudyGet = () => {
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
        throw error;
      }
    },
  });
};
