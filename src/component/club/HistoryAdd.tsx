import { useEffect, useState } from "react";
import EventClub from "./EventClub"
import axios from "axios";

interface Event{
    eventName : string;
    eventDate : string;
    time : string;
    image : string;
    status : string;
};


function HistoryAdd() {
    const [histevent, setHistevent] = useState<Event[]>([]);
    useEffect(() => {
        // const url = 'http://localhost:3000/api/event/getallbyclub';
        const url = `${import.meta.env.VITE_REACT_API_URL}event/getallbyclub`;
        const getData = async() => {
        try{
            const respon = await axios.get(url, {withCredentials : true});
            setHistevent(respon.data);
        }catch(error){
            console.log('Error: ', error);
            // navigate("/");
        }
        };
        getData();
        console.log(histevent);
    }, []);
  return (
    <div>
        <div className="m-4">
            <div className="flex text-xl font-bold p-4">History</div>
            <div className="flex flex-wrap p-3">
                {histevent.map(value => {
                    return(
                        <div className="xl:w-1/3 w-1/2 max-sm:w-1/1 flex justify-center items-center pt-10">
                            <div className="bg-gray-200 px-3 py-2 rounded-xl shadow-lg"><EventClub Event = {value}/></div>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default HistoryAdd