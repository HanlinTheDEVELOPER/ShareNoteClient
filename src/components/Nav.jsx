import { Button, Flex, Text } from "@chakra-ui/react";
import logo from "../assets/logo.svg";
import { useAuthStore } from "../store/authStore";
import { useUserStore } from "../store/userStore";

const Nav = () => {
  const [auth, logOut] = useAuthStore((state) => [state.auth, state.logOut]);
  const [setUser] = useUserStore((state) => [state.setUser]);

  return (
    <Flex w="100%" justify="space-between" py="16px">
      <Flex>
        <img src={logo} alt="logo" className="w-10" />
        <Text color="brand.900" fontSize="4xl" fontWeight="700">
          Share Notes
        </Text>
      </Flex>
      {auth ? (
        <>
          <Button
            bgColor="brand.900"
            color="white"
            _hover={{ bg: "brand.900" }}
            onClick={logOut}
          >
            logout
          </Button>

          <Button
            bgColor="brand.900"
            color="white"
            _hover={{ bg: "brand.900" }}
            onClick={setUser}
          >
            Me
          </Button>
        </>
      ) : (
        <a href={`${import.meta.env.VITE_API_URL}/api/v1/auth/google`}>gmail</a>
      )}
    </Flex>
  );
};

export default Nav;
