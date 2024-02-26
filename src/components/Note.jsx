/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import { Flex, Stack, Text, Box } from "@chakra-ui/react";
import { formatDate } from "../lib/formatDateString";
import { IconHearts } from "@tabler/icons-react";

const Note = ({ note, lastElRef }) => {
  const user = useUserStore((state) => state.user);

  return (
    <Link to={`/notes/${note._id}`} ref={lastElRef}>
      <div className=" w-full border-t-4 border-t-teal-600 shadow-lg p-3">
        <div className="flex items-center justify-start gap-4">
          <div>
            <h3 className="text-xl font-medium">{note.slug}</h3>
          </div>
          {note.sender._id === user?._id && <p>Edit</p>}
        </div>
        <Flex mt={4} gap={4} w={"100%"} alignItems="center">
          <img
            src={note.sender.avatar}
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
          <Stack fontSize="small" spacing={0}>
            <Text size="sm">{note.sender.name}</Text>
            <Text as="i">{formatDate(note.createdAt)}</Text>
          </Stack>
          <Flex gap={2} alignItems="center" ml="auto">
            <IconHearts />
            {note.supports}
          </Flex>
        </Flex>
        <div className="mt-2 flex items-center justify-end gap-4"></div>
      </div>
    </Link>
  );
};

export default Note;
