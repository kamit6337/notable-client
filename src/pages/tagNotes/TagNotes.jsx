import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import NotesArea from "../../components/NotesArea";
import { Icons } from "../../assets/Icons";
import { Helmet } from "react-helmet";
import UseNotesQuery from "../../hooks/query/UseNotesQuery";
import UseTagsQuery from "../../hooks/query/UseTagsQuery";
import UseNewNoteCreation from "../../hooks/mutation/UseNewNoteCreation";

const TagNotes = () => {
  const { data: notes } = UseNotesQuery();
  const { data: tags } = UseTagsQuery();
  const { mutate } = UseNewNoteCreation();
  const navigate = useNavigate();
  const { id } = useParams();
  const noteId = useSearchParams()[0].get("note");

  const [noteList, tagName] = useMemo(() => {
    const findTag = tags.find((tag) => tag._id === id);
    const tagName = findTag?.title;
    const noteList = notes.filter((note) => note.tags.includes(id));
    return [noteList, tagName];
  }, [id, tags, notes]);

  useEffect(() => {
    if (noteId) return;

    if (noteList.length > 0) {
      const findNoteId = noteList[0]._id;
      navigate(`/tags/${id}?note=${findNoteId}`);
    }
  }, [id, noteList, noteId, navigate]);

  if (noteList.length === 0 || !noteId) {
    return (
      <>
        <Helmet>
          <title>Tags | {tagName}</title>
          <meta name="discription" content="A Note making Web Apps" />
        </Helmet>

        <div className="w-full h-full flex flex-col gap-2 justify-center items-center ">
          <p className="text-2xl">No Notes Available</p>
          <p>
            for <span className="italic font-semibold">{tagName}</span>
          </p>
          <p>
            Click on{" "}
            <span
              className="italic font-semibold cursor-pointer"
              onClick={() => mutate()}
            >
              Note
            </span>{" "}
            to create a new Note on this Tag
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Tags | {tagName}</title>
        <meta name="discription" content="A Note making Web Apps" />
      </Helmet>
      <NotesArea
        noteList={noteList}
        activeNoteId={noteId}
        title={tagName}
        currentPathname={`/tags/${id}`}
        icon={<Icons.tagOutline />}
      />
    </>
  );
};

export default TagNotes;
