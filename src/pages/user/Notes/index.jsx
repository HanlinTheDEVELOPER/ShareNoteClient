import { Box, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { useUserStore } from "../../../store/userStore";
import { useSearchParams } from "react-router-dom";
import FetchNotes from "./FetchNotes";

const NoteTabs = () => {
  const [activeTab, setActiveTab] = useState("uploaded");
  const user = useUserStore((state) => state.user);
  const [searchParams, setSearchParams] = useSearchParams();
  const profileSlug = searchParams.get("user");
  const isMyProfile = user.slug === profileSlug;
  return (
    <Box>
      {isMyProfile && (
        <Flex
          width="100%"
          height="40px"
          position="relative"
          borderTop="2px solid white"
        >
          <Flex
            w="50%"
            justifyContent="center"
            alignItems="center"
            onClick={() => setActiveTab("uploaded")}
          >
            Uploaded
          </Flex>
          <Flex
            w="50%"
            justifyContent="center"
            alignItems="center"
            onClick={() => setActiveTab("saved")}
          >
            Saved
          </Flex>
          <Box
            w="50%"
            h="100%"
            position="absolute"
            bg="brand.900"
            zIndex={-101}
            borderBottomRadius={10}
            right={activeTab === "saved" ? "0" : "50%"}
            transition="all 0.2s ease-in"
          ></Box>
        </Flex>
      )}
      <FetchNotes activeTab={activeTab} />
    </Box>
  );
};

export default NoteTabs;
