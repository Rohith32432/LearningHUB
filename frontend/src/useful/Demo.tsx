// import { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';
// import { makeRequest } from './ApiContext';

// const socket = io('http://localhost:3003/');

// function Demo() {
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         socket.on('connect', () => {
//             console.log('Connected to socket:', socket.id);
//         });

//         socket.on('updateData', (updatedData) => {
//             console.log('Received updated data:', updatedData);
//             setData(updatedData);
//         });

//         fetchData();

//         return () => {
//             socket.off('updateData'); // Cleanup listener
//         };
//     }, []);

//     async function fetchData() {
//         const { data } = await makeRequest({ url: '/test' });
//         setData(data);
//     }

//     function deleteItem(id) {
//         socket.emit('delete', id);
//     }

//     function click(id) {
//         socket.emit('click', id);
//     }

//     return (
//         <>
//             {data?.map((e) => (
//                 <div key={e._id} className="my-1">
//                     {e?.name}
//                     <button onClick={() => click(e._id)} className="mx-5 bg-green-500 p-1 rounded-lg">
//                         Click
//                     </button>
//                     <button onClick={() => deleteItem(e._id)} className="mx-5 bg-red-500 p-1 rounded-lg">
//                         Delete
//                     </button>
//                 </div>
//             ))}
//         </>
//     );
// }

// export default Demo;
import React from 'react'

function Demo() {
  return (
    <div>Demo</div>
  )
}

export default Demo