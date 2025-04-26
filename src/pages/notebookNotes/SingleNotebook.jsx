/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import NotesArea from "../../components/NotesArea";
import { Icons } from "../../assets/Icons";
import { Helmet } from "react-helmet";
import UseNotebooksQuery from "../../hooks/query/UseNotebooksQuery";
import UseNotesQuery from "../../hooks/query/UseNotesQuery";
import UseNewNoteCreation from "../../hooks/mutation/UseNewNoteCreation";
import { sortFunction } from "../../utils/javaScript/sortOptionsList";

const SingleNotebook = () => {
  const navigate = useNavigate();
  const { data: notebooks } = UseNotebooksQuery();
  const { data: notes } = UseNotesQuery();
  const { id } = useParams();
  const noteId = useSearchParams()[0].get("note");

  const [noteList, notebookTitle] = useMemo(() => {
    const filterNotebookNotes = notes.filter((note) => note.notebook === id);
    const findNotebook = notebooks.find((notebook) => notebook._id === id);
    return [filterNotebookNotes, findNotebook.title];
  }, [id, notes, notebooks]);

  const { mutate, isPending } = UseNewNoteCreation();

  useEffect(() => {
    if (noteId) return;

    if (noteList.length > 0) {
      const localSort = JSON.parse(localStorage.getItem("sort"));

      let firstNoteId = null;

      if (!localSort) {
        const sortedList = sortFunction(noteList, 1);
        firstNoteId = sortedList[0]._id;
      } else {
        const sortedList = sortFunction(noteList, localSort.id);
        firstNoteId = sortedList[0]._id;
      }

      navigate(`/notebooks/${id}?note=${firstNoteId}`);
    }
  }, [id, noteList, noteId]);

  if (noteList.length === 0 || !noteId) {
    return (
      <>
        <Helmet>
          <title>Notebooks | {notebookTitle}</title>
          <meta name="discription" content="A Note making Web Apps" />
        </Helmet>
        <div className="w-full h-full flex flex-col gap-2 justify-center items-center ">
          <p className="text-2xl">No Notes Available</p>
          <p>
            for <span className="italic font-semibold">{notebookTitle}</span>
          </p>
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
        <title>Notebooks | {notebookTitle}</title>
        <meta name="discription" content="A Note making Web Apps" />
      </Helmet>
      <NotesArea
        noteList={noteList}
        activeNoteId={noteId}
        title={notebookTitle}
        notebookId={id}
        icon={<Icons.notebooks />}
        currentPathname={`/notebooks/${id}`}
      />
    </>
  );
};

export default SingleNotebook;
