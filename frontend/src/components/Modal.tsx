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
      <DialogTitle>Instrutor detals : 
        </DialogTitle>
    </DialogHeader>
    <div className="max-w-sm mx-auto bg-background shadow-lg rounded-lg p-6">
  <div className="flex items-start space-x-4">
    <img src={data?.pic ||'https://avatars.githubusercontent.com/u/124599?v=4'} alt="User Avatar" className="w-16 h-16  mx-2 rounded-full"/>
    <div>
      <h2 className="text-xl font-semibold text-gray-200">  <span className="text-green-400">
        {data?.name}
      </span></h2>
      <p className="text-gray-300">Total Courses : {data?.courses?.length}</p>
    </div>
  </div>
  <div className="mt-4">
    <p className="text-gray-300">Email: {data?.email}</p>
    <p className="text-gray-300">Phone: 9849519664 </p>
  </div>
  
</div>


  </DialogContent>
</Dialog>



    </div>
  )
}

export default Modal