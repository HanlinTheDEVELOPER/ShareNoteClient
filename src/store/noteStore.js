import { create } from "zustand";

const noteStore = (set) => ({
  notes: [],
  addNote: (note) => {
    set((state) => {
      return {
        notes: [...state.notes, note],
      };
    });
  },
});

export const useNoteStore = create(noteStore);
