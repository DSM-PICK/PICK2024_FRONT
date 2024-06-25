import apiError from "@/hook/apiError";
import { instance } from "..";
import { useMutation } from "@tanstack/react-query";
import { FloorClass, changeClass } from "../type";

export const GetFloor = () => {
  const { handleError } = apiError();
  return useMutation<changeClass[], void, { floor: number }>({
    mutationFn: async (param) => {
      try {
        const response = await instance.get(
          `/class-room/floor?floor=${param.floor}&status=OK`
        );
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
  });
};

export const ChangeClassList = () => {
  const { handleError } = apiError();
  return useMutation<changeClass[], Error, { grade: number; class: number }>({
    mutationFn: async (param) => {
      try {
        const response = await instance.get(
          `/class-room/grade?grade=${param.grade}&class_num=${param.class}`
        );
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
  });
};

export const AcceptClassChange = () => {
  const { handleError } = apiError();
  return useMutation<FloorClass[], Error, { floor: number }>({
    mutationFn: async (param) => {
      try {
        const response = await instance.get(
          `/class-room/floor?floor=${param.floor}&status=QUIET`
        );
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
  });
};

export const AcceptClass = () => {
  const { handleError } = apiError();
  return useMutation<void, Error, { status: string; id: string[] }>({
    mutationFn: async (param) => {
      try {
        await instance.patch(`/class-room/status`, {
          status: param.status,
          ids: param.id,
        });
      } catch (error) {
        handleError(error);
      }
    },
  });
};
