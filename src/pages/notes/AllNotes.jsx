import { useSelector } from "react-redux";
import { userInitialState } from "../../redux/slice/initialUserDataSlice";
import NotesArea from "../../components/NotesArea";
import { Icons } from "../../assets/Icons";

const AllNotes = () => {
  const { notes } = useSelector(userInitialState);

  return (
    <NotesArea list={notes} title={"All Notes"} icon={<Icons.notesSolid />} />
  );
};

export default AllNotes;
