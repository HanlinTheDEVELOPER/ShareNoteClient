/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import axiosInstance from "../lib/axiosInstance";

const authStore = (set) => ({
  auth: null,
  setAuth: async (userIdLink) => {
    const fetchRes = await axiosInstance.get(
      `/api/v1/auth/login?user=${userIdLink}`
    );
    const auth = fetchRes.data;
    set((state) => (state = { auth: auth.data }));
  },
  clearAuth: () => set((state) => (state = { auth: null })),
  logOut: async () => {
    const fetchRes = await axiosInstance.get("/api/v1/auth/logout");
    set((state) => (state = { auth: null }));
  },
});

export const useAuthStore = create(
  devtools(persist(authStore, { name: "auth" }))
);
