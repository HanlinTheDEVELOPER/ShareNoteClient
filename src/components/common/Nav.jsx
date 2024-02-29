import { Button, Flex, Text, Link, Image } from "@chakra-ui/react";
import logo from "../../assets/logo.svg";
import { useAuthStore } from "../../store/authStore";
import NavMenu from "./NavMenu";
import { useDisclosure } from "@chakra-ui/react";
import { useModalStore } from "../../store/modalStore";
// import Google from "../assets/google-logo-9824.png";

const Nav = () => {
  const [auth] = useAuthStore((state) => [state.auth]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useModalStore((state) => [
    state.isLoginModalOpen,
    state.setIsLoginModalOpen,
  ]);
  console.log(isLoginModalOpen);
  return (
    <Flex
      w="100%"
      justify="space-between"
      position="sticky"
      top={0}
      zIndex={100}
      bg="back.600"
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
      <Button onClick={setIsLoginModalOpen}>ads</Button>
      {auth ? (
        <>
          <NavMenu />
        </>
      ) : (
        <Button
          as={Link}
          bg={{ base: "transparent", sm: "brand.900" }}
          _hover={{ bg: "brand.900" }}
          href={`${import.meta.env.VITE_API_URL}/api/v1/auth/google`}
        >
          Login
        </Button>
      )}
    </Flex>
  );
};

export default Nav;
