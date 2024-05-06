import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  Tooltip,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import MyIconButton from "../../common/IconButton";

import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import { IconBrandFacebook } from "@tabler/icons-react";
import { useLocation } from "react-router-dom";

const ShareDialog = ({ children, title, url, ...props }) => {
  const { pathname, search } = useLocation();
  const path = pathname + search;
  const baseUrl = "https://share-note-client.vercel.app";
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            <ModalBody bg="back" borderRadius={8}>
              <Text fontSize="3xl" textAlign="center" fontWeight="500">
                Share To:
              </Text>
              <Flex justifyContent="center" gap={4} my={4}>
                <FacebookShareButton url={baseUrl + path}>
                  <FacebookIcon round />
                </FacebookShareButton>
                <LinkedinShareButton url={baseUrl + path} title={title}>
                  <LinkedinIcon round />
                </LinkedinShareButton>
                <TwitterShareButton url={baseUrl + path} title={title}>
                  <TwitterIcon round />
                </TwitterShareButton>
              </Flex>
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
              <Text fontSize="3xl" textAlign="center" fontWeight="500">
                Share To:
              </Text>
              <Flex justifyContent="center" gap={4} mb={8} mt={4}>
                <FacebookShareButton url={baseUrl + path}>
                  <FacebookIcon round />
                </FacebookShareButton>
                <LinkedinShareButton url={baseUrl + path} title={title}>
                  <LinkedinIcon round />
                </LinkedinShareButton>
                <TwitterShareButton url={baseUrl + path} title={title}>
                  <TwitterIcon round />
                </TwitterShareButton>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default ShareDialog;
