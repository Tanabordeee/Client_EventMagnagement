import axios from "axios";
import { useEffect, useState  } from "react";

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
    useEffect(() => {
        // const url = 'http://localhost:3000/api/event/getallbyadmin';
        const url = `${import.meta.env.VITE_REACT_API_URL}event/getallbyadmin`
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
                        console.log("value : ",value);
                        console.log("value user :", value.users);
                        // const userCount = value.users ? value.users.length : 0;
                        return(
                            <div key={index}>
                                {(value.users).map((users, userindex) => {   
                                    // setStudent(student + 1);
                                    return(
                                        <div className="grid grid-cols-6" key={userindex}>
                                            <div className=" border w-auto break-words text-center">{value.eventDate}</div>
                                            <div className=" border w-auto break-words text-center">{value.eventName}</div>
                                            <div className=" border w-auto break-words text-center">Faculty</div>
                                            <div className=" border w-auto break-words text-center">{value.status }</div>
                                            <div className=" border w-auto break-words text-center">Major</div>
                                            <div className=" border w-auto break-words text-center">{users.userId}</div>
                                        </div>
                                        
                                    )    
                                })}
                            </div>
                            
                        )
                    })}
                {/* <div className="flex justify-center p-3">จำนวนนักศึกษาที่พบ{(histevent ?? []).reduce((acc, value) => acc + (value.users ? value.users.length : 0), 0)}</div> */}
            </div>
        </div>
    )
}

export default Manage