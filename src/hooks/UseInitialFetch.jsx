import { useQueries } from "@tanstack/react-query";
import { getFromBackend } from "../utils/api/userApi";
import { decryptString } from "../utils/sentitive/cryptoJS";
import Cookies from "js-cookie";

const TRUE = "true";
const UseInitialFetch = () => {
  const authStr = Cookies.get("_at");

  const decrypt = authStr ? decryptString(authStr) : null;

  const queries = [
    {
      queryKey: ["notebooks"],
      queryFn: () => getFromBackend("/notebooks"),
      cacheTime: 300000,
      staleTime: 300000,
      enabled: decrypt === TRUE,
    },
    {
      queryKey: ["notes"],
      queryFn: () => getFromBackend("/notes"),
      cacheTime: 300000,
      staleTime: 300000,
      enabled: decrypt === TRUE,
    },
  ];

  const [notebooks, notes] = useQueries({
    queries,
  });

  return { notebooks, notes };
};

export default UseInitialFetch;
