import { instance } from "..";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Type, AfterStudent, Students, ChangeStatus, ClubList } from "../type";

export const After = (param: Type) => {
  return useQuery({
    queryKey: ["After"],
    queryFn: async () => {
      await instance.post("after", {
        grade: param.grade,
        class_num: param.class_num,
        num: param.num,
        name: param.name,
      });
    },
  });
};

export const AfterStudentDelete = () => {
  return useMutation<void, Error, { id: string }>({
    mutationFn: async ({ id }) => {
      try {
        await instance.delete(`/after/delete`, {
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
  return useQuery<AfterStudent[]>({
    queryKey: ["GetAfterStudent"],
    queryFn: async () => {
      const response = await instance.get(`/after/all`);
      return response.data;
    },
  });
};

export const GetStudentData = () => {
  return useQuery<Students[]>({
    queryKey: ["GetStudentData"],
    queryFn: async () => {
      const response = await instance.get(`/user/all`);
      return response.data;
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

export const AllStudent = () => {
  return useQuery<Type[]>({
    queryKey: ["AllStudent"],
    queryFn: async () => {
      const response = await instance.get(`/after/search`);
      return response.data;
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

export const GetClubList = (club: string) => {
  return useQuery<ClubList[]>({
    queryKey: ["GetClubList", club],
    queryFn: async () => {
      const response = await instance.get(`/attendance/club?club=${club}`);
      return response.data;
    },
  });
};
