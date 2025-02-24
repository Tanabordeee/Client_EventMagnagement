import React, { useState } from 'react'

function List() {
    const [item, setItem] = useState(["Time", "Title", "Faculty", "Name", "Major", "Id"]);
    const [list, setList] = useState([])
  return (
    <div>
        <div className="flex justify-between px-3 pt-3">
            <div className="flex justify-center border w-1/6">Time</div>
            <div className="flex justify-center border w-1/6">Title</div>
            <div className="flex justify-center border w-1/6">Facluty</div>
            <div className="flex justify-center border w-1/6">Name</div>
            <div className="flex justify-center border w-1/6">Major</div>
            <div className="flex justify-center border w-1/6">Id</div>
        </div>
        <div className="flex justify-between px-3">
            {item.map((value, index) => (
                <div className="flex justify-center border w-1/6">{value}</div>
            ))}
        </div>

    </div>
  )
}

export default List