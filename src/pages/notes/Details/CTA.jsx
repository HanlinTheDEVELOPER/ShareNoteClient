import React from "react";
import MyIconButton from "../../../components/common/IconButton";
import {
  IconArrowRightFromArc,
  IconEdit,
  IconHeartPlus,
  IconShare,
  IconUserPlus,
} from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import { useUserStore } from "../../../store/userStore";
import { Flex } from "@chakra-ui/react";
import ProtectedButton from "../../../components/common/ProtectedButton";
import { IconUserCheck } from "@tabler/icons-react";
import FollowButton from "../../../components/common/FollowButton";
import AddSupportButton from "../../../components/common/AddSupportButton";

const CTA = ({
  borderPositon,
  authorId,
  isFollowing,
  supports,
  profileSlug,
}) => {
  const user = useUserStore((state) => state.user);
  const { state: urlState } = useLocation();

  return (
    <Flex
      justifyContent={user?._id === authorId ? "end" : "space-between"}
      position="sticky"
      top={0}
      zIndex={100}
      bg="back"
      py={2}
      borderColor="brand.900"
      className={`border-${borderPositon}-4`}
    >
      {user?._id !== authorId && (
        <Flex justifyContent="end" gap={2}>
          <AddSupportButton>
            <IconHeartPlus className="mr-2" /> {supports}
          </AddSupportButton>

          <FollowButton
            profileSlug={profileSlug}
            isFollowing={isFollowing}
            profileId={authorId}
            _hover={{ bg: "brand.800" }}
            bg="transparent"
            borderColor="brand.900"
            borderWidth="1px"
            invalidateTag={"note"}
            px={1}
          />
        </Flex>
      )}
      <Flex justifyContent="end" gap={2}>
        {user?._id === authorId && (
          <MyIconButton className="border border-teal-600 ">
            <IconEdit />
          </MyIconButton>
        )}
        <MyIconButton className="border border-teal-600 ">
          <IconShare />
        </MyIconButton>
        <Link to={urlState ? urlState.from : ".."}>
          <MyIconButton className="border border-teal-600 ">
            <IconArrowRightFromArc />
          </MyIconButton>
        </Link>
      </Flex>
    </Flex>
  );
};

export default CTA;
