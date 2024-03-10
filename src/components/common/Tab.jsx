/* eslint-disable react/prop-types */
import { GridItem } from "@chakra-ui/react";

const Tab = ({ title, active, handleClick }) => {
  return (
    <GridItem
      px={4}
      w="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      cursor="pointer"
      borderBottomWidth={2}
      borderBottomColor={active ? "brand.900" : ""}
      textAlign="center"
      onClick={handleClick}
      fontSize={{ md: "small", lg: "large" }}
    >
      {title}
    </GridItem>
  );
};

export default Tab;
