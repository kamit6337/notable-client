import { useDispatch, useSelector } from "react-redux";
import { userInitialState } from "../../redux/slice/initialUserDataSlice";
import { Icons } from "../../assets/Icons";
import { useState } from "react";
import {
  toggleCreateNewTag,
  toggleDeleteForm,
} from "../../redux/slice/toggleSlice";

const AllTags = () => {
  const dispatch = useDispatch();
  const { tags } = useSelector(userInitialState);
  const [showOption, setShowOption] = useState(false);
  const [index, setIndex] = useState(null);
  const [showTagOption, setShowTagOption] = useState(false);

  return (
    <section className="px-5 py-10 w-full">
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
                className="absolute z-10 top-full right-0 border rounded-xl bg-slate-200 whitespace-nowrap"
                onMouseLeave={() => setShowOption(false)}
              >
                <p
                  className="p-2 cursor-pointer"
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
      <div className="border rounded-md w-full my-5">
        <input
          type="text"
          placeholder="Find Tag"
          className="p-2 rounded-md w-full text-black"
        />
      </div>

      {tags.length > 0 ? (
        <div className="flex flex-col gap-1 h-full">
          {tags.map((tag, i) => {
            const { _id, title } = tag;

            return (
              <div
                key={i}
                className="hover:bg-gray-300 p-1 px-5 rounded-xl flex gap-6 items-center w-max"
                onMouseEnter={() => setIndex(i)}
                onMouseLeave={() => {
                  setShowTagOption(false);
                  setIndex(null);
                }}
              >
                <p>{title}</p>

                {index === i && (
                  <div className="relative">
                    <p
                      className="cursor-pointer"
                      onClick={() => setShowTagOption(true)}
                    >
                      <Icons.options className="rotate-90 " />
                    </p>
                    {showTagOption && (
                      <div className=" absolute z-20 top-full left-full  border bg-slate-100  rounded-lg flex flex-col items-center whitespace-nowrap">
                        <p
                          className="px-4 py-2 border-b cursor-pointer"
                          onClick={() =>
                            dispatch(
                              toggleCreateNewTag({
                                bool: true,
                                update: true,
                                name: title,
                                id: _id,
                              })
                            )
                          }
                        >
                          Rename Tag
                        </p>
                        <p
                          className="px-4 py-2 cursor-pointer"
                          onClick={() =>
                            dispatch(
                              toggleDeleteForm({
                                bool: true,
                                data: { _id, title },
                                tag: true,
                              })
                            )
                          }
                        >
                          Delete Tag
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div>No tag available</div>
      )}
    </section>
  );
};

export default AllTags;
