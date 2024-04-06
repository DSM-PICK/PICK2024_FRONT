import { instance } from "..";
import { useMutation } from "@tanstack/react-query";

interface Type {
  grade: number;
  class_num: number;
  num: number;
  name: string;
}

interface ChangeStatus {
  id: string;
  status_list: string[];
}

interface AfterStudent {
  id: string;
  grade: number;
  class_num: number;
  num: number;
  name: string;
  status1: string;
  status2: string;
  status3: string;
}

interface Students {
  name: string;
  grade: number;
  class_num: number;
  num: number;
}

export const After = () => {
  return useMutation<null, Error, Type>({
    mutationFn: async (param: Type) => {
      try {
        const response = await instance.post("after", {
          grade: param.grade,
          class_num: param.class_num,
          num: param.num,
          name: param.name,
        });

        return response.data;
      } catch (error) {
        console.log(error);
        throw new Error("Failed to perform mutation");
      }
    },
  });
};

export const AfterStudentDelete = () => {
  return useMutation<void, Error, { id: string }>({
    mutationFn: async ({ id }) => {
      try {
        const response = await instance.delete(`/after/delete`, {
          data: {
            id,
          },
        });
      } catch (error) {
        console.log(error);
        throw new Error("Failed to delete student.");
      }
    },
  });
};

export const GetAfterStudent = () => {
  return useMutation<AfterStudent[], Error, null>({
    mutationFn: async () => {
      try {
        const response = await instance.get(`/after/all`, {});
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
};

export const GetStudentData = () => {
  return useMutation<Students[], Error, null>({
    mutationFn: async () => {
      try {
        const response = await instance.get(`/user/all`);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
};

export const PostStudent = () => {
  return useMutation<void, Error, { student_num: string }[]>({
    mutationFn: async (param) => {
      try {
        await instance.post(`/after`, param);
      } catch (error) {
        console.log(error);
      }
    },
  });
};

export const ALLStudent = () => {
  return useMutation<Type[], Error, null>({
    mutationFn: async () => {
      try {
        const result = await instance.get(`/after/search`);
        return result.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
};

export const FixStatus = () => {
  return useMutation<void, Error, ChangeStatus[]>({
    mutationFn: async (param) => {
      try {
        await instance.patch(`/after/change`, param);
      } catch (error) {
        console.log(error);
      }
    },
  });
};
