import { useMutation } from "react-query";
import { instance } from "..";
import { getToken } from "@/utils/auth";

interface postTeacherProp {
  floor: number;
  teacher: string;
  date: string;
}

export const postTeacher = () => {
  const accessToken = getToken();
  return useMutation<void, Error, postTeacherProp>({
    mutationFn: async (param) => {
      try {
        const response = await instance.post(`/self-study/register`, {
          param,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  });
};
