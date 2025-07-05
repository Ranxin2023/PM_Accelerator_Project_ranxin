import React from "react";

export default function AuthLeftPanel() {
  return (
    <div className="w-1/2 bg-[#2F3037] text-white flex flex-col justify-center px-16">
      <div className="mb-8">
        <div className="bg-white text-black rounded-full px-4 py-2 inline-block text-sm font-medium">
          ★ Job Assistant
        </div>
      </div>
      <h1 className="text-4xl font-semibold mb-4">Welcome to Job Assistant!</h1>
      <p className="text-lg text-gray-300 leading-relaxed">
        We help you apply faster, smarter, and with less stress — powered by AI to save your time and land your dream job.
      </p>
    </div>
  );
}