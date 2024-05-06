import apiError from "@/hook/apiError";
import { instance } from "..";
import { useMutation } from "@tanstack/react-query";

interface Getnotice {
  id: string;
  title: string;
  create_at: string;
  teacher: string;
  grade: number[];
}

interface DetailNoticeType {
  title: string;
  content: string;
  create_at: string;
  teacher: string;
  grade: number[];
}

interface post {
  title: string;
  content: string;
  grade: number[];
}

interface ModifyProp {
  id: string;
  title: string;
  content: string;
  grade: number[];
}

export const GetNoticeList = () => {
  const { handleError } = apiError();
  return useMutation<Getnotice[], Error, null>({
    mutationFn: async () => {
      try {
        const response = await instance.get("/notice/simple", {});
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
  });
};

export const DetailNoticeData = () => {
  const { handleError } = apiError();
  return useMutation<DetailNoticeType, Error, { id: string }>({
    mutationFn: async (param) => {
      try {
        const response = await instance.get(`/notice/${param.id}`, {});
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
  });
};

export const DeleteNoticeData = () => {
  const { handleError } = apiError();
  return useMutation<void, Error, { id: string }>({
    mutationFn: async (param) => {
      try {
        const response = await instance.delete(`/notice/delete/${param.id}`);
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
  });
};

export const PostNotice = () => {
  const { handleError } = apiError();
  return useMutation<void, Error, post>({
    mutationFn: async (param: post) => {
      try {
        await instance.post(`/notice/create`, {
          ...param,
        });
      } catch (error) {
        handleError(error);
      }
    },
  });
};

export const ModifyNoticeData = () => {
  const { handleError } = apiError();
  return useMutation<void, Error, ModifyProp>({
    mutationFn: async (param: ModifyProp) => {
      try {
        const response = await instance.patch(`/notice/modify`, {
          ...param,
        });

        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
  });
};

export const Delete = () => {
  const { handleError } = apiError();
  return useMutation<void, Error, { noticeId: string }>({
    mutationFn: async (param) => {
      try {
        await instance.delete(`/schedule/delete/${param.noticeId}`);
      } catch (error) {
        handleError(error);
      }
    },
  });
};

export const Post = () => {
  const { handleError } = apiError();
  return useMutation<void, Error, { id: string; eventName: string }>({
    mutationFn: async (param) => {
      try {
        await instance.post(`/schedule/modify`, {
          id: param.id,
          eventName: param.eventName,
        });
      } catch (error) {
        handleError(error);
      }
    },
  });
};
