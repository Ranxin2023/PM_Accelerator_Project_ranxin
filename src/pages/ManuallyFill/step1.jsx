import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
const valuesList = [
  "Diversity & inclusion",
  "Impactful work",
  "Independence & autonomy",
  "Innovative product & tech",
  "Mentorship & career development",
  "Progressive leadership",
  "Recognition & reward",
  "Role mobility",
  "Social responsibility & sustainability",
  "Transparency & communication",
  "Work-life balance",
];

export default function ManuallyStep1(){
    const [selectedValues, setSelectedValues] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { user } = useUser();
    const email = user?.email;
    const toggleSelection = (value) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((v) => v !== value));
    } else if (selectedValues.length < 3) {
      setSelectedValues([...selectedValues, value]);
    } else {
      setError("You can only select up to 3 values.");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleContinue = async () => {
    const res = await fetch("http://localhost:5000/api/manuallyfill/step1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email:email, values: selectedValues }),
    });
    const data = await res.json();
    if (res.ok) {
      navigate("/next-step"); // Replace with actual next step
    } else {
      setError(data.message || "Something went wrong.");
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <button onClick={() => navigate(-1)} className="text-gray-500 mb-4">← BACK</button>
      <div className="text-3xl font-bold mb-2">Let's get started!</div>
      <div className="text-xl mb-6">What do you value in a new role?</div>
      <div className="text-gray-600 mb-6">Select up to <span className="font-semibold">3</span></div>

      <div className="flex flex-wrap gap-3 mb-6">
        {valuesList.map((value) => (
          <button
            key={value}
            onClick={() => toggleSelection(value)}
            className={`px-4 py-2 rounded-full border 
              ${selectedValues.includes(value) ? "bg-black text-white" : "bg-white border-gray-300"}`}
          >
            {value}
          </button>
        ))}
      </div>

      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

      <button
        disabled={selectedValues.length === 0}
        onClick={handleContinue}
        className={`w-full py-3 rounded-xl font-semibold 
          ${selectedValues.length > 0 ? "bg-black text-white" : "bg-gray-200 text-gray-500 cursor-not-allowed"}`}
      >
        Save and Continue →
      </button>
    </div>
  );
}