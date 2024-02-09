import { useQuery } from "@tanstack/react-query";
import { getAuthReq } from "../../utils/api/authApi";

const UseLoginCheck = () => {
  const query = useQuery({
    queryKey: ["checkAuth"],
    queryFn: () => getAuthReq("/login/check"),
    refetchInterval: 300000,
    staleTime: Infinity,
    retry: 2,
  });
  return query;
};

export default UseLoginCheck;
