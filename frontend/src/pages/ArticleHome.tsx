import CourseSideBar from '@/components/CourseSideBar'
import React from 'react'
import { Outlet } from 'react-router-dom'

function ArticleHome() {
  return ( 
    <>

       <div className='flex min-h-dvh  gap-2'>
       <div className='h-max flex-1 w-full items-start'>
    <Outlet/>
        </div>
        <div className='  sticky top-0  h-full'>
    <CourseSideBar  className='h-dvh' /> 
    </div>
    </div>
    </>
  )
}

export default ArticleHome