import Cookies from "js-cookie";
import { QueryCache } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { useMemo, useState } from "react";
import {
  toggleNoteActivation,
  toggleSettingForm,
} from "../redux/slice/toggleSlice";
import { Icons } from "../assets/Icons";
import { useForm } from "react-hook-form";

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
  const { primaryNotebook, notebooks, notes } = useSelector(userInitialState);
  const [showTagList, setShowTagList] = useState(false);
  const { pathname } = useLocation();
  const [showShortcut, setShowShorcut] = useState(false);
  const [showSearchNotFound, setShowSearchNotFound] = useState(false);
  const [showAccountOptions, setShowAccountOptions] = useState(false);
  const [searchedList, setSearchedList] = useState([]);
  const { register, reset } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const shortcutList = useMemo(() => {
    const filterNotebooks = notebooks.filter((notebook) => notebook.shortcut);
    const filterNotes = notes.filter((note) => note.shortcut);

    return [...filterNotes, ...filterNotebooks];
  }, [notebooks, notes]);

  const handleSearch = (e) => {
    const { value } = e.target;

    if (!value) {
      setShowSearchNotFound(false);
      setSearchedList([]);
      return;
    }

    setShowSearchNotFound(true);
    const combinedArray = [...notebooks, ...notes];

    const filter = combinedArray.filter((obj) =>
      obj.title.toLowerCase().includes(value.toLowerCase())
    );

    setSearchedList(filter);

    console.log("filter", filter);
  };

  const handleLogout = async () => {
    setShowAccountOptions(false);

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
      console.log("success", newNote);
      dispatch(createdNewNote(newNote.data));
      navigate(navigateLink);
      dispatch(toggleNoteActivation({ bool: true, data: newNote.data }));
    } catch (error) {
      console.log("Error in create note", error);
    }
  };

  const resetSearchbar = () => {
    reset({ search: "" });
    setSearchedList([]);
  };

  const resetAllTags = () => {
    setShowTagList(false);
  };

  const handleOpenSettingForm = () => {
    setShowAccountOptions(false);
    dispatch(toggleSettingForm({ bool: true }));
  };

  const photoUrl = `${environment.SERVER_URL}/${data.photo}`;

  return (
    <>
      <section className="relative z-40 text-sm bg-my_sidenavbar text-my_sidenavbar_icon w-full h-full">
        <div className="relative mx-6">
          <div
            className="flex py-3 gap-1 items-center cursor-pointer"
            onClick={() => setShowAccountOptions((prev) => !prev)}
          >
            <div className="w-8 rounded-full">
              <img
                src={photoUrl}
                alt="profiel"
                loading="lazy"
                className="w-full rounded-full object-cover"
              />
            </div>
            <p className="hover:text-white">{data?.name}</p>
          </div>
          {showAccountOptions && (
            <div
              className="absolute z-20 top-full left-0 w-64 border-2 bg-white text-my_single_note_title rounded-lg py-5"
              onMouseLeave={() => setShowAccountOptions(false)}
            >
              <div className="px-5 flex flex-col gap-3">
                <p>Account</p>

                <div className="flex items-center gap-2">
                  <div className="w-8 rounded-full">
                    <img
                      src={photoUrl}
                      alt="profiel"
                      loading="lazy"
                      className="w-full rounded-full object-cover"
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

        <div className="m-3 flex flex-col gap-3">
          <div className="relative w-full">
            <div className="p-2 px-4 bg-slate-700 rounded-2xl w-full flex items-center gap-2">
              <p>
                <Icons.search />
              </p>
              <input
                {...register("search")}
                type="text"
                onChange={handleSearch}
                placeholder="Search"
                className="bg-slate-700 w-full"
                spellCheck="false"
                autoComplete="off"
              />
            </div>
            {searchedList.length > 0 ? (
              <div
                className="absolute top-full w-full mt-2  bg-my_notearea_white text-black
              h-40 overflow-y-scroll rounded-xl"
              >
                {searchedList.map((obj, i) => {
                  const { _id, title, notebook } = obj;

                  if (!notebook) {
                    return (
                      <Link
                        key={i}
                        to={`/notebooks/${_id}`}
                        onClick={resetSearchbar}
                      >
                        <div className="p-2 px-4 flex  gap-1">
                          <p className="mt-[3px]">
                            <Icons.notebooks />
                          </p>
                          <p className="">{title}</p>
                        </div>
                      </Link>
                    );
                  }

                  return (
                    <Link key={i} to={`/notes/${_id}`} onClick={resetSearchbar}>
                      <div className="p-2 px-4 flex  gap-1 ">
                        <p className="mt-[3px]">
                          <Icons.notesSolid />
                        </p>
                        <p>{title}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              showSearchNotFound && (
                <div
                  className="absolute top-full w-full mt-2  bg-my_notearea_white text-black
              h-40  rounded-xl flex justify-center items-center"
                >
                  <p>Sorry, Not found</p>
                </div>
              )
            )}
          </div>
          <div
            className="p-2 px-4 rounded-2xl bg-my_note_green text-white cursor-pointer flex items-center gap-2"
            onClick={handleNoteCreation}
          >
            <p>
              <Icons.plus />
            </p>
            <p>Note</p>
          </div>
        </div>
        <div className="px-2 my-4">
          <div className="flex items-center cursor-pointer w-max">
            <p className="w-4 " />
            <p className="text-lg">
              <Icons.homeSolid />
            </p>
            <p className="p-2">
              <Link to={"/"}>Home</Link>
            </p>
          </div>

          <div>
            <div
              className="flex items-center cursor-pointer w-max"
              onClick={() => setShowShorcut((prev) => !prev)}
            >
              <p className="w-4">
                {showShortcut ? (
                  <Icons.downArrowSolid />
                ) : (
                  <Icons.rightArrowSolid />
                )}
              </p>
              <p className="text-lg">
                <Icons.starSolid />
              </p>
              <p className="p-2">Shortcut</p>
            </div>
            {showShortcut && (
              <div className="pl-10 flex flex-col gap-1">
                {shortcutList.length > 0 &&
                  shortcutList.map((obj, i) => {
                    const { _id, title, notebook } = obj;

                    if (!notebook) {
                      return (
                        <Link key={i} to={`/notebooks/${_id}`}>
                          <div className=" flex  gap-1">
                            <p className="mt-[3px]">
                              <Icons.notebooks />
                            </p>
                            <p className="">{title}</p>
                          </div>
                        </Link>
                      );
                    }

                    return (
                      <Link key={i} to={`/notes/${_id}`}>
                        <div className="flex  gap-1 ">
                          <p className="mt-[3px]">
                            <Icons.notesSolid />
                          </p>
                          <p>{title}</p>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            )}
          </div>
        </div>

        <div className="px-2">
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
                  <p className="w-4 ">
                    {obj.arrow && <Icons.rightArrowSolid />}
                  </p>
                  <p className="text-lg">
                    <obj.icon />
                  </p>
                  <p className="p-2">{obj.name}</p>
                </div>
              );
            }

            return (
              <div key={i} className="flex items-center cursor-pointer w-max">
                <p className="w-4 ">{obj.arrow && <Icons.rightArrowSolid />}</p>
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
      </section>

      <div
        className={` absolute left-60 z-30 top-0 h-screen w-96  bg-my_tags border-r-2 transition-all duration-700`}
        // onMouseLeave={() => setShowTagList(false)}
        style={{ translate: `${showTagList ? "0" : "-200%"}` }}
      >
        <AllTags reset={resetAllTags} />
      </div>
    </>
  );
};

export default SideNavbar;
