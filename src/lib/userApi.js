import axiosInstance from "./axiosInstance";

export const changeProfileImage = async (data) => {
  const fetchRes = await axiosInstance.post("/api/v1/auth/updateProfile", data);
  const notes = fetchRes.data;
  return notes;
};
