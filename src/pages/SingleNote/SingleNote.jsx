import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { userInitialState } from "../../redux/slice/initialUserDataSlice";
import { useMemo } from "react";
import TextArea from "../../components/TextArea";
import NoteTags from "../../components/NoteTags";

const SingleNote = () => {
  const { notes } = useSelector(userInitialState);

  const { id } = useParams();

  const activeNote = useMemo(() => {
    if (!id) return null;

    const findNote = notes.find((note) => note._id === id);

    return findNote;
  }, [notes, id]);

  return (
    <div className="w-full h-full relative">
      <div className="border-b-2" style={{ height: "calc(100% - 40px)" }}>
        <TextArea activeNote={activeNote} backToHome={true} />
      </div>

      <div className="absolute z-10 bottom-0 w-full h-10 ">
        <NoteTags activeNote={activeNote} />
      </div>
    </div>
  );
};

export default SingleNote;
