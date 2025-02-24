
import useAsync from '@/hooks/useAsync'
import Cards from './Cards'
import { useEffect, useState } from 'react'
import { makeRequest } from '@/useful/ApiContext'

function Courses() {

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
          console.log(data);
          
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

export default Courses