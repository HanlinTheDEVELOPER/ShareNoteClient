import { useMutation } from "@tanstack/react-query";
import React from "react";
import { addSupport } from "../../lib/Api/noteApi";
import { useToast } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ProtectedButton from "./ProtectedButton";
import { queryClient } from "../../main";

const AddSupportButton = ({ children }) => {
  const { slug } = useParams();
  const toast = useToast();
  const { mutateAsync } = useMutation({
    mutationKey: ["note"],
    mutationFn: (slug) => addSupport(slug),
    onSuccess: () => queryClient.invalidateQueries("note"),
  });

  const handleOnClick = async () => {
    try {
      await mutateAsync(slug);
    } catch (error) {
      console.log(error);
      toast({
        description: "Supporting Failed!",
        duration: 1000,
      });
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

export default AddSupportButton;
