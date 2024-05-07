import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import loading from "../../../assets/Bean Eater-1s-200px.gif";
import { useDeleteNoteHook } from "../../../hooks/useDeleteNoteHook";
import { getNoteBySlug } from "../../../lib/Api/noteApi";
import { useUserStore } from "../../../store/userStore";
import AuthorAndDate from "./AuthorAndDate";
import CTA from "./CTA";
import Lexical from "./Lexical";

const Details = () => {
  const { slug: detailSlug } = useParams();
  const user = useUserStore((state) => state.user);

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["note", detailSlug],
    queryFn: () => getNoteBySlug(user?._id, detailSlug),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const [handleDelete, isPending] = useDeleteNoteHook(detailSlug, -1);
  return (
    <section className=" mt-0 px-4 sm:px-0">
      {!isLoading ? (
        <>
          {" "}
          <CTA
            supports={data?.data.supports}
            authorId={data?.data.user._id}
            isFollowing={data?.data.isFollowing}
            title={data?.data.title}
            profileSlug={data?.data.user.slug}
            handleDelete={handleDelete}
            isPending={isPending}
            isSaved={data?.data.isSaved}
          />
          <div className=" shadow-lg p-3 mt-1">
            <h3 className="text-3xl font-medium">{data?.data.title}</h3>
            <AuthorAndDate
              author={data?.data.user}
              tags={data?.data.tags}
              createdAt={data?.data.createdAt}
              updatedAt={data?.data.updatedAt}
            />
            <Lexical content={data?.data.content} />
          </div>
          <CTA
            supports={data?.data.supports}
            borderPositon={"t"}
            authorId={data?.data.user._id}
            isFollowing={data?.data.isFollowing}
            profileSlug={data?.data.user.slug}
            handleDelete={handleDelete}
            isPending={isPending}
            isSaved={data?.data.isSaved}
          />
        </>
      ) : (
        <div className=" w-full text-xl opacity-80 flex justify-center font-bold mt-4 ">
          <img alt="loading" src={loading} width={100} />
        </div>
      )}
    </section>
  );
};

export default Details;
