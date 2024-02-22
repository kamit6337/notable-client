/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NetworkStatusProvider = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const handleOnline = () => {
      navigate("/");
    };

    const handleOffline = () => {
      navigate("/error", {
        state: { message: "Network Connection Problem", offline: true },
      });
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return <>{children}</>;
};

export default NetworkStatusProvider;
