import { create } from "zustand";

const ModalStore = (set) => ({
  isLoginModalOpen: false,
  setIsLoginModalOpen: () =>
    set((state) => (
      state= null,
    )),
});

export const useModalStore = create(ModalStore);
