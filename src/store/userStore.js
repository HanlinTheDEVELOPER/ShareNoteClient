import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

const userStore = (set) => ({
  user: null,
  setUser: async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/users/me`, {
      credentials: "include",
    });
    const resUser = await res.json();
    set((state) => (state.user = resUser.data));
  },
});

export const useUserStore = create(
  devtools(persist(userStore, { name: "user" }))
);
