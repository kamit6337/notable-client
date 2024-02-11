/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { userInitialState } from "../../redux/slice/initialUserDataSlice";
import NotesArea from "../../components/NotesArea";

const SingleNotebook = () => {
  const { notes, notebooks } = useSelector(userInitialState);
  const { id } = useParams();

  const [noteList, notebookName] = useMemo(() => {
    const filterNotebookNotes = notes.filter((note) => note.notebook === id);
    const findNotebook = notebooks.find((notebook) => notebook._id === id);
    return [filterNotebookNotes, findNotebook.title];
  }, [id, notes, notebooks]);

  return <NotesArea list={noteList} title={notebookName} />;
};

export default SingleNotebook;
