import axiosInstance from "./axiosInstance";

export const getNotes = async ({ pageParam = 1 }) => {
  const fetchRes = await axiosInstance.get("/api/v1/notes?page=" + pageParam);
  const notes = fetchRes.data;
  return notes;
};

export const getNoteById = async (id) => {
  const fetchRes = await axiosInstance.get("/api/v1/notes/" + id);
  const note = fetchRes.data;
  return note;
};
