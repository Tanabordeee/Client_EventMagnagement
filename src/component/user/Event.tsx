import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import LoadingComponent from "../loadingComponent";
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
  const [load, setLoad] = useState(false);
  useEffect(() => {
    const fetchstatus = async() => {
      try{
        const response = await axios.get(url_getprofile, {withCredentials :true})
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
      setLoad(true);
      await axios.patch(url_fav, {}, {withCredentials: true} )
      setStatus(!status)
      setLoad(false);
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
        { load ? <div className="w-full h-20 flex items-center justify-center"><LoadingComponent/></div> : (
          <button 
            className={`text-xl md:text-2xl rounded-xl max-lg:p-2 p-5 hover:cursor-pointer hover:bg-stone-300 ${status ? 'text-black-200 bg-red-200' : 'text-black-200 bg-green-200'}`} 
            onClick={changestatus}
          >
            {status ? 'Cancel' : 'Apply'}
          </button>
        )}
        <p className='p-2 flex md:text-xl justify-center'>เงื่อนไข :{Eventprop.detail}</p>
        <p className='p-2 flex md:text-xl justify-center'>วันที่ :{dayjs(Eventprop.eventDate).format("YYYY-MM-DD")}</p>
        <h2 className='p-2 flex md:text-xl justify-center'>เวลา :{Eventprop.time}</h2>
      </div>
    </div>
  )
}

export default Event