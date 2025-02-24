import { Link  } from "react-router-dom"

function ClubFunc() {
  return (
    <div className="flex p-2">
        <p className='p-2'>history</p>
        <p className='p-2'><Link to = "notification">Notification</Link></p>
        <p className='p-2'><Link to = "setting">Profile</Link></p>
    </div>
  )
}

export default ClubFunc