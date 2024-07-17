import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  createdNewNote,
  userInitialState,
} from "../../redux/slice/initialUserDataSlice";
import { useMemo } from "react";
import NotesArea from "../../components/NotesArea";
import { Icons } from "../../assets/Icons";
import { Helmet } from "react-helmet";
import { postToBackend } from "../../utils/api/userApi";
import { toggleNoteActivation } from "../../redux/slice/toggleSlice";
import Toastify from "../../lib/Toastify";

const TagNotes = () => {
  const { notes, tags, primaryNotebook } = useSelector(userInitialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { id } = useParams();

  const { ToastContainer, showErrorMessage } = Toastify();

  const [noteList, tagName] = useMemo(() => {
    const findTag = tags.find((tag) => tag._id === id);
    const tagName = findTag?.title;
    const noteList = notes.filter((note) => note.tags.includes(id));
    return [noteList, tagName];
  }, [id, tags, notes]);

  const handleNoteCreation = async () => {
    try {
      const navigateLink = pathname;
      const obj = {
        id: primaryNotebook._id,
      };

      const tagId = pathname.split("/").at(-1);
      obj.tagId = tagId;

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
          <title>Tags | {tagName}</title>
          <meta name="discription" content="A Note making Web Apps" />
        </Helmet>

        <div className="w-full h-full flex flex-col gap-2 justify-center items-center ">
          <p className="text-2xl">No Notes Available</p>
          <p>
            for <span className="italic font-semibold">{tagName}</span>
          </p>
          <p>
            Click on{" "}
            <span
              className="italic font-semibold cursor-pointer"
              onClick={handleNoteCreation}
            >
              Note
            </span>{" "}
            to create a new Note on this Tag
          </p>
        </div>
        <ToastContainer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Tags | {tagName}</title>
        <meta name="discription" content="A Note making Web Apps" />
      </Helmet>
      <NotesArea list={noteList} title={tagName} icon={<Icons.tagOutline />} />
    </>
  );
};

export default TagNotes;
