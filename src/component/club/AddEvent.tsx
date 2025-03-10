import axios from 'axios';
import React, { useState } from 'react'
import Compressor from 'compressorjs';


function AddEvent() {
    const [name, setName] = useState<string>('');
    const [detail, setDetail] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [files, setFiles] = useState<string | null>(null)
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
    const selected = async (event : React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if(file){
            new Compressor(file, {
                quality : 0.6,
                success(result){
                    const reader = new FileReader();
                    reader.readAsDataURL(result);
                    reader.onload = () => {
                        const base64 = reader.result;
                        if(typeof base64 === 'string'){
                            setFiles(base64);
                            console.log(base64);
                        }
                        // console.log(reader.result as string);
                    };
                }
            })
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImagePreview(reader.result as string);
                // console.log(reader.result as string);
            };
        }
    };
    const [showsuccess, setShowsuccess] = useState(false);
    const send = async () => {
        const url = `${import.meta.env.VITE_REACT_API_URL}event/create`;
        try{
            await axios.post(url, {
                eventName : name,
                eventDate : date,
                time : time,
                image : files,
                detail : detail,
            }, {withCredentials : true})
            setName('');
            setDetail('');
            setDate('');
            setTime('');
            setImagePreview('');
            changeSuccess();
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
    const changeSuccess = () => {
        setShowsuccess(true);
        setTimeout(() => {
            setShowsuccess(false)
        }, 3000);
    }
  return (
    <div className='flex flex-1 justify-center relative'>
        <div className="flex max-sm:flex-col justify-between bg-gray-100 mt-4 max-sm:bg-gray-50 m-2 rounded-xl p-2">
            <div className="flex-col p-3">
                <div className="text-xl font-bold">Event</div>
                <div className="flex justify-end">Edit</div>
                {!imagePreview ? (
                    <input type="file" accept='image/*' onChange={selected} className='file:flex-1 file:w-73 file:h-50 file:py-2 file:px-4 file:rounded-lg file:border-2 file:border-black  file:max-sm:text-gray-50 file:text-gray-100 cursor-pointer mb-4 transition-transform transform hover:scale-105'/>
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
                    <button className='bg-red-500  hover:bg-red-300 px-2 rounded-xl shadow-xl text-white text-lg p-1' onClick={delet}>cancle</button>
                    <button className='bg-green-500 hover:bg-green-300 px-2 rounded-xl shadow-xl text-white text-lg p-1' onClick={send} >send</button>
                </div>
            </div>
            
        </div>
        <div className= {`flex flex-col absolute bg-gray-50 shadow-xl backdrop:opacity-20 p-15 top-15 rounded-xl  ${showsuccess? '' : 'hidden'}`}>
            <img width="150" height="150" src="https://img.icons8.com/ios-filled/150/40C057/ok--v1.png" alt="ok--v1"/>
               <div className="flex justify-center">Already sent</div>
        </div>
    </div>
  )
}

export default AddEvent