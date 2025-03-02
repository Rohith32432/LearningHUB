import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useAuth } from "@/Context/userContext";

const Cards = ({ course }: { course: any }) => {
  const { user } = useAuth();
  function getDateAndTime(dateString) {
    const date = new Date(dateString);
    const datePart = date.toISOString().split('T')[0];
    const timePart = date.toISOString().split('T')[1].slice(0, 8);
    return {
      date: datePart,
      time: timePart
    };
  }
  
  return (
    <Card className="max-w-sm rounded-xl overflow-hidden shadow-lg p-2 ">
      <>
        <img
          src={
            course?.pic
              ? `http://localhost:3003/image/${course?.pic}`
              : 'https://lmscdoe.crescent-institute.edu.in/theme/image.php/mb2nl/theme/1736516285/course-default'
          }
          alt={course?.title}
          className="w-full h-48 object-cover"
        />
        <div className="px-6 py-4 bg-gray-950">
          <div className="font-bold text-xl mb-2 text-foreground">{course?.title}</div>
          <p className="text-gray-400 text-base">
            {/* You can replace this static text with dynamic content if required */}
           {
            course?.descrption ||
' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.'
           }
'          </p>
        </div>
        <div className="px-6 pt-4 pb-2 bg-gray-950">
          <span className="inline-block bg-slate-800  rounded-full px-3 py-1 text-sm font-semibold text-gray-200 mr-2 mb-2">#learning</span>
          <span className="mx-2 text-gray-400 capitalize">{course?.intractions/1000>1?`${course?.intractions/1000}K+ intractions`:`${course?.intractions} intractions`}  </span>
        </div>
        <div className="px-6 pt-4 pb-2 flex justify-between items-center bg-gray-950">
          <span className="text-sm font-medium text-gray-300">{
          getDateAndTime(course?.createdAt)?.date 
          }</span>
          <span className="text-sm text-blue-500">  {` ${  getDateAndTime(course?.createdAt)?.time}`          }</span>
        </div>
        <Link to={`/course/${course?._id}`}>
        {
          user?.role=='user' ?(
            user?.EnrolledCourse?.courses?.includes(course?._id)  ?
              <>
                <Button className="mt-4 w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  View Course
                </Button>
  
              </>
              :
  
              <Button className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Enroll Now
              </Button>
            
          ):<>
          <Button className="mt-4 w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700">
                View Now
              </Button>
          </>
        }
         
        </Link>
      </>
    </Card>
  );
};

export default Cards;
