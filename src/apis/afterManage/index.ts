import { instance } from "..";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Type, AfterStudent, Students, ChangeStatus, ClubList } from "../type";
import apiError from "@/hook/apiError";

export const After = (param: Type) => {
  const { handleError } = apiError();
  return useQuery({
    queryKey: ["After", param],
    queryFn: async () => {
      try {
        await instance.post("after", {
          grade: param.grade,
          class_num: param.class_num,
          num: param.num,
          name: param.name,
        });
      } catch (error) {
        handleError(error);
      }
    },
  });
};

export const AfterStudentDelete = () => {
  const { handleError } = apiError();
  return useMutation<void, Error, { id: string }>({
    mutationFn: async ({ id }) => {
      try {
        await instance.delete(`/after/delete`, {
          data: {
            id,
          },
        });
      } catch (error) {
        handleError(error);
      }
    },
  });
};

export const GetAfterStudent = () => {
  const { handleError } = apiError();
  return useQuery<AfterStudent[]>({
    queryKey: ["GetAfterStudent"],
    queryFn: async () => {
      try {
        const response = await instance.get(`/after/all`);
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
  });
};

export const GetStudentData = () => {
  const { handleError } = apiError();
  return useQuery<Students[]>({
    queryKey: ["GetStudentData"],
    queryFn: async () => {
      try {
        const response = await instance.get(`/user/all`);
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
  });
};

export const PostStudent = () => {
  const { handleError } = apiError();
  return useMutation<void, Error, { student_num: string }[]>({
    mutationFn: async (param) => {
      try {
        await instance.post(`/after`, param);
      } catch (error) {
        handleError(error);
      }
    },
  });
};

export const AllStudent = () => {
  const { handleError } = apiError();
  return useQuery<Type[]>({
    queryKey: ["AllStudent"],
    queryFn: async () => {
      try {
        const response = await instance.get(`/after/search`);
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
  });
};

export const FixStatus = () => {
  const { handleError } = apiError();
  return useMutation<void, Error, ChangeStatus[]>({
    mutationFn: async (param) => {
      try {
        await instance.patch(`/after/change`, param);
      } catch (error) {
        handleError(error);
      }
    },
  });
};

export const GetClubList = (club: string) => {
  const { handleError } = apiError();
  return useQuery<ClubList[]>({
    queryKey: ["GetClubList", club],
    queryFn: async () => {
      try {
        const response = await instance.get(
          `/attendance/total-time/club?club=${club}`
        );
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
  });
};
