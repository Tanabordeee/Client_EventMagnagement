import { Link } from "react-router-dom"
function Function() {
  return (
    <div className="fucntion">
        <div className="flex p-2">
            <p className='p-2'>history</p>
            <p className='p-2'><Link to = "notification">Notification</Link></p>
            <p className='p-2'><Link to = "setting">Profile</Link></p>
        </div>
    </div>
  )
}

export default Function