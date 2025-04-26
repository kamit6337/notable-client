import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import validator from "validator";
import Toastify from "../../lib/Toastify";
import LoadingState from "../../containers/Loading";
import environment from "../../utils/environment";
import { postAuthReq } from "../../utils/api/authApi";
import { Helmet } from "react-helmet";
import CustomImages from "../../assets/images";

const SERVER_URL = environment.SERVER_URL;

const Login = () => {
  const navigate = useNavigate();
  const [togglePassword, setTogglePassword] = useState(false);
  const searchParams = useSearchParams()[0];

  const errMsg = searchParams.get("msg");

  const { showErrorMessage } = Toastify();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (errMsg) {
      showErrorMessage({ message: errMsg });
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      await postAuthReq("/login", data);
      navigate("/", { state: { message: "Successfully Logged In." } });
    } catch (error) {
      showErrorMessage({
        message: error.message,
      });
    }
  };

  const googleOAuth = () => {
    const url = `${SERVER_URL}/auth/google`;
    const openWindow = window.open(url, "_self");

    if (!openWindow) {
      showErrorMessage({
        message:
          "Error in Google OAuth login. Try login with Email and Password",
      });
    } else {
      openWindow.onerror = (event) => {
        showErrorMessage({
          message:
            event ||
            "Error in Google OAuth login. Try login with Email and Password",
        });
      };
    }
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="discription" content="A Note making Web Apps" />
      </Helmet>

      <div className="h-screen w-full flex flex-col justify-center items-center gap-2 bg-color_2">
        {/* NOTE: THE CENTER PAGE */}
        <div className="h-[500px] w-[600px] tablet:h-[450px] border shadow-lg rounded-xl flex flex-col justify-evenly items-center px-8">
          {/* MARK: HEADLINE*/}
          <p className="text-xl font-bold tracking-wide">Login</p>
          {/* MARK: FORM AND GO TO LOGIN BUTTON*/}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 w-full text-color_1"
          >
            {/* MARK: EMAIL FIELD*/}

            <div className="flex flex-col">
              <input
                type="email"
                {...register("email", {
                  required: true,
                  validate: (value) => {
                    return validator.isEmail(value);
                  },
                })}
                placeholder="Email"
                className="border  p-3 rounded-lg"
                autoComplete="off"
                spellCheck="false"
              />

              <p
                role="alert"
                className="text-xs text-red-500 pl-2 h-4 mt-[2px]"
              >
                {errors.email?.type === "required" && " Email is required"}
                {errors.email?.type === "validate" &&
                  "Please provide correct Email Id."}
              </p>
            </div>

            {/* MARK: PASSWORD FIELD*/}
            <div>
              <div className="h-12 flex justify-between items-center border rounded-lg w-full ">
                <input
                  type={togglePassword ? "text" : "password"}
                  {...register("password", { required: true })}
                  placeholder="Password"
                  className="w-full h-full rounded-l-lg px-3"
                />

                <div
                  className="text-color_4 cursor-pointer w-20 h-full flex justify-center items-center"
                  onClick={() => setTogglePassword((prev) => !prev)}
                >
                  <p>{togglePassword ? "Hide" : "Show"}</p>
                </div>
              </div>
              <p
                role="alert"
                className="text-xs text-red-500 pl-2 h-4 mt-[2px]"
              >
                {errors.password?.type === "required" &&
                  " Password is required"}
              </p>
            </div>

            {/* MARK: SUBMIT BUTTON*/}

            <div className="flex flex-col gap-2">
              <div className="border h-12 mt-8 rounded-lg bg-purple-300 font-semibold text-lg tracking-wide cursor-pointer w-full text-center ">
                {/* <Loading hScreen={false} small={true} /> */}

                {isSubmitting ? (
                  <LoadingState hScreen={false} small={true} />
                ) : (
                  <input
                    type="submit"
                    className="w-full h-full cursor-pointer"
                  />
                )}
              </div>
              <div className=" text-color_4 text-sm flex justify-between items-center">
                <p>
                  Create an account
                  <span className="ml-2 underline">
                    <Link to={`/signup`}>Sign Up</Link>
                  </span>
                </p>
                <p className="underline">
                  <Link to={`/forgotPassword`}>Forgot Password</Link>
                </p>
              </div>
            </div>
          </form>

          {/* MARK: GO TO LOGIN PAGE*/}
          <div
            className="border rounded-lg p-3 w-full cursor-pointer font-semibold  tracking-wide flex justify-center items-center gap-4"
            onClick={googleOAuth}
          >
            <div className="w-6">
              <img
                src={CustomImages.googleIcon}
                alt="Google Icon"
                className="w-full object-cover bg-transparent"
              />
            </div>
            <p>Login with Google</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
