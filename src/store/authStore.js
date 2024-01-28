/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

const authStore = (set) => ({
  auth: null,
  setAuth: (user) => set((state) => (state = { auth: user })),
  logOut: () => set((state) => (state = { auth: null })),
});

export const useAuthStore = create(
  devtools(persist(authStore, { name: "auth" }))
);
