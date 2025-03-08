import React from 'react'

interface Listevent {
    Eventprop:{
        eventName : string;
        eventDate : string;
        time : string;
        image : string;
        status : string;
    };
  }
const AdminCol: React.FC<Listevent> = ({Eventprop}) => {
  return (
    <div className="grid grid-cols-6">
        <div className=" border w-auto break-words text-center">
            {new Date(Eventprop.eventDate).toISOString().split('T')[0]}
        </div>
        <div className=" border w-auto break-words text-center">{Eventprop.eventName}</div>
        <div className=" border w-auto break-words text-center">Faculty</div>
        <div className=" border w-auto break-words text-center">{Eventprop.status }</div>
        <div className=" border w-auto break-words text-center">Major</div>
        <div className=" border w-auto break-words text-center">{Eventprop.status}</div>
    </div>
  )
}

export default AdminCol