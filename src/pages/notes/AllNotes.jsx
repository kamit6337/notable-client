import { useSelector } from "react-redux";
import { userInitialState } from "../../redux/slice/initialUserDataSlice";
import NotesArea from "../../components/NotesArea";

const AllNotes = () => {
  const { notes } = useSelector(userInitialState);

  return <NotesArea list={notes} title={"All Notes"} />;
};

export default AllNotes;
