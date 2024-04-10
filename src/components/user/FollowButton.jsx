/* eslint-disable react/prop-types */
import { useMutation } from "@tanstack/react-query";
import ProtectedButton from "../common/ProtectedButton";
import { IconUserPlus } from "@tabler/icons-react";
import { follow } from "../../lib/Api/userFollowApi";

const FollowButton = ({ profileSlug }) => {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["User"],
    mutationFn: (data) => follow(data),
  });

  const onClick = async () => {
    try {
      await mutateAsync({ profileSlug });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ProtectedButton
      width={{ sm: "fit-content" }}
      fn={onClick}
      isLoading={isPending}
    >
      Follow <IconUserPlus size="20" />
    </ProtectedButton>
  );
};

export default FollowButton;
