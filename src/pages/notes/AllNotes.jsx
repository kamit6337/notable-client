import NotesArea from "../../components/NotesArea";
import { Icons } from "../../assets/Icons";
import { Helmet } from "react-helmet";
import { useNavigate, useSearchParams } from "react-router-dom";
import UseNewNoteCreation from "../../hooks/mutation/UseNewNoteCreation";
import UseNotesQuery from "../../hooks/query/UseNotesQuery";
import { useEffect } from "react";
import { sortFunction } from "../../utils/javaScript/sortOptionsList";

const AllNotes = () => {
  const navigate = useNavigate();
  const { data: notes } = UseNotesQuery();
  const { mutate, isPending } = UseNewNoteCreation();
  const noteId = useSearchParams()[0].get("note");

  useEffect(() => {
    if (noteId) return;

    if (notes.length > 0) {
      const localSort = JSON.parse(localStorage.getItem("sort"));

      let firstNoteId = null;

      if (!localSort) {
        const sortedList = sortFunction(notes, 1);
        firstNoteId = sortedList[0]._id;
      } else {
        const sortedList = sortFunction(notes, localSort.id);
        firstNoteId = sortedList[0]._id;
      }

      navigate(`/notes?note=${firstNoteId}`);
    }
  }, [notes, noteId, navigate]);

  if (notes.length === 0 || !noteId) {
    return (
      <>
        <Helmet>
          <title>Notes</title>
          <meta name="discription" content="A Note making Web Apps" />
        </Helmet>
        <div className="w-full h-full flex flex-col gap-2 justify-center items-center ">
          <p className="text-2xl">No Notes Available</p>
          <p>
            Click on{" "}
            <span
              className="italic font-semibold cursor-pointer"
              onClick={() => (isPending ? "" : mutate())}
            >
              Note
            </span>{" "}
            to create a new Note on this Nootbook
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Notes</title>
        <meta name="discription" content="A Note making Web Apps" />
      </Helmet>
      <NotesArea
        noteList={notes}
        activeNoteId={noteId}
        title={"All Notes"}
        currentPathname={"/notes"}
        icon={<Icons.notesSolid />}
      />
    </>
  );
};

export default AllNotes;
