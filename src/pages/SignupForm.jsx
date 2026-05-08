import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/FakeAuth";
import Button from "../components/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";

function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);

  const { signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      role: "student",
    },
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    try {
      await signup.mutateAsync(data);
      navigate("/dashboard");
    } catch (err) {
      console.log("Signup error:", err);
      toast.error("Signup failed. Please try again.");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const inputBase = "w-full p-3 border rounded-lg";
  const errorClass = "border-red-500";
  const okClass = "border-gray-300";

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            placeholder="Enter your first name"
            className={`${inputBase} ${errors.firstName ? errorClass : okClass}`}
            {...register("firstName", {
              required: "First name is required",
              minLength: {
                value: 2,
                message: "First name must be at least 2 characters",
              },
              pattern: {
                value: /^[A-Za-z\s'-]+$/,
                message: "Only letters are allowed",
              },
            })}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            placeholder="Enter your last name"
            className={`${inputBase} ${errors.lastName ? errorClass : okClass}`}
            {...register("lastName", {
              required: "Last name is required",
              minLength: {
                value: 2,
                message: "Last name must be at least 2 characters",
              },
              pattern: {
                value: /^[A-Za-z\s'-]+$/,
                message: "Only letters are allowed",
              },
            })}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className={`${inputBase} ${errors.email ? errorClass : okClass}`}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Role Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Role
          </label>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="student"
                {...register("role", { required: "Please select a role" })}
              />
              Student
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="instructor"
                {...register("role", { required: "Please select a role" })}
              />
              Instructor
            </label>
          </div>
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="At least 8 characters"
            className={`${inputBase} pr-12 ${
              errors.password ? errorClass : okClass
            }`}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-10 text-gray-500"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={signup.isPending}
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          Sign Up
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <NavLink
          to="/login"
          className="text-blue-600 font-semibold hover:underline"
        >
          Sign in
        </NavLink>
      </p>
    </div>
  );
}

export default SignupForm;
