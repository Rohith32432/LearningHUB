import React, { useState } from 'react';
import axios from 'axios';
import { Input } from './ui/input';
import { makeRequest } from '@/useful/ApiContext';
import { XSkeletonCard } from './Skeletonpage';

const Search = () => {
  const [title, setTitle] = useState('');
  const [instructor, setInstructor] = useState('');
  const [rating, setRating] = useState('');
  const [estimated, setEstimated] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    try {

      const response = await makeRequest({
        type: 'post', url: 'courses/search', data: {
          title, instructor, rating, estimated
        }
      })


      console.log(response);

      setCourses(response.data);
      console.log(courses);

    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold">Search for Courses</h2>
      </div>
      <div className="space-y-4">
        <div className="flex space-x-4">
          <Input
            type="text"
            placeholder="Course Title"
            className="px-4 py-2 border border-gray-300 rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Instructor ID"
            className="px-4 py-2 border border-gray-300 rounded-md"
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
          />
        </div>
        <div className="flex space-x-4">
          <Input
            type="number"
            placeholder="Minimum Rating"
            className="px-4 py-2 border border-gray-300 rounded-md"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Maximum Estimated Time"
            className="px-4 py-2 border border-gray-300 rounded-md"
            value={estimated}
            onChange={(e) => setEstimated(e.target.value)}
          />
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </div>

      {loading && <div className="mt-4 text-center">
        
          <div className='flex w-full m-5 my-8 gap-3 flex-wrap'>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i}>
                      <XSkeletonCard />
                    </div>
                  ))}
        
                  </div>
        
        </div>}

      {error && <div className="mt-4 text-center text-red-500">{error}</div>}

      <div className="mt-6">
        {courses?.length > 0 ? (
          <ul className="space-y-4 flex  flex-wrap ">
            {courses && courses?.map((course) => (
              <li key={course._id} className="border min-h-[300px]  border-gray-300 p-4 rounded-md">
                <img
                  src={course?.pic ? `http://localhost:3003/image/${course?.pic}` : 'https://lmscdoe.crescent-institute.edu.in/theme/image.php/mb2nl/theme/1736516285/course-default'}
                  alt={course?.title}
                  className="w-full h-48 object-cover"
                />
                <h3 className="text-xl font-semibold">{course.title}</h3>
                <p>Instructor: {course?.instrutors.map((instructor) => instructor.name).join(', ')}</p>
                <p>Rating: {course?.rating}</p>
                <p>Estimated Time: {course.estimated} hours</p>
              </li>
            ))}
          </ul>
        ) : (
            <div >
                    {Array.from({ length: 1 }).map((_, i) => (
                      <div key={i}>
                        <XSkeletonCard />
                      </div>
                    ))}
          
                    </div>
        )}
      </div>
    </div>
  );
};

export default Search;
