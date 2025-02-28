import { useEffect, useState } from "react";
import Event from "./Event"
import axios from "axios"
import { useNavigate } from "react-router-dom";

interface dataEvent{
  eventName : string,
  eventDate : string,
  time : string,
  image : string,
}
function Favorite() {
  const url = 'http://localhost:3000/api/event/byuser';
  const navigate = useNavigate();
  const [dataevent, setDataevent] = useState<dataEvent[]>([]);
  useEffect(() => {
    const fetchData = async() => {
      try{
        const response = await axios.get(url, {withCredentials : true});
        setDataevent(response.data);
      }catch(error){
        console.error('Error:', error); // แสดงข้อผิดพลาดหากมี
        navigate("/")
      }
    };
    fetchData();
  }, []);
  console.log(dataevent);
  const [data, setData] = useState(
    {
      eventName : "Consert",
      eventDate : "dwasddwa",
      time : "available",
      image : "The toy",
    }
  )
  return (
    <>
        <div className="flex-1 p-3">
            <h2 className='pb-2 pt-1 pl-3 text-2xl font-bold justify-center flex'>Favorite</h2>
            <div className="flex flex-wrap p-3">
                <div className="lg:w-1/3 w-1/2 flex justify-center items-center pt-10">
                  <div className="bg-gray-200 px-3 py-5 rounded-xl shadow-lg"><Event Eventprop ={data}/></div>
                </div>
                <div className="lg:w-1/3 w-1/2 flex justify-center items-center pt-10">
                  <div className="bg-gray-200 px-3 py-5 rounded-xl shadow-lg"><Event Eventprop ={data}/></div>
                </div>
                <div className="lg:w-1/3 w-1/2 flex justify-center items-center pt-10">
                  <div className="bg-gray-200 px-3 py-5 rounded-xl shadow-lg"><Event Eventprop ={data}/></div>
                </div>
                <div className="lg:w-1/3 w-1/2 flex justify-center items-center pt-10">
                  <div className="bg-gray-200 px-3 py-5 rounded-xl shadow-lg"><Event Eventprop ={data}/></div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Favorite