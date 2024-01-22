/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import { Icons } from "../../assets/Icons";
import { getActualDate } from "../../utils/javaScript/basicJS";
import { deleteToBackend, patchToBackend } from "../../utils/api/userApi";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotebooks } from "../../redux/slice/initialUserDataSlice";
import {
  globalErrorInitialState,
  showErrorMsg,
} from "../../redux/slice/globalErrorSlice";
import ShowErrorMsg from "../../containers/GlobalErrorMsg";

const NotebookList = ({ list }) => {
  const [toggleNotebookOption, setToggleNotebookOption] = useState(false);
  const [toggleNotebookRename, setToggleNotebookRename] = useState(false);
  const [notebookRename, setNotebookRename] = useState("");
  const [notebookTitle, setNotebookTitle] = useState("");
  const [optionIndex, setOptionIndex] = useState(null);
  const [errMsg, setErrorMsg] = useState(null);
  const dispatch = useDispatch();
  const { showError } = useSelector(globalErrorInitialState);
  const [isErrorInRename, setIsErrorInRename] = useState(false);
  const [errMsgInRename, setErrMsgInRename] = useState(null);

  if (showError) {
    return <ShowErrorMsg errMsg={errMsg} refreshButton={true} />;
  }

  // WORK: HANDLE DELETE NOTEBOOK
  const handleDeleteNotebook = async (name) => {
    const deleteNotebook = await deleteToBackend("/notebook", {
      notebookName: name,
    });

    setToggleNotebookOption(false);

    if (deleteNotebook?.status === 200) {
      dispatch(fetchNotebooks());
    } else {
      setErrorMsg(deleteNotebook.data.message);
      dispatch(showErrorMsg());
    }
  };

  // WORK: HANDLE UPDATE NOTEBOOK
  const handleUpdateNotebookName = async () => {
    console.log("notebookTitle", notebookTitle);
    console.log("notebookRename", notebookRename);

    if (notebookTitle === notebookRename) {
      setErrMsgInRename("Title is Same.");
      setIsErrorInRename(true);
      return;
    }

    const updateNotebookName = await patchToBackend("/notebook", {
      notebookName: notebookTitle,
      isNameChange: true,
      changedNotebookName: notebookRename,
    });

    if (updateNotebookName?.status === 200) {
      setToggleNotebookRename(false);
      dispatch(fetchNotebooks());
    } else {
      setErrMsgInRename(updateNotebookName.data.message);
      setIsErrorInRename(true);
    }
  };

  return (
    <>
      <div>
        {list.map((notebook, i) => {
          const { createdAt, notebookId, primary, shortcut, title, updatedAt } =
            notebook;

          return (
            <>
              <div
                key={notebookId}
                className={`flex justify-between items-center
                
                ${i % 2 === 0 ? "bg-white" : "bg-gray-100"}
                `}
              >
                <div className="flex-1">
                  <Link
                    to={`/notebook?title=${title}`}
                    className="flex items-center"
                  >
                    <Icons.rightArrow className="text-lg" />
                    <p className="">{title}</p>
                  </Link>
                </div>
                <p className="w-44 text-sm text-gray-500">
                  {getActualDate(createdAt)}
                </p>
                <p className="w-44 text-sm text-gray-500">
                  {getActualDate(updatedAt)}
                </p>
                <div className="w-40 flex justify-end items-center relative h-full">
                  {/* WORK: SHOW OPTION BUTTON */}
                  <div
                    className="cursor-pointer h-full flex items-center p-1"
                    onClick={() => {
                      setOptionIndex(i);
                      setToggleNotebookOption((prev) => !prev);
                    }}
                  >
                    <Icons.options className="text-sm text-gray-500 h-full" />
                  </div>

                  {/* WORK: OPTION DETAIL OF EACH NOTEBOOK */}
                  {toggleNotebookOption && optionIndex === i && (
                    <div className="absolute top-full  right-0 z-20 w-44 bg-white border border-black">
                      <div
                        className="p-2 border-b border-gray-300 cursor-pointer"
                        onClick={() => {
                          setNotebookTitle(title);
                          setNotebookRename(title);
                          setToggleNotebookOption(false);
                          setToggleNotebookRename(true);
                        }}
                      >
                        Rename
                      </div>
                      <div className="p-2 border-b border-gray-300 cursor-pointer">
                        Add to Stack
                      </div>
                      <div className="p-2 border-b border-gray-300 cursor-pointer">
                        {shortcut ? "Remove from" : "Add to"} Shortcut
                      </div>
                      <div
                        className="p-2 cursor-pointer"
                        onClick={() => handleDeleteNotebook(title)}
                      >
                        Delete Notebook
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          );
        })}
      </div>

      {/* WORK: FORM TO CREATE NEW NOTEBOOK */}
      {toggleNotebookRename && (
        <div className="background_blur absolute z-10 top-0 left-0 w-full h-screen flex justify-center items-center">
          <div className=" h-80 w-[550px] bg-white rounded-xl py-6 flex flex-col justify-between">
            <div className="flex justify-between items-center px-6 pt-2">
              <p className="text-lg font-semibold">Rename Notebook</p>
              <div
                className="cursor-pointer p-1"
                onClick={() => {
                  setToggleNotebookRename(false);
                  setNotebookRename("");
                  setIsErrorInRename(false);
                }}
              >
                <Icons.cancel className="text-xl" />
              </div>
            </div>
            <div className="px-6 flex flex-col gap-2">
              <p className="text-sm">Title</p>
              <div className=" border  border-black rounded-lg p-2">
                <input
                  type="text"
                  value={notebookRename}
                  onChange={(e) => setNotebookRename(e.target.value)}
                  placeholder="New Notebook Title"
                  className="bg-inherit"
                />
              </div>
              {/* WORK: SHOW ERROR MESSAGE IF THERE */}
              <div className="h-10">
                {isErrorInRename && (
                  <p className="text-sm text-red-400">{errMsgInRename}</p>
                )}
              </div>
            </div>
            <div className="flex justify-end px-6 border-t border-gray-500 pt-4">
              <div className="flex gap-4">
                <div
                  className="px-3 py-1 cursor-pointer rounded-xl bg-gray-300"
                  onClick={() => {
                    setToggleNotebookRename(false);
                    setNotebookRename("");
                    setIsErrorInRename(false);
                  }}
                >
                  Cancel
                </div>
                <div
                  className="px-3 py-1 cursor-pointer bg-green-400 rounded-xl text-green-800"
                  onClick={handleUpdateNotebookName}
                >
                  Done
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotebookList;
