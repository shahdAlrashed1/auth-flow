import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    setStatus("");

    try {
      const response = await fetch(
        "https://lightyellow-ram-271495.hostingersite.com/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setStatus(data.message || "Login successful!");
      } else {
        setStatus(data.message || "Invalid email or password.");
      }
    } catch (error) {
      setStatus("Failed to connect to the server.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eef5f3] flex items-center justify-center px-4 py-8 relative overflow-hidden">

      {/* Decorative background */}
      <div className="absolute -top-24 -right-20 w-72 h-72 bg-[#b8d8d1] rounded-full opacity-40 blur-2xl" />
      <div className="absolute -bottom-24 -left-20 w-72 h-72 bg-[#d7c8e8] rounded-full opacity-40 blur-2xl" />

      <div className="relative w-full max-w-5xl grid md:grid-cols-2 bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_rgba(66,88,84,0.12)] overflow-hidden">

        {/* Left Side */}
        <div className="hidden md:flex bg-[#dcebe7] p-10 lg:p-14 flex-col justify-center relative overflow-hidden">

          <div className="relative z-10">
            <span className="inline-block bg-white/70 text-[#52756d] text-sm font-medium px-4 py-2 rounded-full mb-6">
              Welcome back
            </span>

            <h2 className="text-4xl lg:text-5xl font-bold text-[#314d48] leading-tight mb-6">
              Good to
              <br />
              see you again.
            </h2>

            <p className="text-[#607873] text-base lg:text-lg leading-8 max-w-md">
              Sign in to continue your journey and access your account.
            </p>
          </div>

          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#b5d1ca] rounded-full opacity-60" />
          <div className="absolute -top-16 -left-16 w-48 h-48 bg-[#c9b9dc] rounded-full opacity-40" />
        </div>

        {/* Login Form */}
        <div className="p-6 sm:p-8 md:p-10 lg:p-14">

          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#314d48] mb-3">
              Welcome Back
            </h1>

            <p className="text-gray-500">
              Enter your details to access your account.
            </p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, status }) => (
              <Form className="space-y-6">

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-[#435b56] mb-2">
                    Email Address
                  </label>

                  <Field
                    type="email"
                    name="email"
                    placeholder="example@email.com"
                    className="w-full bg-[#f6f9f8] border border-[#dce7e4] rounded-xl px-4 py-3.5 text-gray-700 placeholder:text-gray-400 outline-none transition duration-200 focus:bg-white focus:border-[#7ca79d] focus:ring-4 focus:ring-[#dcebe7]"
                  />

                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-xs mt-1.5 ml-1"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-[#435b56] mb-2">
                    Password
                  </label>

                  <div className="relative">
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      className="w-full bg-[#f6f9f8] border border-[#dce7e4] rounded-xl px-4 py-3.5 pr-14 text-gray-700 placeholder:text-gray-400 outline-none transition duration-200 focus:bg-white focus:border-[#7ca79d] focus:ring-4 focus:ring-[#dcebe7]"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-[#78938d] hover:text-[#52756d] transition"
                    >
                      {showPassword ? "🙈" : "👁"}
                    </button>
                  </div>

                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-500 text-xs mt-1.5 ml-1"
                  />
                </div>

                {/* Forgot password */}
                <div className="text-right">
                  <button
                    type="button"
                    className="text-sm text-[#52756d] hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Status */}
                {status && (
                  <div className="bg-[#edf7f4] border border-[#cce3dd] text-[#52756d] text-sm rounded-xl p-3 text-center">
                    {status}
                  </div>
                )}

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#52756d] hover:bg-[#3f625b] text-white py-3.5 rounded-xl font-semibold shadow-md shadow-[#52756d]/20 transition duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>

                {/* Register */}
                <p className="text-center text-sm text-gray-500 pt-2">
                  Don't have an account?{" "}
                  <a
                    href="/register"
                    className="text-[#52756d] font-semibold hover:underline"
                  >
                    Create Account
                  </a>
                </p>

              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;

