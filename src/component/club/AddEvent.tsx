import React, { useState } from 'react'

function AddEvent() {
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
  return (
    <div className='flex flex-1 justify-center'>
        <div className="flex justify-between bg-gray-200 m-2 rounded-xl p-2">
            <div className="flex-col p-3">
                <div className="text-xl font-bold">Event</div>
                <div className="flex justify-end">Edit</div>
                {!imagePreview ? (
                    <input type="file" accept='image/*' onChange={selected} className='file:flex-1 file:w-73 file:h-50 file:py-2 file:px-4 file:rounded-lg file:border file:border-black  file:text-white cursor-pointer mb-4'/>
                ) : 
                (
                    <div className="flex-col">
                         <div className="flex justify-center h-50 w-73 rounded-lg border border-black">
                            <img src= {imagePreview} alt="Preview" />
                        </div>
                        <div className="relative p-2">
                            <button className='absolute px-2 rounded-xl p-1'>change</button>
                            <input type="file" accept='image/*' onChange={selected} className='file:bg-green-500 bg-red-500 grid opacity-0 w-17'/>
                            
                        </div>
                        
                    </div>
               )}
                
                
            </div>
            <div className="flex-col flex justify-center">
                <div className="flex justify-center text-lg">รายละเอียด</div>
                <div className="flex justify-center text-sm">ชื่อกิจกรรม</div>
                <input type="text"placeholder='Enter Title'  className='flex jusify-center p-2 rounded-xl border border-black'/>
                <div className="flex justify-center text-sm">เงื่อนไขและสถานที่</div>
                <input type="text"placeholder='Enter Condition and Location'  className='flex jusify-center p-2 rounded-xl border border-black'/>
                <div className="flex justify-center text-sm">วันที่และเวลา</div>
                <input type="text"placeholder='Enter Date and Time'  className='flex jusify-center p-2 rounded-xl border border-black'/>
                <div className="flex justify-between p-2">
                    <button className='bg-red-500  hover:bg-red-300 px-2 rounded-xl shadow-xl'>cancle</button>
                    <button className='bg-green-500 hover:bg-green-300 px-2 rounded-xl shadow-xl'>send</button>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default AddEvent