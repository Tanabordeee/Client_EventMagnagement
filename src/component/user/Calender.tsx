
import { useEffect, useState } from 'react'
import Event from './Event'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from "lucide-react";
import dayjs from "dayjs";

interface dataEvent{
  eventName : string,
  eventDate : string,
  time : string,
  image : string,
  detail : string,
}

function Calender() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const daysInMonth = currentDate.daysInMonth();
  const firstDayOfWeek = startOfMonth.day();
  
  const prevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const nextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  const [data, setData] = useState(
    {
      eventName : "Consert",
      eventDate : "dwasddwa",
      time : "available",
      image : "The toy",
      detail : "dwasd",
    }
  )
  // const url = 'http://localhost:3000/api/event/byuser';
  const url = `${import.meta.env.VITE_REACT_API_URL}event/byuser`;
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
  const generateCalendar = () => {
    let days = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="text-gray-400"></div>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <div
          key={i}
          className="p-2 flex justify-center items-center rounded-full w-10 h-10 cursor-pointer hover:bg-blue-500 hover:text-white transition"
        >
          {i}
        </div>
      );
    }
    return days;
  };
  // console.log(dataevent);
  return (
    <div className="flex-1 p-3 ">
        <h2 className='py-3 px-7 text-2xl font-bold'>Calender</h2>
        <div className="flex max-sm:flex-col justify-between">
          <div className="flex-1 p-2 flex justify-center">
            <div className="w-80 bg-white shadow-lg rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <button onClick={prevMonth} className="p-2 rounded-full hover:bg-gray-200">
                  <ChevronLeft size={20} />
                </button>
                <h2 className="text-lg font-semibold">
                  {currentDate.format("MMMM YYYY")}
                </h2>
                <button onClick={nextMonth} className="p-2 rounded-full hover:bg-gray-200">
                  <ChevronRight size={20} />
                </button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center font-semibold">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-gray-600">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1 mt-2">{generateCalendar()}</div>
            </div>
          </div>
          <div className="flex justify-center ">
            <div className="justify-center flex bg-gray-200 rounded-lg shadow-lg p-4"> <Event Eventprop={data}/></div>
          </div>
        </div>
    </div>
  )
}

export default Calender