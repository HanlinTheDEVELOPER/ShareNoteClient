/* eslint-disable react/prop-types */
import { Button } from "@chakra-ui/react";

const MyIconButton = ({ children, isActive, ...props }) => {
  return (
    <Button
      color={"white"}
      bg={isActive ? "brand.900" : ""}
      textAlign={"center"}
      px={0}
      _hover={{ bg: "brand.900", opacity: 0.7 }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default MyIconButton;
