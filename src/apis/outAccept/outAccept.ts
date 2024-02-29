import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { instance } from "..";
import { apiError } from "@/hook/apiError";
import { getAuthHeader } from "../outList/list";
import { getToken } from "@/utils/auth";

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
  type: RequestType;
}

export const getFloor = () => {
  const { handleError } = apiError();
  return useMutation<Error, void, FloorProp>({
    mutationFn: async (param: FloorProp) => {
      try {
        const response = await instance.get(
          `/${param.type}/floor?floor=${param.floor}`,
          {
            headers: { ...getAuthHeader() },
          }
        );
        return response.data;
      } catch (error) {
        handleError(error);
        throw error;
      }
    },
  });
};

export const getClass = () => {
  const { handleError } = apiError();
  const accessToken = getToken();
  return useMutation<Error, void, ClassProp>({
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
        handleError(error);
        throw error;
      }
    },
  });
};

export const outAccept = () => {
  const { handleError } = apiError();
  const accessToken = getToken();
  return useMutation<void, Error, accept>(async (param: accept) => {
    try {
      const response = await instance.patch(
        `${param}/status/ok`,
        {
          status: "OK",
          ids: param.ids,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } catch (error) {
      handleError(error);
      throw error;
    }
  });
};
