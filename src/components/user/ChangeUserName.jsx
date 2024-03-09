/* eslint-disable react/prop-types */
import { Box, Input, IconButton } from "@chakra-ui/react";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateUsername } from "../../lib/userApi";
import { useToast } from "@chakra-ui/react";
import useSetUser from "../../hooks/useSetUser";

const ChangeUserName = ({ setIsEdit, name }) => {
  const [newName, setNewName] = useState(name);
  const toast = useToast();
  const [setUserFn] = useSetUser();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["user"],
    mutationFn: (data) => updateUsername(data),
  });

  const onSubmit = async () => {
    try {
      await mutateAsync({ name: newName });
      setIsEdit(false);
      setUserFn();
      toast({
        description: "Update Username Success.",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        description: "Update Username Failed!",
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <Box
      w={{ base: "100%", sm: "50%" }}
      h="100%"
      mb={2}
      display={"flex"}
      gap={2}
    >
      <Input
        bg="back"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <IconButton onClick={onSubmit} isLoading={isPending}>
        <IconCheck />
      </IconButton>
      <IconButton
        isDisabled={isPending}
        onClick={() => setIsEdit((prev) => !prev)}
      >
        <IconX />
      </IconButton>
    </Box>
  );
};

export default ChangeUserName;
