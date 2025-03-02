import { CarouselPlugin } from '@/components/Coursal'
import Courses from '@/components/Courses'


function Home() {
  return (
    <>
      <div className='max-h-1/4 relative text-2xl text-center w-full my-3 ' >
        <CarouselPlugin />
      </div>

      <div className=''>

        <Courses />
      </div>

    </>
  )
}

export default Home