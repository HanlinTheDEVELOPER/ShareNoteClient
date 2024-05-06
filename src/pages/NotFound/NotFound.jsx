import React from "react";
import NotFoundSvg from "../../assets/Not Found.svg";
import { Flex, Image, Stack, Text } from "@chakra-ui/react";
import "./NotFound.css";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
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
      <Flex gap={2}>
        <Text
          onClick={() => navigate(-1)}
          color="brand.900"
          cursor="pointer"
          _hover={{ textDecoration: "underline" }}
        >
          Go back
        </Text>
        or
        <Text
          onClick={() => navigate(0)}
          color="brand.900"
          cursor="pointer"
          _hover={{ textDecoration: "underline" }}
        >
          Refresh!
        </Text>
      </Flex>
    </Stack>
  );
};

export default NotFound;
