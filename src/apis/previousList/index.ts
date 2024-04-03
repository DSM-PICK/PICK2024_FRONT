import { instance } from "..";
import { useMutation } from "@tanstack/react-query";
import { getToken } from "@/utils/auth";

interface Type {
  username: string;
  application_story: {
    reason: string;
    start_time: string;
    end_time: string;
    date: string;
    type: "APPLICATION" | "EARLY_RETURN";
  }[];
}

interface GetCntType {
  id: string;
  name: string;
  grade: number;
  class_num: number;
  num: number;
  application_cnt: number;
  early_return_cnt: number;
}

interface id {
  id: string;
}

export const GetPreviousList = () => {
  return useMutation<Type, void, { id: string }>({
    mutationFn: async (param: id) => {
      try {
        const response = await instance.get(`story/query/${param.id}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

export const Outcnt = () => {
  return useMutation<GetCntType[], Error, { grade: number; class_num: number }>(
    {
      mutationFn: async (param) => {
        try {
          const response = await instance.get(
            `story/grade?grade=${param.grade}&class_num=${param.class_num}`
          );
          return response.data;
        } catch (error) {
          console.log(error);
        }
      },
    }
  );
};
