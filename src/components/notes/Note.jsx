/* eslint-disable react/prop-types */

import { Link, useLocation } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import { Avatar, Flex, Stack, Text } from "@chakra-ui/react";
import { formatDate } from "../../lib/formatDateString";
import { IconHearts } from "@tabler/icons-react";
import NoteMenu from "./NoteMenu";
import { useBackToPrev } from "../../hooks/useBackToPrev";

const Note = ({ note, lastElRef }) => {
  const user = useUserStore((state) => state.user);
  const { fromUrl, fromUrlState } = useBackToPrev();
  return (
    <div className=" w-full border-t-4 border-t-teal-600 shadow-lg p-3">
      <div className="relative flex items-start justify-between gap-4">
        <Link
          to={`/notes/${note.slug}`}
          state={{ fromUrl: fromUrlState }}
          ref={lastElRef}
        >
          <h3 className="text-xl font-medium font-wrap">
            {note.title.substr(0, 50)}
          </h3>
        </Link>
        <div className="absolute right-0">
          {note.user._id === user?._id && <NoteMenu />}
        </div>
      </div>
      <Flex mt={4} gap={4} w={"100%"} alignItems="center">
        <Avatar src={note.user.avatar} alt="avatar" name={note.user.name} />
        <Stack fontSize="small" spacing={0}>
          <Text size="sm">{note.user.name}</Text>
          <Text as="i">{formatDate(note.createdAt)}</Text>
        </Stack>
        <Flex gap={2} alignItems="center" ml="auto">
          <IconHearts />
          {note.supports}
        </Flex>
      </Flex>
      <div className="mt-2 flex items-center justify-end gap-4"></div>
    </div>
  );
};

export default Note;
