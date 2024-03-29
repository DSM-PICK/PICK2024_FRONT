import { instance } from "..";
import { useMutation } from "@tanstack/react-query";
import { getToken } from "@/utils/auth";

interface addSchedule {
  event_name: string;
  date: string | null;
}

interface schedulesdata {
  id: string;
  event_name: string;
  month: number;
  day: number;
}

export const AddSchedule = () => {
  const accessToken = getToken();

  return useMutation<void, Error, addSchedule>({
    mutationFn: async (param: addSchedule) => {
      try {
        const response = await instance.post(
          "/schedule/create",
          {
            event_name: param.event_name,
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
