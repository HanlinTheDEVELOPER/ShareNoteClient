import axiosInstance from "../axiosInstance";

export const follow = async (data) => {
  const fetchRes = await axiosInstance.post("/api/v1/follow", data);
  const res = fetchRes.data;
  return res;
};

export const unfollow = async (data) => {
  const fetchRes = await axiosInstance.post("/api/v1/follow/unfollow", data);
  const res = fetchRes.data;
  return res;
};
