import {
  Button,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { IconSearch } from "@tabler/icons-react";

const SearchPopOver = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button borderRadius="full" size="lg" px={0}>
          <IconSearch />
        </Button>
      </PopoverTrigger>
      <PopoverContent width="full" bg="back" borderColor="transparent" p={4}>
        <PopoverBody>
          <Input
            placeholder="Search"
            size="lg"
            width="full"
            rounded="full"
            variant="filled"
          />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default SearchPopOver;
