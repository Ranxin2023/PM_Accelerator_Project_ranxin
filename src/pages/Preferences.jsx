import React, { useState, useEffect } from 'react';
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const valuesList = [
  "Diversity & inclusion", "Impactful work", "Independence & autonomy",
  "Innovative product & tech", "Mentorship & career development",
  "Progressive leadership", "Recognition & reward", "Role mobility",
  "Social responsibility & sustainability", "Transparency & communication",
  "Work-life balance"
];


const jobOptions = {
  "Technical & Engineering": [
    "Aerospace Engineering", "AI & Machine Learning", "Architecture & Civil Engineering",
    "Data & Analytics", "Developer Relations", "DevOps & Infrastructure", "Electrical Engineering",
    "Engineering Management", "Hardware Engineering", "IT & Security", "Mechanical Engineering",
    "Process Engineering", "QA & Testing", "Quantitative Finance", "Quantum Computing",
    "Sales & Solution Engineering", "Software Engineering"
  ],
  "Finance & Operations & Strategy": [
    "Accounting", "Business & Strategy", "Consulting", "Finance & Banking",
    "Growth & Marketing", "Operations & Logistics", "Product", "Real Estate",
    "Retail", "Sales & Account Management"
  ],
  "Creative & Design": [
    "Art, Graphics & Animation", "Audio & Sound Design", "Content & Writing",
    "Creative Production", "Journalism", "Social Media", "UI/UX & Design"
  ],
  "Education & Training": [
    "Education", "Training"
  ],
  "Legal & Support & Administration": [
    "Administrative & Executive Assistance", "Clerical & Data Entry",
    "Customer Experience & Support", "Legal & Compliance", "People & HR",
    "Security & Protective Services"
  ],
  "Life Sciences": [
    "Biology & Biotech", "Lab & Research", "Medical, Clinical & Veterinary"
  ]
};

const levelOptions = [
  "Internship",
  "Entry Level & New Grad",
  "Junior (1 to 2 years)",
  "Mid-level (3 to 4 years)",
  "Senior (5 to 8 years)",
  "Expert & Leadership (9+ years)",
];

export default function PreferencesFlow() {
  const { user } = useUser();
  const navigate = useNavigate();
  const userName = user?.userName;

  const [step, setStep] = useState(1);
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    const fetchPreferences = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:5000/api/preference/${user.userName}`);
        if (!res.ok) throw new Error("Failed to fetch preferences");
        const data = await res.json();

        if (data.preferences) setSelectedValues(data.preferences);
        if (data.interestedRoles) setSelectedRoles(data.interestedRoles);
        if (data.interestedLevels) setSelectedLevels(data.interestedLevels);
      } catch (err) {
        console.error("Error loading preferences:", err);
      }
    };

    fetchPreferences();
  }, [user, navigate]);

  const toggle = (value, selected, setSelected, max) => {
    if (selected.includes(value)) {
      setSelected(selected.filter(v => v !== value));
    } else if (selected.length < max) {
      setSelected([...selected, value]);
    } else {
      setError(`You can only select up to ${max}`);
      setTimeout(() => setError(""), 3000);
    }
  };

 const handleStep1Continue = async () => {
  const res = await fetch("http://127.0.0.1:5000/api/preference", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName, preferences: selectedValues }),
  });

  if (res.ok) {
    setStep(2);
  } else {
    setError("Submission failed");
  }
};

  
  const handleStep2Continue = async () => {
  const res = await fetch("http://127.0.0.1:5000/api/preference", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName, interestedRoles: selectedRoles }),
  });

  if (res.ok) {
    setStep(3);
  } else {
    setError("Submission failed");
  }
}


  const handleFinalContinue = async () => {
  try {
    const res = await fetch("http://127.0.0.1:5000/api/preference/levels", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, levels: selectedLevels }),
    });

    if (res.ok) {
      navigate("/select-input-method");
    } else {
      setError("Failed to save levels.");
    }
  } catch (err) {
    console.error(err);
    setError("Error saving levels.");
  }
};

  return (
    <>
      <Navbar />
      <div className="p-24 max-w-6xl mx-auto text-3xl">
        {step === 1 && (
          <>

            <div className="text-6xl font-bold mb-6">Let's get started!</div>
            <div className="text-3xl mb-6">What do you value in a new role?</div>
            <div className="text-gray-600 mb-24 text-2xl">Select up to <span className="font-semibold">3</span></div>
            <div className="flex flex-wrap gap-6 mb-32">
              {valuesList.map((value) => (
                <button
                  key={value}
                  onClick={() => toggle(value, selectedValues, setSelectedValues, 3)}
                  className={`px-6 py-4 rounded-full border text-2xl transition ${
                    selectedValues.includes(value) ? "bg-black text-white" : "bg-white border-gray-400"
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
            {error && <div className="text-red-500 text-xl mb-6">{error}</div>}
            <button
              disabled={selectedValues.length === 0}
              onClick={handleStep1Continue}
              className={`w-full py-5 rounded-xl font-semibold text-2xl ${
                selectedValues.length > 0 ? "bg-black text-white" : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              Save and Continue →
            </button>
          </>
        )}

        {step === 2 && (
          <>
          {step > 1 && (
            <button onClick={() => setStep(step - 1)} className="text-gray-500 mb-10 text-xl">← BACK</button>
          )}

            <div className="text-5xl font-bold mb-6">What kinds of roles are you interested in?</div>
            <div className="text-gray-600 mb-12 text-2xl">Select up to <span className="font-semibold">5</span></div>
            <div className="space-y-12 mb-32">
              {Object.entries(jobOptions).map(([category, roles]) => (
                <div key={category}>
                  <div className="text-2xl font-semibold mb-6">{category}</div>
                  <div className="flex flex-wrap gap-4">
                    {roles.map((role) => (
                      <button
                        key={role}
                        onClick={() => toggle(role, selectedRoles, setSelectedRoles, 5)}
                        className={`px-6 py-3 rounded-full border text-xl transition ${
                          selectedRoles.includes(role) ? "bg-blue-500 text-white" : "bg-white border-gray-400"
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {error && <div className="text-red-500 text-xl mb-6">{error}</div>}
            <button
              disabled={selectedRoles.length === 0}
              onClick={handleStep2Continue}
              className={`w-full py-5 rounded-xl font-semibold text-2xl ${
                selectedRoles.length > 0 ? "bg-black text-white" : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              Save and Continue →
            </button>
          </>
        )}

        {step === 3 && (
          <>
            {step > 1 && (
              <button onClick={() => setStep(step - 1)} className="text-gray-500 mb-10 text-xl">← BACK</button>
            )}

            <div className="text-5xl font-bold mb-6">What level of roles are you looking for?</div>
            <div className="text-gray-600 mb-12 text-2xl">Select up to <span className="font-semibold">2</span></div>
            <div className="space-y-4 mb-32">
              {levelOptions.map((level) => (
                <button
                  key={level}
                  onClick={() => toggle(level, selectedLevels, setSelectedLevels, 2)}
                  className={`w-full text-left px-6 py-5 rounded-xl border text-2xl transition flex items-center ${
                    selectedLevels.includes(level)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedLevels.includes(level)}
                    readOnly
                    className="mr-4 w-6 h-6"
                  />
                  {level}
                </button>
              ))}
            </div>
            {error && <div className="text-red-500 text-xl mb-6">{error}</div>}
            <button
              disabled={selectedLevels.length === 0}
              onClick={handleFinalContinue}
              className={`w-full py-5 rounded-xl font-semibold text-2xl ${
                selectedLevels.length > 0 ? "bg-black text-white" : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              Save and Continue →
            </button>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}