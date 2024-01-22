/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

import { Icons } from "../assets/Icons";

const ErrorMessage = ({
  errMsg = "Somethings went Wrong. Please refresh the page!",
  goToLoginPage = false,
  refreshButton = false,
}) => {
  const handleRefreshClick = () => {
    // Use window.location.reload() to refresh the page
    window.location.reload();
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="h-80 w-[550px] border border-black bg-white rounded-xl p-6 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <p className="text-2xl font-medium tracking-wide">Error !</p>
        </div>
        <div className="text-2xl font-medium">{errMsg}</div>
        {goToLoginPage && (
          <div className="border border-black rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-100 ">
            <Link to="/login">Go to Login Page</Link>
          </div>
        )}
        {refreshButton && (
          <div
            className="border border-black rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-100 "
            onClick={handleRefreshClick}
          >
            Refesh the Page.
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
