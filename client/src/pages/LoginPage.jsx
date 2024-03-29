import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkIsAuth, loginUser } from "../redux/features/auth/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { status } = useSelector((state) => state.auth);
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status) {
      toast(status);
      if (checkIsAuth) navigate("/");
    }
  }, [status, isAuth, navigate]);

  const handleSubmit = () => {
    try {
      dispatch(loginUser({ username, password }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-1/4 h-60 mx-auto mt-40"
    >
      <h1 className=" text-lg text-white text-center">Login</h1>
      <label className="text-xs text-gray-400">
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-2 px-2 text-xs outline-none placeholder:text-gray-700"
        />
      </label>

      <label className="text-xs text-gray-400">
        password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-2 px-2 text-xs outline-none placeholder:text-gray-700"
        />
      </label>

      <div className="flex gap-8 justify-center mt-4">
        <button
          onClick={handleSubmit}
          type="submit"
          className="flex justify-center items-center text-xs bg-gray-600 text-white rounded-sm py-2 px-6"
        >
          Login
        </button>

        <Link
          to={"/register"}
          className="flex justify-center items-center text-xs text-white"
        >
          dont have account?
        </Link>
      </div>
    </form>
  );
};
