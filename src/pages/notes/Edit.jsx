import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import NoteForm from "../../components/notes/NoteForm";
import { getNoteForUpdate } from "../../lib/Api/noteApi";

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
