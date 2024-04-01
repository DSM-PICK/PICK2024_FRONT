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
