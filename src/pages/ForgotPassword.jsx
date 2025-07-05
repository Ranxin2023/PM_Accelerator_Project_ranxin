import React from "react";
import { useNavigate } from "react-router-dom";
import AuthLeftPanel from "../components/AuthLeftPanel";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const handleSend = () => {
    navigate("/");
  };

  return (
    <div className="flex h-screen">
      <AuthLeftPanel />

      <div className="w-1/2 bg-white flex flex-col justify-center px-24">
        <h2 className="text-2xl font-semibold mb-4">Forgot your password?</h2>
        <p className="text-sm text-gray-600 mb-6">
          Enter your email and we’ll send you a link to reset it.
        </p>
        <input
          type="email"
          placeholder="Your email"
          className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-gray-100 mb-6"
        />
        <button
          className="w-full bg-black text-white py-3 rounded-lg mb-6"
          onClick={handleSend}
        >
          Send reset link
        </button>
        <div
          className="text-center text-sm text-blue-600 font-medium cursor-pointer"
          onClick={() => navigate("/")}
        >
          ← Back to Sign In
        </div>
      </div>
    </div>
  );
}