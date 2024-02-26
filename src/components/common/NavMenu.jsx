/* eslint-disable react/prop-types */
import {
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";

import { useUserStore } from "../../store/userStore";
import { useAuthStore } from "../../store/authStore";
import { Link } from "react-router-dom";

const NavMenu = () => {
  const [user] = useUserStore((state) => [state.user, state.setUser]);
  const [logOut] = useAuthStore((state) => [state.logOut]);
  return (
    <Menu>
      <MenuButton>
        <Avatar size={{ base: "sm", sm: "md" }} src={user?.avatar} />
      </MenuButton>
      <MenuList>
        <Link to="profile">
          <MenuItem>
            <Text textAlign={"center"} w="100%">
              Profile
            </Text>
          </MenuItem>
        </Link>
        <MenuItem onClick={logOut}>
          <Text textAlign={"center"} w="100%">
            Logout
          </Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default NavMenu;
