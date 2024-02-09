import Cookies from "js-cookie";
import { QueryCache } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { postToBackend } from "../utils/api/userApi";
import UseLoginCheck from "../hooks/query/useLoginCheck";
import { getAuthReq } from "../utils/api/authApi";
import environment from "../utils/environment";
import { useDispatch, useSelector } from "react-redux";
import {
  createdNewNote,
  userInitialState,
} from "../redux/slice/initialUserDataSlice";
import AllTags from "../pages/tags/AllTags";
import { useState } from "react";

const SideNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = UseLoginCheck();
  const queryCache = new QueryCache();
  const { activeNotebook } = useSelector(userInitialState);
  const [showTagList, setShowTagList] = useState(false);

  const handleLogout = async () => {
    try {
      await getAuthReq("/logout");
      Cookies.remove("_at", { secure: true, path: "/", sameSite: true }); // removed!
      queryCache.clear();
      navigate("/login", { state: { refresh: true } });
      window.location.reload();
    } catch (error) {
      console.log("Error in logout");
    }
  };

  const handleNoteCreation = async () => {
    try {
      console.log("activeNotebook", activeNotebook);
      const newNote = await postToBackend("/notes", {
        id: activeNotebook,
      });
      console.log("success", newNote);
      dispatch(createdNewNote(newNote.data));
      navigate(`/notebooks/${activeNotebook}`);
    } catch (error) {
      console.log("Error in create note", error);
    }
  };

  const photoUrl = `${environment.SERVER_URL}/${data.photo}`;

  return (
    <>
      <section className="relative z-30 text-sm bg-black/90 text-white/90 w-full h-full">
        <div className="flex p-2 justify-start gap-1 items-center">
          <div className="w-8 rounded-full">
            <img
              src={photoUrl}
              alt="profiel"
              loading="lazy"
              className="w-full rounded-full object-cover"
            />
          </div>
          <p>{data?.name?.split(" ")[0]}</p>

          <p className="cursor-pointer" onClick={handleLogout}>
            Logout
          </p>
          <p>Options</p>
        </div>
        <p className="p-2 px-4 m-3 rounded-2xl bg-slate-700 cursor-pointer">
          Search
        </p>
        <p
          className="p-2 px-4 m-3 rounded-2xl bg-green-700 cursor-pointer"
          onClick={handleNoteCreation}
        >
          Note
        </p>
        <div className="mt-6 px-5">
          <p className="p-2 cursor-pointer ">
            <Link to={`/`}>Home</Link>
          </p>
          <p className="p-2 cursor-pointer">Shortcuts</p>
        </div>

        <div className="mt-4 px-5">
          <div className="">
            <Link to={`/notebooks`}>
              <p className="p-2 w-max cursor-pointer">Notebooks</p>
            </Link>
          </div>
          <div className=" ">
            <Link to={`/notes`}>
              <p className="p-2 w-max cursor-pointer">Notes</p>
            </Link>
          </div>
          <div className=" ">
            <p
              className="p-2 w-max cursor-pointer"
              onMouseEnter={() => setShowTagList(true)}
            >
              Tags
            </p>
          </div>
        </div>
      </section>
      <div
        className={`${
          showTagList ? "translate-x-0" : "-translate-x-full "
        } absolute left-60 z-10 top-0 h-screen w-96 bg-blue-50 transition-all duration-500`}
        onMouseLeave={() => setShowTagList(false)}
      >
        <AllTags />
      </div>
    </>
  );
};

export default SideNavbar;
