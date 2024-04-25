import React from "react";
import MyIconButton from "../../../components/common/IconButton";
import {
  IconArrowRightFromArc,
  IconEdit,
  IconHeartPlus,
  IconShare,
  IconUserPlus,
} from "@tabler/icons-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useUserStore } from "../../../store/userStore";
import { Flex } from "@chakra-ui/react";
import ProtectedButton from "../../../components/common/ProtectedButton";
import { IconUserCheck } from "@tabler/icons-react";
import FollowButton from "../../../components/common/FollowButton";
import AddSupportButton from "../../../components/common/AddSupportButton";
import { useBackToPrev } from "../../../hooks/useBackToPrev";

const CTA = ({
  borderPositon = "b",
  authorId,
  isFollowing,
  supports,
  profileSlug,
}) => {
  const user = useUserStore((state) => state.user);

  const { slug } = useParams();

  const { fromUrl, fromUrlState } = useBackToPrev();
  const border =
    borderPositon === "t"
      ? {
          borderTopWidth: 2,
          borderTopColor: "brand.900",
        }
      : { borderBottomWidth: 2, borderBottomColor: "brand.900" };

  return (
    <Flex
      justifyContent={user?._id === authorId ? "end" : "space-between"}
      position="sticky"
      top={0}
      zIndex={10}
      bg="back"
      py={2}
      {...border}
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
          <Link to={"/edit/" + slug} state={{ fromUrl: fromUrlState }}>
            <MyIconButton className="border border-teal-600 ">
              <IconEdit />
            </MyIconButton>
          </Link>
        )}
        <MyIconButton className="border border-teal-600 ">
          <IconShare />
        </MyIconButton>
        <Link to={fromUrl ?? ".."}>
          <MyIconButton className="border border-teal-600 ">
            <IconArrowRightFromArc />
          </MyIconButton>
        </Link>
      </Flex>
    </Flex>
  );
};

export default CTA;
