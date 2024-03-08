/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import axiosInstance from "../lib/axiosInstance";

const userStore = (set) => ({
  user: null,

  setUser: (data) => set((state) => (state = { user: data })),
  clearUser: () => set((state) => (state = { user: null })),
});

export const useUserStore = create(
  devtools(persist(userStore, { name: "user" }))
);
