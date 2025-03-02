import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { useAuth } from "@/Context/userContext"
import { Link } from "react-router-dom"

export function CarouselPlugin() {
  const { gcourse } = useAuth()
  const [cdata, setcdaa] = React.useState([])
  React.useEffect(() => {
    if (gcourse) {
      setcdaa(gcourse.slice(0, 5))

    }

  }, [gcourse])
  const plugin = React.useRef(
    Autoplay({ delay: 2000 })
  )

  return (
    // <div className="flex justify-center items-center ">
    <div className="overflow-hidden  shadow-lg rounded-lg  ">
      <Carousel
        plugins={[plugin.current]}
        className="relative w-[99%] "
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {cdata.map((e, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="">
                  <CardContent className=" relative flex w-full h-[250px] aspect-video items-center justify-center p-6">
                    <div className="absolute inset-0 ">
                      <img className="w-full h-full -z-10 object-cover"
                        src={e?.pic ? `http://localhost:3003/image/${e?.pic}` : 'https://avatars.githubusercontent.com/u/124599?v=4'}
                        alt="Course Thumbnail"
                      />

                      <div className="absolute bottom-5 h-full inset-0  w-[100%]  bg-black bg-opacity-45 text-white p-4 rounded-lg shadow-lg">
                        <div className='w-[50%] mx-16 flex items-start bg-neutral-950 rounded-xl bg-opacity-35 px-6  justify-center h-full flex-col'>
                          <div className='my-2 w-full flex items-center '>
                            <Link to={`/course/${e?._id}`}>

                              <h1 className="text-2xl font-bold text-shadow-md underline">{e.title}</h1>
                            </Link>

                          </div>
                          <p className="text-lg text-left line-clamp-3">{e?.descrption || "No description available."}</p>
                        </div>
                      </div>
                    </div>





                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious />
          <CarouselNext /> */}
      </Carousel>
    </div>
    // </div>
  )
}
