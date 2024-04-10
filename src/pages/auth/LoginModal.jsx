import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useMediaQuery,
} from "@chakra-ui/react";
import LoginButton from "../../components/common/LoginButton";
import { useModalStore } from "../../store/modalStore";

function LoginModal() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useModalStore((state) => [
    state.isLoginModalOpen,
    state.setIsLoginModalOpen,
  ]);

  const [isLargeScreen] = useMediaQuery("(min-width: 480px)");

  return (
    <>
      {isLargeScreen ? (
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
      ) : (
        <Drawer
          isOpen={isLoginModalOpen}
          placement="bottom"
          onClose={setIsLoginModalOpen}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader textAlign="center">Please Login first</DrawerHeader>

            <DrawerBody textAlign="center" mb={16}>
              <LoginButton />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}

export default LoginModal;
