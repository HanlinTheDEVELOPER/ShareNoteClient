import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { useCustomToast } from "../../hooks/useCustomToast";
import { saveNote, unSaveNote } from "../../lib/Api/noteApi";
import { queryClient } from "../../main";
import ProtectedButton from "./ProtectedButton";

const SaveNoteButton = ({ children, isSaved }) => {
  const { slug } = useParams();
  const { successToast, errorToast } = useCustomToast();
  const { mutateAsync, isPending: isSavePending } = useMutation({
    mutationKey: ["note", "notes"],
    mutationFn: (slug) => saveNote(slug),
    onSuccess: () => queryClient.invalidateQueries(["note", "notes"]),
  });

  const { mutateAsync: unsaveMutateAsync, isPending: isUnsavePending } =
    useMutation({
      mutationKey: ["note", "notes"],
      mutationFn: (slug) => unSaveNote(slug),
      onSuccess: () => queryClient.invalidateQueries(["note", "notes"]),
    });

  const handleOnSave = async () => {
    try {
      await mutateAsync(slug);
      successToast("Saved");
    } catch (error) {
      console.log(error);
      errorToast("Failed");
    }
  };

  const handleOnUnsave = async () => {
    try {
      await unsaveMutateAsync(slug);
      successToast("Unsaved");
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
      isLoading={isSavePending || isUnsavePending}
      fn={isSaved ? handleOnUnsave : handleOnSave}
      p={0}
    >
      {children}
    </ProtectedButton>
  );
};

export default SaveNoteButton;
