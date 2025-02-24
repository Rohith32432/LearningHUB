import Courses from '@/components/Courses'
import EnrolledCoures from '@/components/EnrolledCoures'


function MyCourses() {
  return (
    <>
      <div className='h-1/4 text-2xl text-center m-4 ' >
       <h1 className='text-5xl text-center font-semibold'>Your Courses </h1>
      </div>
    
    <div className='flex flex-wrap gap-3'>

        <EnrolledCoures/>
    </div>
    
    </>
  )
}

export default MyCourses