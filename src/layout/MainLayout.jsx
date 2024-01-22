/* eslint-disable react/prop-types */
import { Outlet, useNavigate } from "react-router-dom";
import SideNavbar from "../containers/SideNavbar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAuthFromBackend } from "../utils/api/authApi";
import UseInitialFetch from "../hooks/useInitialFetch";
import Cookies from "js-cookie";
import { decryptString } from "../utils/sentitive/cryptoJS";

const TRUE = "true";

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // WORK: INITIALLY FETCH ALL NOTEBOOKS AND NOTES RELATED TO THAT USER
  UseInitialFetch();

  // WORK: TAKING VALUE FROM COOKIES AND DECRYPT IT
  const authStr = Cookies.get("_at");
  const decrypt = authStr ? decryptString(authStr) : null;

  // WORK: MAKING CONTINUOUS CHECKING ONLY AFTER SUCCESSFUL LOGGED IN THAT IS USER IS AUTHENTICATED EVERY 5 MINUTES, THAT IT DOES NOT MAKE ANY CHANGE IN TOKEN
  const { isError, error } = useQuery({
    queryKey: ["checkAuth"],
    queryFn: () => getAuthFromBackend("/login/check"),
    refetchInterval: 300000,
    enabled: decrypt === TRUE,
  });

  // WORK: IF ERROR COMES IN CONTINUOUS CHECKING, SHOW ERROR PAGE WHICH THEN TAKE TO LOGIN PAGE
  useEffect(() => {
    if (isError) {
      navigate("/login", { state: { errMsg: error.message } });
      Cookies.remove("_at", { secure: true, path: "/", sameSite: true }); // removed!
    }
  }, [isError, error, dispatch, navigate]);
  useEffect(() => {
    if (decrypt !== TRUE) {
      navigate("/login");
    }
  }, [decrypt, navigate]);

  if (decrypt !== TRUE) {
    // If decrypt is not TRUE, the useEffect will navigate, and this component should not render anything
    return null;
  }

  return (
    <div className="max-w-full h-screen flex">
      <div className="h-full w-60 ">
        <SideNavbar />
      </div>
      <div className="w-full h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
