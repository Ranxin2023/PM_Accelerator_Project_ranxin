import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  User,
  MessageSquare,
  FileText,
  BarChart3
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Edit Profile",
      desc: "Review and edit personal information. Replace the resume uploaded before.",
      button: "Edit Info",
      icon: <User className="w-10 h-10 mx-auto text-black" />,
      onClick: () => navigate("/manually-fill?from=dashboard")

    },
    {
      title: "Generate Answers",
      desc: "Generate AI-powered answers to common application questions.",
      button: "Auto Answer",
      icon: <MessageSquare className="w-10 h-10 mx-auto text-black" />,
      onClick: () => navigate("/auto-answer"),
    },
    {
      title: "Analyze My Resume",
      desc: "Upload a job description to get a match score and suggestions.",
      button: "Resume Score",
      icon: <FileText className="w-10 h-10 mx-auto text-black" />,
      onClick: () => navigate("/resume-score"),
    },
    {
      title: "Application Overview",
      desc: "Track the status of your submitted applications in one place.",
      button: "Open Tracker",
      icon: <BarChart3 className="w-10 h-10 mx-auto text-black" />,
      onClick: () => navigate("/tracker"),
    },
  ];

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-8 py-20 text-center">
        <h1 className="text-5xl font-bold mb-20">Welcome back!</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12">
          {actions.map((item, index) => (
            <div
              key={index}
              className="space-y-6 border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition"
            >
              <div>{item.icon}</div>
              <h2 className="font-semibold text-xl">{item.title}</h2>
              <p className="text-base text-gray-500 px-2">{item.desc}</p>
              <button
                onClick={item.onClick}
                className="bg-black text-white px-5 py-2.5 rounded-full text-sm hover:bg-gray-900 transition"
              >
                {item.button}
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
