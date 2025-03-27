import {  useOutletContext } from "react-router-dom";
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
  eventID : string,
}

function Notification() {
  const search = useOutletContext();
  let url = `${import.meta.env.VITE_REACT_API_URL}users/profile`
  const [listevent, setListevent] = useState<dataEvent[]>([]);
  const [event, setEvent] = useState<dataEvent | null>(null);
  const [select, setSelct] = useState<Boolean[]>([]);
  useEffect(() => {
    const getData = async() => {
      try{
        const respon = await axios.get(url, {withCredentials : true});
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
  }, [search]);
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
          <div className="flex-1 p-3 min-h-full py-6">
              <h2 className='pb-2 pt-1 pl-3 text-4xl font-bold justify-center flex'>Favorite</h2>
              <div className="flex justify-center  min-h-60 items-center">
                  <div className="flex flex-col justify-center items-center  lg:px-60">
                    <img width="268" height="268" src="https://img.icons8.com/3d-fluency/188/delete-sign.png" alt="delete-sign"/>
                    <div className="bg-red-300 flex px-15 text-2xl justify-center rounded-xl py-3">ไม่มีการสมัคร</div>
                  </div>
              </div>
          </div>
      </>
    )
  }else{
    return (
      <div className="flex-1 p-3 min-h-full py-6">
          <div className="flex justify-center p-4 text-4xl font-bold">Notification</div>
          <div className="flex flex-2 justify-between lg:p-6">
              <div className="flex flex-col mx-6 max-sm:p-2 p-6 bg-[#E7E9EC] rounded-xl shadow-lg">
                  <div className="text-2xl font-bold pb-2">My Event</div>
                  {listevent.map((value,index) => {
                    return(
                      <div onClick={() => changeEvent(index)} key={index}>
                        <button 
                        className={`p-1 text-lg transition-transform transform hover:scale-125 ${select[index]? 'text-red-500 bg-gray-200' : 'text-black'}`} 
                        onClick={() => selected(index)}>
                          {value.eventName}
                        </button>
                      </div>
                    )
                  })}
              </div>
              <div className="flex-1 flex justify-center">
                <div className= {`bg-gray-200 rounded-lg shadow-lg p-10 sm:w-fit xl:w-200 max-sm:p-2 ${event == null? 'hidden' : ''}`}>
                  {event == null? null : <EventDetail Eventprop = {event}/>}
                </div>
              </div>
              
          </div>
      </div>
    )
  }
}

export default Notification