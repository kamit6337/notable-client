import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { userInitialState } from "../../redux/slice/initialUserDataSlice";
import { useMemo } from "react";
import NotesArea from "../../components/NotesArea";

const TagNotes = () => {
  const { notes, tags } = useSelector(userInitialState);

  const { id } = useParams();

  const [noteList, tagName] = useMemo(() => {
    const findTag = tags.find((tag) => tag._id === id);

    const tagName = findTag?.title;

    const noteList = notes.filter((note) => note.tags.includes(id));

    return [noteList, tagName];
  }, [id, tags, notes]);

  return <NotesArea list={noteList} title={tagName} />;
};

export default TagNotes;
