/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import {
  deletedNotebook,
  deletedTheTag,
} from "../redux/slice/initialUserDataSlice";
import { deleteToBackend } from "../utils/api/userApi";
import { toggleDeleteForm } from "../redux/slice/toggleSlice";
import Toastify from "../lib/Toastify";
import { useState } from "react";
import Loading from "../containers/Loading";

const DeleteForm = ({ data: { title, _id }, tag = false }) => {
  const dispatch = useDispatch();
  const { ToastContainer, showErrorMessage } = Toastify();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCancel = () => {
    dispatch(toggleDeleteForm({ bool: false }));
  };

  const deleteNotebook = async () => {
    try {
      setIsSubmitting(true);
      await deleteToBackend("/notebooks", { id: _id });
      handleCancel();
      dispatch(deletedNotebook(_id));
    } catch (error) {
      showErrorMessage({ message: error.message || "Something went wrong" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteTag = async () => {
    try {
      setIsSubmitting(true);
      await deleteToBackend("/tags", { id: _id });
      handleCancel();
      dispatch(deletedTheTag(_id));
    } catch (error) {
      showErrorMessage({ message: error.message || "Something went wrong" });
    } finally {
      setIsSubmitting(false);
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
          <div className="w-28">
            {isSubmitting ? (
              <div>
                <Loading hScreen={false} small={true} />
              </div>
            ) : (
              <button
                className="px-6 py-2 bg-red-600 rounded-xl text-white"
                onClick={() => (tag ? deleteTag() : deleteNotebook())}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DeleteForm;
