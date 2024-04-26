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

export const getNoteForUpdate = async (slug) => {
  const fetchRes = await axiosInstance.get("/api/v1/notes/update/" + slug);
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

export const updateNote = async ({ slug, data }) => {
  const update = await axiosInstance.post("/api/v1/notes/update/" + slug, data);
  const res = update.data;
  return res;
};

export const deleteNote = async (slug) => {
  const res = await axiosInstance.post("/api/v1/notes/delete/" + slug);
  const deleteNote = res.data;
  return deleteNote;
};
