import { useLocation, useNavigate } from "react-router-dom";
import { Icons } from "../assets/Icons";

const ShowError = () => {
  const navigate = useNavigate();

  const { state } = useLocation();

  const errMsg = state?.errMsg || "Something went wrong.";

  const handleRefreshClick = () => {
    // Use window.location.reload() to refresh the page
    window.location.reload();
  };

  const handleGoToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="background_blur absolute z-50 top-0 left-0 w-full h-screen flex justify-center items-center">
      <div className=" h-80 w-[550px] border border-black bg-white rounded-xl px-6 py-8 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <p className="text-3xl font-medium tracking-wide">Error !</p>
          <div>
            <Icons.cancel className="text-xl" />
          </div>
        </div>
        <div className="text-xl font-medium">{errMsg}</div>
        <div className="flex justify-between items-center gap-4">
          <div
            className="border border-black rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-100 flex-1 text-center"
            onClick={handleGoToLogin}
          >
            Go to Login
          </div>

          <div
            className="border border-black rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-100 flex-1 text-center"
            onClick={handleRefreshClick}
          >
            Refresh
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowError;
