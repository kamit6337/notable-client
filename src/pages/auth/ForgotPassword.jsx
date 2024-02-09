import { useEffect } from "react";
import { useForm } from "react-hook-form";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import Toastify from "../../lib/Toastify";
import LoadingState from "../../containers/Loading";
import UseForgotPassword from "../../hooks/mutation/UseForgotPassword";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { mutate, isPending, isError, error, isSuccess } = UseForgotPassword();
  const { ToastContainer, showSuccessMessage, showErrorMessage } = Toastify();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    if (isError) {
      showErrorMessage({ message: error?.message, time: 3000 });
    }
  }, [isError, error, showErrorMessage]);

  useEffect(() => {
    if (isSuccess) {
      showSuccessMessage();
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [isSuccess, navigate, showSuccessMessage]);

  const onSubmit = (data) => {
    const { email } = data;
    mutate(email);
  };

  return (
    <>
      <section className="w-full h-screen flex justify-center items-center bg-color_1">
        <form
          className="h-[600px] w-[600px] bg-color_2 border border-color_3 text-color_4 flex flex-col justify-center items-start gap-4 px-8 rounded-xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full  rounded-xl">
            <div className="w-full h-12 rounded-xl border border-color_3 text-color_1">
              <input
                {...register("email", {
                  required: true,
                  validate: (value) => {
                    console.log(value);
                    return validator.isEmail(value);
                  },
                })}
                placeholder="Type your email "
                className="w-full h-full px-4 rounded-xl"
              />
            </div>

            <p
              role="alert"
              className="w-full h-4 mt-1 ml-2 text-red-200 text-xs "
            >
              {errors.email?.type === "required" && " Email is required"}
              {errors.email?.type === "validate" &&
                "Please provide a valid Email!"}
            </p>
          </div>
          <div className="w-full h-12 bg-color_1 border border-color_3 flex justify-center items-center rounded-xl bg-purple-300 font-semibold text-lg tracking-wide cursor-pointer  text-color_1">
            {isPending ? (
              <LoadingState hScreen={false} small={true} />
            ) : (
              <input type="submit" className="w-full h-full cursor-pointer" />
            )}
          </div>

          <p className="text-xs mt-10">
            An One-Time-Password will be send to your email. After successful
            login, change your password or make new password{" "}
            <strong>immediately</strong> from you profile section.
          </p>
        </form>
      </section>
      <ToastContainer />
    </>
  );
};

export default ForgotPasswordPage;
