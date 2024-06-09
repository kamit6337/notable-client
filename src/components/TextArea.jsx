/* eslint-disable react/prop-types */
import { useEffect, useMemo, useRef, useState } from "react";
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
import { toggleHideSidebars, toggleState } from "../redux/slice/toggleSlice";
import Toastify from "../lib/Toastify";
import convertDateType from "../utils/javaScript/convertDateType";
import changeDate from "../utils/javaScript/changeDate";
import ReactQuill from "react-quill";

const UNTITLED = "Untitled";

const TextArea = ({ activeNote, resetSetIndex = null, backToHome = false }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { hideSidebars } = useSelector(toggleState);
  const [typingTimeout, setTypingTimeout] = useState(null); // State to hold typing timeout
  const [showOption, setShowOption] = useState(false);
  const [focusToBody, setFocusToBody] = useState(false);
  const { notebooks } = useSelector(userInitialState);

  const [value, setValue] = useState({
    title: "",
    body: "",
  });

  const { ToastContainer, showErrorMessage } = Toastify();

  const noteNotebook = useMemo(() => {
    const findNotebook = notebooks.find(
      (notebook) => notebook._id === activeNote.notebook
    );
    return findNotebook;
  }, [activeNote, notebooks]);

  useEffect(() => {
    if (activeNote._id) {
      setValue({
        title: activeNote.title,
        body: activeNote.body,
      });
    }
  }, [activeNote._id]);

  const handleDatabaseChange = (title, body) => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    // Set a timeout to trigger patch request after 500ms of user stopping typing
    const timeout = setTimeout(() => {
      (async () => {
        try {
          const obj = {
            id: activeNote._id,
            title: title,
            body: body,
          };
          const updated = await patchToBackend("/notes", { ...obj });

          dispatch(updatedTheNote(updated.data));
        } catch (error) {
          showErrorMessage({ message: error.message });
        }
      })();
    }, 200);

    setTypingTimeout(timeout);
  };

  const changeBody = (content) => {
    const formattedContent = content.replace(/\s+/g, "&nbsp;");

    setValue((prev) => {
      return {
        ...prev,
        body: formattedContent,
      };
    });

    handleDatabaseChange(activeNote.title || UNTITLED, formattedContent);
  };

  const changeTitle = (e) => {
    const { value: newTitle } = e.target;

    const newValue = {
      ...value,
      title: newTitle || UNTITLED,
    };

    setValue(newValue);
    handleDatabaseChange(newTitle || UNTITLED, value.body);
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

      await new Promise((resolve) => setTimeout(resolve, 100)); // Adjust the timeout
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

  useEffect(() => {
    if (!focusToBody || !ref.current) return;
    if (!value.body) {
      // Set focus on the Quill editor whenever activeNote changes
      ref.current.editor.focus();
      setFocusToBody(false);
      return;
    }

    setTimeout(() => {
      const quill = ref.current.getEditor();
      quill.setSelection(quill.getLength(), quill.getLength());
    }, 200);

    setFocusToBody(false);
  }, [focusToBody]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
  ];

  return (
    <>
      <main className="h-full items-start ">
        {/* MARK: HEADER - TITLE */}
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
            <div className="w-full">
              <input
                type="text"
                value={value.title === UNTITLED ? "" : value.title}
                className="w-full h-full  text-xl font-bold outline-none bg-my_notearea_white"
                placeholder="Untitled"
                onChange={changeTitle}
                autoComplete="off"
                spellCheck="false"
                onKeyDown={(e) => e.key === "Enter" && setFocusToBody(true)}
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
              <p>created at : {convertDateType(activeNote.createdAt)}</p>

              <p>
                last updated :{" "}
                <span>{changeDate(activeNote.updatedAt, true)}</span>
              </p>
            </div>
          </div>
        </header>

        {/* MARK: BODY */}
        <div className="w-full " style={{ height: "calc(100% - 100px)" }}>
          <ReactQuill
            ref={ref}
            value={value.body}
            theme="snow"
            onChange={changeBody}
            modules={modules}
            formats={formats}
            className="w-full h-full break-all"
            placeholder="Write your text here"
          />
        </div>
      </main>
      <ToastContainer />
    </>
  );
};

export default TextArea;
