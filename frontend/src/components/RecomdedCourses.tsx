import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { SkeletionCard, XSkeletonCard } from './Skeletonpage';
import { Card } from './ui/card';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

function RecomdedCourses({ data }) {
  
  return (
    <div className="space-y-6">
      {data ? (
        <div className="space-y-6">
          {/* Recommendations Section */}
            <h2 className="text-2xl font-semibold text-foreground">Recommended Courses</h2>
          <div className='flex gap-2 flex-wrap justify-center items-center '>
            {data.recommendations.length === 0 || data.recommendations[0].error ? (
              <div className="p-4 bg-yellow-100 text-yellow-700 rounded-md">
                <p>{data.recommendations[0]?.error || 'No recommendations available'}</p>
              </div>
            ) : (
              data.recommendations.map((course, index) => (
                  <Card key={index} className="max-w-sm rounded-lg border border-gray-200 shadow-lg overflow-hidden">


                  <img
                    src={course?.pic ? `http://localhost:3003/image/${course?.pic}`: 'https://lmscdoe.crescent-institute.edu.in/theme/image.php/mb2nl/theme/1736516285/course-default'}
                    alt={course?.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 border-2 bg-slate-800">
                  <h3 className="text-xl font-semibold text-foreground">{course.name|| course.title || 'Unknown Course'}</h3>
                  <p className="text-sm text-gray-200">{course.reason}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm font-medium text-gray-700">{course?.details?.createdAt}</span>
                    </div>
                    <Link to={`/course/${course?.courseID}`} target='_blank'>
                   <Button> view Course</Button>
                    </Link>
                  </div>
                </Card>
              ))
            )}
            
          </div>

          {/* Suggested New Courses Section */}
          <div>

          <h1 className='text-2xl text-left font-bold capitalize my-4'>suggested New Courses </h1>
          <Accordion type="single" collapsible className="w-full">
            {  data.suggestedNewCourses.map((course, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger >
                  {course.title ||course.courseName}
                </AccordionTrigger>
                <AccordionContent >
                  {/* <p className="text-blue-300">{course.category}</p> */}
                  <p className="text-lg  text-left">{course.reason||course.description}</p>
                  {/* <div className="flex justify-between items-center mt-4">
                    <p className="text-gray-500">Duration: {course.duration}</p>
                    <p className="text-gray-500">Credits: {course.credits}</p>
                    <p className="text-gray-500">Instructor: {course.instructor}</p>
                  </div> */}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          </div>
        </div>
      ) : (
        <>
          {/* Skeleton loading state */}
          <div className='flex w-full m-5 my-8 gap-3 flex-wrap'>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i}>
              <XSkeletonCard />
            </div>
          ))}

          </div>
        </>
      )}
    </div>
  );
}

export default RecomdedCourses;
