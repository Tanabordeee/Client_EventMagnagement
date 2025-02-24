import { useState  } from "react";

function Manage() {
    const [item, setItem] = useState(["Time", "Title", "Faculty", "Status", "Requestor", "Action"]);
    const [list, setList] = useState([])
    return (
        <div className="p-4">
            <div className="flex justify-between px-3">
                <div className="flex justify-center border w-1/6">Time</div>
                <div className="flex justify-center border w-1/6">Title</div>
                <div className="flex justify-center border w-1/6">Facluty</div>
                <div className="flex justify-center border w-1/6">Status</div>
                <div className="flex justify-center border w-1/6">Requestor</div>
                <div className="flex justify-center border w-1/6">Action</div>
            </div>
            <div className="flex justify-between px-3">
                {item.map((value, index) => (
                    <div className="flex justify-center border w-1/6">{value}</div>
                ))}
            </div>

        </div>
    )
}

export default Manage