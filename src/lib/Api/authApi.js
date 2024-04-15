import axiosInstance from "../axiosInstance";

export const login = async (userId) => {
  const fetchRes = await axiosInstance.get(`/api/v1/auth/login?user=${userId}`);
  const auth = fetchRes.data;
  return auth;
};
