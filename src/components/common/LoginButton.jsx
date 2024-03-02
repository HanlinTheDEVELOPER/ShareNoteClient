/* eslint-disable react/prop-types */

import { Button, Link } from "@chakra-ui/react";

const LoginButton = () => {
  const state = window.location.pathname;
  return (
    <Button
      as={Link}
      bg={{ base: "transparent", sm: "brand.900" }}
      _hover={{ bg: "brand.900" }}
      href={`${import.meta.env.VITE_API_URL}/api/v1/auth/google?sm=${state}`}
    >
      Login
    </Button>
  );
};

export default LoginButton;
