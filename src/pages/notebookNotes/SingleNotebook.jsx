/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createdNewNote,
  userInitialState,
} from "../../redux/slice/initialUserDataSlice";
import NotesArea from "../../components/NotesArea";
import { Icons } from "../../assets/Icons";
import { Helmet } from "react-helmet";
import { postToBackend } from "../../utils/api/userApi";
import { toggleNoteActivation } from "../../redux/slice/toggleSlice";
import Toastify from "../../lib/Toastify";
import UseNotebooksQuery from "../../hooks/query/UseNotebooksQuery";
import UseNotesQuery from "../../hooks/query/UseNotesQuery";
import UseNewNoteCreation from "../../hooks/mutation/UseNewNoteCreation";

const SingleNotebook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { notes } = useSelector(userInitialState);
  const { data: notebooks } = UseNotebooksQuery();
  const { data: notes } = UseNotesQuery();

  const { pathname } = useLocation();
  const { id } = useParams();
  // const { ToastContainer, showErrorMessage } = Toastify();
  const noteId = useSearchParams()[0].get("note");

  const [noteList, notebookTitle] = useMemo(() => {
    const filterNotebookNotes = notes.filter((note) => note.notebook === id);
    const findNotebook = notebooks.find((notebook) => notebook._id === id);
    return [filterNotebookNotes, findNotebook.title];
  }, [id, notes, notebooks]);

  const { mutate } = UseNewNoteCreation();

  useEffect(() => {
    if (noteId) return;

    if (noteList.length > 0) {
      const findNoteId = noteList[0]._id;
      navigate(`/notebooks/${id}?note=${findNoteId}`);
    }
  }, [id, noteList, noteId]);

  // const handleNoteCreation = async () => {
  //   try {
  //     const notebookId = pathname.split("/").at(-1);
  //     const obj = {
  //       id: notebookId,
  //     };
  //     const navigateLink = pathname;
  //     const newNote = await postToBackend("/notes", obj);

  //     dispatch(createdNewNote(newNote));
  //     // await new Promise((resolve) => setTimeout(resolve, 200)); // Adjust the time

  //     // dispatch(toggleNoteActivation({ bool: true, data: newNote.data }));
  //     // await new Promise((resolve) => setTimeout(resolve, 200)); // Adjust the time

  //     const noteId = newNote._id;
  //     navigate(`/notebooks/${id}?note=${noteId}`);
  //     // navigate(navigateLink);
  //   } catch (error) {
  //     showErrorMessage({
  //       message: error.message || "Issue in create note. Try later",
  //     });
  //   }
  // };

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
              onClick={() => mutate()}
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
