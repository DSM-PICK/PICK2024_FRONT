import { instance } from "..";
import { useMutation } from "@tanstack/react-query";
import { getToken } from "@/utils/auth";

export const Printexcel = () => {
  const accessToken = getToken();

  const downloadExcel = async () => {
    try {
      const response = await instance.get("/weekend-meal/excel", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
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