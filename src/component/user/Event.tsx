import List from "../club/List";

interface Listevent {
  Eventprop:{
    eventName : string;
    eventDate : string;
    time : string;
    image : string;
  };
  
}
const Event: React.FC<Listevent> = ({Eventprop}) => {
  console.log(Eventprop.eventName);
  return (
    <div className="grid p-3 justify-center">
        <h2 className='p-2 text-lg font-bold'>{Eventprop.eventName}</h2>
        <p className='p-2'>{Eventprop.image}</p>
        <h2 className='p-2'>{Eventprop.time}</h2>
        <p className='p-2'>{Eventprop.eventDate}</p>
    </div>
  )
}

export default Event