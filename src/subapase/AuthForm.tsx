import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { loginUser, signupUser } from "./Auth";

const AuthForm = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email and password are required",
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email",
      });
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password mismatch",
        text: "Passwords do not match",
      });
      return;
    }

    if (password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Weak password",
        text: "Password must be at least 6 characters",
      });
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        // Login
        const { error } = await loginUser(email, password);
        if (error) throw error;

        navigate("/");
      } else {
        // Sign Up
        const { error } = await signupUser(email, password);
        if (error) throw error;

        Swal.fire({
          icon: "success",
          title: "Account created!",
          text: "Check your email to confirm your account",
          confirmButtonText: "OK",
        });

        setIsLogin(true);
        navigate("/");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        Swal.fire({ icon: "error", title: "Oops...", text: err.message });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center flex-col justify-center min-h-screen bg-linear-to-b from-red-800 to-orange-200 p-4">
      <Link to="/" className="font-semibold m-3 p-3">
        Back
      </Link>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md text-center"
      >
        <h1 className="text-6xl font-bold logo-font mb-4 text-gray-900">
          allbirds
        </h1>

        <h2 className="text-2xl font-semibold mb-6 text-gray-700">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {!isLogin && (
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-md text-white ${
            loading ? "bg-gray-400" : "bg-black hover:bg-gray-800"
          }`}
        >
          {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
        </button>

        <p className="mt-4 text-sm text-gray-600">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <span
                className="font-semibold cursor-pointer text-blue-600"
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="font-semibold cursor-pointer text-blue-600"
                onClick={() => setIsLogin(true)}
              >
                Login
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
