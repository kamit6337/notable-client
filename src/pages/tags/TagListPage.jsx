import { useState } from "react";
import { Icons } from "../../assets/Icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  toggleCreateNewTag,
  toggleDeleteForm,
} from "../../redux/slice/toggleSlice";

/* eslint-disable react/prop-types */
const TagListPage = ({ tags, reset }) => {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(null);
  const [showTagOption, setShowTagOption] = useState(false);

  return (
    <>
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
            <p className="cursor-pointer text-sm">
              <Link to={`/tags/${_id}`} onClick={reset}>
                {title}
              </Link>
            </p>

            {index === i && (
              <div className="relative">
                <p
                  className="cursor-pointer"
                  onClick={() => setShowTagOption((prev) => !prev)}
                >
                  <Icons.options className="rotate-90 " />
                </p>
                {showTagOption && (
                  <div className=" absolute z-20 top-full left-full  border bg-slate-800   text-sm text-white rounded-lg flex flex-col items-center whitespace-nowrap">
                    <p
                      className="px-4 py-2 border-b cursor-pointer "
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
    </>
  );
};

export default TagListPage;
