import { useEffect, useState } from "react";
import EventClub from "./EventClub"
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";

interface Event{
    eventName : string;
    eventDate : string;
    time : string;
    image : string;
    status : string;
    detail : string;
};


function HistoryAdd() {
    const search = useOutletContext();
    const [histevent, setHistevent] = useState<Event[]>([]);
    let url = `${import.meta.env.VITE_REACT_API_URL}event/getallbyclub`
    useEffect(() => {
        const getData = async() => {
        try{
            const respon = await axios.get(url, {withCredentials : true});
            if(search){
                const searcher = respon.data.filter((item :Event) => item.eventName === search)
                if(searcher.length > 0){
                    setHistevent(searcher);
                }else{
                    Swal.fire({
                        title : 'ไม่พบข้อมูล',
                        text : 'ไม่พบข้อมูลกิจกรรมที่ค้นหา', 
                        icon : 'error',
                        confirmButtonText : 'ตกลง'
                    })
                    setHistevent(respon.data);
                }
            }else{
                setHistevent(respon.data);
            }
        }catch(error){
            console.log('Error: ', error);
            // navigate("/");
        }
        };
        getData();
    }, [search]);
  return (
    <div>
        <div className="m-4">
            <div className="flex text-3xl font-bold p-4 pt-10">History</div>
            <div className="flex flex-wrap p-3">
                {histevent.map((value , index) => {
                    return(
                        <div className="2xl:w-1/3 w-1/2 max-lg:w-1/1 flex justify-center items-center pt-10">
                            <div className=" mx-3 my-2 rounded-xl flex flex-col justify-center items-center"><h1 className="text-2xl font-bold">Concert {index + 1}</h1><EventClub Event = {value}/></div>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default HistoryAdd