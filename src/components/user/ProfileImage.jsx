/* eslint-disable react/prop-types */
import { Box, Image } from "@chakra-ui/react";
import ChangeProfileImage from "./ChangeProfileImage";

const ProfileImage = ({ avatar, isMyProfile, name }) => {
  return (
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
          src={avatar}
          name={name}
          rounded="12"
          shadow=" 0px 0px 10px 0px #46962A "
          objectFit={"cover"}
        />
        {isMyProfile && <ChangeProfileImage />}
      </Box>
    </Box>
  );
};

export default ProfileImage;
