import { Link } from "react-router-dom"
function Menu() {
  return (
    <div>
        <div className="flex flex-col justify-between bg-green-500 h-screen shadow-[4px_0_6px_rgba(0,0,0,0.1)]">
          <a href="#" className='justify-center text-xl p-3'>Picture</a>
          <div className="flex-col flex pb-10">
            <Link to ="/" className = "p-2">Home</Link>
            <Link to ="/Favorite" className = "p-2">Favorite</Link>
            <Link to ="/Notification" className = "p-2">Notification</Link>
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