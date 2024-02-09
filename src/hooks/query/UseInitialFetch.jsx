import { getFromBackend } from "../../utils/api/userApi";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { userInitialData } from "../../redux/slice/initialUserDataSlice";

const UseInitialFetch = (toggle = false) => {
  const dispatch = useDispatch();

  const [isErrorArray, setIsErrorArray] = useState([]);
  const [isLoadingArray, setIsLoadingArray] = useState([]);
  const [errorArray, setErrorArray] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (toggle) {
      setIsLoadingArray([true]);
      setIsSuccess(false);
      try {
        (async () => {
          const fetchNotebook = getFromBackend("/notebooks");
          const fetchNotes = getFromBackend("/notes");
          const fetchTags = getFromBackend("/tags");

          const query = await Promise.all([
            fetchNotebook,
            fetchNotes,
            fetchTags,
          ]);

          dispatch(userInitialData(query));
          setIsSuccess(true);
        })();
      } catch (error) {
        console.log(error);
        setIsErrorArray([true]);
        setErrorArray([error]);
      } finally {
        setIsLoadingArray([false]);
      }
    }
  }, [toggle, dispatch]);

  // const notebookQuery = useQuery({
  //   queryKey: ["notebooks"],
  //   queryFn: () => getFromBackend("/notebooks"),
  //   cacheTime: Infinity,
  //   staleTime: Infinity,
  //   enabled: toggle,
  // });

  // const noteQuery = useQuery({
  //   queryKey: ["notes"],
  //   queryFn: () => getFromBackend("/notes"),
  //   cacheTime: Infinity,
  //   staleTime: Infinity,
  //   enabled: toggle,
  // });

  // useEffect(() => {
  //   if (notebookQuery.data && noteQuery.data) {
  //     const arr = [notebookQuery.data.data, noteQuery.data.data];

  //     dispatch(userInitialData(arr));
  //   }
  // }, [notebookQuery, noteQuery, dispatch]);

  // useEffect(() => {
  //   setIsLoadingArray([notebookQuery.isLoading, noteQuery.isLoading]);
  //   setIsErrorArray([notebookQuery.isError, noteQuery.isError]);
  //   setErrorArray([notebookQuery.error, noteQuery.error]);
  // }, [
  //   notebookQuery.isLoading,
  //   noteQuery.isLoading,
  //   notebookQuery.isError,
  //   noteQuery.isError,
  //   notebookQuery.error,
  //   noteQuery.error,
  // ]);

  const isLoading = useMemo(() => {
    return isLoadingArray.some((bool) => bool === true);
  }, [isLoadingArray]);

  const isError = useMemo(() => {
    return isErrorArray.some((bool) => bool === true);
  }, [isErrorArray]);

  const error = useMemo(() => {
    return errorArray.find((bool) => bool);
  }, [errorArray]);

  // const isError = isErrorArray.some((bool) => bool === true);
  // const error = errorArray.find((bool) => bool);

  return { isLoading, isError, error, isSuccess };
};

export default UseInitialFetch;

// const queriesArray = [
//   {
//     queryKey: ["notebooks"],
//     queryFn: () => getFromBackend("/notebooks"),
//     cacheTime: Infinity,
//     staleTime: Infinity,
//     enabled: toggle,
//   },
//   {
//     queryKey: ["notes"],
//     queryFn: () => getFromBackend("/notes"),
//     cacheTime: Infinity,
//     staleTime: Infinity,
//     enabled: toggle,
//   },
// ];

// const query = useQueries({
//   queries: queriesArray,
//   combine: (results) => {
//     return {
//       data: results.map((result) => result.data),
//       isLoading: results.some((result) => result.isLoading),
//       isError: results.some((result) => result.isError),
//       error: results.find((result) => result.error),
//     };
//   },
// });
