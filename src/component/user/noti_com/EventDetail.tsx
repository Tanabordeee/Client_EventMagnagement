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
const EventDetail: React.FC<Listevent> = ({Eventprop}) => {
    const url = `${import.meta.env.VITE_REACT_API_URL}users/profile`
    const [status, setStatus] = useState<boolean | null>(null);
    const [events, setEvents] = useState<DataEvent[]>([]);
    useEffect(() => {
        const fetchstatus = async() => {
          try{
            const response = await axios.get(url, {withCredentials :true})
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
      <div>
          <div className="flex justify-center text-2xl font-bold">{Eventprop.eventName}</div>
          <div className="flex justify-center">
              <div className="flex max-sm:grid p-5 max-sm:p-2">
                  <div className="flex justify-center flex-col">
                        <img src={Eventprop.image} className="max-sm:h-40 max-sm:w-full w-80 h-60 rounded-xl object-cover" />
                        <button className={`text-xl hover:cursor-pointer ${status? 'text-red-500': 'text-green-500'}`} 
                            onClick={changestatus}>
                                {status? 'Cancle' : 'Apply'}
                        </button>
                  </div>
                  <div className="justify-center">
                      <p className="p-1 px-5 flex justify-center">{Eventprop.eventName}</p>
                      <p className="p-1 px-5 flex justify-center">เงื่อนไข : {Eventprop.detail}</p>
                      <p className="p-1 px-5 flex justify-center">วันที่ :{dayjs(Eventprop.eventDate).format("YYYY-MM-DD")} </p>
                      <p className="p-1 px-5 flex justify-center">เวลา :{Eventprop.time}</p>
                      <p className="p-1 px-5 flex justify-center">contact</p>
                      <p className="p-1 px-5 flex justify-center">
                        สถานะ : <div className= {status? 'text-green-500' : 'text-red-500'}>{status? 'สมัครแล้ว' : 'ยังไม่สมัคร'}</div> 
                    </p>
                  </div>
              </div>
          </div>
          <div className="flex justify-center">
              <div className={`flex justify-center bg-lime-300 rounded-lg px-3 ${status? 'bg-lime-300' : 'bg-red-400'}`}>
                {status? `คุณได้ทำการสมัคร ${Eventprop.eventName} เรียบร้อยแล้ว` : `คุณยังไม่ได้ทำการสมัคร ${Eventprop.eventName}`}
                </div>
          </div>
          
      </div>
    )
  }
  
  export default EventDetail