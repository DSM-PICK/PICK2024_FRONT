import axios, { AxiosError } from "axios";

const BASEURL = "http://localhost:3000";

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
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

refreshInstance.interceptors.request.use(
  (config) => {
    const refresgToken = localStorage.getItem("refresh_token");
    if (refresgToken) {
      config.headers.Authorization = `Bearer ${refresgToken}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

instance.interceptors.request.use(
  (response) => response,
  async (error: AxiosError<AxiosError>) => {
    if (axios.isAxiosError(error) && error.response) {
      const { status } = error.response.data;
      if (status === 401) {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          try {
            await axios
              .put(`${BASEURL}/refresh`, {
                headers: {
                  "X-Refresh-Token": `Bearer ${refreshToken}`,
                },
              })
              .then((res) => {
                const { data } = res.data;
                const accessToken = data.accessToken;
                localStorage.setItem("accessToken", accessToken);
                if (error.config) {
                  error.config.headers[
                    "X-Refresh-Token"
                  ] = `Bearer ${accessToken}`;
                  return axios.request(error.config);
                }
              })
              .catch(() => {
                throw error;
              });
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
