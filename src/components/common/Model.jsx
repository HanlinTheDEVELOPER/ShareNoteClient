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

const TagsModel = ({
  children,
  onClick,
  isSubmitModel = true,
  isDisabled = false,
  toggleElement,
  isLoading,
  type = "submit",
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isLargeScreen] = useMediaQuery("(min-width: 480px)");
  return (
    <>
      <Tooltip>
        <MyIconButton onClick={onOpen}>{toggleElement}</MyIconButton>
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
            <ModalBody>
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
        <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>
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
