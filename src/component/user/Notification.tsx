import { useNavigate, useOutletContext } from "react-router-dom";
import EventDetail from "./noti_com/EventDetail"
import { useEffect, useState } from "react";
import axios from "axios";

interface dataEvent{
  eventName : string;
  eventType : string;
  eventDate : string;
  time : string;
  image : string;
  detail : string,
}

function Notification() {
  const search = useOutletContext();
  let url = `${import.meta.env.VITE_REACT_API_URL}users/profile`
  const navigate = useNavigate();
  const [listevent, setListevent] = useState<dataEvent[]>([]);
  const [event, setEvent] = useState<dataEvent | null>(null);
  const [select, setSelct] = useState<Boolean[]>([]);
  useEffect(() => {
    const getData = async() => {
      try{
        const respon = await axios.get(url, {withCredentials : true});
        console.log(respon.data)
        if(respon.data.events.length > 0){
          if(search){
            const searcher = respon.data.events.filter((item :dataEvent) => item.eventName === search)
            setListevent(searcher);
            setSelct(new Array(searcher.events.length).fill(false))
          }else{
            setListevent(respon.data.events);
            setSelct(new Array(respon.data.events.length).fill(false))
          }
        }
      }catch(error){
        console.log('Error: ', error);
        // navigate("/");
      }
    };
    getData();
  }, []);
  const changeEvent = (index : number) => {
    setEvent(listevent[index]);
  }
  const selected = (index : number) => {
    const newselect = select.map((_, ind) =>
      index === ind ? true : false
    );
    setSelct(newselect);
  }
  
  if(listevent.length == 0){
    return (
      <>
          <div className="flex-1 m-3">
              <h2 className='pb-2 pt-1 pl-3 text-2xl font-bold justify-center flex'>Notification</h2>
              <div className="flex justify-center min-h-105 items-center">
                  <div className="flex justify-center items-center bg-gray-300 p-10 rounded-xl">
                    <div className="bg-red-500 flex justify-center px-5 rounded-xl py-2">ไม่มีการสมัคร</div>
                  </div>
              </div>
          </div>
      </>
    )
  }else{
    return (
        <div className=" flex-1">
            <div className="flex justify-center p-4 text-2xl font-bold">Notification</div>
            <div className="flex flex-2 justify-between p-6">
                <div className="flex flex-col mx-6 max-sm:p-4 p-6 bg-gray-200 rounded-xl shadow-lg">
                    <div className="text-lg font-bold pb-2">My Event</div>
                    {listevent.map((value,index) => {
                      return(
                        <div onClick={() => changeEvent(index)} key={index}>
                          <button 
                          className={`p-1 ${select[index]? 'text-red-500 bg-gray-200' : 'text-black'}`} 
                          onClick={() => selected(index)}>
                            {value.eventName}
                          </button>
                        </div>
                      )
                    })}
                </div>
                <div className="flex-1 flex justify-center">
                  <div className= {` bg-gray-200 rounded-lg shadow-lg p-10 ${event == null? 'hidden' : ''}`}>{event == null? null : <EventDetail Eventprop = {event}/>}</div>
                </div>
                
            </div>
        </div>
      )
  }
}

export default Notification