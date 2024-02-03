/* eslint-disable react-refresh/only-export-components */

import { useEffect } from "react";
import Note from "../components/Note";
import { useNoteStore } from "../store/noteStore";

const Index = () => {
  const [notes, getNotes] = useNoteStore((state) => [
    state.notes,
    state.getNotes,
  ]);

  useEffect(() => {
    getNotes();
  }, []);
  return (
    <section className="grid grid-cols-3 gap-6 mt-10 px-10">
      {notes?.map((note) => (
        <Note key={note._id} note={note} />
      ))}
    </section>
  );
};

export default Index;
