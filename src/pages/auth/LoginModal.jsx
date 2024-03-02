import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import LoginButton from "../../components/common/LoginButton";
import { useModalStore } from "../../store/modalStore";

function LoginModal() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useModalStore((state) => [
    state.isLoginModalOpen,
    state.setIsLoginModalOpen,
  ]);

  return (
    <>
      <Modal
        isOpen={isLoginModalOpen}
        isCentered
        motionPreset="slideInBottom"
        onClose={setIsLoginModalOpen}
      >
        <ModalOverlay onClick={() => console.log("he")} />
        <ModalContent>
          <ModalHeader textAlign="center">Please Login first</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign="center">
            <LoginButton />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default LoginModal;
