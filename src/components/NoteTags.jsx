/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import {
  updatedTheNote,
  userInitialState,
} from "../redux/slice/initialUserDataSlice";
import { useEffect, useMemo, useRef, useState } from "react";
import { patchToBackend } from "../utils/api/userApi";

const NoteTags = ({ activeNote }) => {
  const dispatch = useDispatch();
  const { tags, notes } = useSelector(userInitialState);
  const [showTagList, setShowTagList] = useState(false);
  const [index, setIndex] = useState(null);
  const tagOptionRef = useRef(null);

  const [modifyTags, noteTagList] = useMemo(() => {
    let filterTags = [...tags];
    const findNote = notes.find((note) => note._id === activeNote._id);

    const populateTags = findNote?.tags.map((tagId) => {
      const findtag = tags.find((tag) => tag._id === tagId);

      filterTags = filterTags.filter((tag) => tag._id !== tagId);

      return {
        _id: findtag._id,
        title: findtag.title,
      };
    });

    return [filterTags, populateTags];
  }, [activeNote, notes, tags]);

  useEffect(() => {
    if (tagOptionRef.current) {
      const height = tagOptionRef.current.clientHeight;

      console.log("height", height);
    }
  }, []);

  console.log("height");

  const optionsHeight = useMemo(() => {
    if (tagOptionRef.current) {
      const height = tagOptionRef.current.clientHeight;

      console.log("height", height);
      return height;
    }
    return 0;
  }, []);

  console.log("optionsHeight", optionsHeight);

  useEffect(() => {
    if (tagOptionRef.current) {
      const height = tagOptionRef.current.clientHeight;

      console.log("height", height);
    }
  }, [modifyTags]);

  const handleAddTagToNote = async (id) => {
    setShowTagList(false);

    try {
      const addTagToNote = await patchToBackend("/notes", {
        id: activeNote._id,
        tagId: id,
        isTagAdd: true,
      });

      dispatch(updatedTheNote(addTagToNote.data));
      console.log("addTagToNote", addTagToNote);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveNoteTag = async (id) => {
    setIndex(null);
    try {
      const removeTagToNote = await patchToBackend("/notes", {
        id: activeNote._id,
        tagId: id,
        isTagRemove: true,
      });

      dispatch(updatedTheNote(removeTagToNote.data));
      console.log("removeTagToNote", removeTagToNote);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center gap-2 px-4 h-full">
      {noteTagList?.length > 0 &&
        noteTagList.map((tag, i) => {
          const { _id, title } = tag;

          return (
            <div
              key={i}
              className="relative h-full flex flex-col items-center justify-center"
            >
              <p
                className=" text-sm border border-black rounded-3xl px-3 py-1 cursor-pointer"
                onClick={() => setIndex(i)}
              >
                {title}
              </p>

              {index === i && (
                <p
                  className="absolute bottom-full mb-2 rounded-xl bg-slate-300 w-40  cursor-pointer py-2 text-center"
                  onMouseLeave={() => setIndex(null)}
                  onClick={() => handleRemoveNoteTag(_id)}
                >
                  Remove Tag
                </p>
              )}
            </div>
          );
        })}

      <div className="relative h-full flex flex-col items-center justify-center">
        <p
          className=" text-sm border border-black rounded-3xl px-3 py-1 cursor-pointer"
          onClick={() => setShowTagList((prev) => !prev)}
        >
          Add tag
        </p>
        {showTagList && (
          <div
            className={`${
              modifyTags.length > 0 && "border"
            }  absolute bottom-full mb-2 rounded-xl bg-slate-300 w-40 max-h-40 overflow-y-scroll`}
            onMouseLeave={() => setShowTagList(false)}
            ref={tagOptionRef}
          >
            {modifyTags.length > 0 &&
              modifyTags.map((tag, i) => {
                const { _id, title } = tag;

                return (
                  <p
                    className="text-center py-2 border-b last:border-none cursor-pointer"
                    key={i}
                    onClick={() => handleAddTagToNote(_id)}
                  >
                    {title}
                  </p>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteTags;
