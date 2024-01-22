import { useRef, useState } from "react";
import UseInitialFetch from "../hooks/useInitialFetch";

const AllNotes = () => {
  const textareaRef = useRef(null);
  const [noteContent, setNoteContent] = useState({
    title: "",
    body: "",
  });

  const {
    notes: { data, isLoading, isError, refetch },
  } = UseInitialFetch();

  if (isLoading) {
    return <div className="loading" />;
  }

  if (isError) {
    console.log("error in notes");
    return;
  }

  const handleNoteContent = (e) => {
    const { name, value } = e.target;
    setNoteContent((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const focusOnTextArea = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default behavior of Enter in the input
      textareaRef.current.focus();
    }
  };

  return (
    <section className="w-full h-full flex">
      {/* WORK: NOTES LIST */}
      <div className="h-full w-60 border-r border-black">
        <div className="w-full h-24">{data.data.length} Notes count</div>

        <div>
          {data?.data?.length > 0 ? (
            data?.data?.map((note, i) => {
              const { title } = note;

              return <p key={i}>{title}</p>;
            })
          ) : (
            <p>No notes available</p>
          )}
          <p>Notes name</p>
        </div>
      </div>

      {/* WORK: NOTE EDIT SECTION */}
      <div className="flex-1 flex flex-col items-start">
        <div className="py-4 px-6 w-full">
          <input
            type="text"
            className="w-full text-xl font-bold outline-none"
            value={noteContent.title}
            name="title"
            onChange={handleNoteContent}
            placeholder="title"
            onKeyDown={focusOnTextArea}
          />
        </div>
        <textarea
          placeholder="Write your notes"
          value={noteContent.body}
          name="body"
          onChange={handleNoteContent}
          className="w-full h-full py-4 px-6 outline-none"
          ref={textareaRef}
          // You can adjust the number of rows as needed
        />
      </div>
    </section>
  );
};

export default AllNotes;
