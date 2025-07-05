import React from "react";
import { FaGoogle, FaApple, FaFacebookF } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AuthLeftPanel from "../components/AuthLeftPanel";


export default function Welcome() {
  const navigate = useNavigate();
  const handleSignIn = () => {
  navigate("/select-input-method");
  };


  return (
    <div className="flex h-screen">
      <AuthLeftPanel />

      <div className="w-1/2 bg-white flex flex-col justify-center px-24">
        <h2 className="text-2xl font-semibold mb-6">Welcome back!</h2>
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">E-mail or phone number</label>
          <input
            type="text"
            placeholder="Type your e-mail or phone number"
            className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-gray-100"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm text-gray-600 mb-1">Password</label>
          <input
            type="password"
            placeholder="Type your password"
            className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-gray-100"
          />
        </div>
        <div
        className="text-right text-sm text-gray-500 mb-6 cursor-pointer"
        onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </div>

        <button
        className="w-full bg-black text-white py-3 rounded-lg mb-6"
        onClick={handleSignIn}
        >
        Sign In
        </button>



        <div className="text-center text-sm">
            Don’t have an account?{" "}
        <span
            className="text-blue-600 font-medium cursor-pointer"
            onClick={() => navigate("/signup")}
        >
            Sign Up
        </span>
        </div>

      </div>
    </div>
  );
}