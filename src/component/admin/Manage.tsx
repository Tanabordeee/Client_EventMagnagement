import axios from "axios";
import { useEffect, useState  } from "react";
import { useOutletContext } from "react-router-dom";

interface User{
    username :string;
    userId : string;
}
interface Event{
    eventName : string;
    eventDate : string;
    time : string;
    image : string;
    status : string;
    users : User[];
};
function Manage() {
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
            // navigate("/");
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
                    {(histevent).map((value, index) => {
                        return(
                            <div className="grid grid-cols-6" key={index}>
                                <div className=" border w-auto break-words text-center">
                                    {new Date(value.eventDate).toISOString().split('T')[0]}
                                </div>
                                <div className=" border w-auto break-words text-center">{value.eventName}</div>
                                <div className=" border w-auto break-words text-center">Faculty</div>
                                <div className=" border w-auto break-words text-center">{value.status }</div>
                                <div className=" border w-auto break-words text-center">Major</div>
                                <div className=" border w-auto break-words text-center">{value.status}</div>
                            </div>
                            
                        )
                    })}
                {/* <div className="flex justify-center p-3">จำนวนนักศึกษาที่พบ{(histevent ?? []).reduce((acc, value) => acc + (value.users ? value.users.length : 0), 0)}</div> */}
            </div>
        </div>
    )
}

export default Manage