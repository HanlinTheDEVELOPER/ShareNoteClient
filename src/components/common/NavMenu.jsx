/* eslint-disable react/prop-types */
import {
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
} from "@chakra-ui/react";

import { useUserStore } from "../../store/userStore";

import { Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";

const NavMenu = () => {
  const [user] = useUserStore((state) => [state.user, state.setUser]);
  const [logout] = useLogout();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Menu>
      <MenuButton>
        <Avatar size={{ base: "sm", sm: "md" }} src={user?.avatar} />
      </MenuButton>
      <MenuList>
        <Link to={`profile?user=${user?.slug}`}>
          <MenuItem>
            <Text textAlign={"center"} w="100%">
              Profile
            </Text>
          </MenuItem>
        </Link>
        <Link to="/create/">
          <MenuItem>
            <Text textAlign={"center"} w="100%">
              Create
            </Text>
          </MenuItem>
        </Link>
        <MenuItem onClick={toggleColorMode}>
          <Text textAlign={"center"} w="100%">
            {colorMode === "dark" ? "Light Theme" : "Dark Theme"}
          </Text>
        </MenuItem>
        <MenuItem onClick={logout}>
          <Text textAlign={"center"} w="100%">
            Logout
          </Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default NavMenu;
