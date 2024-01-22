import { Link, useLocation, useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import { decryptString } from "../utils/sentitive/cryptoJS";

const TRUE = "true";

const Login = () => {
  const navigate = useNavigate();

  const { state } = useLocation();
  const authStr = Cookies.get("_at");
  const decrypt = authStr ? decryptString(authStr) : null;

  if (decrypt === TRUE) {
    navigate("/");
    return;
  }

  const googleOAuth = () => {
    window.open("http://localhost:8000/auth/google", "_self");
  };

  const facebookOAuth = () => {
    window.open("http://localhost:8000/auth/facebook", "_self");
  };

  return (
    <>
      <div className="w-full h-screen flex justify-center relative">
        <div className="w-1/3 h-full p-4 flex flex-col gap-4 border-2 border-black rounded-xl">
          <p>
            <Link to={`/`}>Evernote</Link>
          </p>
          <div
            className="p-2 border border-black rounded-xl cursor-pointer hover:bg-gray-50 hover:text-black"
            onClick={googleOAuth}
          >
            Sign in with Google
          </div>
          <div
            className="p-2 border border-black rounded-xl cursor-pointer hover:bg-gray-50 hover:text-black"
            onClick={facebookOAuth}
          >
            Sign in with Facebook
          </div>
          {state && (
            <p className="text-red-600 font-semibold">{state?.errMsg}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
