import { useMutation } from "@tanstack/react-query";
import React from "react";
import { addSupport } from "../../lib/Api/noteApi";
import { Button, textDecoration, useToast } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ProtectedButton from "./ProtectedButton";
import { queryClient } from "../../main";
import { IconHeartPlus } from "@tabler/icons-react";
import SupportModel from "../notes/SupporterModel/SupporterModel";

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
    <Button
      _hover={{ bg: "brand.800" }}
      bg="transparent"
      borderColor="brand.900"
      borderWidth="1px"
      p={0}
    >
      <ProtectedButton
        p={0}
        _hover={{ bg: "transparent" }}
        bg="transparent"
        fn={handleOnClick}
      >
        <IconHeartPlus />
      </ProtectedButton>

      <SupportModel
        variant="link"
        p={0}
        _hover={{ bg: "transparent", textDecoration: "underline" }}
        slug={slug}
      >
        {children}
      </SupportModel>
    </Button>
  );
};

export default AddSupportButton;
