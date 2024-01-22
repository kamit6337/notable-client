import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { isAuthenticated } from "../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import LoadingState from "../containers/LoadingState";
import { useQuery } from "@tanstack/react-query";
import { getAuthFromBackend } from "../utils/api/authApi";
import { encryptString } from "../utils/sentitive/cryptoJS";
import Cookies from "js-cookie";

const CheckLogin = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["auth"],
    queryFn: () => getAuthFromBackend("/login/success"),
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      navigate("/error", { state: { errMsg: error.message } });
    } else if (data) {
      dispatch(isAuthenticated(data));
      const encrypt = encryptString("true");
      Cookies.set("_at", encrypt, {
        expires: 7,
        secure: true,
        path: "/",
        sameSite: true,
      });
      navigate("/");
    }
  }, [isError, error, navigate, data, dispatch]);

  if (isLoading) {
    return <LoadingState />;
  }

  return;
};

export default CheckLogin;
