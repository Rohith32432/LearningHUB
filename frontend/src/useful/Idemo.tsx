// import { useEffect, useState } from 'react'
// import {io} from 'socket.io-client'
// import { makeRequest } from './ApiContext'
// import axios from 'axios'

// const socketconnection=io('http://localhost:3003/')
// function IDemo() {
//     const [data,setdata]=useState([])
//     useEffect(()=>{
//         socketconnection.on('connect',(soc)=>{
//             console.log(soc);
            
//         })

//         async function demo() {
//             const {data}=await makeRequest({url:'/test'})
//             setdata(data)
//         }
//         demo()

//     },[])
//   async  function delte(id){
//         const {data}=await makeRequest({url: `/test/${id}`})
//         setdata(prevData => prevData.filter(e => e?._id !== id));
//         console.log(data);
        
//     }
//   return (
//     <>
//     {
//         data?.map((e,i)=>(
//             <div key={i} className='my-1'>
//                 {e?.name} 
//                 <button onClick={()=>{delte(e?._id)}} className='mx-5 bg-red-500 p-1 rounded-lg'>dlete</button>
//             </div>
//         ))
//     }
//     </>
//   )
// }

// export default IDemo

import React from 'react'

function Idemo() {
  return (
    <div>Idemo</div>
  )
}

export default Idemo