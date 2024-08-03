import { useMutation } from "@tanstack/react-query";
import { instance } from "..";
import ApiError from "@/hook/apiError";

interface BugProp {
  title: string;
  content: string;
  file_name: string[];
}

export const BugImg = () => {
  const { handleError } = ApiError();
  return useMutation<string[], Error, { file: File[] }>({
    mutationFn: async (param) => {
      try {
        const formData = new FormData();
        param.file.forEach((file) => {
          formData.append("file", file);
        });
        const result = await instance.post(`/bug/upload`, formData);
        return result.data;
      } catch (error) {
        handleError(error);
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
