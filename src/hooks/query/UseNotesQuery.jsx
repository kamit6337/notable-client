import { useQuery } from "@tanstack/react-query";
import { getFromBackend } from "../../utils/api/userApi";

const UseNotesQuery = (toggle = false) => {
  const query = useQuery({
    queryKey: ["notes"],
    queryFn: () => getFromBackend("/notes"),
    staleTime: Infinity,
    enabled: toggle,
  });

  return query;
};

export default UseNotesQuery;
