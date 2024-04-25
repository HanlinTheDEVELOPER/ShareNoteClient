import { Link, useParams } from "react-router-dom";
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

const Details = () => {
  const { slug } = useParams();
  const user = useUserStore((state) => state.user);
  const { data, error, isLoading } = useQuery({
    queryKey: ["note", slug],
    queryFn: () => getNoteBySlug(user?._id, slug),
  });

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
          />
        </>
      )}
    </section>
  );
};

export default Details;
