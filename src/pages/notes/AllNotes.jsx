import { useSelector } from "react-redux";
import { userInitialState } from "../../redux/slice/initialUserDataSlice";
import NotesArea from "../../components/NotesArea";
import { Icons } from "../../assets/Icons";
import { Helmet } from "react-helmet";

const AllNotes = () => {
  const { notes } = useSelector(userInitialState);

  return (
    <>
      <Helmet>
        <title>Notes</title>
        <meta name="discription" content="A Note making Web Apps" />
      </Helmet>
      <NotesArea list={notes} title={"All Notes"} icon={<Icons.notesSolid />} />
    </>
  );
};

export default AllNotes;
