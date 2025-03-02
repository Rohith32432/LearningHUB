import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { makeRequest } from '@/useful/ApiContext'
import useAsync from '@/hooks/useAsync'
import { SkeletionPage } from '@/components/Skeletonpage'
import { Button } from '@/components/ui/button'
import Modal from '@/components/Modal'
import { useAuth } from '@/Context/userContext'
import useToast from '@/hooks/useToast'
import { resolve } from 'path'

function CoursePage() {
  const { id } = useParams()
  const { user, setUser } = useAuth()
  const { loading, data, execute } = useAsync()
  const [course, setcourse] = useState<any>({})
  const  {promisetoast}=useToast()
  const [inst,setinst]=useState({})
  const [stats,setstaus]=useState(false)
  useEffect(() => {
    execute(makeRequest({ url: `courses/${id}` })) 
  }, [id])

  useEffect(() => {
    if (data) {
      console.log(data)
      setcourse(data?.data)
 
    }
  }, [data])

  const enrollCourse = async () => {
    try {
      const response = promisetoast(
        makeRequest({
          type: 'post',
          url: 'enrolledCourses/create',
          data: {
            courseid: id,
            userid: user?._id,
          },
        }),'course Enrolled'
      ) 
      const {data}=await response
      if (data) {
        const enrolledCourses = user?.EnrolledCourse?.courses
          ? [...user.EnrolledCourse.courses, id]
          : [id];

        setUser({ ...user, EnrolledCourse: { courses: enrolledCourses } });
      }
    } catch (error) {
     
      promisetoast(Promise.reject(error));
      console.error(error);  
    }
  };

  function modaldata(e) {
    setstaus(!stats)
   e &&setinst(e)
  }

  async function unenroll() {
    try {
      const response = promisetoast(
        makeRequest({
          type: 'post',
          url: `enrolledCourses/unenroll/`,
          data: {
            courseid: id,
            userid: user?._id,
          },
        })
      ) 
      const {data}=await response
      if (data) {
        const enrolledCourses = user?.EnrolledCourse?.courses
         const x=enrolledCourses.indexOf(id)
         console.log(data);
         
         enrolledCourses.splice(x,1)
        setUser({ ...user, EnrolledCourse: { courses: enrolledCourses } });
      }
    } catch (error) {
     
      promisetoast(Promise.reject(error));
      console.error(error);  
    }
  }

  return (
    <>
      {
        !loading ?
          <div className="flex min-h-screen flex-wrap gap-4 p-6">
            <div className=' flex  p-5 h-1/2 bg-black w-full'>

              <div className="flex-1  p-2 rounded-lg shadow-lg">
                <h1 className="text-3xl font-semibold capitalize mb-4">{course?.title || 'Course Title'}</h1>

                <p className="text-lg text-gray-300 mb-4">
                  {course?.descrption || 'Course description will be shown here.'}
                </p>

                <div className="mt-4">
                  <h2 className="text-xl font-semibold">Instructor</h2>
                  <div className='my-2 cursor-pointer'>

                  {
                    course?.instrutors?.map((e: any, i: any) => (
                      <div key={i} onClick={()=>{modaldata(e)}}>
                        <div className="flex -space-x-4 rtl:space-x-reverse">
                          <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src={data?.pic ||'https://avatars.githubusercontent.com/u/124599?v=4'} alt="" />
                        </div>
                        {e?.name}
                      </div>
                    ))
                  }
                  </div>
                </div>
                <div className="mt-4 mb-2">
                  <h2 className="text-xl text-gray-400 font-semibold">Duration {course?.estimated} weeks</h2>
                  <p className="text-lg">{course?.updatedAt || 'Course duration will be shown here.'}</p>
                </div>
                  <div className='flex gap-5'>

                {
                  user?.EnrolledCourse?.courses?.includes(id)  ? (
                    <>  
                    <Link to={course?.articles && course?.articles?.length > 0 ? `article/${course?.articles[0]}` : '#'} >
                      <Button className='capitalize'> got to  course</Button>
                    </Link>
                    <Button  onClick={unenroll} variant='destructive'>unEnroll</Button>
                    </>
                  ) :
                    <>
                      <Button onClick={enrollCourse} className='capitalize'> Enroll course</Button>
                  </>
                }
                  </div>
              </div>
              <div className='w-1/3 max-h-[500px] m-2'>
                <img  className='w-full h-full object-cover'
        src={course?.pic ? `http://localhost:3003/image/${course?.pic}`: 'https://avatars.githubusercontent.com/u/124599?v=4'}
        />
              </div>

            </div>
                <Modal data={inst} show={stats} setshow={setstaus}/>
          </div>
          : <>
            <SkeletionPage />
          </>
      }
    </>
  )
}

export default CoursePage
