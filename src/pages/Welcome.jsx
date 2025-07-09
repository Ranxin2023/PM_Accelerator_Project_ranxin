import  {useState} from "react";
import { FaGoogle, FaApple, FaFacebookF } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AuthLeftPanel from "../components/AuthLeftPanel";
import { useUser } from "../context/UserContext";

export default function Welcome() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useUser();

  /*这里要做一个判断如果不是新用户了就直接去dashboard
  useEffect(() => {
  fetch("/api/user-status")
    .then(res => res.json())
    .then(data => {
      if (data.onboardingComplete) {
        navigate("/dashboard");
      }
    })
    .catch(err => {
      console.error("Failed to check user status", err);
    });
}, []);
  */

  const handleSignIn = async () => {
     try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // console.log("Login successful:", data);
        setUser({ userName:userName })
        navigate("/preferences");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Server error: " + err.message);
    }
  };


  return (
    <div className="flex h-screen">
      <AuthLeftPanel />

      <div className="w-1/2 bg-white flex flex-col justify-center px-24">
        <h2 className="text-2xl font-semibold mb-6">Welcome back!</h2>
        <div className="mb-4">
          {/* username enter */}
          <label className="block text-sm text-gray-600 mb-1">
            E-mail or phone number
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Type your e-mail or phone number"
            className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-gray-100"
          />
        </div>
        {/* password enter */}
        <div className="mb-2">
          <label className="block text-sm text-gray-600 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type your password"
            className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-gray-100"
          />
        </div>
        {/* error handling */}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <div
        className="text-right text-sm text-gray-500 mb-6 cursor-pointer"
        onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </div>
        {/* signin */}
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