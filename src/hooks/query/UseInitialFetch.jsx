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
      (async () => {
        try {
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
        } catch (error) {
          setIsErrorArray([true]);
          setErrorArray([error]);
        } finally {
          setIsLoadingArray([false]);
        }
      })();
    }
  }, [toggle, dispatch]);

  const isLoading = useMemo(() => {
    return isLoadingArray.some((bool) => bool === true);
  }, [isLoadingArray]);

  const isError = useMemo(() => {
    return isErrorArray.some((bool) => bool === true);
  }, [isErrorArray]);

  const error = useMemo(() => {
    return errorArray.find((bool) => bool);
  }, [errorArray]);

  return { isLoading, isError, error, isSuccess };
};

export default UseInitialFetch;
