/* eslint-disable react/prop-types */
import { Button } from "@chakra-ui/react";
import { useAuthStore } from "../../store/authStore";
import { useModalStore } from "../../store/modalStore";

const ProtectedButton = ({ children, fn }) => {
  const auth = useAuthStore((state) => state.auth);
  const setIsLoginModelOpen = useModalStore(
    (state) => state.setIsLoginModalOpen
  );
  return (
    <>
      <Button onClick={auth ? fn : setIsLoginModelOpen}>{children}</Button>
    </>
  );
};

export default ProtectedButton;
