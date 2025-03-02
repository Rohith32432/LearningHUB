import React from "react";
import {ReactTyped} from "react-typed";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white px-4">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold">
          Welcome to <span className="text-blue-400">Learning Hub</span>
        </h1>

        <ReactTyped
          strings={[
            "Learn Smarter 📚",
            "Test Your Knowledge 🎯",
            "Earn Certificates 🎓",
          ]}
          typeSpeed={60}
          backSpeed={40}
          loop
          className="block text-lg md:text-2xl font-medium text-gray-300"
        />

        <p className="max-w-full text-justify text-gray-400">
          A platform for students to learn, take quizzes, and track progress.  
          Instructors can upload materials, create assignments, and evaluate performance.
        </p>

        <div className="space-x-4">
            <Link to={'/login'} >
          <Button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 text-lg">
            Start Learning
          </Button>
            </Link>
            <Link to={'/instlogin'}>
          <Button className="bg-gray-700 text-foreground hover:bg-gray-800 px-6 py-3 text-lg">
            Join as Instructor
          </Button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
