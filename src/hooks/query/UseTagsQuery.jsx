import { useQuery } from "@tanstack/react-query";
import { getFromBackend } from "../../utils/api/userApi";

const UseTagsQuery = (toggle = false) => {
  const query = useQuery({
    queryKey: ["tags"],
    queryFn: () => getFromBackend("/tags"),
    staleTime: Infinity,
    enabled: toggle,
  });

  return query;
};

export default UseTagsQuery;
