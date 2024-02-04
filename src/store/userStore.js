import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import axiosInstance from "../lib/axiosInstance";

const userStore = (set) => ({
  user: null,
  setUser: async () => {
    const res = await axiosInstance.get("/api/v1/users/me");
    set((state) => (state = { user: res.data.data }));
  },
});

export const useUserStore = create(
  devtools(persist(userStore, { name: "user" }))
);
