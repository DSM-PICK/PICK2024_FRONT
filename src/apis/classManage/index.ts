import { instance } from "..";
import { useMutation } from "@tanstack/react-query";
import { getToken } from "@/utils/auth";

interface studentData {
  teacher: string;
  students: {
    userId: string;
    name: string;
    grade: number;
    classNum: number;
    num: number;
    status: string;
  };
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

  return useMutation<studentData[], Error, queryData>({
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

  return useMutation<void, Error, ChangeStatus>({
    mutationFn: async (param: ChangeStatus) => {
      try {
        const response = await instance.patch(
          "/status/change",
          {
            status: param.status,
            id: param.id,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    },
  });
};
