import { QueryCache } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { postToBackend } from "../utils/api/userApi";
import UseLoginCheck from "../hooks/query/UseLoginCheck";
import { getAuthReq } from "../utils/api/authApi";
import { useDispatch, useSelector } from "react-redux";
import {
  createdNewNote,
  userInitialState,
} from "../redux/slice/initialUserDataSlice";
import AllTags from "../pages/tags/AllTags";
import { useState } from "react";
import {
  toggleNoteActivation,
  toggleNoteListIcon,
  toggleSearchForm,
  toggleSettingForm,
  toggleState,
} from "../redux/slice/toggleSlice";
import { Icons } from "../assets/Icons";
import ShortcutPage from "../components/ShortcutPage";
import CheckPathname from "../components/CheckPathname";
import Toastify from "../lib/Toastify";

const list = [
  {
    name: "Notes",
    href: "/notes",
    icon: Icons.notesSolid,
  },
  {
    name: "Notebooks",
    href: "/notebooks",
    icon: Icons.notebooks,
  },
  {
    name: "Tags",
    icon: Icons.tagSolid,
    function: true,
  },
];

const SideNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = UseLoginCheck();
  const queryCache = new QueryCache();
  const { primaryNotebook } = useSelector(userInitialState);
  const [showTagList, setShowTagList] = useState(false);
  const { pathname } = useLocation();
  const [showShortcut, setShowShorcut] = useState(false);
  const [showAccountOptions, setShowAccountOptions] = useState(false);
  const { notelistIcon, isWindowBelowTablet } = useSelector(toggleState);
  const { pathnameOK } = CheckPathname();
  const { ToastContainer, showErrorMessage } = Toastify();

  const handleLogout = async () => {
    setShowAccountOptions(false);
    try {
      await getAuthReq("/logout");
      queryCache.clear();
      localStorage.removeItem("notesId");
      localStorage.removeItem("sort");
      navigate("/login", { state: { refresh: true } });
      window.location.reload();
    } catch (error) {
      showErrorMessage({
        message: error.message || "Issue in Logout. Try later",
      });
    }
  };

  const handleNoteCreation = async () => {
    try {
      const obj = {
        id: primaryNotebook._id,
      };

      let navigateLink = `/notebooks/${primaryNotebook._id}`;

      if (pathname.startsWith("/notes")) {
        navigateLink = pathname;
      }

      if (pathname.startsWith("/notebooks")) {
        const notebookId = pathname.split("/").at(-1);
        obj.id = notebookId;
        navigateLink = pathname;
      }

      if (pathname.startsWith("/tags")) {
        const tagId = pathname.split("/").at(-1);
        obj.tagId = tagId;
        navigateLink = pathname;
      }

      const newNote = await postToBackend("/notes", obj);
      dispatch(createdNewNote(newNote.data));
      await new Promise((resolve) => setTimeout(resolve, 200)); // Adjust the time

      dispatch(toggleNoteActivation({ bool: true, data: newNote.data }));
      await new Promise((resolve) => setTimeout(resolve, 200)); // Adjust the time

      navigate(navigateLink);
    } catch (error) {
      showErrorMessage({
        message: error.message || "Issue in create note. Try later",
      });
    }
  };

  const resetAllTags = () => {
    setShowTagList(false);
  };
  const resetShortcuts = () => {
    setShowShorcut(false);
  };

  const handleOpenSettingForm = () => {
    setShowAccountOptions(false);
    dispatch(toggleSettingForm({ bool: true }));
  };

  const handleOpenSidebarNoteList = (bool) => {
    dispatch(toggleNoteListIcon({ bool }));
  };

  return (
    <>
      <section className="relative z-40 text-sm bg-my_sidenavbar text-my_sidenavbar_icon w-full h-full">
        {/* MARK: PROFILE BAR */}
        <div className="relative mx-6 ">
          <div
            className="flex py-3 gap-2 items-center cursor-pointer"
            onClick={() => setShowAccountOptions((prev) => !prev)}
          >
            <div className="w-8 sm_lap:w-7 rounded-full">
              <img
                src={data?.photo}
                alt="profile"
                loading="lazy"
                className="w-full rounded-full object-cover"
              />
            </div>
            <p className="hover:text-white ">{data?.name.split(" ")[0]}</p>
          </div>
          {showAccountOptions && (
            <div
              className="absolute z-20 top-full left-0 border-2 bg-white text-my_single_note_title rounded-lg py-5"
              onMouseLeave={() => setShowAccountOptions(false)}
            >
              <div className="px-5 flex flex-col gap-3">
                <p>Account</p>

                <div className="flex items-center gap-2">
                  <div className="w-8 rounded-full">
                    <img
                      src={data?.photo}
                      alt="profile"
                      loading="lazy"
                      className="w-full rounded-full object-cover bg-white"
                    />
                  </div>
                  <p>{data?.email}</p>
                </div>
              </div>
              <div className="w-full h-[1px] bg-gray-200 my-3" />
              <p
                className="px-6 hover:bg-gray-100 py-2 cursor-pointer"
                onClick={handleOpenSettingForm}
              >
                Settings
              </p>
              <p
                className="px-6 hover:bg-gray-100 py-2 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </p>
            </div>
          )}
        </div>

        {/* MARK: SEARCH BAR */}
        <div className="w-full p-3 flex flex-col gap-3">
          <div
            className="p-2 sm_lap:p-[6px] sm_lap:px-3 px-4 bg-slate-700 rounded-2xl w-full flex items-center gap-2 cursor-pointer"
            onClick={() => dispatch(toggleSearchForm({ bool: true }))}
          >
            <p>
              <Icons.search />
            </p>
            <p>Search</p>
          </div>

          {/* MARK: CREATE NOTE */}

          <div
            className="p-2 px-4 sm_lap:p-[6px] sm_lap:px-3 rounded-2xl bg-my_note_green text-white cursor-pointer flex items-center gap-2"
            onClick={handleNoteCreation}
          >
            <p>
              <Icons.plus />
            </p>
            <p>Note</p>
          </div>
        </div>

        {/* MARK: LINKS */}

        <div className="px-5 my-4">
          <div className="flex items-center cursor-pointer w-max">
            <p className="text-lg">
              <Icons.homeSolid />
            </p>
            <p className="p-2">
              <Link to={"/"}>Home</Link>
            </p>
          </div>

          <div
            className="flex items-center cursor-pointer w-max"
            onClick={() => setShowShorcut((prev) => !prev)}
          >
            <p className="text-lg">
              <Icons.starSolid />
            </p>
            <p className="p-2">Shortcut</p>
          </div>
        </div>

        <div className="px-5">
          {list.map((obj, i) => {
            if (!obj.href) {
              return (
                <div
                  key={i}
                  className="flex items-center  cursor-pointer w-max"
                  onClick={() =>
                    obj.function && setShowTagList((prev) => !prev)
                  }
                >
                  <p className="text-lg">
                    <obj.icon />
                  </p>
                  <p className="p-2">{obj.name}</p>
                </div>
              );
            }

            return (
              <div key={i} className="flex items-center cursor-pointer w-max">
                <p className="text-lg">
                  <obj.icon />
                </p>
                <p className="p-2">
                  <Link to={obj.href}>{obj.name}</Link>
                </p>
              </div>
            );
          })}
        </div>

        {isWindowBelowTablet.bool && pathnameOK && (
          <div className="absolute bottom-0 w-full h-20 flex justify-center items-center">
            {notelistIcon.bool ? (
              <p
                className="cursor-pointer p-3 rounded-full bg-slate-600 text-white"
                onClick={() => handleOpenSidebarNoteList(false)}
              >
                <Icons.cancel className="text-xl" />
              </p>
            ) : (
              <div
                className="cursor-pointer p-3 rounded-full bg-slate-600 text-white"
                onClick={() => handleOpenSidebarNoteList(true)}
              >
                <Icons.notes className="text-xl" />
              </div>
            )}
          </div>
        )}
      </section>

      <div
        className={`sidebar_translate`}
        onMouseLeave={() => setShowTagList(false)}
        style={{ translate: `${showTagList ? "0" : "-200%"}` }}
      >
        <AllTags reset={resetAllTags} />
      </div>
      <div
        className={`sidebar_translate`}
        onMouseLeave={() => setShowShorcut(false)}
        style={{ translate: `${showShortcut ? "0" : "-200%"}` }}
      >
        <ShortcutPage reset={resetShortcuts} />
      </div>
      <ToastContainer />
    </>
  );
};

export default SideNavbar;
