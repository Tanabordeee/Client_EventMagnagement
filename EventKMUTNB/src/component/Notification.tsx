import EventDetail from "./noti_com/EventDetail"

function Notification() {
  return (
    <div className=" flex-1">
        <div className="flex justify-center p-4 text-2xl font-bold">Notification</div>
        <div className="flex flex-2 justify-between p-6">
            <div className="flex flex-col ml-6 p-6 bg-gray-200 rounded-xl shadow-lg">
                <div className="text-lg font-bold pb-2">My Event</div>
                <div className="p-1">Concert1</div>
                <div className="p-1">Concert2</div>
                <div className="p-1">Concert3</div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className=" bg-gray-200 rounded-lg shadow-lg p-10"><EventDetail/></div>
            </div>
            
        </div>
    </div>
  )
}

export default Notification