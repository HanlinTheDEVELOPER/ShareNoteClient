/* eslint-disable react/prop-types */
import { Box, IconButton, Text, Tooltip, useClipboard } from "@chakra-ui/react";
import { IconCopy, IconEdit } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import ChangeUserName from "./ChangeUserName";
import { useToast } from "@chakra-ui/react";

const Username = ({ isMyProfile, name }) => {
  const [isEdit, setIsEdit] = useState(false);
  const { onCopy, hasCopied } = useClipboard(window.location.href);
  const toast = useToast();
  useEffect(() => {
    hasCopied &&
      toast({
        description: "Profile Url is copied to clipboard",
        isClosable: true,
        variant: "subtle",
        status: "info",
      });
  }, [hasCopied]);
  return (
    <Box
      w={{ base: "100%", sm: "80%" }}
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent={{ base: "center", sm: "start" }}
      gap={2}
      //   justifyContent="center"
    >
      {!isEdit && (
        <Text
          fontWeight={600}
          textAlign={{ base: "center", sm: "start" }}
          fontSize="3xl"
          color={"white"}
          w="fit"
        >
          {name}
        </Text>
      )}

      {!isEdit && (
        <Tooltip label="Click to copy profile url">
          <IconButton size="xs" onClick={onCopy}>
            <IconCopy size={16} />
          </IconButton>
        </Tooltip>
      )}

      {isMyProfile && !isEdit && (
        <IconButton size="xs" onClick={() => setIsEdit((prev) => !prev)}>
          <Tooltip label="Edit Username">
            <IconEdit size={16} />
          </Tooltip>
        </IconButton>
      )}
      {isMyProfile && isEdit && (
        <ChangeUserName setIsEdit={setIsEdit} name={name} />
      )}
    </Box>
  );
};

export default Username;
