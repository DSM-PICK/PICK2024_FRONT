import { apiError } from "@/hook/apiError";
import { instance } from "..";
import { useMutation } from "@tanstack/react-query";
import { getToken } from "@/utils/auth";
import { v4 as uuidv4 } from "uuid";

interface Token {
  access_token: string;
}

interface UuidProp {
  id: string;
}

interface earlyreturnOK {
  id: string;
  username: string;
  start_time: string;
  grade: number;
  classNum: number;
  num: number;
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

interface previousStudent {
  reason: string;
  start_time: string;
  end_time: string;
  username: string;
  date: string;
  type: "APPLICATION" | "EARLY_RETURN";
}

interface ReasonAll {
  username: string;
  start_time: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
  end_time: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
  grade: number;
  class_num: number;
  num: number;
  reason: string;
}

interface todaySelfStudy {
  floor: number;
  teacher_name: string;
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

interface data {
  floor: number;
  teacher: string;
  date: string;
}

interface changeClass {
  class_num: number;
  classroom_name: string;
  floor: number;
  grade: number;
  id: string;
  num: number;
  user_id: string;
  username: string;
}

interface mealcheckProp {
  id: string;
  name: string;
  status: "OK" | "NO";
  grade: number;
  class_num: number;
  num: number;
}

interface notCheckMeal {
  id: string;
  name: string;
  status: "QUIET";
  grade: number;
  class_num: number;
  num: number;
}

interface earlyReturnHome {
  id: string;
  username: string;
  start_time: string;
  grade: number;
  classNum: number;
  num: number;
}

interface afterSchool {
  id: string;
  username: string;
  grade: number;
  classNum: number;
  num: number;
}

interface postTeacherProp {
  floor: number;
  teacher: string;
  date: string;
}

interface schedulesdata {
  date: string;
  event_name: string;
  id: string;
}

interface addSchedule {
  name: string;
  date: string;
}

export const getAuthHeader = () => {
  const accessToken = getToken;
  if (!accessToken) {
    throw new Error("Access token not found");
  }
  return { Authorization: `Bearer ${accessToken}` };
};

export const AlloutList = () => {
  const { handleError } = apiError();
  const accessToken = getToken();
  return useMutation<OutListData[], void, null>({
    mutationFn: async () => {
      try {
        const response = await instance.get("/application/reason/all", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        return response.data as any;
      } catch (error) {
        handleError(error);
        throw error;
      }
    },
  });
};

export const ReturnHome = () => {
  const { handleError } = apiError();
  const accessToken = getToken();
  return useMutation<ReturnHomeData[], void, null>({
    mutationFn: async () => {
      try {
        const response = await instance.get("/early-return/reason/all", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        return response.data as any;
      } catch (error) {
        handleError(error);
        throw error;
      }
    },
  });
};

export const previous = () => {
  const { handleError } = apiError();

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
        handleError(error);
        throw error;
      }
    },
  });
};

export const returnSchool = () => {
  const { handleError } = apiError();
  const accessToken = getToken();

  return useMutation<Error, void, UuidProp>({
    mutationFn: async (param: UuidProp) => {
      console.log(param.id);
      try {
        const response = await instance.patch(
          `/application/change/${param.id}`,
          {
            headers: `Bearer ${accessToken}`,
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

export const selfstudyGet = () => {
  const { handleError } = apiError();

  return useMutation<data[], Error, { month: string; year: string }>({
    mutationFn: async (param) => {
      try {
        const accessToken = getToken();
        const response = await instance.get(
          `/self-study/month?month=${param.month}&year=${param.year}`,
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

export const dayTeacher = () => {
  const { handleError } = apiError();

  return useMutation<todaySelfStudy[], Error, null>({
    mutationFn: async () => {
      try {
        const accessToken = getToken();
        const response = await instance.get(`/self-study/today`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        return response?.data.sort((i: any, j: any) => i.floor - j.floor);
      } catch (error) {
        handleError(error);
        throw error;
      }
    },
  });
};

export const outList = () => {
  const { handleError } = apiError();
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
        handleError(error);
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

export const ChangeClassList = () => {
  const { handleError } = apiError();
  const accessToken = getToken();

  return useMutation<changeClass[], Error, { grade: number; class: number }>({
    mutationFn: async (param) => {
      try {
        const response = await instance.get(
          `/class-room/grade?grade=${param.grade}&classNum=${param.class}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
};

export const getFloor = () => {
  const { handleError } = apiError();
  const accessToken = getToken();
  return useMutation<changeClass[], void, { floor: number }>({
    mutationFn: async (param) => {
      try {
        const response = await instance.get(
          `/class-room/floor?floor=${param.floor}`,
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

export const selfStudyCheck = () => {
  const { handleError } = apiError();
  const accessToken = getToken();
  return useMutation<string, Error, null>({
    mutationFn: async () => {
      try {
        const response = await instance.get(`/self-study/admin`, {
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

export const mealCheck = () => {
  const accessToken = getToken();
  return useMutation<
    mealcheckProp[],
    Error,
    { grade: number; classNum: number }
  >({
    mutationFn: async (param) => {
      try {
        const response = await instance.get(
          `/weekend-meal/all?grade=${param.grade}&class_num=${param.classNum}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
};

export const notMealCheck = () => {
  const accessToken = getToken();
  return useMutation<
    notCheckMeal[],
    Error,
    { grade: number; classNum: number }
  >({
    mutationFn: async (param) => {
      try {
        const response = await instance.get(
          `/weekend-meal/quit?grade=${param.grade}&class_num=${param.classNum}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
};

export const postTeacher = () => {
  const accessToken = getToken();
  return useMutation<void, Error, postTeacherProp[]>({
    mutationFn: async (param) => {
      try {
        const response = await instance.post(`/self-study/register`, param, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  });
};

export const getSchdule = () => {
  const accessToken = getToken();
  return useMutation<schedulesdata[], Error, { year: string; month: string }>({
    mutationFn: async (param) => {
      try {
        const response = await instance.get(
          `/schedule/month?year=${param.year}&month=${param.month}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
};

export const AfterpostStudent = () => {
  const accessToken = getToken();
  return useMutation<afterSchool[], Error, null>({
    mutationFn: async (param) => {
      try {
        const response = await instance.get(``, {
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

export const mealChangeStatus = () => {
  const accessToken = getToken();
  return useMutation<void, Error, { status: "OK" | "NO"; id: string }>({
    mutationFn: async (param) => {
      try {
        const response = await instance.patch(
          `/weekend-meal/status?status=${param}`,
          {
            params: param.id,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    },
  });
};

export const addSchedule = () => {
  const accessToken = getToken();

  return useMutation<void, Error, addSchedule>({
    mutationFn: async (param: addSchedule) => {
      try {
        const response = await instance.post(
          "/schedule/month",
          {
            name: param.name,
            date: param.date,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        console.error("Error adding schedule:", error);
        throw error;
      }
    },
  });
};
