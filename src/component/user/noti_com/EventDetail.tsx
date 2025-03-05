interface Listevent {
    Eventprop:{
        eventName : string;
        eventDate : string;
        time : string;
        image : string;
        detail : string;
      };
    
  }
const EventDetail: React.FC<Listevent> = ({Eventprop}) => {
    return (
      <div>
          <div className="flex justify-center text-lg font-bold">{Eventprop.eventName}</div>
          <div className="flex justify-center">
              <div className="flex max-sm:grid">
                  <div className="justify-center p-5  flex-col">
                      <h2 className="p-1 flex justify-center">{Eventprop.image}</h2>
                      <h1 className="p-1 flex justify-center">Status</h1>
                  </div>
                  <div className="justify-center p-5">
                      <p className="p-1 pr-5 pl-5 flex justify-center">{Eventprop.eventName}</p>
                      <p className="p-1 pr-5 pl-5 flex justify-center">เงื่อนไข : {Eventprop.detail}</p>
                      <p className="p-1 pr-5 pl-5 flex justify-center">วันที่ :{Eventprop.eventDate}</p>
                      <p className="p-1 pr-5 pl-5 flex justify-center">เวลา :{Eventprop.time}</p>
                      <p className="p-1 pr-5 pl-5 flex justify-center">contact</p>
                      <p className="p-1 pr-5 pl-5 flex justify-center">status</p>
                  </div>
              </div>
          </div>
          <div className="flex justify-center">
              <div className="flex justify-center bg-lime-300 rounded-lg px-3">Status confirm detail</div>
          </div>
          
      </div>
    )
  }
  
  export default EventDetail