import { getFromBackend } from "../../utils/api/userApi";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { userInitialData } from "../../redux/slice/initialUserDataSlice";
import { useQueries } from "@tanstack/react-query";
import UseNotebooksQuery from "./UseNotebooksQuery";
import UseNotesQuery from "./UseNotesQuery";
import UseTagsQuery from "./UseTagsQuery";

const UseInitialFetch = (toggle = false) => {
  const dispatch = useDispatch();

  const [isErrorArray, setIsErrorArray] = useState([]);
  const [isLoadingArray, setIsLoadingArray] = useState([]);
  const [errorArray, setErrorArray] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const url = ["/notebooks", "/notes", "/tags"];

  const notebooks = UseNotebooksQuery(toggle);
  const notes = UseNotesQuery(toggle);
  const tags = UseTagsQuery(toggle);

  // const query = useQueries({
  //   queries: url.map((link) => ({
  //     queryKey: [link],
  //     queryFn: () => getFromBackend(link),
  //     staleTime: Infinity,
  //     enabled: toggle,
  //   })),
  //   combine: (results) => {
  //     return {
  //       data: results.map((result) => result.data),
  //       isLoading: results.some((result) => result.isLoading),
  //       error: results.some((result) => result.error),
  //       isSuccess: results.every((result) => result.isSuccess),
  //     };
  //   },
  // });

  // useEffect(() => {
  //   if (query.isSuccess) {
  //     dispatch(userInitialData(query.data));
  //   }
  // }, [query, dispatch]);

  // useEffect(() => {
  //   if (toggle) {
  //     setIsLoadingArray([true]);
  //     setIsSuccess(false);
  //     (async () => {
  //       try {
  //         const fetchNotebook = getFromBackend("/notebooks");
  //         const fetchNotes = getFromBackend("/notes");
  //         const fetchTags = getFromBackend("/tags");

  //         const query = await Promise.all([
  //           fetchNotebook,
  //           fetchNotes,
  //           fetchTags,
  //         ]);

  //         dispatch(userInitialData(query));
  //         setIsSuccess(true);
  //       } catch (error) {
  //         setIsErrorArray([true]);
  //         setErrorArray([error]);
  //       } finally {
  //         setIsLoadingArray([false]);
  //       }
  //     })();
  //   }
  // }, [toggle, dispatch]);

  // const isLoading = useMemo(() => {
  //   return isLoadingArray.some((bool) => bool === true);
  // }, [isLoadingArray]);

  // const isError = useMemo(() => {
  //   return isErrorArray.some((bool) => bool === true);
  // }, [isErrorArray]);

  // const error = useMemo(() => {
  //   return errorArray.find((bool) => bool);
  // }, [errorArray]);

  // return {
  //   isLoading,
  //   error,
  //   isSuccess,
  // };
  return {
    isLoading: notebooks.isLoading || notes.isLoading || tags.isLoading,
    error: notebooks.error || notes.error || tags.error,
    isSuccess: notebooks.isSuccess || notes.isSuccess || tags.isSuccess,
  };
};

export default UseInitialFetch;
