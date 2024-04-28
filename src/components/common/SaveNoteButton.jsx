import { useMutation } from "@tanstack/react-query";
import React from "react";
import { addSupport, saveNote } from "../../lib/Api/noteApi";
import { useToast } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ProtectedButton from "./ProtectedButton";
import { queryClient } from "../../main";
import { useCustomToast } from "../../hooks/useCustomToast";

const SaveNoteButton = ({ children }) => {
  const { slug } = useParams();
  const { successToast, errorToast } = useCustomToast();
  const { mutateAsync } = useMutation({
    mutationKey: ["note"],
    mutationFn: (slug) => saveNote(slug),
    onSuccess: () => queryClient.invalidateQueries("note"),
  });

  const handleOnClick = async () => {
    try {
      await mutateAsync(slug);
      successToast("Saved");
    } catch (error) {
      console.log(error);
      errorToast("Failed");
    }
  };
  return (
    <ProtectedButton
      _hover={{ bg: "brand.800" }}
      bg="transparent"
      borderColor="brand.900"
      borderWidth="1px"
      fn={handleOnClick}
    >
      {children}
    </ProtectedButton>
  );
};

export default SaveNoteButton;
