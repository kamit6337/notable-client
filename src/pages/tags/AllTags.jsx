/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { userInitialState } from "../../redux/slice/initialUserDataSlice";
import { Icons } from "../../assets/Icons";
import { useState } from "react";
import { toggleCreateNewTag } from "../../redux/slice/toggleSlice";
import alphabet from "../../data/alphabet";
import ShowAlphabeticalTags from "./ShowAlphabeticalTags";
import { useForm } from "react-hook-form";

const AllTags = ({ reset }) => {
  const dispatch = useDispatch();
  const { tags } = useSelector(userInitialState);
  const [showOption, setShowOption] = useState(false);
  const [showSearchedTag, setShowSearchedTag] = useState(false);
  const [searchTagList, setSearchTagList] = useState([]);

  const { register } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const handleSearch = (e) => {
    const { value } = e.target;
    if (!value) {
      setShowSearchedTag(false);
      setSearchTagList([]);
      return;
    }
    setShowSearchedTag(true);
    const filterTags = tags.filter((tag) =>
      tag.title.toLowerCase().includes(value.toLowerCase())
    );
    setSearchTagList(filterTags);
  };

  return (
    <section className="px-5 tablet:px-2 w-full pb-5 h-full">
      <main className="h-40 flex flex-col justify-center gap-6">
        {/* MARK: PART-1 OF HEADER */}
        <div>
          <div className="flex justify-between items-center ">
            <p className="text-xl font-semibold tracking-wide">Tags</p>
            <div className="relative">
              <p
                className="p-2 cursor-pointer"
                onClick={() => setShowOption(true)}
              >
                <Icons.options />
              </p>
              {showOption && (
                <div
                  className="absolute z-10 top-full right-0 border rounded-md text-sm bg-slate-800 text-white whitespace-nowrap"
                  onMouseLeave={() => setShowOption(false)}
                >
                  <p
                    className="py-3 px-5 cursor-pointer"
                    onClick={() => dispatch(toggleCreateNewTag({ bool: true }))}
                  >
                    Create New Tag
                  </p>
                </div>
              )}
            </div>
          </div>
          <p className="w-full h-[2px] mt-2 bg-black" />
        </div>

        {/* MARK: PART-2 OF HEADER */}
        <div className="border rounded-md w-full">
          <input
            {...register("search")}
            type="text"
            onChange={handleSearch}
            spellCheck="false"
            autoComplete="off"
            placeholder="Find Tag"
            className="p-2 rounded-md w-full text-black bg-inherit border border-my_single_note_title"
          />
        </div>
      </main>

      {/* MARK: TAG LIST VERTICAL SCROLLABLE */}
      <div
        className={`overflow-y-auto  flex flex-col gap-10  `}
        style={{ maxHeight: "calc(100% - 160px)" }}
      >
        {tags.length > 0 ? (
          <>
            {alphabet.map((letter, i) => {
              if (!showSearchedTag) {
                return (
                  <ShowAlphabeticalTags
                    letter={letter}
                    reset={reset}
                    tags={tags}
                    key={i}
                  />
                );
              } else if (searchTagList.length > 0) {
                return (
                  <ShowAlphabeticalTags
                    letter={letter}
                    reset={reset}
                    tags={searchTagList}
                    key={i}
                  />
                );
              } else {
                return;
              }
            })}
            <div className="w-full basis-20 grow-0 shrink-0" />
          </>
        ) : (
          <div>No tag available</div>
        )}
      </div>
    </section>
  );
};

export default AllTags;
