
import { useEffect, useState } from 'react'
import Event from './Event'
import { useNavigate, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from "lucide-react";
import dayjs, {Dayjs} from "dayjs";

interface dataEvent{
  eventName : string,
  eventDate : string,
  time : string,
  image : string,
  detail : string,
  eventID : string,
}


function Calender() {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [apiEvents, setApiEvents] = useState<dataEvent[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<dataEvent[]>([]);
  const search = useOutletContext();
  const navigate = useNavigate()
  let url = search? `${import.meta.env.VITE_REACT_API_URL}event/namebyuser?eventName=${search}`:
    `${import.meta.env.VITE_REACT_API_URL}event/byuser`
  console.log(url);
  useEffect(() => {
    
    const fetchData = async() => {
      try{
        const response = await axios.get(url, {withCredentials : true});
        const extractedEvents = response.data.map((item: dataEvent) => ({
          ...item,
          eventDate: dayjs(item.eventDate).format("YYYY-MM-DD")
        }));
        console.log("Fetched Events (Formatted):", extractedEvents);
        setApiEvents(extractedEvents);
      }catch(error){
        navigate('/')
      }
    }
    fetchData();
  }, [url]);
  
  console.log(apiEvents)
  const startOfMonth = currentDate.startOf("month");
  const daysInMonth = currentDate.daysInMonth();
  const firstDayOfWeek = startOfMonth.day();
  
  const prevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const nextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  const isDateHighlighted = (date: Dayjs): boolean => {
    return apiEvents.some(event => event.eventDate === date.format("YYYY-MM-DD"));
  };

  const handleDateClick = (date: Dayjs) => {
    setSelectedDate(date);
    const events = apiEvents.filter(event => event.eventDate === date.format("YYYY-MM-DD"));
    setSelectedEvents(events);
  };

  const generateCalendar = () => {
    let days = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="text-gray-400"></div>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const date = currentDate.date(i);
      const isHighlighted = isDateHighlighted(date);
      const isSelected = selectedDate && selectedDate.isSame(date, "day");
      days.push(
        <div
          key={i}
          className={`p-2 flex  transition-transform transform hover:scale-110 justify-center items-center rounded-xl w-10 h-10 cursor-pointer transition border border-black 
            ${isHighlighted ? "bg-yellow-300" : ""} 
            ${isSelected ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"}`}
          onClick={() => handleDateClick(date)}
        >
          {i}
        </div>
      );
    }
    return days;
  };


  // console.log(dataevent);
  return (
    <div className="flex-1 p-3">
        <h2 className='py-3 px-7 text-2xl font-bold'>Calender</h2>
        <div className="flex flex-1 max-sm:flex-col justify-center">
          <div className="flex max-sm:flex-col justify-between">
            <div className="flex-1 p-2 flex justify-center">
              <div className="w-80 bg-white shadow-lg rounded-lg p-4">
                <div className="bg-green-400 rounded-xl p-2">
                  <div className="flex justify-between items-center">
                    <button onClick={prevMonth} className="p-2">
                      <ChevronLeft size={20} className='transition-transform transform hover:scale-150'/>
                    </button>
                    <h2 className="text-lg font-semibold">
                      {currentDate.format("MMMM YYYY")}
                    </h2>
                    <button onClick={nextMonth} className="p-2">
                      <ChevronRight size={20} className='transition-transform transform hover:scale-150'/>
                    </button>
                  </div>
                  <div className="grid grid-cols-7 gap-5 text-center font-semibold">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <div key={day} className="text-gray-600">
                        {day}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-2 mt-2">{generateCalendar()}</div>
              </div>
            </div>
          </div>
          <div className="flex justify-center flex-col">
            <div className={`justify-center flex bg-gray-200 rounded-lg shadow-lg p-4 ${selectedEvents.length >0? '' : 'hidden'}`}> 
              {selectedEvents.length > 0 && selectedEvents.map((event, index) => (
                 <div className="p-2"><Event key={index} Eventprop={event}/></div> 
              ))}
            </div>
          </div>
        </div>
        
    </div>
  )
}

export default Calender