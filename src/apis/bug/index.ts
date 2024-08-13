import { useMutation } from "@tanstack/react-query";
import { instance } from "..";
import ApiError from "@/hook/apiError";

interface BugProp {
  title: string;
  content: string;
  file_name: string[];
}

export const BugImg = () => {
  return useMutation<string[], Error, { file: File[] }>({
    mutationFn: async (param) => {
      try {
        const formData = new FormData();
        param.file.forEach((file) => {
          formData.append("file", file);
        });
        const { data } = await instance.post(`/bug/upload`, formData);
        return data;
      } catch (error) {
        alert("이미지 용량이 너무 큽니다");
        throw error;
      }
    },
  });
};

export const BugPost = () => {
  const { handleError } = ApiError();
  return useMutation<void, Error, BugProp>({
    mutationFn: async (param) => {
      try {
        await instance.post(`/bug/message`, {
          ...param,
          model: "WEB",
        });
      } catch (error) {
        handleError(error);
      }
    },
  });
};
