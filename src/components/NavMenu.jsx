/* eslint-disable react/prop-types */
import {
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";

import { useUserStore } from "../store/userStore";
import { useAuthStore } from "../store/authStore";

const NavMenu = () => {
  const [user, setUser] = useUserStore((state) => [state.user, state.setUser]);
  const [logOut] = useAuthStore((state) => [state.logOut]);
  return (
    <Menu>
      <MenuButton>
        <Avatar size={{ base: "sm", sm: "md" }} src={user?.avatar} />
      </MenuButton>
      <MenuList>
        <MenuItem>
          <Text onClick={setUser}>Profile</Text>
        </MenuItem>
        <MenuItem>
          <Text onClick={logOut}>Logout</Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default NavMenu;
