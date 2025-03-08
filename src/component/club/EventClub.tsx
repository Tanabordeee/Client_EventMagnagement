import React, { useState } from 'react'

interface event {
    Event :{
        eventName : string;
        eventDate : string;
        time : string;
        image : string;
        status : string;
        detail :string;
    };
}
// function EventClub() {
//   return (
//     <div className="grid p-2 justify-center">
//         <h2 className='p-2 text-lg font-bold justify-center flex'>Concert</h2>
//         <div className="flex">
//             <div className="flex-col py-2">
//                 <p className='p-2'>picture</p>
//                 <p className='p-2'>status</p>
//             </div>
//             <div className="flex-col py-2">
//                 <h2 className='flex justify-center'>name</h2>
//                 <p className='flex justify-center'>description</p>
//                 <p className='flex justify-center'>date</p>
//                 <p className='flex justify-center'>time</p>
//                 <p className='flex justify-center'>contact</p>
//                 <div className="flex justify-end">
//                     <button className='px-2 rounded-xl text-md'>Edit</button>
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }
const  EventClub : React.FC<event> = ({Event}) => {
    const [isclick, setIsclick] = useState(false);
    const setclick = () => {
        setIsclick(!isclick);
    }
  return (
    <div className={`grid p-2 justify-center m-3 bg-gray-300 rounded-xl shadow-lg ${isclick? 'transition-transform transform scale-125' : ''}`}>
        <h2 className='p-2 text-lg font-bold justify-center flex'>{Event.eventName}</h2>
        <div className="flex">
            <div className="flex-col py-2">
                <p className='p-2'>{Event.image}</p>
                <p className='p-2'>{Event.status}</p>
            </div>
            <div className="flex-col py-2">
                <h2 className='flex justify-center'>{Event.detail}</h2>
                {/* <p className='flex justify-center'>description</p> */}
                <p className='flex justify-center'>{new Date(Event.eventDate).toISOString().split('T')[0]}</p>
                <p className='flex justify-center'>{Event.time}</p>
                <p className='flex justify-center'>contact</p>
                <div className="flex justify-end">
                    <button className="hover:cursor-pointer px-2 rounded-xl text-xl"
                        onClick={setclick}>
                            View
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EventClub