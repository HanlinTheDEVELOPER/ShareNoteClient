import { Flex, Image, Text } from "@chakra-ui/react";
import logo from "../../assets/logo.svg";
import { useAuthStore } from "../../store/authStore";
import LoginButton from "./LoginButton";
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
      bg="back"
      px={{ base: 4, sm: 0 }}
      py="16px"
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
        <LoginButton />
      )}
    </Flex>
  );
};

export default Nav;
