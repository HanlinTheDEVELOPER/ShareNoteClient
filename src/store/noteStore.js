import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axiosInstance from "../lib/axiosInstance";

export const noteStore = (set) => ({
  notes: [],
  getNotes: async () => {
    const fetchRes = await axiosInstance.get("/api/v1/notes");
    const notes = fetchRes.data;
    set({ notes: notes.data.notes });
    return notes;
  },
});

export const useNoteStore = create(devtools(noteStore));
