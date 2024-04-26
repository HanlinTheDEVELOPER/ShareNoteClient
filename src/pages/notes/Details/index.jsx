import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getNoteBySlug } from "../../../lib/Api/noteApi";
import Lexical from "./Lexical";
import {
  IconArrowRightFromArc,
  IconEdit,
  IconShare,
} from "@tabler/icons-react";
import MyIconButton from "../../../components/common/IconButton";
import { Suspense } from "react";
import AuthorAndDate from "./AuthorAndDate";
import CTA from "./CTA";
import { useUserStore } from "../../../store/userStore";
import { useDeleteNoteHook } from "../../../hooks/useDeleteNoteHook";

const Details = () => {
  const { slug: detailSlug } = useParams();
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["note", detailSlug],
    queryFn: () => getNoteBySlug(user?._id, detailSlug),
  });

  // if (error?.message === "Request failed with status code 404" || isError) {
  //   navigate("/not_found");
  // }

  const [handleDelete, isPending] = useDeleteNoteHook(detailSlug);
  return (
    <section className=" mt-0">
      {!isLoading && (
        <>
          {" "}
          <CTA
            supports={data?.data.supports}
            authorId={data?.data.user._id}
            isFollowing={data?.data.isFollowing}
            profileSlug={data?.data.user.slug}
            handleDelete={handleDelete}
            isPending={isPending}
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
          {/* <CTA
            supports={data?.data.supports}
            borderPositon={"t"}
            authorId={data?.data.user._id}
            isFollowing={data?.data.isFollowing}
            profileSlug={data?.data.user.slug}
            handleDelete={handleDelete}
            isPending={isPending}
          /> */}
        </>
      )}
    </section>
  );
};

export default Details;
