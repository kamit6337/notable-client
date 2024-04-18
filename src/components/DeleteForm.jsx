/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import {
  deletedNotebook,
  deletedTheTag,
} from "../redux/slice/initialUserDataSlice";
import { deleteToBackend } from "../utils/api/userApi";
import { toggleDeleteForm } from "../redux/slice/toggleSlice";
import Toastify from "../lib/Toastify";

const DeleteForm = ({ data: { title, _id }, tag = false }) => {
  const dispatch = useDispatch();
  const { ToastContainer, showErrorMessage } = Toastify();

  const handleCancel = () => {
    dispatch(toggleDeleteForm({ bool: false }));
  };

  const deleteNotebook = async () => {
    try {
      await deleteToBackend("/notebooks", { id: _id });
      handleCancel();
      dispatch(deletedNotebook(_id));
    } catch (error) {
      showErrorMessage({ message: error.message || "Something went wrong" });
    }
  };

  const deleteTag = async () => {
    try {
      await deleteToBackend("/tags", { id: _id });
      handleCancel();
      dispatch(deletedTheTag(_id));
    } catch (error) {
      showErrorMessage({ message: error.message || "Something went wrong" });
    }
  };

  return (
    <div className="background_blur absolute z-50 top-0 left-0 w-full h-screen flex justify-center items-center">
      <div className="w-[550px] bg-white rounded-xl py-8 flex flex-col justify-between gap-8">
        <div className="px-6 space-y-6">
          <p className="text-lg font-semibold">
            Delete {tag ? "Tag" : "Notebook"}
          </p>
          <p>
            Are you sure you want to delete :{" "}
            <span className="italic">{title}</span>
          </p>
        </div>

        <div className="flex justify-end items-center gap-4 border-t border-gray-500 pt-4 px-6">
          <p className="px-3 py-1 cursor-pointer" onClick={handleCancel}>
            Cancel
          </p>
          <div
            className="px-6 py-2 cursor-pointer bg-red-600 rounded-xl text-white"
            onClick={() => (tag ? deleteTag() : deleteNotebook())}
          >
            Delete
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DeleteForm;
