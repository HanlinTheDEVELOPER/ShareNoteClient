import { Button, Flex, Text, Link, Image } from "@chakra-ui/react";
import logo from "../../assets/logo.svg";
import { useAuthStore } from "../../store/authStore";
import NavMenu from "./NavMenu";
// import Google from "../assets/google-logo-9824.png";

const Nav = () => {
  const [auth] = useAuthStore((state) => [state.auth]);

  return (
    <Flex
      w="100%"
      justify="space-between"
      position="sticky"
      top={0}
      zIndex={100}
      bg="back.600"
      py="16px"
      p={{ base: 4 }}
    >
      <Flex alignItems={"center"} spacing={16}>
        <Image src={logo} alt="logo" w={{ base: 0, sm: 8, md: 10 }} />
        <Text
          color="brand.900"
          fontSize={{ base: "2xl", sm: "2xl", md: "4xl" }}
          fontWeight="700"
        >
          Share Notes
        </Text>
      </Flex>
      {auth ? (
        <>
          <NavMenu />
        </>
      ) : (
        <Button
          as={Link}
          bg="brand.900"
          color="white"
          p={4}
          _hover={{ bg: "brand.900" }}
          href={`${import.meta.env.VITE_API_URL}/api/v1/auth/google`}
        >
          {/* <Avatar size={"sm"} src={Google} bg={"transparent"} /> */}
          Login
        </Button>
      )}
    </Flex>
  );
};

export default Nav;