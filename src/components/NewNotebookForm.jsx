/* eslint-disable react/prop-types */
import { useState } from "react";
import { Icons } from "../assets/Icons";
import { postToBackend } from "../utils/api/userApi";

const NewNotebookForm = ({
  toggleNewNotebook,
  setToggle,
  refetchNotebooks,
}) => {
  const [newNotebookName, setNewNotebookName] = useState("");
  const [errMsg, setErrMsg] = useState(null);

  const handleNewNotebook = async () => {
    try {
      await postToBackend("/notebooks", { name: newNotebookName });
      refetchNotebooks();
      handleCancel();
    } catch (error) {
      setErrMsg(error.message);
    }
  };

  const handleCancel = () => {
    setToggle(false);
    setNewNotebookName("");
    setErrMsg(null);
  };

  return (
    <>
      {toggleNewNotebook && (
        <div className="background_blur absolute z-10 top-0 left-0 w-full h-screen flex justify-center items-center">
          <div className=" h-80 w-[550px] bg-white rounded-xl py-6 flex flex-col justify-between">
            <div className="flex justify-between items-center px-6 pt-2">
              <p className="text-lg font-semibold">Create New Notebook</p>
              <div className="cursor-pointer p-1" onClick={handleCancel}>
                <Icons.cancel className="text-xl" />
              </div>
            </div>
            <div className="px-6 flex flex-col gap-2">
              <p className="text-sm">Title</p>
              <div className=" border  border-black rounded-lg p-2">
                <input
                  type="text"
                  value={newNotebookName}
                  onChange={(e) => setNewNotebookName(e.target.value)}
                  placeholder="New Notebook Title"
                  className="bg-inherit"
                />
              </div>
              {/* WORK: SHOW ERROR MESSAGE IF THERE */}
              {errMsg && <p className="text-sm text-red-400">{errMsg}</p>}
            </div>
            <div className="flex justify-end px-6 border-t border-gray-500 pt-4">
              <div className="flex gap-4">
                <div
                  className="px-3 py-1 cursor-pointer rounded-xl bg-gray-300"
                  onClick={handleCancel}
                >
                  Cancel
                </div>
                <div
                  className="px-3 py-1 cursor-pointer bg-green-400 rounded-xl text-green-800"
                  onClick={handleNewNotebook}
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

export default NewNotebookForm;
