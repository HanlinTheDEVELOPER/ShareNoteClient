import { Flex, Image, Box } from "@chakra-ui/react";
import { useUserStore } from "../../store/userStore";

import ChangeProfile from "./ChangeProfile";
const ProfileSection = () => {
  const user = useUserStore((state) => state.user);

  return (
    <Flex
      mt={{ base: 4, sm: 8, md: 12 }}
      height="400px"
      justifyContent="space-around"
      direction={{ base: "column", sm: "row" }}
      gap={12}
      userSelect="none"
    >
      <Box
        display={"flex"}
        w={{ base: "100%", sm: "40%" }}
        justifyContent={"center"}
        alignItems="center"
      >
        <Box className="profile_image_container" w="90%" position="relative">
          <Image
            w="100%"
            aspectRatio={"1/1"}
            src={user?.avatar}
            rounded="full"
            shadow=" 0px 0px 10px 0px #46962A "
          />
          <ChangeProfile />
        </Box>
      </Box>
      <Box w="60%">adfasf</Box>
    </Flex>
  );
};

export default ProfileSection;
