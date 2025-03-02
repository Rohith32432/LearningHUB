import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { makeRequest } from '@/useful/ApiContext'
import useAsync from '@/hooks/useAsync'
import { SkeletionPage } from '@/components/Skeletonpage'
import { Button } from '@/components/ui/button'
import Modal from '@/components/Modal'
import { useAuth } from '@/Context/userContext'
import useToast from '@/hooks/useToast'
import DataTable from './DataTable'

function ICoursePage() {
  const { id } = useParams()
  const { user, setUser } = useAuth()
  const { loading, data, execute } = useAsync()
  const [course, setcourse] = useState<any>({})
  const { promisetoast } = useToast()

  useEffect(() => {
    execute(makeRequest({ url: `articles/coursearticles/${id}` }))
  }, [id])

  useEffect(() => {
    if (data) {
      setcourse(data?.data)
      // console.log(data)
    }
  }, [data])

  return (
    <>
      {!loading ? (
        <>
        <div className="flex min-h-1/2 flex-wrap gap-4 p-6">
          <div className="flex p-5 h-1/2 bg-black w-full">
            <div className="flex-1 p-2 rounded-lg shadow-lg">
              <h1 className="text-3xl font-semibold capitalize mb-4">{course?.title || 'Course Title'}</h1>

              <p className="text-lg mb-4">
                {course?.descrption || 'Course description will be shown here.'}
              </p>

              <div className="mt-4">
                <h2 className="text-xl font-semibold">Instructor</h2>
                {
                    course?.instrutors?.map((e: any, i: any) => (
                      <div key={i} onClick={()=>{}}>
                        <div className="flex -space-x-4 rtl:space-x-reverse">
                          <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src={data?.pic ||'https://avatars.githubusercontent.com/u/124599?v=4'} alt="" />
                        </div>
                        {e?.name}
                      </div>
                    ))
                  }
              </div>
              <div className="mt-4 mb-2">
                  <h2 className="text-xl text-gray-400 font-semibold">Duration {course?.estimated} weeks</h2>
                  <p className="text-lg">{course?.updatedAt || 'Course duration will be shown here.'}</p>
                </div>
              <div className="flex gap-5"></div>
            </div>
            <div className="w-1/3 m-2">
              <img
                src={course?.pic ? `http://localhost:3003/image/${course?.pic}` : 'https://avatars.githubusercontent.com/u/124599?v=4'}
                alt="Course Thumbnail"
              />
            </div>
            
          </div>
          <Link to={`/course/${id}/article/${id}-add`}>
            <Button>Add Article</Button>
          </Link>
          <Link to={`/course/${id}/quiz/${id}-add`}>
            <Button>Add Quiz</Button>
          </Link>

        </div>
         <div className='bg-background p-4 m-4 rounded-xl'>
          <DataTable datax={course}/>
         </div>
        </>
      ) : (
        <SkeletionPage />
      )}
    </>
  )
}

export default ICoursePage
