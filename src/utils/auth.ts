export const saveToken = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);
};

export const getToken = () => {
  return localStorage.getItem("access_token");
};
