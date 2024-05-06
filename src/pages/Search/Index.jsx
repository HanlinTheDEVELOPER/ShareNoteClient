import { Flex } from "@chakra-ui/react";
import { IconArrowRightFromArc } from "@tabler/icons-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import MyIconButton from "../../components/common/IconButton";
import SearchNotes from "./SearchNotes";

const Search = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Flex>
        <MyIconButton onClick={() => navigate("../")}>
          <IconArrowRightFromArc />
        </MyIconButton>
      </Flex>
      <SearchNotes />
    </div>
  );
};

export default Search;
