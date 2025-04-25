import { useDispatch, useSelector } from "react-redux";
import {
  createdNewNote,
  userInitialState,
} from "../../redux/slice/initialUserDataSlice";
import NotesArea from "../../components/NotesArea";
import { Icons } from "../../assets/Icons";
import { Helmet } from "react-helmet";
import { useNavigate, useSearchParams } from "react-router-dom";
import { postToBackend } from "../../utils/api/userApi";
import { toggleNoteActivation } from "../../redux/slice/toggleSlice";
import Toastify from "../../lib/Toastify";
import UseNewNoteCreation from "../../hooks/mutation/UseNewNoteCreation";
import UseNotesQuery from "../../hooks/query/UseNotesQuery";
import { useEffect } from "react";

const AllNotes = () => {
  const navigate = useNavigate();
  const { primaryNotebook } = useSelector(userInitialState);
  const { data: notes } = UseNotesQuery();
  const dispatch = useDispatch();
  const { showErrorMessage } = Toastify();
  const { mutate } = UseNewNoteCreation();
  const noteId = useSearchParams()[0].get("note");

  useEffect(() => {
    if (noteId) return;

    if (notes.length > 0) {
      const findNoteId = notes[0]._id;
      navigate(`/notes?note=${findNoteId}`);
    }
  }, [notes, noteId, navigate]);

  // const handleNoteCreation = async () => {
  //   try {
  //     const obj = {
  //       id: primaryNotebook._id,
  //     };

  //     const navigateLink = "/notes";
  //     const newNote = await postToBackend("/notes", obj);

  //     dispatch(createdNewNote(newNote.data));
  //     await new Promise((resolve) => setTimeout(resolve, 100)); // Adjust the time

  //     dispatch(toggleNoteActivation({ bool: true, data: newNote.data }));
  //     await new Promise((resolve) => setTimeout(resolve, 100)); // Adjust the time

  //     navigate(navigateLink);
  //   } catch (error) {
  //     showErrorMessage({
  //       message: error.message || "Issue in create note. Try later",
  //     });
  //   }
  // };

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
