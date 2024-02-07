import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axiosInstance from "../lib/axiosInstance";

export const noteStore = (set) => ({
  notes: [],
  getNotes: async ({ pageParam = 1 }) => {
    const fetchRes = await axiosInstance.get("/api/v1/notes?page=" + pageParam);
    const notes = fetchRes.data;
    set((state) => ({ notes: [...state.notes, ...notes.data.notes] }));
    return notes;
  },
});

export const useNoteStore = create(devtools(noteStore));
