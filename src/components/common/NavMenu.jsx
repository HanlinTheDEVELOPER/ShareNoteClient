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

import { Link, useLocation } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import { useBackToPrev } from "../../hooks/useBackToPrev";

const NavMenu = () => {
  const [user] = useUserStore((state) => [state.user, state.setUser]);
  const [logout] = useLogout();
  const { fromUrl, fromUrlState } = useBackToPrev();

  return (
    <Menu zIndex={1000} position="relative">
      <MenuButton>
        <Avatar
          name={user?.name}
          size={{ base: "sm", sm: "md" }}
          src={user?.avatar}
        />
      </MenuButton>
      <MenuList>
        <Link to={`profile?user=${user?.slug}`}>
          <MenuItem>
            <Text textAlign={"center"} w="100%">
              Profile
            </Text>
          </MenuItem>
        </Link>
        <Link to="/create/" state={{ fromUrl: fromUrlState }}>
          <MenuItem>
            <Text textAlign={"center"} w="100%">
              Create
            </Text>
          </MenuItem>
        </Link>

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
