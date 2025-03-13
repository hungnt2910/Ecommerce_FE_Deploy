import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

// npm install react-toastify: hiển thị thông báo đẹp

const Register = () => {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await fetch(
        "https://ecommerce-gh8q.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      toast.success("Registration successful!");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000); // 2000 ms = 2 giây
      console.log(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="h-screen flexflex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <ToastContainer position="top-center" />
      <h2 className="text-center text-3xl">Sign up</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 lg:w-2/5 md:w-2/3 sm:w-2/3 w-full m-auto p-5"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Full name</label>
          <input
            className="border-1 border-[#d1d5dc] px-2 py-2 rounded-md"
            {...register("name", {
              required: "Name is required",
              maxLength: {
                value: 30,
                message: "Name must not exceed 30 characters",
              },
            })}
            id="name"
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>

        <div className="flex flex-col  gap-2">
          <label htmlFor="email">Email</label>
          <input
            className="border-1 border-[#d1d5dc] px-2 py-2 rounded-md"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            id="email"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            className="border-1 border-[#d1d5dc] px-2 py-2 rounded-md"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
              maxLength: {
                value: 50,
                message: "Password must not exceed 50 characters",
              },
              pattern: {
                value: /^[A-Za-z\d]{6,50}$/,
                message:
                  "Password must contain at least one uppercase letter, one lowercase letter, and one number",
              },
            })}
            id="password"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            className="border-1 border-[#d1d5dc] px-2 py-2 rounded-md"
            type="password"
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) =>
                value === getValues("password") || "Password does not match",
            })}
            id="confirmPassword"
          />
          {errors.confirmPassword && (
            <span className="text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <input
          type="submit"
          value="Sign up"
          className="bg-black text-white py-2 font-semibold px-4 rounded-md hover:bg-gray-800 cursor-pointer"
        />
        <p className="text-center">
          You already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => nav("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
