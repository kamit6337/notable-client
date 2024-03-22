import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { userInitialState } from "../../redux/slice/initialUserDataSlice";
import { useMemo } from "react";
import TextArea from "../../components/TextArea";
import NoteTags from "../../components/NoteTags";
import { Helmet } from "react-helmet";

const SingleNote = () => {
  const { notes } = useSelector(userInitialState);

  const { id } = useParams();

  const activeNote = useMemo(() => {
    if (!id) return null;
    const findNote = notes.find((note) => note._id === id);
    return findNote;
  }, [notes, id]);

  return (
    <>
      <Helmet>
        <title>Notes | {activeNote?.title}</title>
        <meta name="discription" content="A Note making Web Apps" />
      </Helmet>
      <div className="flex-1 h-full relative">
        <div style={{ height: "calc(100% - 100px)" }}>
          <TextArea activeNote={activeNote} backToHome={true} />
        </div>

        <div className="absolute z-10 bottom-0 left-0 w-full h-14 ">
          <NoteTags activeNote={activeNote} />
        </div>
      </div>
    </>
  );
};

export default SingleNote;
