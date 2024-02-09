import { useMutation } from "@tanstack/react-query";
import { postAuthReq } from "../../utils/api/authApi";

const UseCustomLogin = () => {
  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: (body) => postAuthReq("/login", body),
    retry: 3,
  });

  return mutation;
};

export default UseCustomLogin;
