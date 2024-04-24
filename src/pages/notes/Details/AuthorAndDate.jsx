import { Avatar, Box, Flex } from "@chakra-ui/react";
import React from "react";
import { formatDate } from "../../../lib/formatDateString";

const AuthorAndDate = ({ author, updatedAt }) => {
  const { name, avatar, id } = author;

  return (
    <Flex gap={6} mt={6}>
      <Box>
        <Avatar name={name} src={avatar} />
      </Box>
      <Box>
        <h1>{name}</h1>
        <small className="opacity-80">{formatDate(updatedAt)}</small>
      </Box>
    </Flex>
  );
};

export default AuthorAndDate;
