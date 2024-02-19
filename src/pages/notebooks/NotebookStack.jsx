/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { updateTheNotebook } from "../../redux/slice/initialUserDataSlice";
import { useState } from "react";
import { patchToBackend, postToBackend } from "../../utils/api/userApi";
import changeDate from "../../utils/javaScript/changeDate";
import { Link } from "react-router-dom";
import { Icons } from "../../assets/Icons";
import {
  toggleCreateNewNotebook,
  toggleDeleteForm,
} from "../../redux/slice/toggleSlice";

const NotebookStack = ({ notebooks }) => {
  const dispatch = useDispatch();

  const [index, setIndex] = useState(null);

  const handleAddShortcut = async (id) => {
    try {
      const updateNotebook = await postToBackend("/shortcut", {
        notebookId: id,
      });
      console.log("updateNotebook", updateNotebook);
      dispatch(updateTheNotebook(updateNotebook.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveShortcut = async (id) => {
    try {
      const updateNotebook = await patchToBackend("/shortcut", {
        notebookId: id,
      });
      console.log("updateNotebook", updateNotebook);
      dispatch(updateTheNotebook(updateNotebook.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {notebooks.length > 0 ? (
        notebooks.map((notebook, i) => {
          const { _id, title, createdAt, updatedAt, primary, shortcut } =
            notebook;

          const even = i % 2 === 0;

          return (
            <div key={i} className={`${!even && "bg-gray-100"} `}>
              <div className="flex justify-between items-center">
                <div className="flex-1 flex items-center">
                  {/* <Icons.rightArrow className="text-lg" /> */}
                  <p className=" py-2 px-4 cursor-pointer flex items-center">
                    <p className="w-3 text-[10px]">
                      {primary && <Icons.starSolid />}
                    </p>
                    <Link to={`/notebooks/${_id}`}>{title}</Link>
                  </p>
                </div>
                <p className="w-44 py-2 px-4 text-sm">
                  {changeDate(createdAt, true)}
                </p>
                <p className="w-44 py-2 px-4 text-sm">
                  {changeDate(updatedAt, true)}
                </p>
                <div
                  className="w-40 py-2 px-4 text-end flex justify-end items-center relative h-full"
                  onMouseLeave={() => setIndex(null)}
                >
                  <p
                    className="h-full  cursor-pointer"
                    onMouseEnter={() => setIndex(i)}
                  >
                    <Icons.options />
                  </p>
                  {index === i && (
                    <div className="absolute z-10 top-full  right-0 border bg-gray-50 whitespace-nowrap rounded-lg">
                      {shortcut ? (
                        <p
                          className="p-3 cursor-pointer hover:bg-gray-200 hover:rounded-t-lg"
                          onClick={() => handleRemoveShortcut(_id)}
                        >
                          Remove From Shortcut
                        </p>
                      ) : (
                        <p
                          className="p-3 cursor-pointer hover:bg-gray-200 hover:rounded-t-lg"
                          onClick={() => handleAddShortcut(_id)}
                        >
                          Add to Shortcut
                        </p>
                      )}

                      <p
                        className="p-3 cursor-pointer hover:bg-gray-200"
                        onClick={() =>
                          dispatch(
                            toggleCreateNewNotebook({
                              bool: true,
                              update: true,
                              name: title,
                              id: _id,
                            })
                          )
                        }
                      >
                        Update Notebook
                      </p>
                      {!primary && (
                        <p
                          className="border-b p-3 cursor-pointer hover:bg-gray-200 hover:rounded-b-lg"
                          onClick={() => {
                            dispatch(
                              toggleDeleteForm({
                                bool: true,
                                data: { _id, title },
                              })
                            );
                          }}
                        >
                          Delete Notebook
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>
          <p>No notebook available</p>
        </div>
      )}
    </>
  );
};

export default NotebookStack;
