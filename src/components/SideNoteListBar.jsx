/* eslint-disable react/prop-types */
import { useEffect, useState, useLayoutEffect } from "react";
import { Icons } from "../assets/Icons";
import convertDateType from "../utils/javaScript/convertDateType";
import convertHTMLtoString from "../utils/javaScript/convertHTMLtoString";
import {
  sortFunction,
  sortOptionsList,
} from "../utils/javaScript/sortOptionsList";
import { useDispatch, useSelector } from "react-redux";
import { toggleNoteActivation, toggleState } from "../redux/slice/toggleSlice";

const SideNoteListBar = ({
  title,
  icon,
  list,
  activeNote,
  handleActiveNote,
  scrolling,
}) => {
  const dispatch = useDispatch();
  const [showSortOption, setShowSortOption] = useState(false);
  const [showTitleHover, setShowTitleHover] = useState(false);
  const [newList, setNewList] = useState(list);
  const [newSortOptions, setNewSortOptions] = useState(sortOptionsList);
  const { isNoteActivated } = useSelector(toggleState);

  useEffect(() => {
    if (!list) return;
    const localSort = JSON.parse(localStorage.getItem("sort"));
    if (!localSort) {
      setNewList(list);
      return;
    }
    setNewList(sortFunction(list, localSort.id));
    const updateSortOptions = sortOptionsList.map((obj) => {
      const newObj = { ...obj };
      if (newObj.id === localSort.id) {
        newObj.active = true;
        return newObj;
      }
      delete newObj.active;
      return newObj;
    });
    setNewSortOptions(updateSortOptions);
  }, [list]);

  useEffect(() => {
    if (isNoteActivated.bool) {
      handleActiveNote(isNoteActivated.data);
      dispatch(toggleNoteActivation({ bool: false }));
    }
  }, [isNoteActivated, dispatch, handleActiveNote]);

  useLayoutEffect(() => {
    const childRef = document.getElementById(activeNote._id);
    if (childRef) {
      childRef.scrollIntoView({ behavior: "instant", block: "nearest" });
    }
  }, [activeNote, newList, scrolling]);

  const showActiveNoteIntoView = () => {
    console.log("click on icon to show active note", activeNote);

    const childRef = document.getElementById(activeNote?._id);
    if (childRef) {
      childRef.scrollIntoView({ behavior: "instant", block: "nearest" });
    }
  };

  const handleSort = (id) => {
    setShowSortOption(false);
    localStorage.setItem("sort", JSON.stringify({ id }));

    setNewList(sortFunction(newList, id));

    const updateSortOptions = newSortOptions.map((obj) => {
      const newObj = { ...obj };
      if (newObj.id === id) {
        newObj.active = true;
        return newObj;
      }
      delete newObj.active;
      return newObj;
    });
    setNewSortOptions(updateSortOptions);
  };

  return (
    <div className="w-full bg-gray-50 h-full  border-r border-gray-300">
      {/* MARK: HEADER */}
      <header className="h-24 border-b border-gray-400 w-full flex flex-col justify-between pb-2 pt-4 gap-1 px-5">
        <div className="flex gap-1 items-center ">
          <p className="text-2xl sm_lap:text-lg">{icon}</p>
          <div
            className="relative flex flex-col items-center"
            onMouseLeave={() => setShowTitleHover(false)}
          >
            <p
              className="text-lg  sm_lap:text-sm line-clamp-1"
              onMouseEnter={() => setShowTitleHover(true)}
            >
              {title}
            </p>
            {showTitleHover && (
              <div className="absolute z-10 top-full whitespace-nowrap bg-gray-200 p-2 rounded-md text-sm">
                {title}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p>{newList.length} Notes</p>
          <p
            className="ml-auto mr-4 cursor-pointer"
            onClick={showActiveNoteIntoView}
          >
            <Icons.searchNote />
          </p>
          <div className="relative">
            <p
              className="text-xl"
              onClick={() => setShowSortOption((prev) => !prev)}
            >
              <Icons.sort />
            </p>
            {showSortOption && (
              <div
                className="absolute z-20 top-full mt-3 left-0 bg-white border whitespace-nowrap  rounded-lg py-4 text-sm"
                onMouseLeave={() => setShowSortOption(false)}
              >
                {newSortOptions.map((obj, i) => {
                  const { id, name, active } = obj;

                  return (
                    <div
                      key={i}
                      className={`${
                        active && "bg-gray-100"
                      }  hover:bg-gray-100 px-10 py-2`}
                      onClick={() => handleSort(id)}
                    >
                      <p className="">{name}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* MARK: NOTE LIST */}
      <div
        className={`overflow-y-auto w-full p-[2px]  overflow-x-hidden`}
        style={{ maxHeight: "calc(100% - 100px)" }}
      >
        {newList.length > 0 ? (
          newList.map((note, i) => {
            const { _id, title, body, updatedAt } = note;

            return (
              <div
                key={i}
                id={_id}
                className={`w-full h-32 flex flex-col justify-between  p-5  border-b hover:bg-white cursor-pointer ${
                  activeNote?._id === _id &&
                  "border border-my_single_note_title"
                }`}
                onClick={() => handleActiveNote(note)}
              >
                <p className="text-sm line-clamp-1">{title}</p>
                <p className="text-sm tablet:text-xs -mt-2 break-all text-gray-500 line-clamp-2">
                  {convertHTMLtoString(body, { slice: false })}
                </p>
                <p className=" text-xs">{convertDateType(updatedAt)}</p>
              </div>
            );
          })
        ) : (
          <div className="h-full w-full flex justify-center items-center px-4 text-center">
            Sorry, No Notes available
          </div>
        )}
      </div>
    </div>
  );
};

export default SideNoteListBar;
