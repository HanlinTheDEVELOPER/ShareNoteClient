import NoteForm from "../../components/notes/NoteForm";

const Create = () => {
  return (
    <section className="px-10 mt-10">
      <NoteForm isCreate={true} />
    </section>
  );
};

export default Create;
