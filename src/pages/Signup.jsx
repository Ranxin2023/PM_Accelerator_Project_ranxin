import React from "react";
import { useNavigate } from "react-router-dom";
import AuthLeftPanel from "../components/AuthLeftPanel";

export default function Signup() {
  const navigate = useNavigate();
  const handleSignUp = () => {
  navigate("/");
  };

  return (
    <div className="flex h-screen">
      <AuthLeftPanel />

      <div className="w-1/2 bg-white flex flex-col justify-center px-24">
        <h2 className="text-2xl font-semibold mb-6">Create your account</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="First name"
            className="border border-gray-200 rounded-lg px-4 py-2 bg-gray-100"
          />
          <input
            type="text"
            placeholder="Last name"
            className="border border-gray-200 rounded-lg px-4 py-2 bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-gray-100"
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-gray-100"
          />
        </div>

        <button
        className="w-full bg-black text-white py-3 rounded-lg mb-6"
        onClick={handleSignUp}
        >
        Sign Up
        </button>


        <div className="text-center text-sm">
        Already have an account?{" "}
        <span
            className="text-blue-600 font-medium cursor-pointer"
            onClick={() => navigate("/")}
        >
            Sign In
        </span>
        </div>

      </div>
    </div>
  );
}