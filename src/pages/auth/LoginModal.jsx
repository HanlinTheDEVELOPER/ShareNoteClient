import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
} from "@chakra-ui/react";
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
            <Button colorScheme="blue" mr={3} onClick={setIsLoginModalOpen}>
              Close
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default LoginModal;
