import { Link } from "react-router-dom"
import { useState } from "react"
function Menu() {
  const text: string[] = [
    "Home",
    "Favorite",
    "Notification",
    "Setting",
  ]
  const path: string[] = [
    "calender",
    "favorite",
    "notification",
    "setting",
  ]
  const [isSelect, setIsSelect] = useState([true, false, false, false]);
  const Clicky = (index: number) => {
    const newStates = isSelect.map((state, idx) =>
      idx === index ? true : false
    );
    setIsSelect(newStates);
  }
  return (
      <div className="flex flex-col flex-1 justify-between shadow-[4px_0_6px_rgba(0,0,0,0.1)]">
          <div className="shadow-lg justify-center  items-center flex pb-4 pt-3">
            {/* <a href="#" className='text-xl font-bold p-3'>Picture</a> */}
            <img src="https://th.bing.com/th/id/R.42e6ec3449dea58699565dd1ea96b485?rik=jEWzso5OGALO%2fw&pid=ImgRaw&r=0" className="w-40 m-2"/>
          </div>
          <div className="flex-1">
            <div className="flex-col flex py-5">
              {isSelect.map((isSelect , index) => (
                <button
                  key = {index}
                  onClick={() => Clicky(index)} 
                  className= {`text-xl p-2 ${isSelect ? 'text-red-500' : 'text-gray-900'}`}>
                  <Link to = {path[index]}> <div className="flex justify-start h-10 w-30">{text[index]}</div> </Link>
                </button>
              ))}
            </div>
          </div>
          <footer className='footer'>
            <p>Contact us</p>
            <p>tell : 099-999-9999</p>
            <p>line : @gm2</p>
          </footer>
          
        </div>
        
        
  )
}

export default Menu