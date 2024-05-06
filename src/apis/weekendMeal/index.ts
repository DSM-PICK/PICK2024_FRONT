import { apiError } from "@/hook/apiError";
import { instance } from "..";
import { useMutation } from "@tanstack/react-query";

interface ChangeStateParams {
  status: "OK" | "NO";
  userId: string;
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

export const ChangeState = () => {
  const { handleError } = apiError();
  return useMutation<void, Error, ChangeStateParams>({
    mutationFn: async (params) => {
      try {
        await instance.patch(
          `weekend-meal/status?userId=${params.userId}&status=${params.status}`
        );
      } catch (error) {
        handleError(error);
      }
    },
  });
};

export const GetAllStudentMeal = async () => {
  const { handleError } = apiError();
  try {
    const response = await instance.get(`weekend-meal/hey`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const MealCheck = () => {
  const { handleError } = apiError();
  return useMutation<
    mealcheckProp[],
    Error,
    { grade: number; class_num: number }
  >({
    mutationFn: async (param) => {
      try {
        const response = await instance.get(
          `/weekend-meal/all?grade=${param.grade}&class_num=${param.class_num}`
        );
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
  });
};

export const NotMealCheck = () => {
  const { handleError } = apiError();
  return useMutation<
    notCheckMeal[],
    Error,
    { grade: number; class_num: number }
  >({
    mutationFn: async (param) => {
      try {
        const response = await instance.get(
          `/weekend-meal/quit?grade=${param.grade}&class_num=${param.class_num}`
        );
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
  });
};
