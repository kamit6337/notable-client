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
      <div className="h-80 w-[550px] bg-white rounded-xl py-8 px-6 flex flex-col justify-between">
        <p className="text-lg font-semibold">
          Are you sure you want to delete this {tag ? "Tag" : "Notebook"}
        </p>
        <p>{title}</p>

        <div className="flex justify-end gap-4 border-t border-gray-500 pt-4 px-0">
          <p
            className="px-3 py-1 cursor-pointer rounded-xl bg-gray-300"
            onClick={handleCancel}
          >
            Cancel
          </p>
          <div
            className="px-3 py-1 cursor-pointer bg-green-400 rounded-xl text-green-800"
            onClick={() => (tag ? deleteTag() : deleteNotebook())}
          >
            Done
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DeleteForm;
