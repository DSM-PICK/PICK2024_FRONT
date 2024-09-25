import { useMutation, useQuery } from "@tanstack/react-query";
import { instance } from "..";
import apiError from "@/hook/apiError";

interface ClassCheck {
  id: string;
  user_name: string;
  grade: number;
  class_num: number;
  num: number;
  status6: string;
  status7: string;
  status8: string;
  status9: string;
  status10: string;
}

interface Change {
  user_id: string;
  status_list: string[];
}

export const CheckStatus = () => {
  const { handleError } = apiError();
  return useMutation<void, Error, Change[]>({
    mutationFn: async (param) => {
      try {
        await instance.patch(`/attendance/total-time/modify`, param);
      } catch (error) {
        handleError(error);
      }
    },
  });
};

export const ClassStudentCheck = (grade: number, class_num: number) => {
  const { handleError } = apiError();
  return useQuery({
    queryKey: ["ClassStudentCheck", grade, class_num],
    queryFn: async () => {
      try {
        const { data } = await instance.get<ClassCheck[]>(
          `/attendance/total-time/grade?grade=${grade}&class_num=${class_num}`
        );
        return data;
      } catch (error) {
        handleError(error);
      }
    },
  });
};
