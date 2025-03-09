import axios from "axios";
import { useEffect, useState  } from "react";
import { useOutletContext } from "react-router-dom";
import AdminCol from "./AdminCol";
import { useNavigate } from "react-router-dom";
interface Event{
    eventName : string;
    eventDate : string;
    time : string;
    image : string;
    status : string;
    details :string;
};
function Manage() {
    const navigate = useNavigate();
    const [histevent, setHistevent] = useState<Event[]>([]);
    const search = useOutletContext();
    let url = search? `${import.meta.env.VITE_REACT_API_URL}event/getnamebyadmin?eventName=${search}` : 
        `${import.meta.env.VITE_REACT_API_URL}event/getallbyadmin`;
    console.log(url)
    useEffect(() => {
        const getData = async() => {
        try{
            const respon = await axios.get(url, {withCredentials : true});
            setHistevent(respon.data);
            console.log(respon.data);
        }catch(error){
            console.log('Error: ', error);
            navigate("/");
        }
        };
        getData();
        // console.log(histevent);
    }, [url]);
    return (
        <div className="p-4 ">
            <div className ="flex-col overflow-x-auto">
                <div className="grid grid-cols-6">
                    <div className=" border w-auto break-words text-center">Time</div>
                    <div className=" border w-auto break-words text-center">Title</div>
                    <div className=" border w-auto break-words text-center">Faculty</div>
                    <div className=" border w-auto break-words text-center">Status</div>
                    <div className=" border w-auto break-words text-center">Requestor</div>
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