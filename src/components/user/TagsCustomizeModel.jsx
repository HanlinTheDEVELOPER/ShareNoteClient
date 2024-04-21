import { IconButton, useDisclosure, useToast } from "@chakra-ui/react";
import { IconSettingsCog } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import useSetUser from "../../hooks/useSetUser";
import { updateTags } from "../../lib/Api/userApi";
import { useUserStore } from "../../store/userStore";
import TagsModel from "../common/Model";
import UserInterestInput from "./UserInterestInput";

const TagsCustomizeModel = () => {
  const toast = useToast();
  const user = useUserStore((state) => state.user);
  const [tags, setTags] = useState(user?.tags);
  const [setUserFn] = useSetUser();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["user"],
    mutationFn: (data) => updateTags(data),
  });

  const onSubmit = async () => {
    try {
      await mutateAsync({ tags });
      onClose();
      toast({
        description: "Update Success",
        status: "success",
        isClosable: true,
      });
      setUserFn();
    } catch (error) {
      console.log(error);
      toast({
        description: "Update Fail",
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <TagsModel
      label="Customize"
      onClick={onSubmit}
      isDisabled={tags.length !== 3}
      isLoading={isPending}
      toggleElement={
        <IconButton>
          <IconSettingsCog />
        </IconButton>
      }
    >
      <UserInterestInput tags={tags} setTags={setTags} isFromModal={true} />
    </TagsModel>
  );
};

export default TagsCustomizeModel;
