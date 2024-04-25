import { instance } from "..";
import { useMutation } from "@tanstack/react-query";

interface Student {
  user_id: string;
  name: string;
  grade: number;
  class_num: number;
  num: number;
  status: string;
}

interface ChangeStatusData {
  user_id: string;
  status_type: string;
}

interface StudentData {
  teacher: string;
  students: Student[];
}

interface queryData {
  grade: number;
  class_num: number;
}

interface ChangeStatus {
  id: string;
  status: string;
}

export const GetStudentData = () => {
  return useMutation<StudentData, Error, queryData>({
    mutationFn: async (param: queryData) => {
      try {
        const response = await instance.get(
          `/status/grade?grade=${param.grade}&class_num=${param.class_num}`
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

export const ChangeStatus = () => {
  return useMutation<void, Error, ChangeStatusData[]>({
    mutationFn: async (params: ChangeStatusData[]) => {
      try {
        const response = await instance.patch("/status/change", params);
      } catch (error) {
        console.log(error);
      }
    },
  });
};
