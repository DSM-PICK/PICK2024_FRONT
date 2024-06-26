import apiError from "@/hook/apiError";
import { instance } from "..";
import { useMutation, useQuery } from "@tanstack/react-query";
import { data, postTeacherProp } from "../type";

export const PostTeacher = () => {
  const { handleError } = apiError();
  return useMutation<void, Error, postTeacherProp>({
    mutationFn: async (param) => {
      try {
        await instance.post(`/self-study/register`, param);
      } catch (error) {
        handleError(error);
      }
    },
  });
};

export const SelfstudyGet = () => {
  const { handleError } = apiError();
  return useMutation<data[], Error, { month: string; year: string }>({
    mutationFn: async (param) => {
      try {
        const response = await instance.get(
          `/self-study/month?month=${param.month}&year=${param.year}`
        );
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
  });
};

export const GetAllTeacher = () => {
  const { handleError } = apiError();
  return useQuery<string[]>({
    queryKey: ["GetAllTeacher"],
    queryFn: async () => {
      try {
        const response = await instance.get(`admin/all`);
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
  });
};

export const SelectTeacher = (date: string) => {
  const { handleError } = apiError();
  return useQuery<data[]>({
    queryKey: ["SelectTeacher", date],
    queryFn: async () => {
      try {
        const response = await instance.get(`self-study/date?date=${date}`);
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
  });
};
