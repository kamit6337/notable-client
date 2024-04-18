/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import UpdateNote from "../hooks/mutation/UpdateNote";
import { updatedTheNote } from "../redux/slice/initialUserDataSlice";
import { useDispatch } from "react-redux";
import Toastify from "../lib/Toastify";

const QuillTextarea = ({
  deafultTitle,
  deafultBody,
  activeNote,
  focusToBody,
  resetFocusToBody,
}) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const ref = useRef(null);
  const [typingTimeout, setTypingTimeout] = useState(null); // State to hold typing timeout
  const { mutate, data, error, reset } = UpdateNote(activeNote._id);

  const { ToastContainer, showErrorMessage } = Toastify();

  useEffect(() => {
    setValue(deafultBody);
  }, [deafultBody]);

  useEffect(() => {
    if (data) {
      dispatch(updatedTheNote(data.data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (error) {
      showErrorMessage({ message: error.message || "Something went wrong" });
      reset();
    }
  }, [error, showErrorMessage, reset]);

  useEffect(() => {
    if (ref.current) {
      ref.current.editor.root.setAttribute("spellcheck", "false");
    }
  }, []);

  useEffect(() => {
    if (ref.current) {
      if (!value) {
        // Set focus on the Quill editor whenever activeNote changes
        ref.current.editor.focus();
        return;
      }

      setTimeout(() => {
        const quill = ref.current.getEditor();
        quill.setSelection(quill.getLength(), quill.getLength());
      }, 200);
    }
  }, [activeNote._id]);

  useEffect(() => {
    if (!focusToBody || !ref.current) return;

    if (!value) {
      // Set focus on the Quill editor whenever activeNote changes
      ref.current.editor.focus();
      resetFocusToBody();
      return;
    }

    setTimeout(() => {
      const quill = ref.current.getEditor();
      quill.setSelection(quill.getLength(), quill.getLength());
    }, 200);

    resetFocusToBody();
  }, [focusToBody]);

  const handleChange = (content) => {
    // Replace multiple spaces with non-breaking space entity
    content = content.replace(/\s+/g, "&nbsp;");

    // Update the value state whenever the content changes
    setValue(content);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    // Set a timeout to trigger patch request after 500ms of user stopping typing
    const timeout = setTimeout(() => {
      const obj = {
        id: activeNote._id,
        title: deafultTitle,
        body: content,
      };

      mutate(obj);
    }, 1000);

    setTypingTimeout(timeout);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  return (
    <>
      <div className="h-full">
        <ReactQuill
          ref={ref}
          theme="snow"
          value={value}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          className="w-full h-full"
          placeholder="Write your text here"
        />
      </div>
      <ToastContainer />
    </>
  );
};

export default QuillTextarea;
