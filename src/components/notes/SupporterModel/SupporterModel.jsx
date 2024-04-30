import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Tooltip,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import MyIconButton from "../../common/IconButton";
import { useGetSupporters } from "../../../hooks/useGetSupporters";

const SupportModel = ({ children, slug, ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading, isError, isPending } = useGetSupporters(slug);

  const [isLargeScreen] = useMediaQuery("(min-width: 480px)");
  return (
    <>
      <Tooltip>
        <MyIconButton {...props} onClick={onOpen}>
          {children}
        </MyIconButton>
      </Tooltip>
      {isLargeScreen ? (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          isCentered
          motionPreset="slideInBottom"
          size="xl"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody bg="back" borderRadius={10}>
              {JSON.stringify(data)}
            </ModalBody>
          </ModalContent>
        </Modal>
      ) : (
        <Drawer
          isOpen={isOpen}
          placement="bottom"
          onClose={onClose}
          size="large"
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody bg="back">{JSON.stringify(data)}</DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default SupportModel;
