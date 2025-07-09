import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ResumeScore = () => {
  const navigate = useNavigate();
  const [jobDesc, setJobDesc] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [analysisResults, setAnalysisResults] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleAnalyze = async () => {
    if (!resumeFile || !jobDesc) return;

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("jobDesc", jobDesc);

    try {
      const res = await fetch("/api/analyze-resume", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setAnalysisResults(data.results || []);
      setCurrentIndex(0);
    } catch (error) {
      console.error("Analysis failed:", error);
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

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const analysisResult = analysisResults[currentIndex];

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

        {analysisResult && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Match Score:</h3>
              {analysisResult.score && (
                <div className="text-2xl mb-4">{analysisResult.score}</div>
              )}

              <p className="font-medium mb-1">+ Matched skills:</p>
              <p className="text-sm text-gray-700 mb-4">{analysisResult.matchedSkills?.join(", ")}</p>

              <p className="font-medium mb-1">+ Missing Keywords:</p>
              <p className="text-sm text-gray-700 mb-4">{analysisResult.missingKeywords?.join(", ")}</p>

              <p className="font-medium mb-1">+ Suggestions:</p>
              <ul className="text-sm text-gray-700 list-disc list-inside">
                {analysisResult.suggestions?.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl border shadow-sm relative">
              <h3 className="text-lg font-semibold mb-4">We’ve updated your Experience section!</h3>
              <p className="font-semibold text-sm mb-2">BEFORE</p>
              <ul className="text-sm text-gray-700 list-disc list-inside mb-4">
                {analysisResult.before?.map((item, i) => <li key={i}>{item}</li>)}
              </ul>

              <p className="font-semibold text-sm mb-2">AFTER</p>
              <ul className="text-sm text-gray-700 list-disc list-inside mb-4">
                {analysisResult.after?.map((item, i) => <li key={i}>{item}</li>)}
              </ul>

              <button
                onClick={() => handleCopy(analysisResult.after?.join("\n"))}
                className="absolute bottom-4 right-4 bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-900 transition"
              >
                Copy
              </button>

              {analysisResults.length > 1 && (
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <button
                    onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                    disabled={currentIndex === 0}
                    className="text-xl px-2"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => setCurrentIndex((prev) => Math.min(analysisResults.length - 1, prev + 1))}
                    disabled={currentIndex === analysisResults.length - 1}
                    className="text-xl px-2"
                  >
                    →
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ResumeScore;
