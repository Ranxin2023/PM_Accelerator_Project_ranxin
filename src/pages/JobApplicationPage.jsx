import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const JobApplicationPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [selectedJobIndex, setSelectedJobIndex] = useState(null);
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    const fetchJobs = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/applications/${user.userName}`);
        const data = await res.json();
        if (res.ok) {
          setJobs(data);
        } else {
          console.error("Failed to fetch jobs:", data.message);
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };

    fetchJobs();
  }, [user, navigate]);

  const handleSave = async (job) => {
    try {
      const jobWithUser = {
        ...job,
        userName: user.userName,
      };

      const res = await fetch("http://localhost:5000/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobWithUser),
      });

      const data = await res.json();
      if (res.ok) {
        setJobs([...jobs, data]);
        setShowModal(false);
      } else {
        alert("Failed to save job: " + data.message);
      }
    } catch (err) {
      alert("Error saving job: " + err.message);
    }
  };

  const selectedJob = selectedJobIndex !== null ? jobs[selectedJobIndex] : null;

return (
  <>
    <Navbar />
    <div className="min-h-screen bg-white text-gray-800">
      <div className="max-w-[1800px] mx-auto">
        <div className="pl-10 pt-6">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-black hover:text-gray-700 transition"
          >
            ← Back
          </button>
        </div>

        <div className="flex">
          <div className="w-[28rem] border-r p-10 space-y-10 bg-gray-50">
            {jobs.map((job, index) => (
              <div key={index} className="bg-white rounded-xl shadow px-6 py-4 space-y-2 w-full">
                <h2 className="text-2xl font-semibold text-gray-800 leading-snug">
                  {job.company}
                </h2>
                <p className="text-lg text-gray-600">{job.location}</p>
                <button
                  className="text-lg text-blue-600 underline hover:text-blue-800 transition"
                  onClick={() => setSelectedJobIndex(index)}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>

          <div className="flex-1 p-14 space-y-8">
            {selectedJob ? (
              <div>
                <h1 className="text-3xl font-bold">{selectedJob.title}</h1>
                <div className="flex items-center gap-4 text-base mt-2">
                  <span className="text-green-600 font-medium">Status:</span>
                  <select
                    value={selectedJob.status}
                    onChange={(e) => {
                      const updated = [...jobs];
                      updated[selectedJobIndex].status = e.target.value;
                      setJobs(updated);
                    }}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <div className="text-base text-gray-600 mt-2">
                  {selectedJob.location} • ${selectedJob.salary}/year • {selectedJob.type}
                </div>

                <p className="mt-6 text-base leading-relaxed text-gray-800">
                  {selectedJob.description || "No description provided."}
                </p>
              </div>
            ) : (
              <div className="text-gray-500 text-lg">Select a job to view details.</div>
            )}
          </div>

          <div className="w-80 border-l p-6">
            <button
              onClick={() => setShowModal(true)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded text-base"
            >
              Add Application
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <JobModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
    <Footer />
  </>
);
};
const JobModal = ({ isOpen, onClose, onSave }) => {
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "Internship",
    status: "Applied",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleSave = () => {
    onSave(job);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Job Application</h2>
        <div className="space-y-3">
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={job.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            name="company"
            placeholder="Company"
            value={job.company}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={job.location}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            name="salary"
            placeholder="Salary (per year)"
            value={job.salary}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={job.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <select
            name="status"
            value={job.status}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
          <select
            name="type"
            value={job.type}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="Internship">Internship</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>
        <div className="flex justify-end mt-6 space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationPage;
