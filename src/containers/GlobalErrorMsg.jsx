/* eslint-disable react/prop-types */

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  disabledError,
  globalErrorInitialState,
} from "../redux/slice/globalErrorSlice";
import { Icons } from "../assets/Icons";

const ShowErrorMsg = ({
  errMsg = "Somethings went Wrong. Please refresh the page!",
  goToLoginPage = false,
  refreshButton = false,
}) => {
  const { showError } = useSelector(globalErrorInitialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRefreshClick = () => {
    dispatch(disabledError());
    // Use window.location.reload() to refresh the page
    window.location.reload();
  };

  const handleGoToLogin = () => {
    dispatch(disabledError());
    navigate("/login");
  };

  return (
    <>
      {showError && (
        <div className="background_blur absolute z-50 top-0 left-0 w-full h-screen flex justify-center items-center">
          <div className=" h-80 w-[550px] border border-black bg-white rounded-xl px-6 py-8 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <p className="text-3xl font-medium tracking-wide">Error !</p>
              <div onClick={() => dispatch(disabledError())}>
                <Icons.cancel className="text-xl" />
              </div>
            </div>
            <div className="text-xl font-medium">{errMsg}</div>
            <div className="flex justify-between items-center gap-4">
              {goToLoginPage && (
                <div
                  className="border border-black rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-100 flex-1 text-center"
                  onClick={handleGoToLogin}
                >
                  Go to Login
                </div>
              )}
              {refreshButton && (
                <div
                  className="border border-black rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-100 flex-1 text-center"
                  onClick={handleRefreshClick}
                >
                  Refresh
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowErrorMsg;
