/* eslint-disable react/prop-types */
import { Flex, Tag } from "@chakra-ui/react";
import TagsCustomizeModel from "./TagsCustomizeModel";

const Tags = ({ isMyProfile, tags }) => {
  return (
    <Flex
      gap={2}
      justifyContent={{ base: "center", sm: "start" }}
      flexWrap="wrap"
    >
      {tags?.map((tag) => (
        <Tag key={tag}>{tag}</Tag>
      ))}
      {isMyProfile && <TagsCustomizeModel />}
    </Flex>
  );
};

export default Tags;
