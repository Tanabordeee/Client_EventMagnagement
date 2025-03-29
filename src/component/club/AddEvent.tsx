import axios from 'axios';
import React, { useState } from 'react'
import Compressor from 'compressorjs';
import Swal from 'sweetalert2';
function AddEvent() {
    const [name, setName] = useState<string>('');
    const [detail, setDetail] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [files, setFiles] = useState<string | null>(null);

    const onNamechange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    const onDetailchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDetail(e.target.value);
    }
    const onDatechange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
    }
    const onTimechange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTime(e.target.value);
    }

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const selected = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            new Compressor(file, {
                quality: 0.6,
                success(result) {
                    const reader = new FileReader();
                    reader.readAsDataURL(result);
                    reader.onload = () => {
                        const base64 = reader.result;
                        if (typeof base64 === 'string') {
                            setFiles(base64);
                        }
                    };
                }
            });
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImagePreview(reader.result as string);
            };
        }
    };

    const send = async () => {
        const url = `${import.meta.env.VITE_REACT_API_URL}event/create`;
        const eventDate = new Date(date);
        const formattedDate = `${eventDate.toISOString().split('T')[0]}T${time}:00.000Z`; 
        try {
            await axios.post(url, {
                eventName: name,
                eventDate: formattedDate,
                time: time,
                image: files,
                detail: detail,
            }, { withCredentials: true });
            setName('');
            setDetail('');
            setDate('');
            setTime('');
            setImagePreview('');
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Event created successfully',
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Event creation failed',
            });
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

    const handleChangeImage = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const event = e as unknown as React.ChangeEvent<HTMLInputElement>;
            selected(event);
        };
        input.click();
    };

    return (
        <div className='flex flex-1 justify-center relative'>
            <div className="
                flex 
                max-sm:flex-col 
                max-xl:px-10 
                justify-between 
                items-center 
                w-full 
                px-30 
                mt-4 
                max-sm:bg-gray-50 
                m-2 
                rounded-xl 
                p-2
            ">
                <div className="flex-col flex justify-center p-3">
                    <div className="text-3xl flex w-full justify-start font-bold py-5">Event</div>
                    <div className="flex w-full justify-end text-xl py-2">Edit</div>
                    {!imagePreview ? (
                        <input
                            type="file"
                            accept='image/*'
                            onChange={selected}
                            className='max-lg:w-53 max-lg:h-50 max-lg:file:w-53 max-lg:file:h-50 w-120 h-100 file:flex-1 file:w-120 file:h-100 
                            max-xl:w-73 max-xl:h-70 max-xl:file:w-73 max-xl:file:h-70 
                            file:py-2 file:px-6 file:rounded-lg file:border-2 file:border-black file:max-sm:text-gray-50 file:text-gray-100 cursor-pointer 
                            mb-4 transition-transform transform hover:scale-105'
                        />
                    ) : (
                        <div className="flex-col">
                            <div className="relative flex justify-center max-lg:w-53 max-lg:h-60 max-xl:w-73 max-xl:h-70 
                                h-100 w-120 rounded-lg border-2 border-black">
                                <img src={imagePreview} alt="Preview" />
                                <button 
                                    className='
                                        absolute 
                                        inset-0 
                                        opacity-0 
                                        hover:opacity-100 
                                        transition-all 
                                        duration-300 
                                        cursor-pointer 
                                        rounded-lg
                                        flex 
                                        items-center 
                                        justify-center
                                    ' 
                                    onClick={handleChangeImage}
                                >
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex-col flex justify-center w-90 max-sm:w-60 max-xl:w-70">
                    <div className="flex justify-center text-lg mb-3">รายละเอียด</div>
                    <div className="flex justify-center text-sm my-2">ชื่อกิจกรรม</div>
                    <input
                        type="text"
                        placeholder='Enter Title'
                        value={name}
                        className='flex jusify-center p-2 rounded-xl border border-black'
                        onChange={onNamechange}
                    />
                    <div className="flex justify-center text-sm my-2">เงื่อนไขและสถานที่</div>
                    <input
                        type="text"
                        placeholder='Enter Condition and Location'
                        value={detail}
                        className='flex jusify-center p-2 rounded-xl border border-black'
                        onChange={onDetailchange}
                    />
                    <div className="flex justify-center text-sm my-2">วันที่</div>
                    <input
                        type="date"
                        value={date}
                        className='flex jusify-center p-2 rounded-xl border border-black'
                        onChange={onDatechange}
                    />
                    <div className="flex justify-center text-sm my-2">เวลา</div>
                    <input
                        type="time"
                        value={time}
                        className='flex jusify-center p-2 rounded-xl border border-black'
                        onChange={onTimechange}
                    />
                    <div className="flex justify-between p-2">
                        <button
                            className='bg-red-500 hover:bg-red-300 px-3 p-2 cursor-pointer mt-3 rounded-xl shadow-xl text-white text-lg p-1'
                            onClick={delet}
                        >
                            cancel
                        </button>
                        <button
                            className='bg-green-500 hover:bg-green-300 px-4 p-2 cursor-pointer mt-3 rounded-xl shadow-xl text-white text-lg p-1'
                            onClick={send}
                        >
                            send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddEvent;
