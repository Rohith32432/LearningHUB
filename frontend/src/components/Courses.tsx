
import useAsync from '@/hooks/useAsync'
import Cards from './Cards'
import { useEffect, useState } from 'react'
import { makeRequest } from '@/useful/ApiContext'
import { useAuth } from '@/Context/userContext'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

function Courses() {  
    const {setgcourse}=useAuth()
      const [courses,setcoures]=useState([])
      const {data,error,loading,execute}=useAsync()

      useEffect(()=>{
        execute(makeRequest({url:'courses/'}))
        //  setcoures(data.data)
         console.log(data);
          
      },[])
      useEffect(()=>{
        if(data){
          setcoures(data?.data)
          setgcourse(courses)
          console.log(data);
          
        }  

      },[data])
      const handleSort = (value: string) => {
        setcoures((prevCourses) => {
          const sortedCourses = [...prevCourses]; // Create a new array before sorting
    
          if (value === "date") {
            sortedCourses.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          } else if (value === "interactions") {
            sortedCourses.sort((a, b) => b.intractions - a.intractions);
          }
    
          return sortedCourses;
        });
      };
    

  return (
    <>
    <div className="flex justify-end p-4">
        <Select onValueChange={handleSort}>
          <SelectTrigger className="w-[200px]  text-white border border-gray-700">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className=" text-white">
            <SelectItem value="date">Sort by Date</SelectItem>
            <SelectItem value="interactions">Sort by Interactions</SelectItem>
          </SelectContent>
        </Select>
      </div>
    <div className='flex justify-center items-start flex-wrap gap-3'>
        {
            courses?.map((e,i)=>(
                <div key={i}>
                <Cards course={e}/>
                </div>
            ))
        }
    </div>
    </>
  )
}

export default Courses