import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import useAsync from "@/hooks/useAsync";
import { makeRequest } from "@/useful/ApiContext";
import { useNavigate } from "react-router-dom";

function AddCourse() {
  const navigate = useNavigate();
  const { data, loading, execute } = useAsync();

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fdata = new FormData(e.currentTarget);

    execute(
      makeRequest({
        type: "post",
        url: "courses",
        data: {
          title: fdata.get("name"),
          estimated: fdata.get("duration"),
          courseimg: fdata.get("courseimg"),
          description: fdata.get("area"),
        },
        formdata: true,
      }),
      true
    );
  }

  useEffect(() => {
    if (data?.status === 201) {
      navigate(`/course/${data?.data?._id}`);
    }
  }, [data, navigate]);

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-background text-white rounded-lg shadow-lg border border-gray-700">
      <h2 className="text-3xl font-bold text-center text-blue-400 mb-6">
        Add a New Course
      </h2>

      <form onSubmit={submit} className="space-y-4">
        {/* Course Name */}
        <div>
          <Label className="text-gray-300">Course Name</Label>
          <Input
            name="name"
            placeholder="Enter course name"
            className="mt-1 bg-gray-800 text-white border border-gray-600"
          />
        </div>

        {/* Estimated Duration */}
        <div>
          <Label className="text-gray-300">Estimated Duration</Label>
          <Input
            name="duration"
            placeholder="Enter estimated duration"
            className="mt-1 bg-gray-800 text-white border border-gray-600"
          />
        </div>

        {/* Upload Course Image */}
        <div>
          <Label className="text-gray-300">Course Image</Label>
          <Input
            name="courseimg"
            type="file"
            accept="image/*"
            className="mt-1 bg-gray-800 text-white border border-gray-600 file:bg-gray-700 file:text-gray-300 file:border-0 file:rounded-lg file:px-3 file:py-2 hover:file:bg-gray-600"
          />
        </div>

        {/* Course Description */}
        <div>
          <Label className="text-gray-300">Course Description</Label>
          <Textarea
            name="area"
            placeholder="Write a short description..."
            className="mt-1 bg-gray-800 text-white border border-gray-600 h-24"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full py-3 text-foreground bg-blue-600 hover:bg-blue-700 text-lg font-semibold rounded-lg transition duration-300"
          disabled={!loading}
        >
          {!loading ? "Creating..." : "Create Course"}
        </Button>
      </form>
    </div>
  );
}

export default AddCourse;
