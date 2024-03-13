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

interface previousStudent {
  reason: string;
  start_time: string;
  end_time: string;
  username: string;
  date: string;
  type: "APPLICATION" | "EARLY_RETURN";
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
  date: string;
  teacher: { floor: number; teacher: string };
}

interface schedulesdata {
  id: string;
  event_name: string;
  month: number;
  day: number;
}

interface addSchedule {
  name: string;
  date: string;
}

export const GetAuthHeader = () => {
  const accessToken = getToken;
  if (!accessToken) {
    throw new Error("Access token not found");
  }
  return { Authorization: `Bearer ${accessToken}` };
};

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
        const response = await instance.get("/early-return/reason/all", {
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

export const Previous = () => {
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
        throw error;
      }
    },
  });
};

export const SelfstudyGet = () => {
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
        throw error;
      }
    },
  });
};

export const DayTeacher = () => {
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

export const ChangeClassList = () => {
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

export const GetFloor = () => {
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
        throw error;
      }
    },
  });
};

export const SelfStudyCheck = () => {
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

export const MealCheck = () => {
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

export const NotMealCheck = () => {
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

export const PostTeacher = () => {
  const accessToken = getToken();
  return useMutation<void, Error, postTeacherProp>({
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

export const GetSchdule = () => {
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

export const MealChangeStatus = () => {
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

export const AddSchedule = () => {
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
