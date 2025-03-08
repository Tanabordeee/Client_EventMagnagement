import { useEffect, useState } from "react";
import EventClub from "./EventClub"
import axios from "axios";
import { useOutletContext } from "react-router-dom";

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
    let url = search? `${import.meta.env.VITE_REACT_API_URL}club/getonebyclub/${search}`:
    `${import.meta.env.VITE_REACT_API_URL}event/getallbyclub`
    useEffect(() => {
        
        const getData = async() => {
        try{
            const respon = await axios.get(url, {withCredentials : true});
            setHistevent(respon.data);
            console.log(respon.data);
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
                            <div className=" mx-3 my-2 rounded-xl"><EventClub Event = {value}/></div>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default HistoryAdd