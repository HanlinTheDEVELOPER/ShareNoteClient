import {
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import logo from "../../assets/logo.svg";
import { useAuthStore } from "../../store/authStore";
import LoginButton from "./LoginButton";
import NavMenu from "./NavMenu";
import useDetectScroll from "@smakss/react-scroll-direction";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconSearch } from "@tabler/icons-react";
import SearchPopOver from "./SearchPopOver";

const Nav = () => {
  const [isLargeScreen] = useMediaQuery("(min-width: 768px)");
  const [auth] = useAuthStore((state) => [state.auth]);
  const [topValue, setTopValue] = useState(0);
  const { scrollDir } = useDetectScroll();
  const [searchKey, setSearchKey] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    if (event.target.value !== "" && event.key === "Enter") {
      navigate(`/search?key=${searchKey}`);
    }
  };

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

      <Flex justifyContent={"center"} alignItems={"center"} gap={4}>
        {isLargeScreen ? (
          <InputGroup>
            <InputLeftElement h="100%" mx={2} pointerEvents="none">
              <IconSearch />
            </InputLeftElement>
            <Input
              placeholder="Search"
              size={{ base: "sm", sm: "lg" }}
              rounded="full"
              variant="filled"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              onKeyDown={handleSearch}
            />
          </InputGroup>
        ) : (
          <SearchPopOver
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            onKeyDown={handleSearch}
          />
        )}
        {auth ? (
          <>
            <NavMenu />
          </>
        ) : (
          <LoginButton />
        )}
      </Flex>
    </Flex>
  );
};

export default Nav;
