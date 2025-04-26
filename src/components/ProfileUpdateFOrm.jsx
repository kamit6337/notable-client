/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import UseLoginCheck from "../hooks/query/UseLoginCheck";
import validator from "validator";
import { useState } from "react";
import Loading from "../containers/Loading";
import { patchAuthReq } from "../utils/api/authApi";
import Toastify from "../lib/Toastify";

const ProfileUpdateForm = ({ handleClose }) => {
  const { data: user, refetch } = UseLoginCheck();

  const { ToastContainer, showErrorMessage } = Toastify();

  const [toggle, setToggle] = useState({
    password: false,
    confirmPassword: false,
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    const formData = { id: user._id, ...data };
    delete formData.confirmPassword;

    try {
      await patchAuthReq("/update", formData);
      handleClose();
      refetch();
    } catch (error) {
      showErrorMessage({ message: error.message || "Something went wrong" });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2  w-full text-color_1"
      >
        {/* MARK: NAME FIELD*/}
        <div className="profile_update_form ">
          <input
            type="text"
            {...register("name", {
              required: "Name is Required",
            })}
            placeholder="Name"
            className="border px-3 h-full rounded-lg"
            autoComplete="off"
            spellCheck="false"
            disabled={true}
          />

          <p role="alert" className="text-xs text-red-500 pl-2 h-4">
            {/* {errors.name?.type === "required" && "Name is required"} */}
            {errors.name && errors.name.message}
          </p>
        </div>

        {/* MARK: EMAIL FIELD*/}
        <div className="profile_update_form">
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              validate: (value) => {
                return (
                  validator.isEmail(value) || "Please provide correct Email Id."
                );
              },
            })}
            disabled={true}
            placeholder="Email"
            className="border px-3 h-full rounded-lg"
            autoComplete="off"
            spellCheck="false"
          />

          <p role="alert" className="text-xs text-red-500 pl-2 h-4">
            {errors.email && errors.email.message}
          </p>
        </div>

        {/* MARK: PASSWORD FIELD*/}
        <div className="profile_update_form">
          <div className="h-full flex justify-between items-center border  rounded-lg ">
            <input
              type={toggle.password ? "text" : "password"}
              {...register("password", {
                minLength: {
                  value: 8,
                  message: "Password length should be greater than 8.",
                },
              })}
              placeholder="Password"
              className="h-full w-full px-3 rounded-l-lg"
            />

            <div
              className="w-20 flex justify-center items-center text-color_4 cursor-pointer"
              onClick={() =>
                setToggle((prev) => {
                  return {
                    ...prev,
                    password: !prev.password,
                  };
                })
              }
            >
              <p>{toggle.password ? "Hide" : "Show"}</p>
            </div>
          </div>
          <p role="alert" className="text-xs text-red-500 pl-2 h-4">
            {errors.password && errors.password.message}
          </p>
        </div>

        {/* MARK: CONFIRM PASSWORD FIELD*/}
        <div className="profile_update_form">
          <div className="h-full flex justify-between items-center border rounded-lg">
            <input
              type={toggle.confirmPassword ? "text" : "password"}
              {...register("confirmPassword", {
                validate: (value) => {
                  return (
                    value === getValues().password || "Passwords do not match"
                  );
                },
              })}
              placeholder="Confirm Password"
              className="h-full w-full px-3 rounded-l-lg"
            />

            <div
              className="w-20 flex justify-center items-center text-color_4 cursor-pointer"
              onClick={() =>
                setToggle((prev) => {
                  return {
                    ...prev,
                    confirmPassword: !prev.confirmPassword,
                  };
                })
              }
            >
              <p>{toggle.confirmPassword ? "Hide" : "Show"}</p>
            </div>
          </div>

          <p role="alert" className="text-xs text-red-500 pl-2 h-4">
            {errors.confirmPassword && errors.confirmPassword.message}
          </p>
        </div>

        {/* MARK: SUBMIT BUTTON*/}
        <div className="h-12  rounded-lg bg-purple-300 font-semibold text-lg tracking-wide cursor-pointer w-full text-color_1">
          {isSubmitting ? (
            <Loading hScreen={false} small={true} />
          ) : (
            <button type="submit" className="w-full h-full cursor-pointer">
              Update
            </button>
          )}
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default ProfileUpdateForm;
