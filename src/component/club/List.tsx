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
    }, [search]);
    return (
        <div className="p-4 ">
            <div className ="flex-col overflow-x-auto">
            <div className="flex justify-center p-3 text-2xl max-lg:text-md font-bold pb-7">จำนวนนักศึกษาที่พบ : {(histevent ?? []).reduce((acc, value) => acc + (value.users ? value.users.length : 0), 0)}</div>
                <div className="grid grid-cols-6">
                    <div className=" border w-auto break-words text-center text-xl max-lg:text-sm">Time</div>
                    <div className=" border w-auto break-words text-center text-xl max-lg:text-sm">Title</div>
                    <div className=" border w-auto break-words text-center text-xl max-lg:text-sm">Faculty</div>
                    <div className=" border w-auto break-words text-center text-xl max-lg:text-sm">Name</div>
                    <div className=" border w-auto break-words text-center text-xl max-lg:text-sm">Major</div>
                    <div className=" border w-auto break-words text-center text-xl max-lg:text-sm">ID</div>
                </div>
                    {(histevent).map((value, index) => {
                        return(
                            <div key={index}>
                                {(value.users).map((users, userindex) => {
                                    // setStudent(student + 1);
                                    return(
                                        <div className="grid grid-cols-6" key={userindex}>
                                            <div className=" border w-auto break-words text-center text-xl max-lg:text-sm">
                                                {new Date(value.eventDate).toISOString().split('T')[0]}
                                            </div>
                                            <div className=" border w-auto break-words text-center text-xl max-lg:text-sm">{value.eventName}</div>
                                            <div className=" border w-auto break-words text-center text-xl max-lg:text-sm">-</div>
                                            <div className=" border w-auto break-words text-center text-xl max-lg:text-sm">{users.username}</div>
                                            <div className=" border w-auto break-words text-center text-xl max-lg:text-sm">-</div>
                                            <div className=" border w-auto break-words text-center text-xl max-lg:text-sm">{users.userId}</div>
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