import { IconButton, useToast } from "@chakra-ui/react";
import { IconSettingsCog } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import useSetUser from "../../hooks/useSetUser";
import { updateTags } from "../../lib/Api/userApi";
import { useUserStore } from "../../store/userStore";
import TagsModel from "../common/Model";
import UserInterestInput from "./UserInterestInput";
import { useCustomToast } from "../../hooks/useCustomToast";

const TagsCustomizeModel = () => {
  const { successToast, errorToast } = useCustomToast();
  const user = useUserStore((state) => state.user);
  const [tags, setTags] = useState(user?.tags);
  const [setUserFn] = useSetUser();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["user"],
    mutationFn: (data) => updateTags(data),
  });

  const [onClose, setOnClose] = useState(null);

  const onSubmit = async () => {
    try {
      await mutateAsync({ tags });
      onClose.fn();
      successToast("Success");
      setUserFn();
    } catch (error) {
      console.log(error);
      errorToast("Failed");
    }
  };

  return (
    <TagsModel
      label="Customize"
      onClick={onSubmit}
      setOnClose={setOnClose}
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
