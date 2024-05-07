/* eslint-disable react/prop-types */

import { Flex, Stack, Text } from "@chakra-ui/react";

import { IconArrowRightFromArc, IconUserFilled } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import FollowButton from "../common/FollowButton";
import MyIconButton from "../common/IconButton";
import ProfileImage from "./ProfileImage";
import Tags from "./Tags";
import Username from "./Username";

const ProfileSection = ({ user, isMyProfile }) => {
  return (
    <Flex
      bgColor="rgb(70,150,42)"
      bgImage={{
        base: "linear-gradient(90deg, rgba(70,150,42,1) 0%, rgba(70,150,42,0.896796218487395) 45%, rgba(70,150,42,0.896796218487395) 100%)",
        md: "linear-gradient(90deg, rgba(70,150,42,0) 0%, rgba(164,185,157,0.11808473389355745) 5%, rgba(150,180,140,0.3169642857142857) 12%, rgba(146,178,135,0.4822303921568627) 18%, rgba(130,172,116,0.7903536414565826) 35%, rgba(108,164,89,0.9640231092436975) 45%, rgba(90,157,67,1) 71%, rgba(70,150,42,1) 100%, rgba(70,150,42,1) 100%)",
      }}
      height={{ base: "fit-content", md: "300px" }}
      justifyContent="space-around"
      alignItems="end"
      direction={{ base: "column", md: "row" }}
      gap={{ base: 4, md: 12 }}
      userSelect="none"
      p={{ base: 8, md: 4 }}
      position="relative"
    >
      <MyIconButton position="absolute" top={4} left={3}>
        <Link to={-1}>
          <IconArrowRightFromArc />
        </Link>
      </MyIconButton>
      <ProfileImage
        avatar={user?.avatar}
        isMyProfile={isMyProfile}
        name={user?.name}
      />
      <Stack w={{ base: "100%", md: "80%" }} gap={3}>
        <Username isMyProfile={isMyProfile} name={user?.name} />
        <Flex
          fontWeight={600}
          alignItems="center"
          gap={2}
          h={3}
          justifyContent={{ base: "center", sm: "start" }}
        >
          <IconUserFilled className="-mt-2" />
          {user?.followers}
          <Text pb={0}>Followers</Text>
        </Flex>
        <Tags isMyProfile={isMyProfile} tags={user?.tags} />
        {!isMyProfile && (
          <FollowButton
            profileId={user?._id}
            profileSlug={user?.slug}
            isFollowing={user?.isFollowing}
            fromProfile={true}
            invalidateTag={"profile"}
          />
        )}
      </Stack>
    </Flex>
  );
};

export default ProfileSection;
