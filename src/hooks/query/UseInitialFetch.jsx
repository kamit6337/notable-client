import UseNotebooksQuery from "./UseNotebooksQuery";
import UseNotesQuery from "./UseNotesQuery";
import UseTagsQuery from "./UseTagsQuery";

const UseInitialFetch = (toggle = false) => {
  const notebooks = UseNotebooksQuery(toggle);
  const notes = UseNotesQuery(toggle);
  const tags = UseTagsQuery(toggle);

  return {
    isLoading: notebooks.isLoading || notes.isLoading || tags.isLoading,
    error: notebooks.error || notes.error || tags.error,
    isSuccess: notebooks.isSuccess || notes.isSuccess || tags.isSuccess,
  };
};

export default UseInitialFetch;
