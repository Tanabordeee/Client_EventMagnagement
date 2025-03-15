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
    <div className="grid m-2 max-sm:flex justify-center">
      <div>
        <h2 className='p-2 text-lg font-bold'>{Eventprop.eventName}</h2>
        <img src={Eventprop.image} className="w-50" />
      </div>
      <div className="flex flex-col justify-center">
        <button className={`text-xl hover:cursor-pointer ${status? 'text-red-500': 'text-green-500'}`} onClick={changestatus}>{status? 'Cancle' : 'Apply'}</button>
        <p className='p-2 flex justify-center'>เงื่อนไข :{Eventprop.detail}</p>
        <p className='p-2 flex justify-center'>วันที่ :{dayjs(Eventprop.eventDate).format("YYYY-MM-DD")}</p>
        <h2 className='p-2 flex justify-center'>เวลา :{Eventprop.time}</h2>
      </div>
    </div>
  )
}

export default Event