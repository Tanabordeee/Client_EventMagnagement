import { Link } from "react-router-dom"
function Menu() {
  return (
    <div>
        <div className="flex flex-col justify-between bg-green-500 h-screen shadow-[4px_0_6px_rgba(0,0,0,0.1)]">
          <div className="shadow-lg justify-center  items-center flex pb-7">
            <a href="#" className='text-xl font-bold p-3'>Picture</a>
          </div>
          <div className="flex-1">
            <div className="flex-col flex py-5">
              <div className="text-xl p-2"><Link to ="/" >Home</Link></div>
              <div className="text-xl p-2"><Link to ="/favorite" >Favorite</Link></div>
              <div className="text-xl p-2"><Link to ="/notification">Notification</Link></div>
              <div className="text-xl p-2"><Link to ="/setting">Setting</Link></div>
            </div>
          </div>
          <footer className='footer'>
            <p>Contact us</p>
            <p>tell : 099-999-9999</p>
            <p>line : @gm2</p>
          </footer>
          
        </div>
        
    </div>
  )
}

export default Menu