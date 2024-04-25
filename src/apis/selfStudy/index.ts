import { useMutation } from "@tanstack/react-query";
import { instance } from "..";

interface ClassCheck {
  id: string;
  username: string;
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
  return useMutation<void, Error, Change[]>({
    mutationFn: async (param) => {
      try {
        await instance.patch(`/attendance/modify`, param);
      } catch (error) {
        console.log(error);
      }
    },
  });
};

export const ClassStudentCheck = () => {
  return useMutation<ClassCheck[], Error, { grade: number; class: number }>({
    mutationFn: async (param) => {
      try {
        const response = await instance.get(
          `/attendance/grade?grade=${param.grade}&class_num=${param.class}`
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
};
