import React from "react";
import NotFoundSvg from "../../assets/Not Found.svg";
import { Image, Stack, Text } from "@chakra-ui/react";
import "./NotFound.css";

const NotFound = () => {
  return (
    <Stack
      position="absolute"
      left={0}
      top={0}
      h="100vh"
      w="100vw"
      justifyContent="center"
      alignItems="center"
      animation="running"
    >
      <Image
        src={NotFoundSvg}
        width={{ base: "150px", sm: "200px" }}
        className="not_found_logo"
      />
      <Text fontSize={{ base: "2xl", sm: "3xl" }} mt={6} align="center">
        Somethings went wrong!!!
      </Text>
    </Stack>
  );
};

export default NotFound;
