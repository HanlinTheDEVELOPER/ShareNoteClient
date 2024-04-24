/* eslint-disable react/prop-types */
import { useMutation } from "@tanstack/react-query";
import ProtectedButton from "./ProtectedButton";
import { IconUserCheck, IconUserPlus } from "@tabler/icons-react";
import { follow, unfollow } from "../../lib/Api/userFollowApi";
import { queryClient } from "../../main";
import { useToast } from "@chakra-ui/react";

const FollowButton = ({
  profileSlug,
  isFollowing,
  profileId,
  fromProfile = false,
  invalidateTag,
  ...props
}) => {
  const toast = useToast();
  const { mutateAsync: followMutateAsync, isPending: isFollowPending } =
    useMutation({
      mutationKey: [invalidateTag],
      mutationFn: (data) => follow(data),
      onSuccess: () => queryClient.invalidateQueries([invalidateTag]),
    });

  const { mutateAsync: unfollowMutateAsync, isPending: isUnfollowPending } =
    useMutation({
      mutationKey: ["profile"],
      mutationFn: (data) => unfollow(data),
      onSuccess: () => queryClient.invalidateQueries("profile"),
    });

  const onFollowClick = async () => {
    try {
      await followMutateAsync({ profileId });
      toast({
        description: "Followed",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onUnfollowClick = async () => {
    try {
      await unfollowMutateAsync({ profileSlug });
      toast({
        description: "Unfollowed",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ProtectedButton
      {...props}
      width={{ sm: "fit-content" }}
      fn={isFollowing ? onUnfollowClick : onFollowClick}
      isLoading={isFollowPending || isUnfollowPending}
    >
      {isFollowing ? (
        <>
          {fromProfile && "Followed"}
          <IconUserCheck />
        </>
      ) : (
        <>
          {fromProfile && "Follow"}
          <IconUserPlus />
        </>
      )}
    </ProtectedButton>
  );
};

export default FollowButton;
