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
  const res = await axiosInstance.get("/api/v1/users/me");
  return res?.data?.data;
};
