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

interface previousStudent {
  name: string;
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

interface ReturnHomeData {
  username: string;
  start_time: {
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
  return useMutation<Error, void, ReasonAll>({
    mutationFn: async (param: ReasonAll) => {
      try {
        const response = await instance.get("/application/reason/all", {
          params: param,
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
  return useMutation<Error, void, ReturnHomeData, Token>({
    mutationFn: async (param: ReturnHomeData) => {
      try {
        const response = await instance.get("/early-return/reason/all", {
          params: param,
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

  return useMutation<Error, previousStudent, { name: string }>({
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

  return useMutation<Error, void, UuidProp>({
    mutationFn: async (param: UuidProp) => {
      console.log(param.id);
      try {
        const response = await instance.patch(
          `/application/change/${param.id}`,
          {
            headers: getAuthHeader(),
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

  return useMutation<Error, void, { month: string; year: string }>({
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

// export const dayTeacher = () => {
//   const {handleError} = apiError();

//   return useMutation<Error, void>({
//     mutationFn: async () => {
//       try{
//         const accessToken = getToken();
//         const response = await instance.get(`/self-stydy/`)
//       }
//     }
//   })
// }

export const noMeal = () => {
  const handleError = apiError();

  return useMutation<Error>;
};

export const outList = () => {
  useMutation;
};
