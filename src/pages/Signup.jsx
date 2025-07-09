import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import AuthLeftPanel from "../components/AuthLeftPanel";

export default function Signup() {
  const navigate = useNavigate();
  const [firstName, setFirstName]=useState('')
  const [lastName, setLastName]=useState('')
  const [userName, setUserName]=useState('')
  const [password, setPassword]=useState('')
  const [confirmPassword, setConfirmPassword]=useState('')
  const [error, setError]=useState('')
  const handleSignUp = async () => {
  if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          userName,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/"); // redirect to login
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("Server error: " + err.message);
    }
  };

  return (
    <div className="flex h-screen">
      <AuthLeftPanel />

      <div className="w-1/2 bg-white flex flex-col justify-center px-24">
        <h2 className="text-2xl font-semibold mb-6">Create your account</h2>
        {/* first name */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="First name"
            onChange={(e)=>setFirstName(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-2 bg-gray-100"
          />
          {/* last name */}
          <input
            type="text"
            placeholder="Last name"
            onChange={(e)=>setLastName(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-2 bg-gray-100"
          />
        </div>
        {/* username */}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            onChange={(e)=>setUserName(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-gray-100"
          />
        </div>
        {/* password */}
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-gray-100"
          />
        </div>
        {/* confirm password */}
        <div className="mb-6">
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={(e)=>setConfirmPassword(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-gray-100"
          />
        </div>
        {/* error part */}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
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