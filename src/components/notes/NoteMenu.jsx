import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { IconDotsVertical } from "@tabler/icons-react";
import { useDeleteNoteHook } from "../../hooks/useDeleteNoteHook";

const NoteMenu = ({ slug }) => {
  const [handleDelete, isPending] = useDeleteNoteHook(slug);
  return (
    <Menu>
      <MenuButton
        border="1px solid"
        borderColor="brand.900"
        bg="rgb(52, 52, 52)"
        borderRadius="23"
      >
        <IconDotsVertical />
      </MenuButton>
      <MenuList minW="0" w={"100px"}>
        <MenuItem>
          <Text>Edit</Text>
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          {isPending ? <Spinner /> : <Text>Delete</Text>}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default NoteMenu;
