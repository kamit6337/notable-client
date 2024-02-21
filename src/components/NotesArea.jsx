/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import TextArea from "./TextArea";
import NoteTags from "./NoteTags";
import SideNoteListBar from "./SideNoteListBar";
import { useDispatch, useSelector } from "react-redux";
import { toggleNoteListIcon, toggleState } from "../redux/slice/toggleSlice";
import FindingWindowWidth from "../lib/FindingWindowWidth";

const NotesArea = ({ title, icon, list }) => {
  const dispatch = useDispatch();
  const { hideSidebars, notelistIcon } = useSelector(toggleState);
  const [activeNote, setActiveNote] = useState(null);
  const [newList, setNewlist] = useState([]);
  const { isWidth } = FindingWindowWidth();

  useEffect(() => {
    if (!list) return;
    setNewlist(list);
    dispatch(toggleNoteListIcon({ haveList: true }));
    if (!activeNote) {
      setActiveNote(list[0]);
    } else {
      const findNote = list.find((note) => note._id === activeNote._id);
      if (!findNote) {
        setActiveNote(list[0]);
      } else {
        setActiveNote(findNote);
      }
    }
  }, [list, activeNote, dispatch]);

  useEffect(() => {
    if (activeNote) {
      let isAvailable = JSON.parse(localStorage.getItem("notesId"));
      if (!isAvailable) {
        localStorage.setItem("notesId", JSON.stringify([activeNote._id]));
        return;
      }
      if (isAvailable.length >= 20) {
        const sliceTheList = isAvailable.slice(0, 19);
        isAvailable = sliceTheList;
      }
      const filterNotes = isAvailable.filter((id) => id !== activeNote._id);
      const addedNote = [activeNote._id, ...filterNotes];
      localStorage.setItem("notesId", JSON.stringify(addedNote));
    }
  }, [activeNote]);

  const resetSetIndex = (id) => {
    const findLastNoteIndex = newList.findIndex((note) => note._id === id);
    if (findLastNoteIndex === newList.length - 1) {
      setActiveNote(newList.at(-2));
    } else {
      setActiveNote(newList[findLastNoteIndex - 1]);
    }
  };

  const handleActiveNote = (note) => {
    setActiveNote(note);
  };

  return (
    <section className="relative w-full h-full flex">
      {/* NOTE: SIDE NOTE BAR */}

      {hideSidebars.bool || isWidth || (
        <div className="w-60 sm_lap:w-52">
          <SideNoteListBar
            activeNote={activeNote}
            handleActiveNote={handleActiveNote}
            icon={icon}
            list={newList}
            title={title}
          />
        </div>
      )}

      <div
        className="absolute z-20 left-0 h-full w-60 sm_lap:w-52 transition-all duration-700"
        style={{ translate: `${notelistIcon.openNotelist ? "0" : "-200%"}` }}
        onMouseLeave={() =>
          dispatch(toggleNoteListIcon({ openNotelist: false, haveList: true }))
        }
      >
        <SideNoteListBar
          activeNote={activeNote}
          handleActiveNote={handleActiveNote}
          icon={icon}
          list={newList}
          title={title}
        />
      </div>

      {/* NOTE: TEXT AREA */}
      {activeNote && (
        <div className="flex-1 h-screen flex flex-col justify-between">
          <div className="" style={{ height: "calc(100% - 100px)" }}>
            <TextArea activeNote={activeNote} resetSetIndex={resetSetIndex} />
          </div>

          <div className="w-full basis-14 grow-0 shrink-0">
            <NoteTags activeNote={activeNote} />
          </div>
        </div>
      )}
    </section>
  );
};

export default NotesArea;
