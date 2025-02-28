
import { useState } from 'react'
import Event from './Event'
function Calender() {
  const [data, setData] = useState(
    {
      eventName : "Consert",
      eventDate : "dwasddwa",
      time : "available",
      image : "The toy",
    }
  )
  return (
    <div className="flex-1 p-3">
        <h2 className='py-3 px-7 text-2xl font-bold'>Calender</h2>
        <div className="flex justify-between">
          <div className="flex-1 p-2">
            <h2 className='px-7'>calender_table</h2>
          </div>
          <div className="flex justify-center bg-gray-200 rounded-lg shadow-lg p-4">
            <Event Eventprop={data}/>
          </div>
        </div>
    </div>
  )
}

export default Calender