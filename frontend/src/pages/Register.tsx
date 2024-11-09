import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { addUser } from "../services/userServices";
import toastError from "../errors/toastError";
import { useAuthContext } from "../context/AuthContext";
import { DashboardAdmin } from "../interface";

const Register = () => {
  const { setUser } = useAuthContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Register the user with Firebase authentication
    try {
      if (password.length < 6) {
        setPassword("");
        throw new Error("Password should be at least 6 characters long");
      }
      setIsLoading(true);
      const trimmedEmail = email.trim();

      const registeredUser = await addUser(
        trimmedEmail,
        name,
        password,
        "ADMIN"
      );

      setUser(registeredUser as DashboardAdmin);
      setEmail("");
      setPassword("");
      history.push("/");
    } catch (error) {
      toastError(error);
      const errorMessage = (error as Error).message;
      setError(errorMessage);
      console.log("Registration error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative px-6 lg:px-20 flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 my-4 mx-auto bg-white rounded-md shadow-xl lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-blue-700">
          Register
        </h1>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800" >
              Name
            </label>
            <input
              onChange={({ target }) => setName(target.value)}
              type="name"
              className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border border-slate-800 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800" >
              Email
            </label>
            <input
              onChange={({ target }) => setEmail(target.value)}
              type="email"
              className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border border-slate-800 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800" >
              Password
            </label>
            <input
              onChange={({ target }) => setPassword(target.value)}
              type="password"
              className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border border-slate-800 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6">
            <button disabled={isLoading} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              {isLoading ? "Hold on..." : "Register"}
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 text-center my-4">{error}</p>}
        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "} have an account? {" "}
          <a  href="./login" className="font-medium text-blue-600 hover:underline" >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
