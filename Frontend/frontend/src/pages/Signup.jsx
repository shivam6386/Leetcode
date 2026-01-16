import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const signupSchema = z.object({
  firstName: z.string().min(3, "Name should be at least 3 characters"),
  email: z.string().email("Invalid Email"),
  password: z.string().min(8, "Password must contain at least 8 characters"),
});

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">
            Create Account
          </h2>

          <form
            onSubmit={handleSubmit((data) => console.log(data))}
            className="space-y-4"
          >
            {/* First Name */}
            <div className="form-control">
              <input
                {...register("firstName")}
                placeholder="First Name"
                className="input input-bordered w-full"
              />
              {errors.firstName && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.firstName.message}
                  </span>
                </label>
              )}
            </div>

            {/* Email */}
            <div className="form-control">
              <input
                {...register("email")}
                placeholder="Email"
                className="input input-bordered w-full"
              />
              {errors.email && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.email.message}
                  </span>
                </label>
              )}
            </div>

            {/* Password */}
            <div className="form-control">
              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className="input input-bordered w-full"
              />
              {errors.password && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.password.message}
                  </span>
                </label>
              )}
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button className="btn btn-primary w-full">
                Sign Up
              </button>
            </div>
          </form>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <span className="link link-primary cursor-pointer">
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
