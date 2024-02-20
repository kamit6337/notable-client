/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import TextArea from "./TextArea";
import NoteTags from "./NoteTags";
import SideNoteListBar from "./SideNoteListBar";
import { useSelector } from "react-redux";
import { toggleState } from "../redux/slice/toggleSlice";

const NotesArea = ({ title, icon, list }) => {
  const { hideSidebars } = useSelector(toggleState);
  const [activeNote, setActiveNote] = useState(null);
  const [newList, setNewlist] = useState([]);

  useEffect(() => {
    if (!list) return;
    setNewlist(list);
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
  }, [list, activeNote]);

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

      {/* {hideSidebars.bool || (
        <div className="w-60 sm_lap:w-52">
          <SideNoteListBar
            activeNote={activeNote}
            handleActiveNote={handleActiveNote}
            icon={icon}
            list={newList}
            title={title}
          />
        </div>
      )} */}

      <div className="absolute z-50 left-0 h-full w-60 sm_lap:w-52">
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
        <div className="flex-1 h-full relative">
          <div className="" style={{ height: "calc(100% - 80px)" }}>
            <TextArea activeNote={activeNote} resetSetIndex={resetSetIndex} />
          </div>

          <div className="absolute z-10 bottom-0 w-full h-10 ">
            <NoteTags activeNote={activeNote} />
          </div>
        </div>
      )}
    </section>
  );
};

export default NotesArea;
