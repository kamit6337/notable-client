/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { Icons } from "../assets/Icons";
import convertDateType from "../utils/javaScript/convertDateType";
import convertHTMLtoString from "../utils/javaScript/convertHTMLtoString";
import {
  sortFunction,
  sortOptionsList,
} from "../utils/javaScript/sortOptionsList";

const SideNoteListBar = ({
  title,
  icon,
  list,
  activeNote,
  handleActiveNote,
}) => {
  const lastNoteRef = useRef(null);

  const [showSortOption, setShowSortOption] = useState(false);
  const [newList, setNewList] = useState(list);
  const [newSortOptions, setNewSortOptions] = useState(sortOptionsList);

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
    <div className="w-60 bg-gray-50 h-full  flex flex-col border-r border-gray-300">
      {/* MARK: HEADER */}
      <div className="h-24 border-b border-gray-400 w-full flex flex-col justify-between pb-2 pt-4 gap-1 px-5">
        <div className="flex gap-1 items-center ">
          <p className="text-2xl">{icon}</p>
          <p className="text-lg">{title}</p>
        </div>
        <div className="flex justify-between items-center">
          <p>{list.length} Notes</p>
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
      </div>

      {/* MARK: NOTE LIST */}

      <div className="w-full flex-1 p-[2px] overflow-y-scroll overflow-x-hidden">
        {newList.length > 0 ? (
          newList.map((note, i) => {
            const { _id, title, body, updatedAt } = note;

            return (
              <div
                key={i}
                ref={activeNote?._id === _id ? lastNoteRef : null}
                className={`w-full h-32 flex flex-col justify-between  p-5  border-b hover:bg-white cursor-pointer ${
                  activeNote?._id === _id &&
                  "border border-my_single_note_title"
                }`}
                onClick={() => handleActiveNote(note)}
              >
                <p className="text-sm">{title}</p>
                <p className="text-sm -mt-2 break-all text-gray-500">
                  {convertHTMLtoString(body)}
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