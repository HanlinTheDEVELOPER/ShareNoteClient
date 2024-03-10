/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useInfiniteQuery, useIsFetching } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { SimpleGrid } from "@chakra-ui/react";
import Note from "./Note";
import loading from "../../assets/Bean Eater-1s-200px.gif";
import { getNotes } from "../../lib/noteApi";

const FetchNotes = ({ activeTab }) => {
  console.log(activeTab);
  const { ref, inView } = useInView();
  const isFetching = useIsFetching({ queryKey: ["notes"] });

  const {
    data: fecthNotes,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
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
        spacing={{ base: 4, sm: 6, md: 8 }}
        pt={{ base: 4, sm: "16" }}
        p={{ base: 4 }}
      >
        {fecthNotes?.pages?.map((page) =>
          page.data?.notes.map((note, i) =>
            page.data?.notes.length === i + 1 ? (
              <Note key={note._id + i} lastElRef={ref} note={note} />
            ) : (
              <Note key={note._id + i} note={note} />
            )
          )
        )}
      </SimpleGrid>

      {isFetching ? (
        <div className=" w-full text-xl opacity-80 flex justify-center font-bold mt-4 ">
          <img alt="loading" src={loading} width={"50"} height={"50"} />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default FetchNotes;
