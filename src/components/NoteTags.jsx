/* eslint-disable react/prop-types */
import { useMemo, useState } from "react";
import { patchToBackend } from "../utils/api/userApi";
import { Icons } from "../assets/Icons";
import Toastify from "../lib/Toastify";
import UseTagsQuery from "../hooks/query/UseTagsQuery";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

const NoteTags = ({ activeNote, noteList, handleActiveNote }) => {
  const queryClient = useQueryClient();
  const { data: tags } = UseTagsQuery();
  const { pathname } = useLocation();
  const [showTagList, setShowTagList] = useState(false);
  const [index, setIndex] = useState(null);
  const { showErrorMessage } = Toastify();

  const [modifyTags, noteTagList] = useMemo(() => {
    let filterTags = [...tags];
    const populateTags = activeNote?.tags.map((tagId) => {
      const findtag = tags.find((tag) => tag._id === tagId);
      filterTags = filterTags.filter((tag) => tag._id !== tagId);
      return {
        _id: findtag?._id,
        title: findtag?.title,
      };
    });

    return [filterTags, populateTags];
  }, [activeNote, tags]);

  const handleAddTagToNote = async (tagId) => {
    setShowTagList(false);

    try {
      const updatedNote = await patchToBackend("/notes", {
        id: activeNote._id,
        tagId: tagId,
        isTagAdd: true,
      });

      const checkStatus = queryClient.getQueryState(["notes"]);

      if (checkStatus.status === "success") {
        queryClient.setQueryData(["notes"], (prev = []) => {
          return prev.map((note) =>
            note._id === updatedNote._id ? updatedNote : note
          );
        });
      }
    } catch (error) {
      showErrorMessage({ message: error.message || "Something went wrong" });
    }
  };

  const handleRemoveNoteTag = async (id) => {
    setIndex(null);
    try {
      let isTagMatched = false;
      let nextActiveNote = null;

      if (pathname.startsWith("/tags/")) {
        const tagId = pathname.split("/").at(-1);

        if (tagId === id) {
          const findLastNoteIndex = noteList.findIndex(
            (note) => note._id === activeNote._id
          );

          if (findLastNoteIndex === noteList.length - 1) {
            nextActiveNote = noteList.at(-2);
          } else {
            nextActiveNote = noteList[findLastNoteIndex + 1];
          }

          isTagMatched = true;
        }
      }

      const updatedNote = await patchToBackend("/notes", {
        id: activeNote._id,
        tagId: id,
        isTagRemove: true,
      });

      const checkStatus = queryClient.getQueryState(["notes"]);

      if (checkStatus.status === "success") {
        queryClient.setQueryData(["notes"], (prev = []) => {
          return prev.map((note) =>
            note._id === updatedNote._id ? updatedNote : note
          );
        });
      }

      if (isTagMatched) {
        handleActiveNote(nextActiveNote?._id);
      }
    } catch (error) {
      showErrorMessage({ message: error.message || "Something went wrong" });
    }
  };

  return (
    <>
      <section className="h-full w-full relative flex">
        {/* MARK: ADD TAG LIST */}
        <div className="w-16 relative h-full pt-1 flex justify-center items-center">
          <p
            className="bg-gray-200 rounded-full p-2 cursor-pointer"
            onClick={() => setShowTagList((prev) => !prev)}
          >
            {showTagList ? <Icons.cancel /> : <Icons.plus />}
          </p>
          {showTagList && (
            <div
              className={` 
            overflow-y-auto absolute bottom-full left-0 ml-1 mb-2   rounded-md bg-my_notearea_white border-2 w-60  max-h-72`}
              onMouseLeave={() => setShowTagList(false)}
            >
              {modifyTags.length > 0 ? (
                modifyTags.map((tag, i) => {
                  const { _id, title } = tag;

                  return (
                    <p
                      className="text-center p-2 border-b last:border-none cursor-pointer break-all"
                      key={i}
                      onClick={() => handleAddTagToNote(_id)}
                    >
                      {title}
                    </p>
                  );
                })
              ) : (
                <div className="w-full h-40 flex justify-center items-center">
                  <p>No Tags available</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="h-full" style={{ width: "calc(100% - 80px)" }}>
          <main className="w-full flex gap-2 h-full  overflow-x-auto px-5">
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
                      onClick={() =>
                        index === i ? setIndex(null) : setIndex(i)
                      }
                    >
                      {title}
                    </p>

                    {index === i && (
                      <p
                        className="absolute z-50   bg-slate-800 text-white text-xs  rounded-3xl px-3 py-1 cursor-pointer whitespace-nowrap "
                        onMouseLeave={() => setIndex(null)}
                        onClick={() => handleRemoveNoteTag(_id)}
                      >
                        Remove Tag
                      </p>
                    )}
                  </div>
                );
              })}
          </main>
        </div>
      </section>
    </>
  );
};

export default NoteTags;
