/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { updateTheNotebook } from "../../redux/slice/initialUserDataSlice";
import { useRef, useState } from "react";
import { patchToBackend, postToBackend } from "../../utils/api/userApi";
import changeDate from "../../utils/javaScript/changeDate";
import { useNavigate } from "react-router-dom";
import { Icons } from "../../assets/Icons";
import {
  toggleCreateNewNotebook,
  toggleDeleteForm,
} from "../../redux/slice/toggleSlice";
import Toastify from "../../lib/Toastify";
import { sortByDate } from "../../utils/javaScript/sortOptionsList";
import { useQueryClient } from "@tanstack/react-query";

const NotebookStack = ({ notebooks, parentRef }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [index, setIndex] = useState(null);
  const notebookRef = useRef(null);
  const [showNotebookOptionTop, setShowNotebookOptionTop] = useState(false);
  const { ToastContainer, showErrorMessage } = Toastify();

  const handleClick = (event) => {
    const parentHeight = parentRef.current.clientHeight;

    const parentTop = parentRef.current.getBoundingClientRect().top;
    const childBottom = event.target.getBoundingClientRect().bottom;
    const verticalPosition = childBottom - parentTop;

    const totalHeightBecomesOnClick = verticalPosition + 120;

    if (totalHeightBecomesOnClick >= parentHeight) {
      setShowNotebookOptionTop(true);
      return;
    }

    setShowNotebookOptionTop(false);
  };

  const handleAddShortcut = async (id) => {
    setIndex(null);
    try {
      await postToBackend("/shortcut", {
        notebookId: id,
      });

      const checkStatus = queryClient.getQueryState(["notebooks"]);

      if (checkStatus.status === "success") {
        queryClient.setQueryData(["notebooks"], (prev = []) => {
          return prev.map((notebook) =>
            notebook._id === id ? { ...notebook, shortcut: true } : notebook
          );
        });
      }

      // dispatch(updateTheNotebook(updateNotebook.data));
    } catch (error) {
      showErrorMessage({ message: error.message || "Something Went Wrong." });
    }
  };

  const handleRemoveShortcut = async (id) => {
    setIndex(null);

    try {
      await patchToBackend("/shortcut", {
        notebookId: id,
      });

      const checkStatus = queryClient.getQueryState(["notebooks"]);

      if (checkStatus.status === "success") {
        queryClient.setQueryData(["notebooks"], (prev = []) => {
          return prev.map((notebook) =>
            notebook._id === id ? { ...notebook, shortcut: false } : notebook
          );
        });
      }

      // dispatch(updateTheNotebook(updateNotebook.data));
    } catch (error) {
      showErrorMessage({ message: error.message || "Something Went Wrong." });
    }
  };

  const sortedNotebooks = sortByDate("updatedAt", notebooks);

  return (
    <>
      {sortedNotebooks.length > 0 ? (
        sortedNotebooks.map((notebook, i) => {
          const { _id, title, createdAt, updatedAt, primary, shortcut } =
            notebook;

          const even = i % 2 === 0;

          return (
            <div
              key={i}
              className={`${!even && "bg-gray-100"} `}
              onClick={handleClick}
            >
              <div className="flex justify-between items-center h-10">
                {/* MARK: TITLE */}
                <button
                  className="flex-1 flex px-4 tablet:p-2"
                  onClick={() => navigate(`/notebooks/${_id}`)}
                >
                  <p className="w-3 text-[10px] mt-[6px]">
                    {primary && <Icons.starSolid />}
                  </p>
                  <p className="text-sm">{title}</p>
                </button>

                {/* MARK: CREATED AT */}

                <p className="all_notebooks_list text-sm tablet:text-xs">
                  {changeDate(createdAt, true)}
                </p>
                {/* MARK: UPDATED AT */}

                <p className="all_notebooks_list text-sm tablet:text-xs">
                  {changeDate(updatedAt, true)}
                </p>

                {/* MARK: OPTIONS */}

                <div className="all_notebooks_list flex justify-end items-center relative">
                  <p
                    className="cursor-pointer"
                    onClick={() => {
                      index === i ? setIndex(null) : setIndex(i);
                    }}
                  >
                    <Icons.options />
                  </p>
                  {index === i && (
                    <div
                      className={`${
                        showNotebookOptionTop ? "bottom-full" : "top-full"
                      }  absolute z-30  right-0 mr-2 border bg-gray-50 whitespace-nowrap rounded-md text-sm`}
                      onMouseLeave={() => setIndex(null)}
                      ref={notebookRef}
                    >
                      {shortcut ? (
                        <p
                          className="h-9 px-3 flex items-center cursor-pointer hover:bg-gray-200 hover:rounded-t-md"
                          onClick={() => handleRemoveShortcut(_id)}
                        >
                          Remove From Shortcut
                        </p>
                      ) : (
                        <p
                          className="h-9 px-3 flex items-center cursor-pointer hover:bg-gray-200 hover:rounded-t-md"
                          onClick={() => handleAddShortcut(_id)}
                        >
                          Add to Shortcut
                        </p>
                      )}

                      <p
                        className="h-9 px-3 flex items-center cursor-pointer hover:bg-gray-200"
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
                          className="h-9 px-3 flex items-center border-b cursor-pointer hover:bg-gray-200 hover:rounded-b-md"
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
        <div className="p-5">
          <p>No notebook available</p>
        </div>
      )}
    </>
  );
};

export default NotebookStack;
