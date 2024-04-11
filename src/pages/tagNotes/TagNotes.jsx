import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { userInitialState } from "../../redux/slice/initialUserDataSlice";
import { useMemo } from "react";
import NotesArea from "../../components/NotesArea";
import { Icons } from "../../assets/Icons";
import { Helmet } from "react-helmet";

const TagNotes = () => {
  const { notes, tags } = useSelector(userInitialState);

  const { id } = useParams();

  const [noteList, tagName] = useMemo(() => {
    const findTag = tags.find((tag) => tag._id === id);
    const tagName = findTag?.title;
    const noteList = notes.filter((note) => note.tags.includes(id));
    return [noteList, tagName];
  }, [id, tags, notes]);

  if (noteList.length === 0) {
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
            Click on <span className="italic font-semibold">Note</span> to
            create a new Note on this Tag
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
      <NotesArea list={noteList} title={tagName} icon={<Icons.tagOutline />} />
    </>
  );
};

export default TagNotes;
