import { instance } from "..";
import { useMutation } from "@tanstack/react-query";
import { getToken } from "@/utils/auth";

interface Student {
  user_id: string;
  name: string;
  grade: number;
  class_num: number;
  num: number;
  status: string;
}

interface ChangeStatusData {
  id: string;
  status: string;
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
  const accessToken = getToken();

  return useMutation<StudentData, Error, queryData>({
    mutationFn: async (param: queryData) => {
      try {
        const response = await instance.get(
          `/status/grade?grade=${param.grade}&class_num=${param.class_num}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        console.error("Error adding schedule:", error);
        throw error;
      }
    },
  });
};

export const ChangeStatus = () => {
  const accessToken = getToken();

  return useMutation<void, Error, ChangeStatusData[]>({
    mutationFn: async (params: ChangeStatusData[]) => {
      try {
        const response = await instance.patch("/status/change", params, {
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
