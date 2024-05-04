import React from "react";
import Supporter from "./Supporter";
import { Stack, Text } from "@chakra-ui/react";

const SupportList = ({ data }) => {
  const { supports, supporters } = data;
  const totalSupporters = supporters?.length;
  return (
    <div>
      <Text align="center" fontSize="xl" py={4}>
        {supports} supports by {totalSupporters} users.
      </Text>
      <Stack>
        {supporters?.map((supporter) => (
          <Supporter
            key={supporter._id}
            name={supporter.name}
            avatar={supporter.avatar}
            slug={supporter.slug}
          />
        ))}
      </Stack>
    </div>
  );
};

export default SupportList;
