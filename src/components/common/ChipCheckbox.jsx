/* eslint-disable react/prop-types */
import { IconCheck, IconPlus } from "@tabler/icons-react";
import { Flex } from "@chakra-ui/react";

const ChipCheckbox = ({ tag, tags, setBody, setTags, isFromModal }) => {
  const isCheck = tags?.includes(tag);

  const onClick = () => {
    isFromModal !== true
      ? setBody((prev) => ({
          ...prev,
          tags: isCheck
            ? tags.filter((t) => t !== tag)
            : tags.length === 3 || tags.length > 3
            ? [...tags.slice(1), tag]
            : [...tags, tag],
        }))
      : setTags(
          isCheck
            ? tags.filter((t) => t !== tag)
            : tags.length === 3 || tags.length > 3
            ? [...tags.slice(1), tag]
            : [...tags, tag]
        );
  };
  return (
    <Flex>
      <Flex
        bg={isCheck ? "brand.900" : "transparent"}
        px={{ base: 2, sm: 4 }}
        py={2}
        borderRadius={25}
        boxShadow="inset  0 0 1px 2px #46962A"
        color={isCheck ? "white" : "brand.900"}
        justifyContent={"center"}
        alignItems={"center"}
        fontSize={{ base: 12, sm: 16 }}
        onClick={onClick}
      >
        {tag}
        {isCheck ? <IconCheck /> : <IconPlus />}
      </Flex>
    </Flex>
  );
};

export default ChipCheckbox;
