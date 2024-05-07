import {
  Button,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { IconSearch } from "@tabler/icons-react";
import { useRef } from "react";

const SearchPopOver = ({ value, onChange, onKeyDown }) => {
  const inputRef = useRef(null);
  return (
    <Popover
      autoFocus={true}

      // onOpen={() => {
      //   console.log(inputRef.current);
      //   inputRef.current.focus();
      // }}
    >
      <PopoverTrigger>
        <Button borderRadius="full" size="lg" px={0}>
          <IconSearch />
        </Button>
      </PopoverTrigger>
      <PopoverContent w={"100vw"} bg="back" borderColor="transparent" p={4}>
        <PopoverBody
          w={"100%"}
          display="flex"
          justifyContent={{ base: "center", sm: "end" }}
          // p={4}
        >
          <Input
            w={{ base: "100%", sm: "40%" }}
            ref={inputRef}
            autoFocus={true}
            placeholder="Search"
            size="lg"
            rounded="full"
            variant="filled"
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default SearchPopOver;
