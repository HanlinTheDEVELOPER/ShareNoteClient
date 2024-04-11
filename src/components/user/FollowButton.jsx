/* eslint-disable react/prop-types */
import { useMutation } from "@tanstack/react-query";
import ProtectedButton from "../common/ProtectedButton";
import { IconUserPlus } from "@tabler/icons-react";
import { follow, unfollow } from "../../lib/Api/userFollowApi";

const FollowButton = ({ profileSlug, isFollowing }) => {
  const { mutateAsync: followMutateAsync, isPending: isFollowPending } =
    useMutation({
      mutationKey: ["Profile"],
      mutationFn: (data) => follow(data),
    });

  const { mutateAsync: unfollowMutateAsync, isPending: isUnfollowPending } =
    useMutation({
      mutationKey: ["Profile"],
      mutationFn: (data) => unfollow(data),
    });

  const onFollowClick = async () => {
    try {
      await followMutateAsync({ profileSlug });
    } catch (error) {
      console.log(error);
    }
  };

  const onUnfollowClick = async () => {
    try {
      await unfollowMutateAsync({ profileSlug });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ProtectedButton
      width={{ sm: "fit-content" }}
      fn={isFollowing ? onUnfollowClick : onFollowClick}
      isLoading={isFollowPending || isUnfollowPending}
    >
      {isFollowing ? (
        "Followed"
      ) : (
        <>
          {" "}
          Follow <IconUserPlus size="20" />{" "}
        </>
      )}
    </ProtectedButton>
  );
};

export default FollowButton;
