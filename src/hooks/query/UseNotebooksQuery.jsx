import { useQuery } from "@tanstack/react-query";
import { getFromBackend } from "../../utils/api/userApi";

const UseNotebooksQuery = (toggle = false) => {
  const query = useQuery({
    queryKey: ["notebooks"],
    queryFn: () => getFromBackend("/notebooks"),
    staleTime: Infinity,
    enabled: toggle,
  });

  return query;
};

export default UseNotebooksQuery;
