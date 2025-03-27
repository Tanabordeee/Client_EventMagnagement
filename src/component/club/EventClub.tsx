import dayjs from 'dayjs';
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

const  EventClub : React.FC<event> = ({Event}) => {
    const [isclick, setIsclick] = useState(false);
    const setclick = () => {
        setIsclick(!isclick);
    }
  return (
    <div className={`grid p-2 justify-center m-3 bg-[#E7E9EC] rounded-xl shadow-lg ${isclick? 'transition-transform transform scale-125' : ''}`}>
        <h2 className='p-2 text-lg font-bold justify-center flex'>{Event.eventName}</h2>
        <div className="flex justify-between w-90 px-3 max-md:w-60 relative">
            <div className="flex-col  py-2">
                <img src={Event.image} className='w-50 h-40 max-md:w-40 max-md:20 rounded-xl object-cover' />
                <div className= {`p-2 flex justify-center`}>
                    สถานะ : <div className={`${Event.status == 'not approve'? 'text-red-500' : 'text-green-500'}`}>{Event.status == 'not approve'? '' : 'อนุมัติแล้ว'}</div> 
                </div>
            </div>
            <div className="flex-col py-2 px-2 ">
                <h2 className='flex justify-center'>{Event.detail}</h2>
                <p className='flex justify-center'>{dayjs(Event.eventDate).format("YYYY-MM-DD")}</p>
                <p className='flex justify-center'>{Event.time}</p>
                <p className='flex justify-center'>contact</p>
                <div className="flex justify-end">
                    <button className="hover:cursor-pointer px-2 rounded-xl text-xl absolute bottom-0"
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