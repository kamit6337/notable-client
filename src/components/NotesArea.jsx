/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import TextArea from "./TextArea";
import NoteTags from "./NoteTags";
import SideNoteListBar from "./SideNoteListBar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  sortFunction,
  sortOptionsList,
} from "../utils/javaScript/sortOptionsList";
import { toggleState } from "../redux/slice/toggleSlice";

const NotesArea = ({
  noteList,
  activeNoteId,
  title,
  icon,
  currentPathname,
}) => {
  const navigate = useNavigate();
  const { hideSidebars, notelistIcon } = useSelector(toggleState);
  const [newSortOptions, setNewSortOptions] = useState(sortOptionsList);

  const activeNote = useMemo(() => {
    return noteList.find((note) => note._id === activeNoteId);
  }, [activeNoteId, noteList]);

  const [sortedList, setSortedlist] = useState(noteList);

  useEffect(() => {
    const localSort = JSON.parse(localStorage.getItem("sort"));
    if (!localSort) {
      setSortedlist(noteList);
      return;
    }
    setSortedlist(sortFunction(noteList, localSort.id));
    const updateSortOptions = sortOptionsList.map((obj) => {
      const newObj = { ...obj };
      if (newObj.id === localSort.id) {
        newObj.active = true;
        return newObj;
      }
      delete newObj.active;
      return newObj;
    });
    setNewSortOptions(updateSortOptions);
  }, [noteList, title]);

  useEffect(() => {
    if (activeNoteId) {
      let isAvailable = JSON.parse(localStorage.getItem("notesId"));
      if (!isAvailable) {
        localStorage.setItem("notesId", JSON.stringify([activeNoteId]));
        return;
      }
      if (isAvailable.length >= 20) {
        const sliceTheList = isAvailable.slice(0, 19);
        isAvailable = sliceTheList;
      }
      const filterNotes = isAvailable.filter((id) => id !== activeNoteId);
      const addedNote = [activeNoteId, ...filterNotes];
      localStorage.setItem("notesId", JSON.stringify(addedNote));
    }
  }, [activeNoteId]);

  const handleSort = (id) => {
    localStorage.setItem("sort", JSON.stringify({ id }));

    setSortedlist(sortFunction(sortedList, id));

    const updateSortOptions = newSortOptions.map((obj) => {
      const newObj = { ...obj };
      if (newObj.id === id) {
        newObj.active = true;
        return newObj;
      }
      delete newObj.active;
      return newObj;
    });
    setNewSortOptions(updateSortOptions);
  };

  const handleActiveNote = (noteId) => {
    if (!noteId) {
      navigate(currentPathname);
      return;
    }

    navigate(`${currentPathname}?note=${noteId}`);
  };

  if (!activeNote) return;

  return (
    <section className="relative w-full h-full flex">
      {/* NOTE: SIDE NOTE BAR */}

      {hideSidebars.bool || (
        <div className="w-60 sm_lap:w-52 tablet:hidden">
          <SideNoteListBar
            activeNoteId={activeNoteId}
            handleActiveNote={handleActiveNote}
            icon={icon}
            noteList={sortedList}
            title={title}
            handleSort={handleSort}
            sortOptions={newSortOptions}
          />
        </div>
      )}

      <div
        className="absolute z-20 left-0 h-full w-60 sm_lap:w-52 transition-all duration-700"
        style={{ translate: `${notelistIcon.bool ? "0" : "-200%"}` }}
      >
        <SideNoteListBar
          activeNoteId={activeNoteId}
          handleActiveNote={handleActiveNote}
          icon={icon}
          noteList={noteList}
          title={title}
          scrolling={notelistIcon.bool}
          handleSort={handleSort}
          sortOptions={newSortOptions}
        />
      </div>

      {/* NOTE: TEXT AREA */}

      <div className="flex-1 h-screen relative">
        <div className="" style={{ height: "calc(100% - 90px)" }}>
          <TextArea
            activeNote={activeNote}
            noteList={sortedList}
            handleActiveNote={handleActiveNote}
          />
        </div>
        <div className="absolute z-10 bottom-0 left-0 w-full h-12 ">
          <NoteTags
            activeNote={activeNote}
            noteList={sortedList}
            handleActiveNote={handleActiveNote}
          />
        </div>
      </div>
    </section>
  );
};

export default NotesArea;
