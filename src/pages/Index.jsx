/* eslint-disable no-unused-vars */
import { useInfiniteQuery, useIsFetching } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import Note from "../components/Note";
import { useNoteStore } from "../store/noteStore";
import loading from "../assets/Bean Eater-1s-200px.gif";

const Index = () => {
  const { ref, inView } = useInView();
  const isFetching = useIsFetching({ queryKey: ["notes"] });
  const [notes, getNotes] = useNoteStore((state) => [
    state.notes,
    state.getNotes,
  ]);

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
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-6 mt-10 px-10">
        {notes?.map((note, i) =>
          notes.length === i + 1 ? (
            <Note key={note._id} lastElRef={ref} note={note} />
          ) : (
            <Note key={note._id} note={note} />
          )
        )}
      </section>

      {isFetching ? (
        <div className=" w-full text-xl opacity-80 flex justify-center font-bold mt-4 ">
          <img alt="loading" src={loading} />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Index;
