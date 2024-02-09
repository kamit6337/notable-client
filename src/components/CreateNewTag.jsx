import { useForm } from "react-hook-form";
import { Icons } from "../assets/Icons";
import { useDispatch, useSelector } from "react-redux";
import {
  createdNewTag,
  updateTheTag,
  userInitialState,
} from "../redux/slice/initialUserDataSlice";
import { toggleCreateNewTag } from "../redux/slice/toggleSlice";
import { useEffect } from "react";
import { patchToBackend, postToBackend } from "../utils/api/userApi";

/* eslint-disable react/prop-types */
const CreateNewTag = ({ update = false, name = "", id }) => {
  const dispatch = useDispatch();
  const { tags } = useSelector(userInitialState);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setFocus,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: name,
    },
  });

  useEffect(() => {
    setFocus("title");
  }, [setFocus]);

  const handleCancel = () => {
    reset({
      title: "",
    });
    dispatch(toggleCreateNewTag({ bool: false }));
  };

  const onSubmit = async (data) => {
    console.log(data);

    try {
      if (!update) {
        const tagCreated = await postToBackend("/tags", { name: data.title });
        handleCancel();
        console.log("tagcreated", tagCreated);
        dispatch(createdNewTag(tagCreated.data));

        return;
      }

      const tagUpdated = await patchToBackend("/tags", {
        id,
        name: data.title,
      });
      handleCancel();
      console.log("tagUpdated", tagUpdated);
      dispatch(updateTheTag(tagUpdated.data));
    } catch (error) {
      console.log(error);
      setError("root", { message: error.message });
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
            {update ? "Update the Tag" : "Create New Tag"}
          </p>
          <div className="cursor-pointer p-1" onClick={handleCancel}>
            <Icons.cancel className="text-xl" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm ml-1">Title</p>
          <div className="border  border-black rounded-lg p-2">
            <input
              {...register("title", {
                required: "Name is required.",
                validate: (value) => {
                  if (
                    tags.find(
                      (tag) => tag.title.toLowerCase() === value.toLowerCase()
                    )
                  ) {
                    return "This Tag is already present";
                  }
                  return true;
                },
              })}
              type="text"
              placeholder="New Tag Title"
              className="bg-inherit"
              autoComplete="off"
              spellCheck="false"
            />
          </div>
          {/* MARK: SHOW ERROR MESSAGE IF THERE */}

          <p className="h-4 ml-1 text-sm text-red-400">
            {errors.title && errors.title.message}
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
    </div>
  );
};

export default CreateNewTag;
