
import { useEffect, useState } from 'react'
import Event from './Event'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface dataEvent{
  eventName : string,
  eventDate : string,
  time : string,
  image : string,
}

function Calender() {
  const [data, setData] = useState(
    {
      eventName : "Consert",
      eventDate : "dwasddwa",
      time : "available",
      image : "The toy",
    }
  )
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
        // navigate("/");
      }
    };
    fetchData();
  }, []);
  // console.log(dataevent);
  return (
    <div className="flex-1 p-3 ">
        <h2 className='py-3 px-7 text-2xl font-bold'>Calender</h2>
        <div className="flex max-sm:flex-col justify-between">
          <div className="flex-1 p-2">
            <h2 className='px-7'>calender_table</h2>
          </div>
          <div className="flex justify-center ">
            <div className="justify-center flex bg-gray-200 rounded-lg shadow-lg p-4"> <Event Eventprop={data}/></div>
          </div>
        </div>
    </div>
  )
}

export default Calender