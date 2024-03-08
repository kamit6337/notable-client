/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { userInitialState } from "../../redux/slice/initialUserDataSlice";
import NotesArea from "../../components/NotesArea";
import { Icons } from "../../assets/Icons";

const SingleNotebook = () => {
  const { notes, notebooks } = useSelector(userInitialState);
  const { id } = useParams();

  const [noteList, notebookName] = useMemo(() => {
    const filterNotebookNotes = notes.filter((note) => note.notebook === id);
    const findNotebook = notebooks.find((notebook) => notebook._id === id);
    return [filterNotebookNotes, findNotebook.title];
  }, [id, notes, notebooks]);

  if (noteList.length === 0) {
    return (
      <div className="w-full h-full flex flex-col gap-2 justify-center items-center ">
        <p className="text-2xl">No Notes Available</p>
        <p>
          for <span className="italic font-semibold">{notebookName}</span>
        </p>
        <p>
          Click on <span className="italic font-semibold">Note</span> to create
          a new Note on this Nootbook
        </p>
      </div>
    );
  }

  return (
    <NotesArea
      list={noteList}
      title={notebookName}
      icon={<Icons.notebooks />}
    />
  );
};

export default SingleNotebook;
