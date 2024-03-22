import { useEffect, useMemo } from "react";
import UseLoginCheck from "../../hooks/query/UseLoginCheck";
import { useSelector } from "react-redux";
import { userInitialState } from "../../redux/slice/initialUserDataSlice";
import CustomImages from "../../assets/images";
import currentDate from "../../utils/javaScript/currentDate";
import { Link, useLocation } from "react-router-dom";
import convertHTMLtoString from "../../utils/javaScript/convertHTMLtoString";
import { Icons } from "../../assets/Icons";
import Toastify from "../../lib/Toastify";
import convertDateType from "../../utils/javaScript/convertDateType";
import { Helmet } from "react-helmet";

const Home = () => {
  const { data } = UseLoginCheck();
  const { notes } = useSelector(userInitialState);
  const { state } = useLocation();
  const { ToastContainer, showSuccessMessage } = Toastify();

  useEffect(() => {
    if (state?.message) {
      showSuccessMessage({ message: state.message });
    }
  }, []);

  const noteList = useMemo(() => {
    const notesId = JSON.parse(localStorage.getItem("notesId"));
    if (!notesId || notesId.length === 0) return [];

    let recentNotes = notesId.map((id) => {
      const findNote = notes.find((note) => note._id === id);
      return findNote;
    });

    recentNotes = recentNotes.filter((note) => note !== undefined);
    return recentNotes;
  }, [notes]);

  return (
    <>
      <Helmet>
        <title>Notable | Home</title>
        <meta name="discription" content="A Note making Web Apps" />
      </Helmet>
      <section className="relative w-full h-full bg-my_notearea_white flex flex-col gap-6">
        <div className="w-full">
          <img
            src={CustomImages.coffeeTable}
            alt="Coffee Table"
            className="w-full object-cover"
          />
        </div>
        <section className="absolute top-0 left-0 w-full h-full flex flex-col justify-between pt-16  pb-2 px-6 tablet:px-2">
          {/* MARK: HEADER */}
          <div className="px-10 flex justify-between items-center text-white">
            <p className="text-2xl tablet:text-lg">
              Hi, {data.name.split(" ")[0]}
            </p>
            <p className="tablet:text-sm">{currentDate()}</p>
          </div>

          {/* MARK: RECENT NOTES */}
          <div className="p-6 tablet:px-2 pb-0 border-2 border-my_home_notelist_border rounded-lg bg-my_home_notelist  ">
            <div className="uppercase  font-semibold tracking-wide text-my_single_note_body flex items-center gap-1">
              <p className="tablet:pl-2">Notes</p>
              <p className="text-xl text-my_note_green cursor-pointer ">
                <Link to={`/notes`}>
                  <Icons.rightArrow />
                </Link>
              </p>
            </div>
            <p className="text-my_note_green text-sm my-4 font-semibold tracking-wide underline underline-offset-4 tablet:pl-2">
              Recent
            </p>
            <div className="w-full flex gap-2 overflow-x-auto">
              {noteList?.length > 0 ? (
                noteList.map((note, i) => {
                  const { _id, title, body, updatedAt } = note;

                  return (
                    <Link
                      to={`/notes/${_id}`}
                      key={i}
                      className="grow-0 shrink-0 basis-40 tablet:basis-32"
                    >
                      <div
                        className="p-3 border-2 rounded-lg border-my_home_notelist_border shadow-xl  h-64 tablet:h-56 text-sm mb-4 flex flex-col justify-between
                      hover:bg-gray-50
                      "
                      >
                        <div>
                          <p className="font-semibold tracking-wide mb-1 text-my_single_note_title">
                            {title}
                          </p>
                          <p className="tracking-wide break-all text-my_single_note_body line-clamp-5 tablet:text-xs mt-2">
                            {convertHTMLtoString(body, { slice: false })}
                          </p>
                        </div>
                        <p className="text-xs tablet:text-[10px]">
                          {convertDateType(updatedAt)}
                        </p>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div className="h-64 w-full flex justify-center items-center">
                  Sorry, No Notes available
                </div>
              )}
            </div>
          </div>
        </section>
      </section>
      <ToastContainer />
    </>
  );
};

export default Home;
