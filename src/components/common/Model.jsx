import {
  Box,
  Button,
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
import MyIconButton from "./IconButton";
import { useEffect } from "react";

const TagsModel = ({
  children,
  setOnClose = () => {},
  onClick,
  isSubmitModel = true,
  isDisabled = false,
  toggleElement,
  isLoading,
  type = "submit",
  ...props
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setOnClose({
      fn: onClose,
    });
  }, []);

  const [isLargeScreen] = useMediaQuery("(min-width: 480px)");
  return (
    <>
      <Tooltip>
        <MyIconButton {...props} onClick={onOpen}>
          {toggleElement}
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
            <ModalBody bg="back" borderRadius={8}>
              {children}

              <Box textAlign="center" mt={4}>
                <Button
                  type={type}
                  onClick={isSubmitModel ? onClick : onClose}
                  isDisabled={isDisabled}
                  isLoading={isLoading}
                  bg="brand.900"
                  color="white"
                >
                  Save
                </Button>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      ) : (
        <Drawer
          isOpen={isOpen}
          placement="bottom"
          onClose={onClose}
          size={"xl"}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody bg="back">
              {children}
              <Box textAlign="center" mt={4}>
                <Button
                  type={type}
                  onClick={isSubmitModel ? onClick : onClose}
                  isDisabled={isDisabled}
                  isLoading={isLoading}
                  bg="brand.900"
                  color="white"
                >
                  Save
                </Button>
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default TagsModel;
