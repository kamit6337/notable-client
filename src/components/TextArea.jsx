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
import changeDate from "../utils/javaScript/changeDate";

const TextArea = ({ activeNote, resetSetIndex = null, backToHome = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [typingTimeout, setTypingTimeout] = useState(null); // State to hold typing timeout
  const [showOption, setShowOption] = useState(false);
  const [isTitleTyping, setIsTitleTyping] = useState(false);
  const [deafultTitle, setDefaultTitle] = useState("");
  const [deafultBody, setDefaultBody] = useState("");
  const { notebooks } = useSelector(userInitialState);

  const { register, getValues, reset, setFocus } = useForm({
    defaultValues: {
      title: "",
      body: "",
    },
  });

  const { mutate, data } = UpdateNote(activeNote._id);

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
      console.log("data", data);
      dispatch(updatedTheNote(data.data));
    }
  }, [data, dispatch]);

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

      console.log(obj);
    }, 1000);

    setTypingTimeout(timeout);
  };

  const handleDeleteNote = async () => {
    setShowOption(false);

    try {
      const deleteNote = await deleteToBackend("/notes", {
        id: activeNote._id,
      });
      console.log(deleteNote);

      let localNotes = JSON.parse(localStorage.getItem("notesId"));
      if (localNotes) {
        localNotes = localNotes.filter((id) => id !== activeNote._id);
        localStorage.setItem("notesId", JSON.stringify(localNotes));
      }

      if (resetSetIndex) {
        resetSetIndex(activeNote._id);
      }

      await new Promise((resolve) => setTimeout(resolve, 100)); // Adjust the timeout

      dispatch(deleteTheNote(activeNote._id));

      if (backToHome) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToShortcut = async () => {
    setShowOption(false);
    try {
      const updatedNote = await postToBackend("/shortcut", {
        noteId: activeNote._id,
      });

      console.log("updated Note", updatedNote);

      dispatch(updatedTheNote(updatedNote.data));
    } catch (error) {
      console.log("error from add to shortcut", error);
    }
  };

  const handleRemoveShortcut = async () => {
    setShowOption(false);
    try {
      const updatedNote = await patchToBackend("/shortcut", {
        noteId: activeNote._id,
      });

      console.log("updated Note", updatedNote);

      dispatch(updatedTheNote(updatedNote.data));
    } catch (error) {
      console.log("error from add to shortcut", error);
    }
  };

  return (
    <main className="h-full items-start ">
      <header className="h-24 w-full border-b flex justify-between px-4">
        <div className="w-72 h-full py-3 pl-2 flex flex-col justify-between">
          <Link to={`/notebooks/${noteNotebook._id}`}>
            <div className="flex items-center gap-1">
              <p>
                <Icons.notebooks />
              </p>
              <p className="text-sm">{noteNotebook.title}</p>
            </div>
          </Link>

          <div className="w-full">
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

        <div className="h-full w-48 flex flex-col justify-between text-xs p-2">
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
          <p className="self-end">
            last updated : <span>{changeDate(activeNote.updatedAt, true)}</span>
          </p>
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
  );
};

export default TextArea;
