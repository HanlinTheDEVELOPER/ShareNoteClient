import { create } from "zustand";

const userStore = (set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
});

export const useUserStore = create(userStore);
