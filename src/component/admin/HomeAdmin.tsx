
import { useEffect, useState } from 'react'
import EventAdmin from './EventAdmin';
import {useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from "lucide-react";
import dayjs, {Dayjs} from "dayjs";
import Swal from 'sweetalert2';
interface club {
    clubName :string,
}
interface dataEvent{
  eventName : string,
  eventDate : string,
  time : string,
  image : string,
  detail : string,
  eventID : string,
  status : string,
  club : club,
}

function HomeAdmin() {
    const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [apiEvents, setApiEvents] = useState<dataEvent[]>([]);
    const [selectedEvents, setSelectedEvents] = useState<dataEvent[]>([]);
    const search = useOutletContext();
    let url = search? `${import.meta.env.VITE_REACT_API_URL}event/getnamebyadmin?eventName=${search}`:
      `${import.meta.env.VITE_REACT_API_URL}event/getallbyadmin`
      useEffect(() => {
    
        const fetchData = async() => {
          try{
            const response = await axios.get(url, {withCredentials : true});
            const extractedEvents = response.data.map((item: dataEvent) => ({
              ...item,
              eventDate: dayjs(item.eventDate).format("YYYY-MM-DD")
            }));
            setApiEvents(extractedEvents);
    
            // ถ้ามีการค้นหา ให้แสดงกิจกรรมที่ค้นหาเจอทันที
            if (search) {
              const searchedEvents = extractedEvents.filter((event: dataEvent) => 
                event.eventName.toLowerCase().includes((search as string).toLowerCase())
              );
              if (searchedEvents.length > 0) {
                setSelectedEvents(searchedEvents);
                // เลือกวันที่แรกที่มีกิจกรรมที่ค้นหาเจอ
                const firstEventDate = dayjs(searchedEvents[0].eventDate);
                setSelectedDate(firstEventDate);
                // เลื่อนไปที่เดือนที่มีกิจกรรมที่ค้นหาเจอ
                setCurrentDate(firstEventDate);
              }
            }
          }catch(error: any){
            if (error.response?.status === 404) {
              Swal.fire({
                title: 'ไม่พบข้อมูล',
                text: 'ไม่พบกิจกรรมที่คุณกำลังค้นหา',
                icon: 'warning',
                confirmButtonText: 'ตกลง'
              });
            } else {
              Swal.fire({
                title: 'เกิดข้อผิดพลาด',
                text: 'ไม่สามารถดึงข้อมูลได้ กรุณาลองใหม่อีกครั้ง',
                icon: 'error',
                confirmButtonText: 'ตกลง'
              });
            }
            // navigate('/')
          }
        }
        fetchData();
      }, [url, search]);
    
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
            className={`p-3 lg:p-5 flex md:w-full lg:h-20 h-10 transition-transform transform hover:scale-110 justify-center items-center rounded-xl cursor-pointer transition border border-black 
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
  
  
    return (
      <div className="flex-1 p-3 mx-8 ">
          <h1 className='py-10 px-7 text-4xl font-bold'>Calender</h1>
          <div className="flex flex-1 max-md:m-1 m-4 max-sm:flex-col justify-center">
            <div className={`flex justify-center w-full ${selectedEvents.length >0? '' : 'max-w-250'}`}>
              <div className="flex-1 flex justify-center">
                <div className="w-full bg-white shadow-lg rounded-2xl p-5">
                  <div className="bg-green-400 rounded-xl p-2">
                    <div className="flex justify-between items-center">
                      <button onClick={prevMonth} className="p-2">
                        <ChevronLeft size={20} className='transition-transform transform hover:scale-150'/>
                      </button>
                      <h2 className="lg:text-2xl text-lg font-semibold">
                        {currentDate.format("MMMM YYYY")}
                      </h2>
                      <button onClick={nextMonth} className="p-2">
                        <ChevronRight size={20} className='transition-transform transform hover:scale-150'/>
                      </button>
                    </div>
                    <div className="grid grid-cols-7 gap-5 text-center text-md lg:text-xl font-semibold">
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
            <div className={`flex justify-center w-full ${selectedEvents.length >0? '' : 'hidden'}`}>
              <div className={`justify-center flex flex-col `}> 
                {selectedEvents.length > 0 && selectedEvents.map((event, index) => (
                   <div className="md:px-3 lg:px-5 my-3 md:h-[100%] flex md:justify-center item-center bg-[#E7E9EC] rounded-3xl shadow-lg p-3">
                    <EventAdmin key={index} Eventprop={event}/>
                    </div> 
                ))}
              </div>
            </div>
          </div>
          
      </div>
    )
  }

export default HomeAdmin