/* eslint-disable react/prop-types */
import { useTagStore } from "../../store/tagStore";
import ChipCheckbox from "../common/ChipCheckbox";
import { Text } from "@chakra-ui/react";

const UserInterestInput = ({ tags, setBody }) => {
  const tagsList = useTagStore((state) => state.tagsList);
  return (
    <div>
      <Text mb={8} fontSize={{ base: "xl", sm: "3xl" }}>
        Choose Three Fields{" "}
      </Text>
      <div className="flex gap-2 flex-wrap justify-center">
        {tagsList.map((tag) => (
          <ChipCheckbox key={tag} tags={tags} setBody={setBody} tag={tag} />
        ))}
      </div>
    </div>
  );
};

export default UserInterestInput;