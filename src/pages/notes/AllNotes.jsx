import { useSelector } from "react-redux";
import { userInitialState } from "../../redux/slice/initialUserDataSlice";
import NotesArea from "../../components/NotesArea";
import { Icons } from "../../assets/Icons";
import { Helmet } from "react-helmet";

const AllNotes = () => {
  const { notes } = useSelector(userInitialState);

  if (notes.length === 0) {
    return (
      <>
        <Helmet>
          <title>Notes</title>
          <meta name="discription" content="A Note making Web Apps" />
        </Helmet>
        <div className="w-full h-full flex flex-col gap-2 justify-center items-center ">
          <p className="text-2xl">No Notes Available</p>
          <p>
            Click on <span className="italic font-semibold">Note</span> to
            create a new Note on this Nootbook
          </p>
        </div>
      </>
    );
  }

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
