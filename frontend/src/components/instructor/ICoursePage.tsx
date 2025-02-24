import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { makeRequest } from '@/useful/ApiContext'
import useAsync from '@/hooks/useAsync'
import { SkeletionPage } from '@/components/Skeletonpage'
import { Button } from '@/components/ui/button'
import Modal from '@/components/Modal'
import { useAuth } from '@/Context/userContext'
import useToast from '@/hooks/useToast'

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
      console.log(data)
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
                {course?.description || 'Course description will be shown here.'}
              </p>

              <div className="mt-4">
                <h2 className="text-xl font-semibold">Instructor</h2>
                {course?.instrutors?.map((e: any, i: any) => (
                  <div key={i}>
                    <div className="flex -space-x-4 rtl:space-x-reverse">
                      <img
                        className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                        src="/docs/images/people/profile-picture-5.jpg"
                        alt=""
                      />
                    </div>
                    {e?.name}
                  </div>
                ))}
              </div>
              <div className="mt-4 mb-2">
                <h2 className="text-xl font-semibold">Duration</h2>
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

          {/* Articles Section */}
        </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {course?.articles?.map((article: any, index: number) => (
              <div key={index} className="bg-background w-max h-max p-2 rounded-lg shadow-lg">
                <h3 className="text-xl inline mx-5 font-semibold">{article?.title || 'Article Title'}</h3>
                <Link to={`/course/${id}/article/${article._id}`}>
                  <Button variant="outline" className="mt-4 ">
                    Read More
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </>
      ) : (
        <SkeletionPage />
      )}
    </>
  )
}

export default ICoursePage
