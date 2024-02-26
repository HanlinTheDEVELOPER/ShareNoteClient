import { Menu, MenuButton, MenuList, MenuItem, Text } from "@chakra-ui/react";
import { IconDotsVertical } from "@tabler/icons-react";

const NoteMenu = () => {
  return (
    <Menu>
      <MenuButton
        border="1px solid"
        borderColor="brand.900"
        bg="transparent"
        borderRadius="23"
        opacity={0.7}
      >
        <IconDotsVertical />
      </MenuButton>
      <MenuList minW="0" w={"100px"}>
        <MenuItem>
          <Text>Profile</Text>
        </MenuItem>
        <MenuItem>
          <Text>Logout</Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default NoteMenu;
