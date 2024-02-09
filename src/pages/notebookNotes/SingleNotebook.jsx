/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Icons } from "../../assets/Icons";
import { useDispatch, useSelector } from "react-redux";
import {
  changeActiveNotebook,
  userInitialState,
} from "../../redux/slice/initialUserDataSlice";
import TextArea from "./TextArea";

const SingleNotebook = () => {
  const dispatch = useDispatch();
  const { notes, notebooks } = useSelector(userInitialState);
  const { id } = useParams();

  const [noteList, setNoteList] = useState([]);
  const [noteIndex, setNoteIndex] = useState(0);
  const [notebookName, setNotebookName] = useState(null);

  const resetSetIndex = () => {
    if (noteIndex === noteList.length - 1) {
      setNoteIndex(0);
    }
  };

  const activeNote = useMemo(() => {
    return noteList[noteIndex];
  }, [noteIndex, noteList]);

  useEffect(() => {
    if (id) {
      setNoteList(notes.filter((note) => note.notebook === id));
      setNotebookName(notebooks.find((notebook) => notebook._id === id).title);
      dispatch(changeActiveNotebook(id));
    }
  }, [id, notes]);

  return (
    <section className="w-full h-full flex">
      {/* NOTE: SIDE NOTE BAR */}
      <div className="w-60 bg-gray-50 h-full  flex flex-col border-r border-gray-300">
        {/* MARK: HEADER */}
        <div className="h-24 border-b border-gray-400 w-full flex flex-col gap-1 px-5">
          <div className="flex gap-1 items-center py-4">
            <Icons.notesSolid className="text-2xl" />
            <p className="text-lg">{notebookName}</p>
          </div>
          <p>{noteList.length} Notes</p>
        </div>

        {/* MARK: NOTE LIST */}

        <div className="w-full flex-1 p-[2px] overflow-y-scroll overflow-x-hidden">
          {noteList.length > 0 ? (
            noteList.map((note, i) => {
              const { title, body, notebookTitle } = note;

              return (
                <div
                  key={i}
                  className={`w-full h-44 p-5  border-b hover:bg-white cursor-pointer ${
                    noteIndex === i && "border border-black950"
                  }`}
                  onClick={() => setNoteIndex(i)}
                >
                  <p>{title}</p>
                  <p className="text-xs mt-4">{body}</p>
                  <p>{notebookTitle}</p>
                </div>
              );
            })
          ) : (
            <div>No Notes available</div>
          )}
        </div>
      </div>

      {/* NOTE: TEXT AREA */}
      {activeNote && (
        <div className="flex-1 h-full relative">
          <div className="" style={{ height: "calc(100% - 40px)" }}>
            <TextArea activeNote={activeNote} resetSetIndex={resetSetIndex} />
          </div>

          <div className="absolute z-10 bottom-0 w-full bg-gray-200 h-10 flex items-center px-4">
            <p className="text-sm border border-black rounded-3xl px-3 py-1 cursor-pointer">
              Add tag
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default SingleNotebook;
