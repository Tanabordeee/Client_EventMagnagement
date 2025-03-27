import axios from "axios";
import { useEffect, useState  } from "react";
import { useOutletContext } from "react-router-dom";
import AdminCol from "./AdminCol";
interface club {
    clubName : string
  }
interface Event{
    eventID : string;
    eventName : string;
    eventDate : string;
    time : string;
    image : string;
    status : string;
    details :string;
    club : club;
};
function Manage() {
    const [histevent, setHistevent] = useState<Event[]>([]);
    const search = useOutletContext();
    let url = `${import.meta.env.VITE_REACT_API_URL}event/getallbyadmin`;
    useEffect(() => {
        const getData = async() => {
        try{
            const respon = await axios.get(url, {withCredentials : true});
            if(search){
                const searcher = respon.data.filter((item :Event) => item.eventName === search)
                setHistevent(searcher);
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
        <div className="p-4 ">
            <div className ="flex-col overflow-x-auto">
                <div className="grid grid-cols-5">
                    <div className=" border w-auto break-words text-center">Time</div>
                    <div className=" border w-auto break-words text-center">Title</div>
                    <div className=" border w-auto break-words text-center">Faculty</div>
                    <div className=" border w-auto break-words text-center">Status</div>
                    {/* <div className=" border w-auto break-words text-center">Requestor</div> */}
                    <div className=" border w-auto break-words text-center">Action</div>
                </div>
                    {histevent.length > 0 ? histevent.map((value, index) => {
                        
                        return <AdminCol Eventprop={value} key={index}/>
                    }) : <div className="flex justify-center items-center">loading....</div> }
            </div>
        </div>
    )
}

export default Manage