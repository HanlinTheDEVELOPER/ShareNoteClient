import axiosInstance from "../axiosInstance";

export const getNotes = async (pageParam, activeTab) => {
  const tag = activeTab ? activeTab : "Recommends";
  const fetchRes = await axiosInstance.get(
    `/api/v1/notes?page=${pageParam}&tag=${tag}`
  );
  const notes = fetchRes.data;
  return notes;
};

export const getNoteById = async (id) => {
  const fetchRes = await axiosInstance.get("/api/v1/notes/" + id);
  const note = fetchRes.data;
  return note;
};

export const createNote = async (data) => {
  const upload = await axiosInstance.post("/api/v1/notes", data);
  const note = upload.data;
  return note;
};
