import apiError from "@/hook/apiError";
import { instance } from "..";
import { useMutation, useQuery } from "@tanstack/react-query";
import { link } from "fs";

interface ChangeStateParams {
  status: "OK" | "NO";
  id: string;
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

export const Printexcel = () => {
  const downloadExcel = async () => {
    try {
      const response = await instance.get("/weekend-meal/excel", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "주말급식리스트.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error while downloading Excel file:", error);
      alert("엑셀 다운로드에 실패하였습니다");
    }
  };

  return { downloadExcel };
};

export const useClassWeekendMealExcel = () => {
  const usedownloadClassExcel = async (grade: number, class_num: number) => {
    try {
      const { data } = await instance.get(
        `/weekend-meal/excel/grade?grade=${grade}&class_num=${class_num}`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${grade}학년 ${class_num}반 주말급식.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log(error);
      alert("잠시후 다시 시도해주세요");
    }
  };

  return { usedownloadClassExcel };
};

export const ChangeState = () => {
  const { handleError } = apiError();
  return useMutation<void, Error, ChangeStateParams>({
    mutationFn: async (params) => {
      try {
        await instance.patch(
          `/weekend-meal/status?id=${params.id}&status=${params.status}`
        );
      } catch (error) {
        handleError(error);
      }
    },
  });
};

export const GetAllStudentMeal = () => {
  const { handleError } = apiError();
  return useQuery({
    queryKey: ["GetAllStudentMeal"],
    queryFn: async () => {
      try {
        const { data } = await instance.get(`weekend-meal/hey`);
        return data;
      } catch (error) {
        handleError(error);
      }
    },
  });
};

export const MealCheck = (grade: number, class_num: number) => {
  const { handleError } = apiError();
  return useQuery({
    queryKey: ["MealCheck", grade, class_num],
    queryFn: async () => {
      try {
        const { data } = await instance.get<mealcheckProp[]>(
          `/weekend-meal/all?grade=${grade}&class_num=${class_num}`
        );
        return data;
      } catch (error) {
        handleError(error);
      }
    },
  });
};

export const NotMealCheck = (grade: number, class_num: number) => {
  const { handleError } = apiError();
  return useQuery({
    queryKey: ["NotMealCheck", grade, class_num],
    queryFn: async () => {
      try {
        const { data } = await instance.get<notCheckMeal[]>(
          `/weekend-meal/quit?grade=${grade}&class_num=${class_num}`
        );
        return data;
      } catch (error) {
        handleError(error);
      }
    },
  });
};
