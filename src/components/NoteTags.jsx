/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import {
  updatedTheNote,
  userInitialState,
} from "../redux/slice/initialUserDataSlice";
import { useMemo, useState } from "react";
import { patchToBackend } from "../utils/api/userApi";
import FindingDivScrollHeight from "../lib/FindingDivScrollHeight";

const NoteTags = ({ activeNote }) => {
  const dispatch = useDispatch();
  const { tags, notes } = useSelector(userInitialState);
  const [showTagList, setShowTagList] = useState(false);
  const [index, setIndex] = useState(null);

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

  const { ref, height } = FindingDivScrollHeight(modifyTags, showTagList);

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

  console.log("height", height);
  console.log("index", index);

  return (
    <div className="flex items-center gap-2 px-6 h-full ">
      {/* MARK: NOTE TAG LIST */}
      {noteTagList?.length > 0 &&
        noteTagList.map((tag, i) => {
          const { _id, title } = tag;

          return (
            <div
              key={i}
              className="grow-0 shrink-0 relative h-full flex flex-col items-center justify-center"
            >
              <p
                className="bg-gray-200 text-sm  rounded-3xl px-3 py-1 cursor-pointer"
                onClick={() => (index === i ? setIndex(null) : setIndex(i))}
              >
                {title}
              </p>

              {index === i && (
                <div className="absolute z-50 bottom-full mt-3">Hello</div>
              )}
            </div>
          );
        })}

      {/* MARK: ADD TAG LIST */}
      <div className="grow-0 shrink-0 relative h-full flex flex-col items-center justify-center">
        <p
          className="bg-gray-200 text-sm  rounded-3xl px-3 py-1 cursor-pointer"
          onClick={() => setShowTagList((prev) => !prev)}
        >
          Add tag
        </p>
        {showTagList && (
          <div
            className={` 
            ${height >= 160 ? "overflow-y-scroll" : "overflow-y-hidden"}
            
             absolute bottom-full  mb-2 rounded-md bg-my_notearea_white border-2 w-40  `}
            onMouseLeave={() => setShowTagList(false)}
            style={{ maxHeight: "160px" }}
            ref={ref}
          >
            {modifyTags.length > 0 &&
              modifyTags.map((tag, i) => {
                const { _id, title } = tag;

                return (
                  <p
                    className="text-center p-2 border-b last:border-none cursor-pointer"
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

// <p
//                   className="absolute z-50 bottom-full  rounded-3xl bg-gray-300 w-40  cursor-pointer py-2 text-center text-sm"
//                   onMouseLeave={() => setIndex(null)}
//                   onClick={() => handleRemoveNoteTag(_id)}
//                 >
//                   Remove Tag
//                 </p>
