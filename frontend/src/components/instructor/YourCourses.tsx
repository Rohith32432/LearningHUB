import { useAuth } from '@/Context/userContext'
import useAsync from '@/hooks/useAsync'
import { makeRequest } from '@/useful/ApiContext'
import React, { useEffect, useState } from 'react'
import Cards from '../Cards'

function YourCourses() {
  const [courses,setcoures]=useState([])
  const {user}=useAuth()
  const {data,error,loading,execute}=useAsync()

  useEffect(()=>{
    execute(makeRequest({url:`instructors/my/${user?._id}`}))
  },[])
  useEffect(()=>{
    if(data){
      setcoures(data?.data?.courses)
      console.log(data);
      
    }  

  },[data])
  return (
    <>
         <div className='flex flex-wrap gap-3'>
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

export default YourCourses