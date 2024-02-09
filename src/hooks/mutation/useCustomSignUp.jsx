import { useMutation } from "@tanstack/react-query";
import { postAuthReq } from "../../utils/api/authApi";

const useCustomSignUp = () => {
  const mutation = useMutation({
    mutationKey: ["signup"],
    mutationFn: (body) => postAuthReq("/signup", body),
    retry: 3,
  });

  return mutation;
};

export default useCustomSignUp;
