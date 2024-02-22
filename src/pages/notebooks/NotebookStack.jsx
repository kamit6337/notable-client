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
import Toastify from "../../lib/Toastify";

const NotebookStack = ({ notebooks }) => {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(null);

  const { ToastContainer, showErrorMessage } = Toastify();

  const handleAddShortcut = async (id) => {
    setIndex(null);
    try {
      const updateNotebook = await postToBackend("/shortcut", {
        notebookId: id,
      });
      console.log("updateNotebook", updateNotebook);
      dispatch(updateTheNotebook(updateNotebook.data));
    } catch (error) {
      showErrorMessage({ message: error.message || "Something Went Wrong." });
    }
  };

  const handleRemoveShortcut = async (id) => {
    setIndex(null);

    try {
      const updateNotebook = await patchToBackend("/shortcut", {
        notebookId: id,
      });
      console.log("updateNotebook", updateNotebook);
      dispatch(updateTheNotebook(updateNotebook.data));
    } catch (error) {
      showErrorMessage({ message: error.message || "Something Went Wrong." });
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
                {/* MARK: TITLE */}
                <div className="flex-1 flex py-2 px-4 tablet:p-2 cursor-pointer">
                  <p className="w-3 text-[10px] mt-[6px]">
                    {primary && <Icons.starSolid />}
                  </p>
                  <p className="text-sm">
                    <Link to={`/notebooks/${_id}`}>{title}</Link>
                  </p>
                </div>

                {/* MARK: CREATED AT */}

                <p className="all_notebooks_list text-sm tablet:text-xs">
                  {changeDate(createdAt, true)}
                </p>
                {/* MARK: UPDATED AT */}

                <p className="all_notebooks_list text-sm tablet:text-xs">
                  {changeDate(updatedAt, true)}
                </p>

                {/* MARK: OPTIONS */}

                <div className="all_notebooks_list text-end flex justify-end items-center relative h-full">
                  <p
                    className="h-full  cursor-pointer"
                    onClick={() => {
                      index === i ? setIndex(null) : setIndex(i);
                    }}
                  >
                    <Icons.options />
                  </p>
                  {index === i && (
                    <div
                      className="absolute z-30 top-full mt-1  right-0 mr-2 border bg-gray-50 whitespace-nowrap rounded-lg"
                      onMouseLeave={() => setIndex(null)}
                    >
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
      <ToastContainer />
    </>
  );
};

export default NotebookStack;
