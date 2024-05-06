import { apiError } from "@/hook/apiError";
import { instance } from "..";
import { useMutation } from "@tanstack/react-query";

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
  const { handleError } = apiError();
  return useMutation<void, Error, addSchedule>({
    mutationFn: async (param: addSchedule) => {
      try {
        const response = await instance.post("/schedule/create", {
          event_name: param.event_name,
          date: param.date,
        });
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
  });
};

export const GetSchdule = () => {
  const { handleError } = apiError();
  return useMutation<schedulesdata[], Error, { year: string; month: string }>({
    mutationFn: async (param) => {
      try {
        const response = await instance.get(
          `/schedule/month?year=${param.year}&month=${param.month}`
        );
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
  });
};
