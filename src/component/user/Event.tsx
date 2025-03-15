import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

interface Listevent {
  Eventprop:{
    eventName : string;
    eventDate : string;
    time : string;
    image : string;
    detail : string;
    eventID : string;
  };
}
interface DataEvent {
  eventName : string;
  eventDate : string;
  time : string;
  image : string;
  detail : string;
  eventID : string;
}

const Event: React.FC<Listevent> = ({Eventprop}) => {
  const url_getprofile = `${import.meta.env.VITE_REACT_API_URL}users/profile`
  const [status, setStatus] = useState<boolean | null>(null);
  const [events, setEvents] = useState<DataEvent[]>([]);
  useEffect(() => {
    const fetchstatus = async() => {
      try{
        const response = await axios.get(url_getprofile, {withCredentials :true})
        console.log(response.data.events);
        setEvents(response.data.events);
      }catch(error){
        console.log("error : " , error);
      }
    }
    fetchstatus();
  }, [Eventprop]);

  useEffect(() => {
    if (events.length > 0) { 
      mapstatus();
    }
  }, [events]);

  const mapstatus = () => {
    const isadd = events.some(event => event.eventID === Eventprop.eventID)
    setStatus(isadd);
  }
  const changestatus = async () => {
    const url_fav = status? `${import.meta.env.VITE_REACT_API_URL}event/unfavorite/${Eventprop.eventID}`:
    `${import.meta.env.VITE_REACT_API_URL}event/favorites/${Eventprop.eventID}`
    try{
      await axios.patch(url_fav, {}, {withCredentials: true} )
      setStatus(!status)
    }catch(error){
      console.log(error)
    }
  }
  return (
    <div className="grid m-2 max-sm:flex justify-center gap-1">
      <div>
        <h2 className='p-5 text-lg md:text-5xl text-center font-bold'>{Eventprop.eventName}</h2>
        <img src={Eventprop.image} className="max-w-full rounded-lg" />
      </div>
      <div className="flex flex-col justify-center">
        <button className={`text-xl md:text-2xl border rounded-xl p-5 bg-green-200 hover:cursor-pointer ${status? 'text-black-200 bg-red-200': 'text-black-200 bg-green-200'}`} onClick={changestatus}>{status? 'Cancle' : 'Apply'}</button>
        <p className='p-2 flex md:text-xl justify-center'>เงื่อนไข :{Eventprop.detail}</p>
        <p className='p-2 flex md:text-xl justify-center'>วันที่ :{dayjs(Eventprop.eventDate).format("YYYY-MM-DD")}</p>
        <h2 className='p-2 flex md:text-xl justify-center'>เวลา :{Eventprop.time}</h2>
      </div>
    </div>
  )
}

export default Event