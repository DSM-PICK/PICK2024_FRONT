import { instance } from "..";
import { useMutation } from "@tanstack/react-query";
import { getToken } from "@/utils/auth";

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
  const accessToken = getToken();
  return useMutation<Getnotice[], Error, null>({
    mutationFn: async () => {
      try {
        const response = await instance.get("/notice/simple", {
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

export const DetailNoticeData = () => {
  const accessToken = getToken();
  return useMutation<DetailNoticeType, Error, { id: string }>({
    mutationFn: async (param) => {
      try {
        const response = await instance.get(`/notice/${param.id}`, {
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

export const DeleteNoticeData = () => {
  const accessToken = getToken();
  return useMutation<void, Error, { id: string }>({
    mutationFn: async (param) => {
      try {
        const response = await instance.delete(`/notice/delete/${param.id}`, {
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

export const PostNotice = () => {
  const accessToken = getToken();

  return useMutation<void, Error, post>({
    mutationFn: async (param: post) => {
      const response = await instance.post(
        `/notice/create`,
        {
          ...param,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    },
  });
};

export const ModifyNoticeData = () => {
  const accessToken = getToken();

  return useMutation<void, Error, ModifyProp>({
    mutationFn: async (param: ModifyProp) => {
      try {
        const response = await instance.patch(
          `/notice/modify`,
          {
            ...param,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  });
};
