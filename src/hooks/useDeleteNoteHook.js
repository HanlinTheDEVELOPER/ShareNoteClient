import { useMutation } from "@tanstack/react-query";
import { redirect, useNavigate } from "react-router-dom";
import { deleteNote } from "../lib/Api/noteApi";
import { useBackToPrev } from "./useBackToPrev";
import { useCustomToast } from "./useCustomToast";
import { queryClient } from "../main";

export const useDeleteNoteHook = (slug) => {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["notes"],
    mutationFn: (slug) => deleteNote(slug),
    onSuccess: () => queryClient.invalidateQueries(["notes"]),
  });

  const { fromUrl, fromUrlState } = useBackToPrev();
  const { errorToast, successToast } = useCustomToast();
  const redirectUrl = fromUrl ? fromUrl : -1;

  const handleDelete = async () => {
    try {
      await mutateAsync(slug);
      navigate(redirectUrl);
      successToast("Successfully Deleted");
    } catch (error) {
      console.log(error);
      errorToast("Delete Failed");
    }
  };

  return [handleDelete, isPending];
};