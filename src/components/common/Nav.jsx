import { Flex, Image, Text } from "@chakra-ui/react";
import logo from "../../assets/logo.svg";
import { useAuthStore } from "../../store/authStore";
import LoginButton from "./LoginButton";
import NavMenu from "./NavMenu";
import useDetectScroll from "@smakss/react-scroll-direction";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import Google from "../assets/google-logo-9824.png";

const Nav = () => {
  const [auth] = useAuthStore((state) => [state.auth]);
  const [topValue, setTopValue] = useState(0);
  const { scrollDir } = useDetectScroll();
  useEffect(() => {
    if (scrollDir === "down") {
      setTopValue(-80);
    } else {
      setTopValue(0);
    }
  }, [scrollDir]);
  return (
    <Flex
      animation="ease-in-out"
      transitionDuration="0.5s"
      w="100%"
      justify="space-between"
      position="sticky"
      top={topValue}
      zIndex={100}
      bg="back"
      px={{ base: 4, sm: 0 }}
      py="16px"
    >
      <Link to="/?tag=Recommends">
        {" "}
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
      </Link>

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
