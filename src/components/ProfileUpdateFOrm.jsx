/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import UseLoginCheck from "../hooks/query/useLoginCheck";
import validator from "validator";
import { useState } from "react";
import Loading from "../containers/Loading";
import { patchAuthReq } from "../utils/api/authApi";

const ProfileUpdateFOrm = ({ handleClose }) => {
  const { data: user, refetch } = UseLoginCheck();
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

    console.log("formData", formData);
    try {
      const updateuser = await patchAuthReq("/update", formData);
      console.log("updateuser", updateuser);
      handleClose();
      refetch();
    } catch (error) {
      console.log("eror in user profile update");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 w-full text-color_1"
    >
      {/* MARK: NAME FIELD*/}
      <div className="flex flex-col">
        <input
          type="text"
          {...register("name", {
            required: "Name is Required",
            // pattern: /^[A-Za-z]+$/i,
            // validate: (value) => {
            //   return (
            //     validator.isAlpha(value) ||
            //     "Check you name again. Only Alphabet is allowed."
            //   );
            // },
          })}
          placeholder="Name"
          className="border  p-3 rounded-lg"
          autoComplete="off"
          spellCheck="false"
        />

        <p role="alert" className="text-xs text-red-500 pl-2 h-4">
          {/* {errors.name?.type === "required" && "Name is required"} */}
          {errors.name && errors.name.message}
        </p>
      </div>

      {/* MARK: EMAIL FIELD*/}
      <div className="flex flex-col">
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
          className="border  p-3 rounded-lg"
          autoComplete="off"
          spellCheck="false"
        />

        <p role="alert" className="text-xs text-red-500 pl-2 h-4">
          {errors.email && errors.email.message}
        </p>
      </div>

      {/* MARK: PASSWORD FIELD*/}
      <div>
        <div className="h-12 flex justify-between items-center border  rounded-lg ">
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
      <div>
        <div className="h-12 flex justify-between items-center border rounded-lg">
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
  );
};

export default ProfileUpdateFOrm;