import axios from 'axios';
import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom';

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

function List() {
    const search = useOutletContext();
    const [histevent, setHistevent] = useState<Event[]>([]);
    useEffect(() => {
        const url = `${import.meta.env.VITE_REACT_API_URL}event/getallbyclub`;
        
        const getData = async() => {
        try{
            const respon = await axios.get(url, {withCredentials : true});
            if(search){
                const filter = respon.data.filter((item : Event) => item.eventName === search)
                setHistevent(filter);
            }else{
                setHistevent(respon.data);
            }
        }catch(error){
            console.log('Error: ', error);
        }
        };
        getData();
        console.log(histevent);
    }, [search]);
    console.log(histevent);
    return (
        <div className="p-4 ">
            <div className ="flex-col overflow-x-auto">
            <div className="flex justify-center p-3">จำนวนนักศึกษาที่พบ{(histevent ?? []).reduce((acc, value) => acc + (value.users ? value.users.length : 0), 0)}</div>
                <div className="grid grid-cols-6">
                    <div className=" border w-auto break-words text-center">Time</div>
                    <div className=" border w-auto break-words text-center">Title</div>
                    <div className=" border w-auto break-words text-center">Faculty</div>
                    <div className=" border w-auto break-words text-center">Name</div>
                    <div className=" border w-auto break-words text-center">Major</div>
                    <div className=" border w-auto break-words text-center">ID</div>
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
                                            <div className=" border w-auto break-words text-center">
                                                {new Date(value.eventDate).toISOString().split('T')[0]}
                                            </div>
                                            <div className=" border w-auto break-words text-center">{value.eventName}</div>
                                            <div className=" border w-auto break-words text-center">-</div>
                                            <div className=" border w-auto break-words text-center">{users.username}</div>
                                            <div className=" border w-auto break-words text-center">-</div>
                                            <div className=" border w-auto break-words text-center">{users.userId}</div>
                                        </div>
                                        
                                    )    
                                })}
                            </div>
                            
                        )
                    })}
                
            </div>
        </div>
      )
}
       
export default List