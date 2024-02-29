/* eslint-disable react/prop-types */
/**
 * 1. Create a custom icon that accepts 2 props: `isIndeterminate` and `isChecked`
 */

import { Button } from "@chakra-ui/react";
import { IconCheck, IconPlus } from "@tabler/icons-react";
import { Flex } from "@chakra-ui/react";

const ChipCheckbox = () => {
  const isCheck = false;
  return (
    <Flex>
      <Button
        bg={isCheck ? "brand.900" : "transparent"}
        px={4}
        py={2}
        borderRadius={25}
        boxShadow="inset  0 0 1px 2px #46962A"
        color={isCheck ? "white" : "brand.900"}
      >
        Hello
        {isCheck ? (
          <IconCheck className="ml-2" />
        ) : (
          <IconPlus className="ml-2" />
        )}
      </Button>
    </Flex>
  );
};

export default ChipCheckbox;
