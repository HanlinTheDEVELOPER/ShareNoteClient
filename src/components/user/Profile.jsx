import { Flex, Image, Box, Text } from "@chakra-ui/react";
import { useUserStore } from "../../store/userStore";

import ChangeProfile from "./ChangeProfile";
const ProfileSection = () => {
  const user = useUserStore((state) => state.user);

  return (
    <Flex
      bgColor="back.600"
      bgImage={{
        base: "linear-gradient(90deg, rgba(70,150,42,1) 0%, rgba(70,150,42,0.896796218487395) 45%, rgba(70,150,42,0.896796218487395) 100%)",
        sm: "linear-gradient(90deg, rgba(233,235,238,1) 0%, rgba(70,150,42,0.7791491596638656) 30%, rgba(70,150,42,0.896796218487395) 45%, rgba(70,150,42,1) 100%)",
      }}
      height={{ base: "fit-content", sm: "300px" }}
      justifyContent="space-around"
      alignItems="end"
      direction={{ base: "column", sm: "row" }}
      gap={{ base: 4, sm: 12 }}
      userSelect="none"
      p={{ base: 8, sm: 4 }}
    >
      <Box
        display={"flex"}
        w={{ base: "100%", sm: "20%" }}
        justifyContent={"center"}
        alignItems="center"
      >
        <Box
          className="profile_image_container"
          w={{ base: "50%", sm: "100%" }}
          position="relative"
        >
          <Image
            w="100%"
            aspectRatio={"1/1"}
            src={user?.avatar}
            rounded="12"
            shadow=" 0px 0px 10px 0px #46962A "
            // mb={{ base: "-100%", sm: 0 }}
          />
          <ChangeProfile />
        </Box>
      </Box>
      <Box w={{ base: "100%", sm: "80%" }}>
        <Text
          fontWeight={600}
          textAlign={{ base: "center", sm: "start" }}
          fontSize="3xl"
        >
          {user?.name}
        </Text>
      </Box>
    </Flex>
  );
};

export default ProfileSection;
