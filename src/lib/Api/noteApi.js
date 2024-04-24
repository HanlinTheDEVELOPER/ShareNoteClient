import axiosInstance from "../axiosInstance";

export const getNotes = async (pageParam, activeTab) => {
  const tag = activeTab ? activeTab : "Recommends";
  const fetchRes = await axiosInstance.get(
    `/api/v1/notes?page=${pageParam}&tag=${tag}`
  );
  const notes = fetchRes.data;
  return notes;
};

export const getNoteBySlug = async (userId, slug) => {
  const fetchRes = await axiosInstance.get("/api/v1/notes/" + slug, {
    headers: {
      userId,
    },
  });
  const note = fetchRes.data;
  return note;
};

export const createNote = async (data) => {
  const upload = await axiosInstance.post("/api/v1/notes", data);
  const note = upload.data;
  return note;
};

export const addSupport = async (slug) => {
  const add = await axiosInstance.post("/api/v1/notes/" + slug);
  const res = add.data;
  return res;
};
