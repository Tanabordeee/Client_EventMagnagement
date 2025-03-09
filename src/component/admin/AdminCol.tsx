import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface Listevent {
    Eventprop:{
      eventID : string;
        eventName : string;
        eventDate : string;
        time : string;
        image : string;
        status : string;
    };
  }
const AdminCol: React.FC<Listevent> = ({Eventprop}) => {
  const [Status, setStatus] = useState<boolean | null>(null)
  const [running, setRunning] = useState('')
  useEffect(() => {
    if(Eventprop.status == 'not approve'){
      setStatus(false);
    }else {
      setStatus(true);
    }
    const targetDate = new Date(Eventprop.eventDate); // แปลง string เป็น Date
    const today = new Date(); // วันที่ปัจจุบัน
  
    // เคลียร์ค่าเวลาให้เป็นเที่ยงคืนเพื่อเปรียบเทียบแค่วันที่
    targetDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
  
    if (targetDate.getTime() === today.getTime()) {
      setRunning('⏳Showing')
    } else if (targetDate < today) {
      setRunning('End')
    } else {
      setRunning('In coming')
    }
  }, [Eventprop])

  const change = async() => {
    let send : string;
    if(Status){
      send = 'not approve'
    }else {
      send = 'approve'
    }
    const url = `${import.meta.env.VITE_REACT_API_URL}event/approvebyadmin/${Eventprop.eventID}`;
    try{
      const response = await axios.put(url, {
        status : send,
      }, {withCredentials : true})
      console.log(response)
      setStatus(!Status);
    }catch(error){
      console.log(error)
    }
  }
  return (
    <div className="grid grid-cols-6">
        <div className=" border w-auto break-words text-center">
            {new Date(Eventprop.eventDate).toISOString().split('T')[0]}
        </div>
        <div className=" border w-auto break-words text-center">{Eventprop.eventName}</div>
        <div className=" border w-auto break-words text-center">{Eventprop.time}</div>
        <div className=" border w-auto break-words text-center">{running}</div>
        <div className=" border w-auto break-words text-center">Requestor</div>
        <div className={`border w-auto break-words text-center hover:cursor-pointer `}
          onClick={change}>
            <div className={`${Status? 'text-green-500': 'text-red-500'}`}>{Status? "Approve" : "Not Approve"}</div> 
        </div>
    </div>
  )
}

export default AdminCol