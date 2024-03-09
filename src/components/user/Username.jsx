/* eslint-disable react/prop-types */
import { Box, IconButton, Text, Tooltip } from "@chakra-ui/react";
import { IconEdit } from "@tabler/icons-react";
import { useState } from "react";
import ChangeUserName from "./ChangeUserName";

const Username = ({ isMyProfile, name }) => {
  const [isEdit, setIsEdit] = useState(false);

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

      {/* {!isEdit && (
        <CopyToClipboard
          text={window.location.href}
          onCopy={() =>
            toast({ description: "Copied Profile Link ", isClosable: true })
          }
        >
          <Tooltip label="Click to copy profile url">
            <IconButton size="xs">
              <IconCopy size={16} />
            </IconButton>
          </Tooltip>
        </CopyToClipboard>
      )} */}

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
