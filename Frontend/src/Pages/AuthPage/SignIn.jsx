import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setIsLoggingIn(true);

    try {
      const userData = { email, password };
      const response = await axios.post("http://localhost:8080/api/auth/signin", userData);

      setTimeout(() => {
        setLoading(false);
        setIsLoggingIn(false);
        console.log(response.data);
        if (response.status === 200) {
          // Store the token and userId in localStorage
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.id);  // Assuming response contains user.id
          navigate("/dashboard");
        } else {
          setError("Invalid email or password.");
          showToastMessage("Invalid credentials!"); 
        }
      }, 2000);

    } catch (error) {
      setLoading(false);
      setIsLoggingIn(false);
      if (error.response && error.response.status === 401) {
        setError("Invalid email or password.");
        showToastMessage("Invalid credentials!"); 
      } else {
        setError("An error occurred. Please try again.");
        showToastMessage("Error occurred! Please try again."); // Show toast on error
      }
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false); // Hide toast after 3 seconds
    }, 3000);
  };

  return (
    <section className="bg-white dark:bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-800"
        >
          
          EcoConnect
        </a>
        <div className="w-full bg-white rounded-lg shadow-md md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-gray-900">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSignIn}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-200 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-200 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-200 dark:border-gray-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-600">
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="/signup"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoggingIn && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-40">
          <div className="text-white text-xl">Loading...</div>
        </div>
      )}

      {/* Toast Notification (Sliding from Bottom) */}
      {showToast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 w-80 bg-red-500 text-white rounded-lg shadow-lg z-50 transition-all duration-500 ease-out translate-y-0 opacity-100">
          <div className="flex justify-between items-center">
            <span>{toastMessage}</span>
            <button
              onClick={() => setShowToast(false)}
              className="text-white ml-4 text-xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default SignIn;
