/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useInfiniteQuery, useIsFetching } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Box, Flex, GridItem, Img, SimpleGrid, Text } from "@chakra-ui/react";
import Note from "./Note";
import loading from "../../assets/Bean Eater-1s-200px.gif";
import { getNotes } from "../../lib/Api/noteApi";
import { useSearchParams } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import ZeroNotes from "../../assets/Zero.svg";

const FetchNotes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tag = searchParams.get("tag");
  const { ref, inView } = useInView();
  const isFetching = useIsFetching({ queryKey: ["notes"] });
  const user = useUserStore((state) => state.user);

  const {
    data: fecthNotes,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["notes", tag],
    queryFn: ({ pageParam = 1 }) => getNotes(pageParam, tag, user?._id),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
        lastPage.data?.currentPage < lastPage.data?.totalPages
          ? parseInt(lastPage.data.currentPage) + 1
          : undefined;
      return nextPage;
    },
    refetchOnMount: false,
  });
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacingY={{ base: 4, sm: 6, md: 8 }}
        spacingX={{ base: 0, sm: 3, md: 6 }}
        pt={{ base: 4, md: "16" }}
        p={{ base: 4 }}
      >
        {fecthNotes?.pages?.map((page) =>
          page.data?.notes.length === 0 ? (
            <GridItem
              colStart={2}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              height="200px"
              gap={4}
            >
              <Img src={ZeroNotes} w={"50%"} />
              {/* <Text color="brand.900">Zero Text Found</Text> */}
            </GridItem>
          ) : (
            page.data?.notes.map((note, i) =>
              page.data?.notes.length === i + 1 ? (
                <Note key={note._id + i} lastElRef={ref} note={note} />
              ) : (
                <Note key={note._id + i} note={note} />
              )
            )
          )
        )}
      </SimpleGrid>

      {status === "pending" ? (
        <div className=" w-full text-xl opacity-80 flex justify-center font-bold mt-4 ">
          <img alt="loading" src={loading} width={100} />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default FetchNotes;
