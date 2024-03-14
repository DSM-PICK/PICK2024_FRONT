import { getToken } from "@/utils/auth";
import { useMutation } from "react-query";
import { instance } from "..";

interface applicationDataProp {
  class_num: number;
  end_time: string;
  grade: number;
  id: string;
  num: number;
  reason: string;
  start_time: string;
  user_id: string;
  username: string;
}

interface ClassProp {
  grade: number;
  class: number;
  type: "application" | "early-return";
}

export const useGetClass = () => {
  const accessToken = getToken();
  return useMutation<applicationDataProp[], applicationDataProp[], ClassProp>({
    mutationFn: async (param: ClassProp) => {
      try {
        const response = await instance.get(
          `${param.type}/grade?grade=${param.grade}&class_num=${param.class}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};
