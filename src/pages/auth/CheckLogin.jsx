import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import UseOAuthLogin from "../../hooks/query/UseOAuthLogin";
import LoadingState from "../../containers/Loading";

const LoginCheck = () => {
  const navigate = useNavigate();
  const { isLoading, isError, error, isSuccess } = UseOAuthLogin();

  useEffect(() => {
    if (isSuccess) {
      navigate("/", { state: { message: "Successfully Logged In." } });
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (isError) {
      navigate("/login", { state: { message: error.message } });
    }
  }, [isError, error, navigate]);

  if (isLoading) {
    return <LoadingState />;
  }

  return;
};

export default LoginCheck;
