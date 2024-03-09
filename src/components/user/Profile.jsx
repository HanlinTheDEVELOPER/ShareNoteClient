/* eslint-disable react/prop-types */

import { Flex, Box } from "@chakra-ui/react";

import ProfileImage from "./ProfileImage";
import Username from "./Username";
import Tags from "./Tags";
const ProfileSection = ({ user, isMyProfile }) => {
  return (
    <Flex
      bgColor="rgb(70,150,42)"
      bgImage={{
        base: "linear-gradient(90deg, rgba(70,150,42,1) 0%, rgba(70,150,42,0.896796218487395) 45%, rgba(70,150,42,0.896796218487395) 100%)",
        sm: "linear-gradient(90deg, rgba(70,150,42,0) 0%, rgba(164,185,157,0.11808473389355745) 5%, rgba(150,180,140,0.3169642857142857) 12%, rgba(146,178,135,0.4822303921568627) 18%, rgba(130,172,116,0.7903536414565826) 35%, rgba(108,164,89,0.9640231092436975) 45%, rgba(90,157,67,1) 71%, rgba(70,150,42,1) 100%, rgba(70,150,42,1) 100%)",
      }}
      height={{ base: "fit-content", sm: "300px" }}
      justifyContent="space-around"
      alignItems="end"
      direction={{ base: "column", sm: "row" }}
      gap={{ base: 4, sm: 12 }}
      userSelect="none"
      p={{ base: 8, sm: 4 }}
    >
      <ProfileImage avatar={user?.avatar} isMyProfile={isMyProfile} />
      <Box w={{ base: "100%", sm: "80%" }}>
        <Username isMyProfile={isMyProfile} name={user?.name} />
        <Tags isMyProfile={isMyProfile} tags={user?.tags} />
      </Box>
    </Flex>
  );
};

export default ProfileSection;
