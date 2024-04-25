import { useQuery } from "@tanstack/react-query";
import NoteForm from "../../components/notes/NoteForm";
import { getNoteBySlug, getNoteForUpdate } from "../../lib/Api/noteApi";
import { useParams } from "react-router-dom";
import { startTransition, Suspense } from "react";

const Edit = () => {
  const { slug } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["note", slug],
    queryFn: () => getNoteForUpdate(slug),
  });
  return (
    <section className="px-10 mt-10">
      {isLoading ? (
        <div> loading </div>
      ) : (
        <NoteForm
          isCreate={false}
          title={data?.data.title}
          content={data?.data.content}
          tags={data?.data.tags}
          slug={slug}
        />
      )}
    </section>
  );
};

export default Edit;
