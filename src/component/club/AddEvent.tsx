import axios from 'axios';
import React, { useState } from 'react'

interface Event {
    eventName : string;
    eventDate : string;
    time : string;
    image : string;
}
function AddEvent() {
    const [name, setName] = useState<string>('');
    const [detail, setDetail] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const onNamechange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    const onDetailchange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setDetail(e.target.value);
    }
    const onDatechange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
    }
    const onTimechange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setTime(e.target.value);
    }
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const selected = (event : React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if(file){
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    const send = async () => {
        // const url = 'http://localhost:3000/api/event/create';
        const url = `${import.meta.env.VITE_REACT_API_URL}event/create`;
        try{
            const respon = await axios.post(url, {
                eventName : name,
                eventDate : date,
                time : time,
                image : imagePreview,
            }, {withCredentials : true})
        }catch(error){
            console.log(error);
        }
    }
    const delet = () => {
        setName('');
        setDetail('');
        setDate('');
        setTime('');
        setImagePreview('');
    }
  return (
    <div className='flex flex-1 justify-center'>
        <div className="flex max-sm:flex-col justify-between bg-gray-200 max-sm:bg-gray-50 m-2 rounded-xl p-2">
            <div className="flex-col p-3">
                <div className="text-xl font-bold">Event</div>
                <div className="flex justify-end">Edit</div>
                {!imagePreview ? (
                    <input type="file" accept='image/*' onChange={selected} className='file:flex-1 file:w-73 file:h-50 file:py-2 file:px-4 file:rounded-lg file:border-2 file:border-black  file:text-white cursor-pointer mb-4 transition-transform transform hover:scale-105'/>
                ) : 
                (
                    <div className="flex-col">
                         <div className="flex justify-center h-50 w-73 rounded-lg border-2  border-black">
                            <img src= {imagePreview} alt="Preview" />
                        </div>
                        <div className="relative p-2">
                            <button className='absolute px-2 rounded-xl p-1' onClick={delet}>change</button>
                            <input type="file" accept='image/*' onChange={selected} className='file:bg-green-500 bg-red-500 grid opacity-0 w-17'/>
                            
                        </div>
                        
                    </div>
               )}
                
                
            </div>
            <div className="flex-col flex justify-center">
                <div className="flex justify-center text-lg">รายละเอียด</div>
                <div className="flex justify-center text-sm">ชื่อกิจกรรม</div>
                <input type="text"placeholder='Enter Title' value={name} className='flex jusify-center p-2 rounded-xl border border-black' onChange={onNamechange}/>
                <div className="flex justify-center text-sm">เงื่อนไขและสถานที่</div>
                <input type="text"placeholder='Enter Condition and Location' value={detail} className='flex jusify-center p-2 rounded-xl border border-black' onChange={onDetailchange}/>
                <div className="flex justify-center text-sm">วันที่</div>
                <input type="text"placeholder='Enter Date' value={date} className='flex jusify-center p-2 rounded-xl border border-black' onChange={onDatechange}/>
                <div className="flex justify-center text-sm">เวลา</div>
                <input type="text"placeholder='Enter Time' value={time} className='flex jusify-center p-2 rounded-xl border border-black' onChange={onTimechange}/>
                <div className="flex justify-between p-2">
                    <button className='bg-red-500  hover:bg-red-300 px-2 rounded-xl shadow-xl' onClick={delet}>cancle</button>
                    <button className='bg-green-500 hover:bg-green-300 px-2 rounded-xl shadow-xl' onClick={send} >send</button>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default AddEvent