import React from "react";
import { ReactTyped } from "react-typed";
import { Button } from "@/components/ui/button";

const Ihome: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white px-4 py-12">
      {/* Hero Section */}
      <div className="text-center space-y-8 md:space-y-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-wide leading-tight">
          Teach with <span className="text-blue-400">Learning Hub</span>
        </h1>

        <ReactTyped
          strings={[
            "Share Your Knowledge 🎓",
            "Create Engaging Courses 📖",
            "Evaluate Student Performance 🏆",
          ]}
          typeSpeed={60}
          backSpeed={40}
          loop
          className="block text-lg md:text-2xl font-medium text-gray-300"
        />

        <p className="max-w-lg text-gray-400 mx-auto leading-relaxed">
          Join as an instructor, upload materials, create assignments, and help students grow.
        </p>

        <div className="space-x-4 flex justify-center">
          <Button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 text-lg rounded-lg transition-all transform hover:scale-105">
            Start Teaching
          </Button>
          <Button className="bg-gray-700 hover:bg-gray-800 px-6 py-3 text-lg rounded-lg transition-all transform hover:scale-105">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Ihome;
