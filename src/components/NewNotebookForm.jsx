/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Icons } from "../assets/Icons";
import { patchToBackend, postToBackend } from "../utils/api/userApi";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  pushNewNotebook,
  updateTheNotebook,
  userInitialState,
} from "../redux/slice/initialUserDataSlice";
import { toggleCreateNewNotebook } from "../redux/slice/toggleSlice";
import Toastify from "../lib/Toastify";

const NewNotebookForm = ({ update = false, name = "", id }) => {
  const { notebooks } = useSelector(userInitialState);
  const dispatch = useDispatch();
  const { ToastContainer, showErrorMessage } = Toastify();

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: name,
    },
  });

  useEffect(() => {
    setFocus("name");
  }, [setFocus]);

  const handleCancel = () => {
    reset({
      name: "",
    });

    dispatch(
      toggleCreateNewNotebook({
        bool: false,
      })
    );
  };

  const onSubmit = async (data) => {
    try {
      if (!update) {
        const newNotebook = await postToBackend("/notebooks", {
          name: data.name,
        });
        handleCancel();
        dispatch(pushNewNotebook(newNotebook.data));

        return;
      }

      const updateNotebook = await patchToBackend("/notebooks", {
        id,
        name: data.name,
      });
      handleCancel();
      dispatch(updateTheNotebook(updateNotebook.data));
    } catch (error) {
      showErrorMessage({ message: error.message || "Something went wrong" });
    }
  };

  return (
    <div className="background_blur absolute z-50 top-0 left-0 w-full h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-80 w-[550px] bg-white rounded-xl py-8 px-6 flex flex-col justify-between"
      >
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold">
            {update ? "Update Notebook" : "Create New Notebook"}
          </p>
          <div className="cursor-pointer p-1" onClick={handleCancel}>
            <Icons.cancel className="text-xl" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm ml-1">Title</p>
          <div className="border  border-black rounded-lg p-2">
            <input
              {...register("name", {
                required: "Name is required.",
                validate: (value) => {
                  if (
                    notebooks.find(
                      (notebook) =>
                        notebook.title.toLowerCase() === value.toLowerCase()
                    )
                  ) {
                    return "This Notebbok is already present";
                  }
                  return true;
                },
              })}
              type="text"
              placeholder="New Notebook Title"
              className="bg-inherit"
              autoComplete="off"
              spellCheck="false"
            />
          </div>
          {/* MARK: SHOW ERROR MESSAGE IF THERE */}

          <p className="h-4 ml-1 text-sm text-red-400">
            {errors.name && errors.name.message}
          </p>
        </div>
        <div className="flex justify-end gap-4 border-t border-gray-500 pt-4 px-0">
          <p
            className="px-3 py-1 cursor-pointer rounded-xl bg-gray-300"
            onClick={handleCancel}
          >
            Cancel
          </p>
          <button
            type="submit"
            className="px-3 py-1 cursor-pointer bg-green-400 rounded-xl text-green-800"
          >
            Done
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default NewNotebookForm;
