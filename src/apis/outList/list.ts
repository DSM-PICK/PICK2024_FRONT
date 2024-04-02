import { instance } from "..";
import { useMutation } from "@tanstack/react-query";
import { getToken } from "@/utils/auth";

interface UuidProp {
  id: string;
}
interface applicationOK {
  id: string;
  username: string;
  start_time: string;
  end_time: string;
  grade: number;
  class_num: number;
  num: number;
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
  return useMutation<OutListData[], void, null>({
    mutationFn: async () => {
      try {
        const response = await instance.get("/application/reason/all");
        return response.data as any;
      } catch (error) {
        throw error;
      }
    },
  });
};

export const ReturnHome = () => {
  return useMutation<ReturnHomeData[], void, null>({
    mutationFn: async () => {
      try {
        const response = await instance.get("/early-return/reason/ok-all");
        return response.data as any;
      } catch (error) {
        throw error;
      }
    },
  });
};

export const GetPreviousList = () => {
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
        throw error;
      }
    },
  });
};

export const ReturnSchool = () => {
  return useMutation<Error, void, UuidProp>({
    mutationFn: async (param: UuidProp) => {
      try {
        const response = await instance.patch(
          `/application/change/${param.id}`
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

export const OutListProp = () => {
  return useMutation<applicationOK[], Error, null>({
    mutationFn: async () => {
      try {
        const response = await instance.get(`application/non-return`, {});
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

export const ReturnHomeList = () => {
  return useMutation<earlyReturnHome[], Error, null>({
    mutationFn: async () => {
      try {
        const response = await instance.get(`early-return/ok`, {});
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
};

export const GetSelectDay = () => {
  return useMutation<data, Error, { date: string }>({
    mutationFn: async (param) => {
      try {
        const response = await instance.get(`self-study/${param.date}`, {});
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
};
