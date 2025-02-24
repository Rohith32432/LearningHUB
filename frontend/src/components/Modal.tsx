import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"
  

function Modal({show,setshow,data}:{show:boolean,setshow:any,data:any}) {

  return (
    <div>
     
        <Dialog open={show} onOpenChange={setshow}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Enrolling for Course <span className="text-green-500">
        {data?.title}
      </span></DialogTitle>
      <DialogDescription>
       {
        data?.descrption || 'course decrption'
       }
      </DialogDescription>
    </DialogHeader>
    <div>
    <Link to={ data?.articles?.length>1 ? `article/${data?.articles[0]?._id}`:'#'} >
              <Button  className='capitalize'> got to  course</Button>
                  </Link>
      <span>{data?.loading && 'loading'} </span>
    </div>
  </DialogContent>
</Dialog>



    </div>
  )
}

export default Modal