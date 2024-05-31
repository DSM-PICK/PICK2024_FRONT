import axios, { AxiosError } from "axios";
import { cookie } from "@/utils/auth";
import { useRouter } from "next/navigation";

const BASEURL = process.env.NEXT_PUBLIC_API_KEY;

export const instance = axios.create({
  baseURL: BASEURL,
  timeout: 10000,
});

export const refreshInstance = axios.create({
  baseURL: BASEURL,
  timeout: 10000,
});

instance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const accessToken = cookie.get("access_token");
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

refreshInstance.interceptors.request.use(
  (config) => {
    const refreshToken = cookie.get("refresh_token");
    if (refreshToken) {
      config.headers.Authorization = `Bearer ${refreshToken}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<AxiosError>) => {
    if (axios.isAxiosError(error) && error.response) {
      const { status } = error.response.data;
      if (status === 401) {
        const refreshToken = cookie.get("refresh_token");
        if (refreshToken) {
          try {
            const res = await axios.put(
              `${BASEURL}/refresh`,
              {},
              {
                headers: {
                  "X-Refresh-Token": `Bearer ${refreshToken}`,
                },
              }
            );
            const { data } = res.data;
            const accessToken = data.accessToken;
            cookie.set("access_token", accessToken);
            if (error.config) {
              error.config.headers.Authorization = `Bearer ${accessToken}`;
              return axios.request(error.config);
            }
          } catch {
            throw error;
          }
        } else {
          throw error;
        }
      } else {
        throw error;
      }
    } else {
      throw error;
    }
  }
);
