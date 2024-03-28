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
  classNum: number;
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
  classNum: number;
  num: number;
}

export const AlloutList = () => {
  const accessToken = getToken();
  return useMutation<OutListData[], void, null>({
    mutationFn: async () => {
      try {
        const response = await instance.get("/application/reason/all", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        return response.data as any;
      } catch (error) {
        throw error;
      }
    },
  });
};

export const ReturnHome = () => {
  const accessToken = getToken();
  return useMutation<ReturnHomeData[], void, null>({
    mutationFn: async () => {
      try {
        const response = await instance.get("/early-return/reason/ok-all", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
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
        const accessToken = getToken();
        const response = await instance.get(`/story/query`, {
          params: {
            name: requestParam.name,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
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
  const accessToken = getToken();

  return useMutation<Error, void, UuidProp>({
    mutationFn: async (param: UuidProp) => {
      try {
        const response = await instance.patch(
          `/application/change/${param.id}`,
          {
            headers: `Bearer ${accessToken}`,
          }
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

export const OutListProp = () => {
  const accessToken = getToken();
  return useMutation<applicationOK[], Error, null>({
    mutationFn: async () => {
      try {
        const response = await instance.get(`application/non-return`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

export const ReturnHomeList = () => {
  const accessToken = getToken();
  return useMutation<earlyReturnHome[], Error, null>({
    mutationFn: async () => {
      try {
        const response = await instance.get(`early-return/ok`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
};

export const GetSelectDay = () => {
  const accessToken = getToken();

  return useMutation<data, Error, { date: string }>({
    mutationFn: async (param) => {
      try {
        const response = await instance.get(`self-study/${param.date}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
};
