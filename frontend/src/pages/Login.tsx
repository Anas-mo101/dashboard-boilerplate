import React, { useState, FormEvent, ChangeEvent } from "react";
import { useAuthContext } from "../context/AuthContext";

const Login = () => {
  const { handleLogin } = useAuthContext();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    if(event.target.name === "email"){
      setEmail(event.target.value)
    } else if (event.target.name === "password") {
      setPassword(event.target.value)
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    await handleLogin({email, password});
    setIsLoading(false);
  };

  return (
    <div className="relative px-6 lg:px-20 flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 my-4 mx-auto bg-white rounded-md shadow-xl lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-blue-700">
          Sign in
        </h1>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-2">
            <label
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              onChange={handleChangeInput}
              name="email"
              type="email"
              className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              onChange={handleChangeInput}
              type="password"
              name="password"
              className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6">
            <button disabled={isLoading} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              {isLoading ? "Logging in..." : "Log in"}
            </button>
          </div>
        </form>
        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "} Don't have an account? {" "}
          <a  href="./register" className="font-medium text-blue-600 hover:underline" >
            Register
          </a>
        </p>
      </div>
      
    </div>
  );
};

export default Login;
