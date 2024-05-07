/* eslint-disable react/prop-types */
import { Box, IconButton, Text, Tooltip, useClipboard } from "@chakra-ui/react";
import { IconCopy, IconEdit } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useCustomToast } from "../../hooks/useCustomToast";
import ChangeUserName from "./ChangeUserName";

const Username = ({ isMyProfile, name }) => {
  const [isEdit, setIsEdit] = useState(false);
  const { onCopy, hasCopied } = useClipboard(window.location.href);
  const { successToast, errorToast } = useCustomToast();
  useEffect(() => {
    hasCopied && successToast("Copied to clipboard");
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
