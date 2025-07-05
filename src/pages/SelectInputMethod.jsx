import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function SelectInputMethod() {
  const navigate = useNavigate();

    return (
    <>
        <Navbar />
    <div className="flex flex-col items-center px-4 py-16 min-h-screen bg-gray-100">
    <h1 className="text-5xl font-bold mb-32">How would you like to get started?</h1>
    <div className="flex flex-col md:flex-row gap-16">

        <div className="bg-white rounded-2xl shadow-lg p-10 w-96 h-96 text-xl">
        <h2 className="text-2xl font-semibold mb-20">Upload Resume</h2>
        <input
            type="file"
            className="block w-full text-lg text-gray-500
                    file:mr-4 file:py-3 file:px-6
                    file:rounded-lg file:border-0
                    file:text-lg file:font-medium
                    file:bg-gray-100 file:text-gray-700
                    hover:file:bg-gray-200"
        />
        </div>

        <div className="bg-gray-50 rounded-2xl shadow-lg p-10 w-96 flex flex-col text-xl">
        <h2 className="text-2xl font-semibold mb-32">Fill Form Manually</h2>
        <button
            onClick={() => navigate("/manual-fill")}
            className="bg-black text-white text-lg font-medium rounded-xl py-3 hover:bg-gray-900"
        >
            Continue
        </button>
        </div>

    </div>
</div>

    </>
    );
}