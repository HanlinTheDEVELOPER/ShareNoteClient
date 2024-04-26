import { Flex } from "@chakra-ui/react";
import {
  IconArrowRightFromArc,
  IconEdit,
  IconHeartPlus,
  IconShare,
  IconTrash,
} from "@tabler/icons-react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import AddSupportButton from "../../../components/common/AddSupportButton";
import FollowButton from "../../../components/common/FollowButton";
import MyIconButton from "../../../components/common/IconButton";
import { useBackToPrev } from "../../../hooks/useBackToPrev";
import { useUserStore } from "../../../store/userStore";

const CTA = ({
  borderPositon = "b",
  authorId,
  isFollowing,
  supports,
  profileSlug,
  handleDelete,
  isPending,
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
      <Flex justifyContent="end" gap={2}>
        {user?._id === authorId && (
          <>
            <MyIconButton
              type="submit"
              isDisabled={isPending}
              isLoading={isPending}
              className="border border-teal-600"
              onClick={handleDelete}
            >
              <IconTrash />
            </MyIconButton>
            <Link to={"/edit/" + slug} state={{ fromUrl: fromUrlState }}>
              <MyIconButton className="border border-teal-600 ">
                <IconEdit />
              </MyIconButton>
            </Link>
          </>
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
    </Flex>
  );
};

export default CTA;
