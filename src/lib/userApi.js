import axiosInstance from "./axiosInstance";

export const changeProfileImage = async (data) => {
  const fetchRes = await axiosInstance.post(
    "/api/v1/users/updateProfile",
    data
  );
  const notes = fetchRes.data;
  return notes;
};

export const setupAccount = async (data) => {
  const fetchRes = await axiosInstance.post("/api/v1/users/setup", data);
  const user = fetchRes.data;
  return user;
};

export const fetchUser = async () => {
  const fetchRes = await axiosInstance.get("/api/v1/users/me");
  return fetchRes?.data?.data;
};

export const fetchProfile = async (slug) => {
  const fetchRes = await axiosInstance.get(
    `/api/v1/users/profile?slug=${slug}`
  );
  return fetchRes?.data?.data;
};

export const updateUsername = async (data) => {
  const fetchRes = await axiosInstance.post(
    "/api/v1/users/changeUsername",
    data
  );
  return fetchRes?.data?.data;
};

export const updateTags = async (data) => {
  const fetchRes = await axiosInstance.post("/api/v1/users/updateTags", data);
  return fetchRes?.data?.data;
};
