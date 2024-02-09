/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UpdateNote from "../../hooks/mutation/UpdateNote";
import { useDispatch } from "react-redux";
import {
  deleteTheNote,
  updatedTheNote,
} from "../../redux/slice/initialUserDataSlice";
import { Icons } from "../../assets/Icons";
import { deleteToBackend } from "../../utils/api/userApi";

const TextArea = ({ activeNote, resetSetIndex }) => {
  const dispatch = useDispatch();
  const [typingTimeout, setTypingTimeout] = useState(null); // State to hold typing timeout
  const [showOption, setShowOption] = useState(false);

  const { register, getValues, reset, setFocus } = useForm({
    defaultValues: {
      title: "",
      body: "abcde",
    },
  });

  const { mutate, data, isLoading } = UpdateNote(activeNote._id);

  useEffect(() => {
    setFocus("body");
  }, [setFocus, activeNote]);

  useEffect(() => {
    if (activeNote) {
      const resetValues = {
        title: activeNote.title,
        body: activeNote.body,
      };

      reset(resetValues);
    }
  }, [activeNote, reset]);

  useEffect(() => {
    if (data) {
      console.log("data", data);
      dispatch(updatedTheNote(data.data));
    }
  }, [data, dispatch]);

  const changeTitle = (e) => {
    const { value } = e.target;
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    // Set a timeout to trigger patch request after 500ms of user stopping typing
    const timeout = setTimeout(() => {
      const obj = {
        id: activeNote._id,
        title: value,
        body: getValues().body,
      };

      mutate(obj);

      console.log(obj);
    }, 3000);

    setTypingTimeout(timeout);
  };

  const changeBody = async (e) => {
    const { value } = e.target;
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    // Set a timeout to trigger patch request after 500ms of user stopping typing
    const timeout = setTimeout(() => {
      const obj = {
        id: activeNote._id,
        title: getValues().title,
        body: value,
      };

      mutate(obj);

      console.log(obj);
    }, 1000);

    setTypingTimeout(timeout);
  };

  const handleDeleteNote = async () => {
    try {
      const deleteNote = await deleteToBackend("/notes", {
        id: activeNote._id,
      });
      console.log(deleteNote);
      resetSetIndex();
      dispatch(deleteTheNote(activeNote._id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="h-full flex flex-col items-start">
      <header className="h-24 w-full border-b flex justify-between">
        <div className="w-72">
          <input
            {...register("title")}
            className="w-full h-full px-6 text-xl font-bold outline-none"
            placeholder="title"
            onChange={changeTitle}
            autoComplete="off"
            spellCheck="false"
          />
        </div>
        <div className="h-full w-32 flex flex-col justify-between text-xs p-2">
          <div
            className="p-2 relative w-full flex justify-end"
            onMouseLeave={() => setShowOption(false)}
          >
            <p
              className="cursor-pointer"
              onMouseEnter={() => setShowOption(true)}
            >
              <Icons.options className="text-xl" />
            </p>

            {showOption && (
              <div className="absolute z-10 top-full right-0 bg-gray-100 rounded-lg w-32">
                <p
                  className="p-4 text-sm cursor-pointer"
                  onClick={handleDeleteNote}
                >
                  Delete Note
                </p>
              </div>
            )}
          </div>
          <p>last updated {isLoading && "Loading...."}</p>
        </div>
      </header>
      <div className="flex-1 w-full">
        <textarea
          {...register("body")}
          placeholder="Write your notes"
          className="w-full h-full py-4 px-6 outline-none"
          // You can adjust the number of rows as needed
          onChange={changeBody}
          autoComplete="off"
          spellCheck="false"
        />
      </div>
    </main>
  );
};

export default TextArea;
