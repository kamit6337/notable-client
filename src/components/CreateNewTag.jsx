/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { Icons } from "../assets/Icons";
import { useDispatch } from "react-redux";
import { toggleCreateNewTag } from "../redux/slice/toggleSlice";
import { useEffect } from "react";
import { patchToBackend, postToBackend } from "../utils/api/userApi";
import Toastify from "../lib/Toastify";
import Loading from "../containers/Loading";
import { useQueryClient } from "@tanstack/react-query";
import UseTagsQuery from "../hooks/query/UseTagsQuery";

const CreateNewTag = ({ update = false, name = "", id }) => {
  const dispatch = useDispatch();
  const { data: tags } = UseTagsQuery();
  const { showErrorMessage } = Toastify();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors, isSubmitting },
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
    try {
      let newOrUpdatedTag;

      if (update) {
        newOrUpdatedTag = await patchToBackend("/tags", {
          id,
          name: data.title,
        });
      } else {
        newOrUpdatedTag = await postToBackend("/tags", { name: data.title });
      }

      const checkStatus = queryClient.getQueryState(["tags"]);

      if (checkStatus.status === "success") {
        queryClient.setQueryData(["tags"], (prev = []) => {
          const findTag = tags.find((tag) => tag._id === newOrUpdatedTag._id);

          if (findTag) {
            return prev.map((tag) =>
              tag._id === newOrUpdatedTag._id ? newOrUpdatedTag : tag
            );
          }

          return [...prev, newOrUpdatedTag];
        });
      }

      handleCancel();
    } catch (error) {
      showErrorMessage({ message: error.message || "Something went wrong" });
    }
  };

  return (
    <div className="background_blur absolute z-50 top-0 left-0 w-full h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-80 w-[550px] bg-white rounded-xl py-8 flex flex-col justify-between"
      >
        <div className="flex justify-between items-center px-6">
          <p className="text-lg font-semibold">
            {update ? "Update the Tag" : "Create New Tag"}
          </p>
          <div className="cursor-pointer p-1" onClick={handleCancel}>
            <Icons.cancel className="text-xl" />
          </div>
        </div>
        <div className="flex flex-col gap-2 px-6">
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
              className="bg-inherit w-full"
              autoComplete="off"
              spellCheck="false"
              maxLength={30}
            />
          </div>
          {/* MARK: SHOW ERROR MESSAGE IF THERE */}

          <p className="h-4 ml-1 text-sm text-red-400">
            {errors.title && errors.title.message}
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
                type="submit"
                className="w-full text-lg py-2 bg-green-500 rounded-md text-white"
                disabled={isSubmitting}
              >
                {update ? "Update" : "Create"}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateNewTag;
