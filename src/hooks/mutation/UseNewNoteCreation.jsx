import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postToBackend } from "../../utils/api/userApi";
import Toastify from "../../lib/Toastify";
import { useLocation, useNavigate } from "react-router-dom";
import UseNotebooksQuery from "../query/UseNotebooksQuery";

const UseNewNoteCreation = () => {
  const { showErrorMessage } = Toastify();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: notebooks } = UseNotebooksQuery();
  const { pathname } = useLocation();

  const handleNoteCreation = () => {
    const primaryNotebook = notebooks.find(
      (notebook) => notebook.primary === true
    );

    const obj = {
      id: primaryNotebook._id,
      navigateLink: `/notebooks/${primaryNotebook._id}`,
    };

    if (pathname.startsWith("/notes")) {
      obj.navigateLink = "/notes";
    }

    if (pathname.startsWith("/notebooks/")) {
      const notebookId = pathname.split("/").at(-1);
      obj.id = notebookId;
      obj.navigateLink = pathname;
    }

    if (pathname.startsWith("/tags/")) {
      const tagId = pathname.split("/").at(-1);
      obj.tagId = tagId;
      obj.navigateLink = pathname;
    }

    return obj;
  };

  const mutation = useMutation({
    mutationKey: ["new note"],
    mutationFn: () => postToBackend("/notes", handleNoteCreation()),
    onSuccess: (data) => {
      const checkStatus = queryClient.getQueryState(["notes"]);

      if (checkStatus) {
        queryClient.setQueryData(["notes"], (prev = []) => {
          return [...prev, data];
        });
      }

      const { navigateLink } = handleNoteCreation();

      const noteId = data._id;

      navigate(`${navigateLink}?note=${noteId}`);
    },
    onError: (error) => {
      showErrorMessage({
        message: error.message || "Issue in create note. Try later",
      });
    },
  });

  return mutation;
};

export default UseNewNoteCreation;
