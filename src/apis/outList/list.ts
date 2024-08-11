import apiError from "@/hook/apiError";
import { instance } from "..";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";

interface UuidProp {
  id: string[];
}
interface applicationOK {
  id: string;
  username: string;
  start_time: string;
  end_time: string;
  grade: number;
  class_num: number;
  num: number;
  reason: string;
}

interface OutListData {
  id: string;
  user_id: string;
  username: string;
  start_time: string;
  end_time: string;
  grade: number;
  class_num: number;
  num: number;
  reason: string;
}

interface data {
  floor: number;
  teacher: string;
  date: string;
}

interface previousStudent {
  reason: string;
  start_time: string;
  end_time: string;
  username: string;
  date: string;
  type: "APPLICATION" | "EARLY_RETURN";
}

interface ReturnHomeData {
  id: string;
  user_id: string;
  username: string;
  start_time: string;
  grade: number;
  class_num: number;
  num: number;
  reason: string;
}

interface earlyReturnHome {
  id: string;
  username: string;
  start_time: string;
  grade: number;
  class_num: number;
  num: number;
}

export const AlloutList = () => {
  const { handleError } = apiError();
  return useQuery<OutListData[]>({
    queryKey: ["AlloutList"],
    queryFn: async () => {
      try {
        const response = await instance.get(`/application/reason/all`);
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
  });
};

export const ReturnHome = () => {
  const { handleError } = apiError();
  return useQuery<ReturnHomeData[]>({
    queryKey: ["ReturnHome"],
    queryFn: async () => {
      try {
        const response = await instance.get(`/early-return/reason/ok-all`);
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
  });
};

export const GetPreviousList = () => {
  const { handleError } = apiError();
  return useMutation<previousStudent[], Error, { name: string }>({
    mutationFn: async (requestParam: { name: string }) => {
      try {
        const response = await instance.get(`/story/query`, {
          params: {
            name: requestParam.name,
          },
        });
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
  });
};

export const ReturnSchool = () => {
  const { handleError } = apiError();
  return useMutation<void, void, string[]>({
    mutationFn: async (...param) => {
      try {
        await instance.patch(`/application/return`, ...param, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        handleError(error);
      }
    },
  });
};

export const FloorOutList = () => {
  const { handleError } = apiError();
  return useMutation<
    applicationOK[],
    Error,
    { floor: number; status: "QUIET" | "NO" | "OK" }
  >({
    mutationFn: async (param) => {
      try {
        const { data } = await instance.get(
          `application/floor?floor=${param.floor}&status=${param.status}`
        );
        return data;
      } catch (error) {
        handleError(error);
      }
    },
  });
};

export const ReturnHomeList = () => {
  const { handleError } = apiError();
  return useQuery<earlyReturnHome[]>({
    queryKey: ["earlyreturnHome"],
    queryFn: async () => {
      try {
        const response = await instance.get(`early-return/ok`);
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
  });
};
