import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";

const ManuallyFill = () => {
  const navigate = useNavigate();
  const { user } = useUser();
      useEffect(() => {
          if (!user) {
          //   alert("Please sign in to continue.");
          navigate("/");
          }
      }, [user, navigate]);
  
  const userName = user?.userName;
  const [step, setStep] = useState(1);
  // const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const from = query.get("from");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    education: [
      {
        school: "",
        degree: "",
        startDate: "",
        endDate: "",
        gpa: "",
      },
    ],
    experience: [
      {
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        description: [],
      },
    ],
    publications: [
      {
        title: "",
        authors: "",
        venue: "",
        year: "",
        pages: "",
      },
    ],
  });
  const updateArrayField = (section, idx, key, value) => {
    const updatedArray = [...form[section]];
    updatedArray[idx][key] = value;
    setForm({ ...form, [section]: updatedArray });
  };
  
  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/profile/get-profile?userName=${encodeURIComponent(userName)}`);
      const data = await res.json();

      if (res.ok) {
        setForm({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phone: data.phone || "",
          education: data.education?.length ? data.education : [{
            school: "",
            degree: "",
            startDate: "",
            endDate: "",
            gpa: ""
          }],
          experience: data.experience?.length ? data.experience : [{
            title: "",
            company: "",
            startDate: "",
            endDate: "",
            description: []
          }],
          publications: data.publications?.length ? data.publications : [{
            title: "",
            authors: "",
            venue: "",
            year: "",
            pages: ""
          }]
        });
      } else {
        console.error("Failed to load profile:", data.message);
      }
    } catch (err) {
      console.error("Error loading profile:", err.message);
    }
  };

  if (userName) {
    fetchProfile();
  }
}, [userName]);

 const handleStep1Next=async()=>{
  try {
      const res = await fetch("http://localhost:5000/api/profile/save-basic-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userName:userName,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone, 
        })
      });

      const data = await res.json();
      if (!res.ok) {
        alert("Failed to save basic info: " + data.message);
        return;
      }

      setStep(2); // Go to step 2
    } catch (err) {
      alert("Error saving basic info: " + err.message);
    }
 }
 const handleStep2Submit = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/profile/save-profile-details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: user?.userName,  // Ensure this comes from context or props
        education: form.education,
        experience: form.experience,
        publications: form.publications,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Profile details saved!");
      navigate("/dashboard");
    } else {
      alert("Failed to save: " + data.message);
    }
  } catch (err) {
    alert("Error: " + err.message);
  }
};

  return (
    <>
      <Navbar />
      <div className="p-12 max-w-6xl mx-auto text-lg">
        <button
          onClick={() => {
            if (step === 1) {
              if (from === "dashboard") {
                navigate("/dashboard");
              } else {
                navigate("/select-input-method");
              }
            } else {
              setStep(1);
            }
          }}
          className="mb-10 text-2xl font-semibold text-black hover:underline"
        >
          ← Back
        </button>

        {step === 1 && (
          <>
        <h1 className="text-5xl font-bold text-center mb-12">
          Fill Out Your Profile
        </h1>


            <div className="mb-6 space-y-6">
              <div className="flex gap-6">
                <input
                  className="w-full border p-4"
                  value={form.firstName}
                  onChange={e => setForm({ ...form, firstName: e.target.value })}
                  placeholder="First Name"
                />
                <input
                  className="w-full border p-4"
                  value={form.lastName}
                  onChange={e => setForm({ ...form, lastName: e.target.value })}
                  placeholder="Last Name"
                />
              </div>
              <input
                className="w-full border p-4"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="Email"
              />
              <input
                className="w-full border p-4"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                placeholder="Phone"
              />
            </div>

            <div className="flex justify-between mt-12">
              <button
                onClick={() => setForm({ ...form, firstName: "", lastName: "", email: "", phone: "" })}
                className="text-gray-600 hover:underline"
              >
                Clear All
              </button>
              <button
                onClick={handleStep1Next}
                className="bg-black text-white text-lg font-medium px-6 py-3 rounded-xl hover:bg-gray-900 transition"
              >
                Next
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-2xl font-medium mb-4">Education</h2>
            {form.education.map((edu, idx) => (
              <div key={idx} className="border rounded p-6 mb-6 space-y-4">
                <input className="w-full border p-3"
                  value={edu.school}
                  onChange={e => updateArrayField('education', idx, 'school', e.target.value)}
                  placeholder="School"
                />
                <input className="w-full border p-3"
                  value={edu.degree}
                  onChange={e => updateArrayField('education', idx, 'degree', e.target.value)}
                  placeholder="Degree"
                />
                <div className="flex gap-6">
                  <input className="w-full border p-3"
                    value={edu.startDate}
                    onChange={e => updateArrayField('education', idx, 'startDate', e.target.value)}
                    placeholder="Start Date"
                  />
                  <input className="w-full border p-3"
                    value={edu.endDate}
                    onChange={e => updateArrayField('education', idx, 'endDate', e.target.value)}
                    placeholder="End Date"
                  />
                </div>
                <input className="w-full border p-3"
                  value={edu.gpa}
                  onChange={e => updateArrayField('education', idx, 'gpa', e.target.value)}
                  placeholder="GPA"
                />
               
                 <button
                  className="absolute bottom-4 right-4 text-red-500 text-sm font-medium hover:underline"
                  onClick={() => {
                    const updatedEducation = [...form.education];
                    updatedEducation.splice(idx, 1);
                    setForm({ ...form, education: updatedEducation });
                  }}
                >
                  Delete
                </button>
              
              </div>
              
            ))}
            <button
              onClick={() =>
                setForm({
                  ...form,
                  education: [
                    ...form.education,
                    { school: "", degree: "", startDate: "", endDate: "", gpa: "" },
                  ],
                })
              }
              className="text-sm text-blue-600 font-medium hover:underline mb-10"
            >
              + Add 
            </button>
            

            <h2 className="text-2xl font-medium mb-4 mt-10">Experience</h2>
            {form.experience.map((exp, idx) => (
              <div key={idx} className="border rounded p-6 mb-6 space-y-4">
                <input className="w-full border p-3"
                  value={exp.title}
                  onChange={e => updateArrayField('experience', idx, 'title', e.target.value)}
                  placeholder="Job Title"
                />
                <input className="w-full border p-3"
                  value={exp.company}
                  onChange={e => updateArrayField('experience', idx, 'company', e.target.value)}
                  placeholder="Company"
                />
                <div className="flex gap-6">
                  <input className="w-full border p-3"
                    value={exp.startDate}
                    onChange={e => updateArrayField('experience', idx, 'startDate', e.target.value)}
                    placeholder="Start Date"
                  />
                  <input className="w-full border p-3"
                    value={exp.endDate}
                    onChange={e => updateArrayField('experience', idx, 'endDate', e.target.value)}
                    placeholder="End Date"
                  />
                </div>
                <textarea className="w-full border p-3"
                  rows={6}
                  value={exp.description?.join('\n') || ''}
                  onChange={e => updateArrayField('experience', idx, 'description', e.target.value.split('\n'))}
                  placeholder="Description (one bullet per line)"
                />
              </div>
            ))}
            <button
              onClick={() =>
                setForm({
                  ...form,
                  experience: [
                    ...form.experience,
                    {
                      title: "",
                      company: "",
                      startDate: "",
                      endDate: "",
                      description: [],
                    },
                  ],
                })
              }
              className="text-sm text-blue-600 font-medium hover:underline mb-10"
            >
              + Add
            </button>


            <h2 className="text-2xl font-medium mb-4 mt-10">Publications</h2>
            {form.publications.map((pub, idx) => (
              <div key={idx} className="border rounded p-6 mb-6 space-y-4">
                <input className="w-full border p-3"
                  value={pub.title}
                  onChange={e => updateArrayField('publications', idx, 'title', e.target.value)}
                  placeholder="Title"
                />
                <input className="w-full border p-3"
                  value={pub.authors}
                  onChange={e => updateArrayField('publications', idx, 'authors', e.target.value)}
                  placeholder="Authors"
                />
                <input className="w-full border p-3"
                  value={pub.venue}
                  onChange={e => updateArrayField('publications', idx, 'venue', e.target.value)}
                  placeholder="Conference / Journal"
                />
                <input className="w-full border p-3"
                  value={pub.year}
                  onChange={e => updateArrayField('publications', idx, 'year', e.target.value)}
                  placeholder="Year"
                />
                <input className="w-full border p-3"
                  value={pub.pages}
                  onChange={e => updateArrayField('publications', idx, 'pages', e.target.value)}
                  placeholder="Pages"
                />
              </div>
            ))}
            <button
              onClick={() =>
                setForm({
                  ...form,
                  publications: [
                    ...form.publications,
                    {
                      title: "",
                      authors: "",
                      venue: "",
                      year: "",
                      pages: "",
                    },
                  ],
                })
              }
              className="text-sm text-blue-600 font-medium hover:underline mb-10"
            >
              + Add
            </button>


            <div className="flex justify-end mt-12">
              <button
                onClick={handleStep2Submit}
                className="bg-black text-white text-lg font-medium px-6 py-3 rounded-xl hover:bg-gray-900 transition"
              >
                Confirm
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );

};

export default ManuallyFill;
