import { useEffect, useState } from "react";
import Event from "./Event"
import axios from "axios"
import { useNavigate, useOutletContext } from "react-router-dom";

interface dataEvent{
  eventName : string,
  eventDate : string,
  time : string,
  image : string,
  detail : string,
  eventID : string,
}

function Favorite() {
  const search = useOutletContext();
  const url = `${import.meta.env.VITE_REACT_API_URL}users/profile`
  console.log(url);
  const navigate = useNavigate();
  const [dataevent, setDataevent] = useState<dataEvent[]>([]);
  useEffect(() => {
    const fetchData = async() => {
      try{
        const response = await axios.get(url, {withCredentials : true});
        if(response.data.events.length > 0){
          if(search){
            const searcher = response.data.events.filter((item :dataEvent) => item.eventName === search)
            setDataevent(searcher);
          }else{
            setDataevent(response.data.events);
          }
        }
      }catch(error){
        console.error('Error:', error); // แสดงข้อผิดพลาดหากมี
        // navigate("/");
      }
    };
    fetchData();
  }, [search]);
  console.log(dataevent);
  if(dataevent.length == 0){
    return (
      <>
          <div className="flex-1 m-3 min-h-full">
              <h2 className='pb-2 pt-1 pl-3 text-2xl font-bold justify-center flex'>Favorite</h2>
              <div className="flex justify-center  min-h-105 items-center">
                  <div className="flex flex-col justify-center items-center bg-gray-300 p-10 rounded-xl">
                    <img width="188" height="188" src="https://img.icons8.com/3d-fluency/188/delete-sign.png" alt="delete-sign"/>
                    <div className="bg-red-300 flex px-15 justify-center rounded-xl py-2">ไม่มีการสมัคร</div>
                  </div>
              </div>
          </div>
      </>
    )
  }else{

  return (
      <>
          <div className="flex-1 p-3">
              <h2 className='pb-2 pt-1 pl-3 text-2xl font-bold justify-center flex'>Favorite</h2>
              <div className="flex flex-wrap p-3">
                  {dataevent.map((value, index) => {
                    return(
                      <div className="w-1/3 max-sm:w-1/1 max-lg:w-1/2 flex justify-center items-center pt-10" key={index}>
                        <div className="bg-gray-200 mx-1 my-3 rounded-xl shadow-lg px-3"><Event Eventprop ={value}/></div>
                      </div>
                    )
                  })}
                  
              </div>
          </div>
      </>
    )
  }
}

export default Favorite