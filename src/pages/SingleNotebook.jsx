/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Icons } from "../assets/Icons";

import { getFromBackend } from "../utils/api/userApi";

import { useQuery } from "@tanstack/react-query";

const SingleNotebook = () => {
  const textareaRef = useRef(null);
  const [noteIndex, setNoteIndex] = useState(0);
  const [noteDetail, setNoteDetail] = useState({
    title: "",
    body: "",
  });
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["notebookNotes", id],
    queryFn: () => getFromBackend("/notebook/notes", { id }),
    cacheTime: 300000,
    staleTime: 300000,
  });

  if (isLoading) {
    return <div className="loading" />;
  }

  if (isError) {
    console.log(error);
    return;
  }

  const focusOnTextArea = (e) => {
    if (e.key === "Enter" && textareaRef) {
      textareaRef.current.focus();
    }
  };

  const displayNoteDetail = (title, content) => {
    setNoteDetail({
      title,
      body: content || "",
    });
  };

  const handleNoteDetail = (e) => {
    const { name, value } = e.target;

    setNoteDetail((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <section className="w-full h-full flex">
      {/* NOTE: SIDE NOTE BAR */}
      <div className="w-60 bg-gray-50 h-full  flex flex-col border-r border-gray-300">
        <div className="h-28 border-b border-gray-400 w-full flex flex-col gap-1">
          <div className="flex gap-1 items-center py-4  px-5">
            <Icons.notesSolid className="text-2xl" />
            <p className="text-lg">{name}</p>
          </div>
        </div>
        <div className="w-full h-full p-[2px]">
          {data?.data?.length > 0 ? (
            data?.data?.map((note, i) => {
              const { title, body, notebookTitle } = note;

              return (
                <div
                  key={i}
                  className={`w-full h-44 p-5 ${
                    noteIndex === i && "border border-black950"
                  }`}
                  onClick={() => {
                    setNoteIndex(i);
                    if (noteIndex === i) {
                      displayNoteDetail(title, body);
                    }
                  }}
                >
                  <p>{title}</p>
                  <p>{body}</p>
                  <p>{notebookTitle}</p>
                </div>
              );
            })
          ) : (
            <div>Sorry, no notes available</div>
          )}
        </div>
      </div>

      {/* NOTE: TEXT AREA */}
      <main className="flex-1 flex flex-col items-start">
        <header className="py-4 px-6 w-full">
          <input
            type="text"
            value={noteDetail.title}
            name="title"
            onChange={handleNoteDetail}
            className="w-full text-xl font-bold outline-none"
            placeholder="title"
            onKeyDown={focusOnTextArea}
          />
        </header>
        <textarea
          placeholder="Write your notes"
          value={noteDetail.body}
          name="body"
          onChange={handleNoteDetail}
          className="w-full h-full py-4 px-6 outline-none"
          ref={textareaRef}
          // You can adjust the number of rows as needed
        />
      </main>
    </section>
  );
};

export default SingleNotebook;
