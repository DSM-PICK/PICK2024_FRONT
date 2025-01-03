import { useMutation, useQuery } from "@tanstack/react-query";
import { instance } from "..";
import apiError from "@/hook/apiError";

interface applicationDataProp {
  class_num: number;
  end: string;
  grade: number;
  id: string;
  num: number;
  reason: string;
  start: string;
  user_id: string;
  user_name: string;
}

interface accept {
  type: "application" | "early-return";
  status: "OK" | "NO";
  id_list: string[];
}

type RequestType = {
  type: "application" | "early-return";
};

interface FloorProp {
  floor?: number;
  type: RequestType;
}

interface ClassProp {
  grade: number;
  class: number;
  type: string;
}

export const useGetClass = (grade: number, class_num: number, type: string) => {
  const { handleError } = apiError();
  return useQuery({
    queryKey: ["useGetClass", grade, class_num, type],
    queryFn: async () => {
      try {
        const { data } = await instance.get<applicationDataProp[]>(
          `${type}/grade?grade=${grade}&class_num=${class_num}`
        );
        return data;
      } catch (error) {
        handleError(error);
      }
    },
  });
};

export const useOutAccept = () => {
  const { handleError } = apiError();
  return useMutation<void, Error, accept>({
    mutationFn: async (param) => {
      try {
        const response = await instance.patch(`${param.type}/status`, {
          status: param.status,
          id_list: param.id_list,
        });
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
  });
};
