/* eslint-disable react/prop-types */

import { Avatar, Flex, Stack, Text } from "@chakra-ui/react";
import { IconHearts } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useBackToPrev } from "../../hooks/useBackToPrev";
import { formatDate } from "../../lib/formatDateString";
import { useUserStore } from "../../store/userStore";
import NoteMenu from "./NoteMenu";
import SupportModel from "./SupporterModel/SupporterModel";

const Note = ({ note, lastElRef }) => {
  const user = useUserStore((state) => state.user);
  const { fromUrl, fromUrlState } = useBackToPrev();
  return (
    <div className="relative  border-t-4 border-t-teal-600 shadow-lg p-3 h-44">
      <div className=" flex items-start justify-between gap-4 h-1/2 min-h-1/2 max-h-1/2 overflow-hidden">
        <Link
          className="w-full h-full"
          to={`/notes/${note.slug}`}
          state={{ fromUrl: fromUrlState }}
          ref={lastElRef}
        >
          <div className="text-xl font-medium  ">
            {note.title.substr(0, 50)}...
          </div>
        </Link>
      </div>
      <div className="absolute right-0 top-2">
        {note.user._id === user?._id && <NoteMenu slug={note.slug} />}
      </div>
      <hr className="opacity-30" />
      <Flex mt={4} gap={4} w={"100%"} alignItems="center">
        <Link to={"/profile?user=" + note.user.slug}>
          <Avatar src={note.user.avatar} alt="avatar" name={note.user.name} />
        </Link>
        <Link to={"/profile?user=" + note.user.slug}>
          <Stack fontSize="small" spacing={0}>
            <Text size="sm">{note.user.name}</Text>
            <Text as="i">{formatDate(note.createdAt)}</Text>
          </Stack>
        </Link>
        <Flex gap={2} alignItems="center">
          <SupportModel
            variant="link"
            p={0}
            slug={note.slug}
            _hover={{
              bg: "transparent",
              borderBottomColor: "brand.900",
              borderBottomWidth: 2,
              borderRadius: 0,
              pb: 2,
            }}
          >
            <IconHearts className="mr-2" />
            {note.supports}
          </SupportModel>
        </Flex>
      </Flex>{" "}
    </div>
  );
};

export default Note;
