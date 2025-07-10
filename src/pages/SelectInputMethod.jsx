import { useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react'
import { useUser } from "../context/UserContext";
import Navbar from "../components/Navbar";
export default function SelectInputMethod() {
    const navigate = useNavigate();
    const [resumeFile, setResumeFile] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState("");
    const { user } = useUser();
    useEffect(() => {
        if (!user) {
        //   alert("Please sign in to continue.");
        navigate("/");
        }
    }, [user, navigate]);

    const userName = user?.userName;
    const handleResumeChange=(e)=>{
        setResumeFile(e.target.files[0])
    }
    const handleResumeUpload=async()=>{
        if(!resumeFile)return alert("Please select a file")
        const resumeData=new FormData()
        resumeData.append('resume', resumeFile)
        resumeData.append("userName", userName);
        try {
            const res = await fetch("http://localhost:5000/api/upload/upload-resume", {
                method: "POST",
                body: resumeData,
            });

        const data = await res.json();
        if (res.ok) {
            setUploadSuccess("Resume uploaded successfully.");
            navigate("/resume/form", { state: data }); 
            // You can navigate or show a preview
        } else {
            alert("Upload failed: " + data.message);
        }
        } catch (err) {
            alert("Error: " + err.message);
        }
    }
    return (
    <>
        <Navbar />
    <div className="flex flex-col items-center px-4 py-16 min-h-screen bg-gray-100">
    <h1 className="text-5xl font-bold mb-32">How would you like to get started?</h1>
    {/* resume upload part */}
    <div className="flex flex-col md:flex-row gap-16">

        <div className="bg-white rounded-2xl shadow-lg p-10 w-96 h-96 text-xl">
            <div>
            <h2 className="text-2xl font-semibold mb-20">Upload Resume</h2>
            <input
                type="file"
                onChange={handleResumeChange}
                className="block w-full text-lg text-gray-500
                        file:mr-4 file:py-3 file:px-6
                        file:rounded-lg file:border-0
                        file:text-lg file:font-medium
                        file:bg-gray-100 file:text-gray-700
                        hover:file:bg-gray-200"
            />
            </div>
            <button
            onClick={handleResumeUpload}
            className="bg-black text-white text-lg font-medium rounded-xl py-3 hover:bg-gray-900 w-full mt-4"
            >
            Upload
            </button>
             {uploadSuccess && (
              <p className="text-green-600 mt-2 text-sm">{uploadSuccess}</p>
            )}
            </div>
        <div className="bg-gray-50 rounded-2xl shadow-lg p-10 w-96 flex flex-col text-xl">
        <h2 className="text-2xl font-semibold mb-32">Fill Form Manually</h2>
        <button
            onClick={() => navigate("/manually-fill")}
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