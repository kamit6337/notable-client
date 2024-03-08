/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import UpdateNote from "../hooks/mutation/UpdateNote";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTheNote,
  updatedTheNote,
  userInitialState,
} from "../redux/slice/initialUserDataSlice";
import { Icons } from "../assets/Icons";
import {
  deleteToBackend,
  patchToBackend,
  postToBackend,
} from "../utils/api/userApi";
import { Link, useNavigate } from "react-router-dom";
import QuillTextarea from "./QuillTextarea";
import timeAgoDate from "../utils/javaScript/timeAgoDate";
import { toggleHideSidebars, toggleState } from "../redux/slice/toggleSlice";
import Toastify from "../lib/Toastify";
import convertDateType from "../utils/javaScript/convertDateType";

const TextArea = ({ activeNote, resetSetIndex = null, backToHome = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { hideSidebars } = useSelector(toggleState);

  const [typingTimeout, setTypingTimeout] = useState(null); // State to hold typing timeout
  const [showOption, setShowOption] = useState(false);
  const [isTitleTyping, setIsTitleTyping] = useState(false);
  const [deafultTitle, setDefaultTitle] = useState("");
  const [deafultBody, setDefaultBody] = useState("");
  const { notebooks } = useSelector(userInitialState);

  const { ToastContainer, showErrorMessage } = Toastify();

  const { register, getValues, reset, setFocus } = useForm({
    defaultValues: {
      title: "",
      body: "",
    },
  });

  const {
    mutate,
    data,
    error,
    reset: updateNoteReset,
  } = UpdateNote(activeNote._id);

  const noteNotebook = useMemo(() => {
    const findNotebook = notebooks.find(
      (notebook) => notebook._id === activeNote.notebook
    );
    return findNotebook;
  }, [activeNote, notebooks]);

  useEffect(() => {
    if (!isTitleTyping) {
      setFocus("body");
    }
  }, [setFocus, activeNote, isTitleTyping]);

  useEffect(() => {
    if (activeNote) {
      const resetValues = {
        title: activeNote.title,
        body: activeNote.body,
      };
      reset(resetValues);

      setDefaultTitle(activeNote.title);
      setDefaultBody(activeNote.body);
    }
  }, [activeNote, reset]);

  useEffect(() => {
    if (data) {
      dispatch(updatedTheNote(data.data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (error) {
      showErrorMessage({ message: error.message || "Something went wrong" });
      updateNoteReset();
    }
  }, [error, showErrorMessage, updateNoteReset]);

  const changeTitle = (e) => {
    const { value } = e.target;

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    // Set a timeout to trigger patch request after 500ms of user stopping typing
    const timeout = setTimeout(() => {
      const obj = {
        id: activeNote._id,
        title: value,
        body: getValues().body,
      };

      mutate(obj);
    }, 1000);

    setTypingTimeout(timeout);
  };

  const handleDeleteNote = async () => {
    dispatch(toggleHideSidebars({ bool: false }));
    setShowOption(false);
    try {
      await deleteToBackend("/notes", {
        id: activeNote._id,
      });

      let localNotes = JSON.parse(localStorage.getItem("notesId"));
      if (localNotes) {
        localNotes = localNotes.filter((id) => id !== activeNote._id);
        localStorage.setItem("notesId", JSON.stringify(localNotes));
      }

      if (resetSetIndex) {
        resetSetIndex(activeNote._id);
      }

      await new Promise((resolve) => setTimeout(resolve, 300)); // Adjust the timeout

      dispatch(deleteTheNote(activeNote._id));

      if (backToHome) {
        navigate("/");
      }
    } catch (error) {
      showErrorMessage({ message: error.message || "Something went wrong" });
    }
  };

  const handleAddToShortcut = async () => {
    setShowOption(false);
    try {
      const updatedNote = await postToBackend("/shortcut", {
        noteId: activeNote._id,
      });

      dispatch(updatedTheNote(updatedNote.data));
    } catch (error) {
      showErrorMessage({ message: error.message || "Something went wrong" });
    }
  };

  const handleRemoveShortcut = async () => {
    setShowOption(false);
    try {
      const updatedNote = await patchToBackend("/shortcut", {
        noteId: activeNote._id,
      });

      dispatch(updatedTheNote(updatedNote.data));
    } catch (error) {
      showErrorMessage({ message: error.message || "Something went wrong" });
    }
  };

  const handleHideSidebars = () => {
    const reverseBool = !hideSidebars.bool;
    dispatch(toggleHideSidebars({ bool: reverseBool }));
  };

  return (
    <>
      <main className="h-full items-start ">
        <header className="h-24 w-full border-b flex justify-between px-4">
          <div className="w-72 h-full py-3 pl-2 flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <p
                className="border border-black cursor-pointer"
                onClick={handleHideSidebars}
              >
                <Icons.zoom />
              </p>
              <div className="w-[2px] h-full bg-gray-400" />

              <Link
                to={`/notebooks/${noteNotebook._id}`}
                onClick={() => dispatch(toggleHideSidebars({ bool: false }))}
              >
                <div className="flex items-center gap-1">
                  <p>
                    <Icons.notebooks />
                  </p>
                  <p className="text-sm">{noteNotebook.title}</p>
                </div>
              </Link>
            </div>
            <div className="w-full ">
              <input
                {...register("title")}
                className="w-full h-full  text-xl font-bold outline-none bg-my_notearea_white"
                placeholder="title"
                onChange={changeTitle}
                onClick={() => setIsTitleTyping(true)}
                autoComplete="off"
                spellCheck="false"
                onKeyDown={(e) => e.key === "Enter" && setIsTitleTyping(false)}
              />
            </div>
          </div>

          <div className="h-full  flex flex-col justify-between text-xs p-1">
            <div
              className="p-2 relative w-full flex justify-end"
              onMouseLeave={() => setShowOption(false)}
            >
              <p
                className="cursor-pointer"
                onMouseEnter={() => setShowOption(true)}
              >
                <Icons.options className="text-xl" />
              </p>

              {showOption && (
                <div className="absolute z-10 top-full right-0 bg-gray-100 rounded-lg whitespace-nowrap ">
                  {activeNote.shortcut ? (
                    <p
                      className="p-4 text-sm cursor-pointer hover:bg-gray-200 hover:rounded-t-lg"
                      onClick={handleRemoveShortcut}
                    >
                      Remove From Shortcut
                    </p>
                  ) : (
                    <p
                      className="p-4 text-sm cursor-pointer hover:bg-gray-200 hover:rounded-t-lg"
                      onClick={handleAddToShortcut}
                    >
                      Add to Shortcut
                    </p>
                  )}
                  <p
                    className="p-4 text-sm cursor-pointer border-t-2 hover:bg-gray-200 hover:rounded-b-lg"
                    onClick={handleDeleteNote}
                  >
                    Delete Note
                  </p>
                </div>
              )}
            </div>
            <div className="self-end">
              <p>Created At : {convertDateType(activeNote.createdAt)}</p>

              <p>
                last updated : <span>{timeAgoDate(activeNote.updatedAt)}</span>
              </p>
            </div>
          </div>
        </header>
        <div className="w-full" style={{ height: "calc(100% - 100px)" }}>
          <QuillTextarea
            deafultTitle={deafultTitle}
            deafultBody={deafultBody}
            activeNote={activeNote}
          />
        </div>
      </main>
      <ToastContainer />
    </>
  );
};

export default TextArea;
