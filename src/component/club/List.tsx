import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface Items{
    Time :string;
    Title :string;
    Faculty :string;
    Status :string;
    Requestor :string;
    Action :string;
};
interface User{
    username :string;

}
interface Event{
    eventName : string;
    eventDate : string;
    time : string;
    image : string;
    status : string;
    user : User[];
};

function List() {
    const [histevent, setHistevent] = useState<Event[]>([]);
    useEffect(() => {
        const url = 'http://localhost:3000/api/event/getallbyclub';
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
    const [item, setItem] = useState<Items[]>([
            {Time : 'Time', Title : 'Title', Faculty :'Faculty', Status :'Status', Requestor :'Requestor', Action :'Action'},
            {Time : 'dwasdwasd', Title : 'dwasdwasddwasdwad', Faculty :'Faculty', Status :'Status', Requestor :'Requestor', Action :'Action'},
            {Time : 'dwasdwasd', Title : 'dwasdwasddwasdwad', Faculty :'Faculty', Status :'Status', Requestor :'Requestor', Action :'Action'},
            {Time : 'dwasdwasd', Title : 'dwasdwasddwasdwad', Faculty :'Faculty', Status :'Status', Requestor :'Requestor', Action :'Action'},
            {Time : 'dwasdwasd', Title : 'dwasdwasddwasdwad', Faculty :'Faculty', Status :'Status', Requestor :'Requestor', Action :'Action'},
        ]);
  return (
    <div className="p-4 ">
        <div className ="flex-col overflow-x-auto">
            {item.map((item, idex) =>{
                return <div className="grid grid-cols-6">
                            <div className=" border w-auto break-words text-center">{item.Title}</div>
                            <div className=" border w-auto break-words text-center">{item.Time}</div>
                            <div className=" border w-auto break-words text-center">{item.Faculty}</div>
                            <div className=" border w-auto break-words text-center">{item.Status}</div>
                            <div className=" border w-auto break-words text-center">{item.Requestor}</div>
                            <div className=" border w-auto break-words text-center">{item.Action}</div>
                        </div>
            })}
        </div>

</div>
  )
}

export default List