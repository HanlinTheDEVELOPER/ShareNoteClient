/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import axiosInstance from "../lib/axiosInstance";

const userStore = (set) => ({
  user: null,
  setUser: async () => {
    const res = await axiosInstance.get("/api/v1/users/me");
    await set((state) => (state = { user: res.data.data }));
    return res?.data?.data;
  },
  clearUser: () => set((state) => (state = { user: null })),
});

export const useUserStore = create(
  devtools(persist(userStore, { name: "user" }))
);
