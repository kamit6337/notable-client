import { useQuery } from "@tanstack/react-query";
import { getAuthReq } from "../../utils/api/authApi";

const UseLogout = (toggle = false) => {
  const query = useQuery({
    queryKey: ["logout"],
    queryFn: () => getAuthReq("/logout"),
    enabled: toggle,
  });

  return query;
};

export default UseLogout;
