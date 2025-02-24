import useAsync from "@/hooks/useAsync"
import { makeRequest } from "@/useful/ApiContext"
import { createContext, useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"


const context=createContext(null)

function CourseContext({children}) {
   
    const[cdetals,setcdetails]=useState([])
    const {data,loading,execute}=useAsync()
    useEffect(()=>{
        execute(makeRequest({url:`enrolledCourses/?type=context`}))
    },[])
    useEffect(()=>{
    if(data){
          setcdetails(data?.data)
    }
    },[data])
  return (
    <>
    <context.Provider value={{cdetals,setcdetails}}>
    {children}
    </context.Provider>
    </>
  )
}

export function useCoursecontext(){
  return useContext(context)
}

export default CourseContext