import React from "react";
import { Avatar, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Supporter = ({ avatar, name, slug }) => {
  return (
    <Link to={`/profile?user=${slug}`}>
      <Flex justifyContent="start" alignItems="center" gap={4}>
        <Avatar src={avatar} name={name} />
        <Text>{name}</Text>
      </Flex>
    </Link>
  );
};

export default Supporter;
