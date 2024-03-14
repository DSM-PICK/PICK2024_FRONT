import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { instance } from "..";
import { getToken } from "@/utils/auth";

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

interface accept {
  type: "application" | "early-return";
  status: "OK" | "NO";
  ids: string[];
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

export const useGetFloor = () => {
  const accessToken = getToken();
  return useMutation<FloorProp, void, { type: string; floor: number }>({
    mutationFn: async (param) => {
      try {
        const response = await instance.get(
          `/${param.type}/floor?floor=${param.floor}`,
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

export const useOutAccept = () => {
  const accessToken = getToken();
  return useMutation<void, Error, accept>({
    mutationFn: async (param) => {
      try {
        const response = await instance.patch(
          `${param.type}/status`,
          {
            status: param.status,
            ids: param.ids,
          },
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
