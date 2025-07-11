import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const GenerateAnswers = () => {
  const [question, setQuestion] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [customPrompt, setCustomPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [hasFeedback, setHasFeedback] = useState(false);
  const navigate = useNavigate();


  //Here to connect the deepseek
  const handleGenerate = async () => {
    console.log("Generating...");
    try {
      const res = await fetch("http://localhost:5000/api/answers/generate-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          jobDescription: jobDesc,
          customPrompt,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setResponse(data.answer);
        console.log(`Answer generated, ${data.answer}`);
      } else {
        console.log("❌ Generated Failed");
        setResponse(`❌ Failed: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error calling DeepSeek backend:", error);
      setResponse("❌ Error generating answer. Please try again.");
    }
  };


  const handleCopy = () => {
    navigator.clipboard.writeText(response);
  };

  return (
    <>
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-start mb-4">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:underline text-sm"
          >
            ← Back
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
            <h2 className="font-semibold mb-1">Question</h2>
            <p className="text-sm text-gray-500 mb-4">Answer a question from a job posting.</p>
            <textarea
              className="w-full p-4 border rounded-lg min-h-[120px]"
              placeholder="Enter your question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
            <h2 className="font-semibold mb-1">Job Details</h2>
            <p className="text-sm text-gray-500 mb-4">Add the job information.</p>
            <textarea
              className="w-full p-4 border rounded-lg min-h-[120px]"
              placeholder="Paste job description here..."
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
            />
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
            <h2 className="font-semibold mb-1">Custom Prompt</h2>
            <p className="text-sm text-gray-500 mb-4">Write your own prompt.</p>
            <textarea
              className="w-full p-4 border rounded-lg min-h-[120px]"
              placeholder="Enter your prompt..."
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
            />
          </div>
        </div>

        <div className="text-center mb-12">
          <button
            onClick={handleGenerate}
            className="bg-black text-white px-10 py-3 rounded-full text-lg font-medium hover:bg-gray-900 transition"
          >
            Generate!
          </button>
        </div>

    <div className="relative bg-white border rounded-xl p-6 shadow-sm min-h-[200px]">
    <div className="pb-12">
        {response ? (
        <pre className="whitespace-pre-wrap text-sm text-gray-800">{response}</pre>
        ) : (
        <p className="text-gray-400">Question response...</p>
        )}
    </div>

    <div className="absolute bottom-4 right-4 flex items-center gap-4">
        {hasFeedback ? (
        <span className="text-sm text-green-600">Thanks for your feedback!</span>
        ) : (
        <button
            onClick={() => setHasFeedback(true)}
            className="text-2xl hover:scale-110 transition"
        >
            😊
        </button>
        )}
        <button
        onClick={handleCopy}
        className="bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-900 transition"
        >
        Copy
        </button>
    </div>
    </div>


      </div>
      <Footer />
    </>
  );
};

export default GenerateAnswers;
