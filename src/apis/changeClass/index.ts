import { instance } from "..";
import { useMutation } from "@tanstack/react-query";
import { getToken } from "@/utils/auth";

interface changeClass {
  class_num: number;
  classroom_name: string;
  floor: number;
  grade: number;
  id: string;
  num: number;
  user_id: string;
  username: string;
}

export const GetFloor = () => {
  const accessToken = getToken();
  return useMutation<changeClass[], void, { floor: number }>({
    mutationFn: async (param) => {
      try {
        const response = await instance.get(
          `/class-room/floor?floor=${param.floor}`,
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

export const ChangeClassList = () => {
  const accessToken = getToken();

  return useMutation<changeClass[], Error, { grade: number; class: number }>({
    mutationFn: async (param) => {
      try {
        const response = await instance.get(
          `/class-room/grade?grade=${param.grade}&classNum=${param.class}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
};
