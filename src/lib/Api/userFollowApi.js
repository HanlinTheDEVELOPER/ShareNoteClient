import axiosInstance from "../axiosInstance";

export const follow = async (data) => {
  console.log(data);
  const fetchRes = await axiosInstance.post("/api/v1/follow", data);
  const res = fetchRes.data;
  return res;
};
