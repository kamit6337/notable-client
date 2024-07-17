/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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

const SingleNotebook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { notes, notebooks } = useSelector(userInitialState);
  const { pathname } = useLocation();
  const { id } = useParams();
  const { ToastContainer, showErrorMessage } = Toastify();

  const [noteList, notebookName] = useMemo(() => {
    const filterNotebookNotes = notes.filter((note) => note.notebook === id);
    const findNotebook = notebooks.find((notebook) => notebook._id === id);
    return [filterNotebookNotes, findNotebook.title];
  }, [id, notes, notebooks]);

  const handleNoteCreation = async () => {
    try {
      const notebookId = pathname.split("/").at(-1);
      const obj = {
        id: notebookId,
      };
      const navigateLink = pathname;
      const newNote = await postToBackend("/notes", obj);
      dispatch(createdNewNote(newNote.data));
      await new Promise((resolve) => setTimeout(resolve, 200)); // Adjust the time

      dispatch(toggleNoteActivation({ bool: true, data: newNote.data }));
      await new Promise((resolve) => setTimeout(resolve, 200)); // Adjust the time

      navigate(navigateLink);
    } catch (error) {
      showErrorMessage({
        message: error.message || "Issue in create note. Try later",
      });
    }
  };

  if (noteList.length === 0) {
    return (
      <>
        <Helmet>
          <title>Notebooks | {notebookName}</title>
          <meta name="discription" content="A Note making Web Apps" />
        </Helmet>
        <div className="w-full h-full flex flex-col gap-2 justify-center items-center ">
          <p className="text-2xl">No Notes Available</p>
          <p>
            for <span className="italic font-semibold">{notebookName}</span>
          </p>
          <p>
            Click on{" "}
            <span
              className="italic font-semibold cursor-pointer"
              onClick={handleNoteCreation}
            >
              Note
            </span>{" "}
            to create a new Note on this Nootbook
          </p>
        </div>
        <ToastContainer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Notebooks | {notebookName}</title>
        <meta name="discription" content="A Note making Web Apps" />
      </Helmet>
      <NotesArea
        list={noteList}
        title={notebookName}
        icon={<Icons.notebooks />}
      />
    </>
  );
};

export default SingleNotebook;
