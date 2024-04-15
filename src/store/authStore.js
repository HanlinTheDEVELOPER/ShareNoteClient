/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import axiosInstance from "../lib/axiosInstance";

const authStore = (set) => ({
  auth: null,
  setAuth: (data) => {
    set((state) => (state = { auth: data }));
  },
  clearAuth: () => set((state) => (state = { auth: null })),
  logOut: async () => {
    const fetchRes = await axiosInstance.get("/api/v1/auth/logout");
    set((state) => (state = { auth: null }));
    return fetchRes;
  },
});

export const useAuthStore = create(
  devtools(persist(authStore, { name: "auth" }))
);
//  {
// statusCode : 200,
// message : "aef",
// data : [{}]
// }
