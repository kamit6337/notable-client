/* eslint-disable react/prop-types */
import { useEffect, useMemo, useRef, useState } from "react";
import { Icons } from "../assets/Icons";
import TextArea from "./TextArea";
import NoteTags from "./NoteTags";
import { useDispatch, useSelector } from "react-redux";
import { toggleNoteActivation, toggleState } from "../redux/slice/toggleSlice";

const NotesArea = ({ title, list }) => {
  const lastNoteRef = useRef(null);
  const dispatch = useDispatch();
  const { isNoteActivated } = useSelector(toggleState);

  const [noteIndex, setNoteIndex] = useState(0);

  const activeNote = useMemo(() => {
    return list[noteIndex];
  }, [noteIndex, list]);

  useEffect(() => {
    if (isNoteActivated && list && list.length > 0 && lastNoteRef.current) {
      setNoteIndex(list.length - 1);

      lastNoteRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });

      dispatch(toggleNoteActivation(false));
    }
  }, [isNoteActivated, list, dispatch]);

  const resetSetIndex = () => {
    if (noteIndex === list.length - 1) {
      setNoteIndex(list.length - 2);
    }
  };

  return (
    <section className="w-full h-full flex">
      {/* NOTE: SIDE NOTE BAR */}
      <div className="w-60 bg-gray-50 h-full  flex flex-col border-r border-gray-300">
        {/* MARK: HEADER */}
        <div className="h-24 border-b border-gray-400 w-full flex flex-col gap-1 px-5">
          <div className="flex gap-1 items-center py-4">
            <Icons.notesSolid className="text-2xl" />
            <p className="text-lg">{title}</p>
          </div>
          <p>{list.length} Notes</p>
        </div>

        {/* MARK: NOTE LIST */}

        <div className="w-full flex-1 p-[2px] overflow-y-scroll overflow-x-hidden">
          {list.length > 0 ? (
            list.map((note, i) => {
              const { title, body, notebookTitle } = note;

              return (
                <div
                  key={i}
                  ref={i === list.length - 1 ? lastNoteRef : null}
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

          <div className="absolute z-10 bottom-0 w-full bg-gray-200 h-10 ">
            <NoteTags activeNote={activeNote} />
          </div>
        </div>
      )}
    </section>
  );
};

export default NotesArea;
