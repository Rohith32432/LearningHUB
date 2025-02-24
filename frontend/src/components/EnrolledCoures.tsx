import useAsync from "@/hooks/useAsync";
import { makeRequest } from "@/useful/ApiContext";
import { useEffect, useState } from "react";
import Cards from "./Cards";


function EnrolledCoures() {
    const [courses,setcoures]=useState([])
    const {data,error,loading,execute}=useAsync()

    useEffect(()=>{
      execute(makeRequest({url:'enrolledCourses/'}))
    },[])
    useEffect(()=>{
      if(data){
        setcoures(data?.data)
      }  

    },[data])
  return (
    <>
      {
        courses?.map((e,i)=>(
          <div key={i}>
          <Cards course={e}/>
          </div>
      ))
      }
    </>
  )
}

export default EnrolledCoures