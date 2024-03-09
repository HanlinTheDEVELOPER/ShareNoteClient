import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Tooltip,
  useDisclosure,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { IconSettingsCog } from "@tabler/icons-react";
import { useState } from "react";
import { useUserStore } from "../../store/userStore";
import UserInterestInput from "./UserInterestInput";
import { useMutation } from "@tanstack/react-query";
import { updateTags } from "../../lib/userApi";
import useSetUser from "../../hooks/useSetUser";

const TagsCustomizeModel = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useUserStore((state) => state.user);
  const [isLargeScreen] = useMediaQuery("(min-width: 480px)");
  const [tags, setTags] = useState(user?.tags);
  const toast = useToast();
  const [setUserFn] = useSetUser();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["user"],
    mutationFn: (data) => updateTags(data),
  });

  const onSubmit = async () => {
    try {
      await mutateAsync({ tags });
      onClose();
      toast({
        description: "Update Success",
        status: "success",
        isClosable: true,
      });
      setUserFn();
    } catch (error) {
      toast({
        description: "Update Fail",
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Tooltip label="Customize">
        <IconButton onClick={onOpen}>
          <IconSettingsCog />
        </IconButton>
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
              <UserInterestInput
                tags={tags}
                setTags={setTags}
                isFromModal={true}
              />
              <Box textAlign="center" mt={4}>
                <Button
                  onClick={onSubmit}
                  isDisabled={tags.length !== 3}
                  isLoading={isPending}
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
              <UserInterestInput
                tags={tags}
                setTags={setTags}
                isFromModal={true}
              />
              <Box textAlign="center" mt={4}>
                <Button
                  onClick={onSubmit}
                  isDisabled={tags.length !== 3}
                  isLoading={isPending}
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

export default TagsCustomizeModel;
