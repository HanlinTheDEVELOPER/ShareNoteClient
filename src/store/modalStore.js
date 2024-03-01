import { create } from "zustand";

const ModalStore = (set) => ({
  isLoginModalOpen: false,
  setIsLoginModalOpen: () =>
    set((state) => ({ isLoginModalOpen: !state.isLoginModalOpen })),
});

export const useModalStore = create(ModalStore);
