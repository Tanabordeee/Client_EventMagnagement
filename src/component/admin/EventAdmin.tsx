import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
interface club {
    clubName :string,
}

interface Listevent {
  Eventprop:{
    eventName : string;
    eventDate : string;
    time : string;
    image : string;
    detail : string;
    eventID : string;
    status : string;
    club : club;
  };
}

const EventAdmin: React.FC<Listevent> = ({Eventprop}) => {
    const [status, setStatus] = useState<boolean | null>(null);
    useEffect(() => {
        if(Eventprop.status == 'not approve'){
            setStatus(false);
        }else {
            setStatus(true);
        }
    }, [Eventprop]);
    const change = async() => {
        let send : string;
        if(status){
          send = 'not approve'
        }else {
          send = 'approve'
        }
        const url = `${import.meta.env.VITE_REACT_API_URL}event/approvebyadmin/${Eventprop.eventID}`;
        try{
          await axios.put(url, {
            status : send,
          }, {withCredentials : true})
          setStatus(!status);
        }catch(error){
          console.log(error)
        }
      }
    return (
      <div className="grid m-2 max-sm:flex justify-center gap-1">
        <div className="flex flex-col items-center">
          <h2 className='p-5 text-lg md:text-3xl text-center font-bold'>{Eventprop.eventName}</h2>
          <img src={Eventprop.image} className="max-lg:w-50 max-lg:h-30 w-80 h-60 rounded-xl object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <button className={`text-xl md:text-2xl rounded-xl max-lg:p-2 p-5 bg-green-200 hover:cursor-pointer 
            hover:bg-stone-300  ${status? 'text-black-200 bg-red-200': 'text-black-200 bg-green-200'}`} onClick={change}>{status? 'Not approve' : 'Approve'}</button>
          <p className='p-2 flex md:text-xl justify-center'>คณะ :{Eventprop.club.clubName}</p>
          <p className='p-2 flex md:text-xl justify-center'>วันที่ :{dayjs(Eventprop.eventDate).format("YYYY-MM-DD")}</p>
          <h2 className='p-2 flex md:text-xl justify-center'>เวลา :{Eventprop.time}</h2>
        </div>
      </div>
    )
}

export default EventAdmin