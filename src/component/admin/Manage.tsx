import { useState  } from "react";

interface Items{
    // listitem: {
    //     Time :string;
    //     Title :string;
    //     Faculty :string;
    //     Status :string;
    //     Requestor :string;
    //     Action :string;
    // }
    Time :string;
    Title :string;
    Faculty :string;
    Status :string;
    Requestor :string;
    Action :string;
}
function Manage() {
    const [time, setTime] = useState(["Timedwasdwasdwasd","dawsdwasdwad","dwasdwasdw", "dwasdwadw" ]);
    const [title, setTitle] = useState(["Title dwasdad","dawsdwasdwad","dwasdwasdw", "dwasdwadw"])
    const [faculty, setFaculty] = useState(["Faculty dwasd","dawsdwasdwad","dwasdwasdw", "dwasdwadw" ])
    const [status, setStatus] = useState(["Status dwasd","dawsdwasdwad","dwasdwasdw", "dwasdwadw"])
    const [reques, setReques] = useState(["Requestor dwasdawd","dawsdwasdwad","dwasdwasdw", "dwasdwadw"])
    const [action, setAction] = useState(["Action dwasdawd","dawsdwasdwad","dwasdwasdw", "dwasdwadw"])
    const [item, setItem] = useState<Items[]>([
        {Time : 'Time', Title : 'Title', Faculty :'Faculty', Status :'Status', Requestor :'Requestor', Action :'Action'},
        {Time : 'dwasdwasd', Title : 'dwasdwasddwasdwad', Faculty :'Faculty', Status :'Status', Requestor :'Requestor', Action :'Action'},
        {Time : 'dwasdwasd', Title : 'dwasdwasddwasdwad', Faculty :'Faculty', Status :'Status', Requestor :'Requestor', Action :'Action'},
        {Time : 'dwasdwasd', Title : 'dwasdwasddwasdwad', Faculty :'Faculty', Status :'Status', Requestor :'Requestor', Action :'Action'},
        {Time : 'dwasdwasd', Title : 'dwasdwasddwasdwad', Faculty :'Faculty', Status :'Status', Requestor :'Requestor', Action :'Action'},
    ]);
    return (
        <div className="p-4 w-full">
                <div className ="flex-col overflow-x-auto">
                    {item.map((item, idex) =>{
                        return <div className="grid grid-cols-6">
                                    <div className=" border w-auto break-words text-center">{item.Time}</div>
                                    <div className=" border w-auto break-words text-center">{item.Title}</div>
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

export default Manage