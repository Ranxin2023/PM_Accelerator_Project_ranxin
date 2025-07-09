import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";

const ManuallyFill = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
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

  /*这里是因为后面dashboard的edit board也要用这个页面
  useEffect(() => {
  fetch("/api/user-profile")
    .then((res) => {
      if (!res.ok) {
        return {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          education: [],
          experience: [],
          publications: []
        };
      }
      return res.json();
    })
    .then((data) => {
      setForm(data);
    })
    .catch((err) => {
      console.error("Failed to load profile", err);
    });
}, []);

  const handleChange = (section, idx, key, value) => {
    const updated = [...form[section]];
    updated[idx][key] = value;
    setForm({ ...form, [section]: updated });
  };

  const addEntry = (section, emptyTemplate) => {
    setForm({ ...form, [section]: [...form[section], emptyTemplate] });
  };
  */
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
              onClick={() => setStep(2)}
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
              onClick={() => navigate("/dashboard")}
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
