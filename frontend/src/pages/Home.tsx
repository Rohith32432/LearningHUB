import Courses from '@/components/Courses'


function Home() {
  return (
    <>
      <div className='h-1/4 text-2xl text-center' >
        image coural
      </div>
    
    <div className='flex flex-wrap gap-3'>

        <Courses/>
    </div>
    
    </>
  )
}

export default Home