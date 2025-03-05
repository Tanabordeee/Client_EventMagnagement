import List from "../club/List";

interface Listevent {
  Eventprop:{
    eventName : string;
    eventDate : string;
    time : string;
    image : string;
    detail : string;
  };
  
}
const Event: React.FC<Listevent> = ({Eventprop}) => {
  // console.log(Eventprop.eventName);
  return (
    <div className="grid m-2 max-sm:flex justify-center">
        <h2 className='p-2 text-lg font-bold'>{Eventprop.eventName}</h2>
        <div>
          <p className='p-2'>{Eventprop.image}</p>
          <p className='p-2'>เงื่อนไข :{Eventprop.detail}</p>
          <p className='p-2'>วันที่ :{Eventprop.eventDate}</p>
          <h2 className='p-2'>เวลา :{Eventprop.time}</h2>
        </div>
    </div>
  )
}

export default Event