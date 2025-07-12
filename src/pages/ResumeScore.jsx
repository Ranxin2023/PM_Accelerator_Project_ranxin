import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ResumeScore = () => {
  const navigate = useNavigate();
  const [jobDesc, setJobDesc] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [analysisText, setAnalysisText] = useState("");

  const handleAnalyze = async () => {
    if (!resumeFile || !jobDesc) return;

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("jobDescription", jobDesc); // match backend key

    try {
      const res = await fetch("http://localhost:5000/api/analyze/analyze-resume", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setAnalysisText(data.analysis || "No analysis received.");
    } catch (error) {
      console.error("Analysis failed:", error);
      setAnalysisText("Error occurred while analyzing resume.");
    }
  };

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setResumeFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(analysisText);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-start mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:underline text-sm"
          >
            ← Back
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
            <h2 className="font-semibold mb-1">Upload Resume</h2>
            <p className="text-sm text-gray-500 mb-4">Drag and drop your file here</p>
            <div
              className="w-full p-4 border border-dashed rounded-lg text-gray-400 text-center cursor-pointer"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => document.getElementById("resume-upload").click()}
            >
              {resumeFile ? resumeFile.name : "📎 Drag or click to upload"}
              <input
                type="file"
                id="resume-upload"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
            <h2 className="font-semibold mb-1">Job Details</h2>
            <p className="text-sm text-gray-500 mb-4">Paste job description here...</p>
            <textarea
              className="w-full p-4 border rounded-lg min-h-[120px]"
              placeholder="Paste job description here..."
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
            />
          </div>
        </div>

        <div className="text-center mb-16">
          <button
            onClick={handleAnalyze}
            className="bg-black text-white px-10 py-3 rounded-full text-lg font-medium hover:bg-gray-900 transition"
          >
            Analyze Resume
          </button>
        </div>

        {analysisText && (
          <div className="bg-white p-6 rounded-xl border shadow-sm max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold mb-4">Analysis Result:</h3>
            <pre className="whitespace-pre-wrap text-sm text-gray-800">{analysisText}</pre>

            <button
              onClick={handleCopy}
              className="mt-4 bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-900 transition"
            >
              Copy
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ResumeScore;
