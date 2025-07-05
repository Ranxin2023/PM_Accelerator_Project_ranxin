import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white text-lg py-6">
      <div className="w-full max-w-[1900px] mx-auto px-12 flex items-center justify-between text-[1.5rem]">

        <div className="flex items-center space-x-12">
          <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-5 py-2">
            <span className="text-black text-base">★</span>
            <span className="font-semibold text-base text-gray-900">Job Assistant</span>
          </div>

      <nav className="flex items-center space-x-8 ml-6">
        <Link to="/home" className="text-gray-700 font-medium hover:text-black">Home</Link>
        <Link to="/dashboard" className="text-gray-700 font-medium hover:text-black">Dashboard</Link>
        <Link to="/forum" className="text-gray-700 font-medium hover:text-black">Forum</Link>
        <Link to="/about" className="text-gray-700 font-medium hover:text-black">About Us</Link>
        <Link to="/contact" className="text-gray-700 font-medium hover:text-black">Contact</Link>
      </nav>

        </div>

        <div className="text-gray-400 pr-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0" />
          </svg>
        </div>

      </div>
    </header>
  );
}