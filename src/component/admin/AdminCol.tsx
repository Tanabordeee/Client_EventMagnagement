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
      setRunning('https://img.icons8.com/material-sharp/24/clock.png')
    } else if (targetDate < today) {
      setRunning('https://img.icons8.com/?size=100&id=59754&format=png&color=D32727')
    } else {
      setRunning('https://img.icons8.com/color/48/checked--v1.png')
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
            {'\n'}
            {Eventprop.time}
        </div>
        <div className=" border w-auto break-words text-center">{Eventprop.eventName} </div>
        <div className=" border w-auto break-words text-center">-</div>
        <div className="flex justify-center items-center border ">
          <img src={running} className=" w-auto break-words text-center w-8 h-8"></img>
        </div>
        <div className=" border w-auto break-words text-center">-</div>
        <div className="border w-auto break-words text-center">
          <div className="flex max-md:flex-col text-center justify-center">
            <div className={`${Status? 'text-green-500': 'text-red-500'}`}>{Status? "Approve" : "Not Approve"}</div>
            <div className={`w-auto break-words text-center hover:cursor-pointer px-2 `}
              onClick={change}>
                 <button className= {`text-sm border px-2 rounded-xl text-white ${Status? 'bg-red-400': 'bg-green-400'}`}>{Status? "ยกเลิก" : "ตกลง"}</button>
            </div>
            
          </div>
          
        </div>
        
    </div>
  )
}

export default AdminCol