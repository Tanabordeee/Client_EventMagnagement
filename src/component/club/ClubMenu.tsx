import { Link } from "react-router-dom"
import { useState } from "react"
function ClubMenu() {
  const text: string[] = [
    "Event",
    "History",
    "List",
  ]
  const path: string[] = [
    "addevent",
    "historyadd",
    "list",
  ]
  const [isSelect, setIsSelect] = useState([true, false, false, false]);
  const Clicky = (index: number) => {
    const newStates = isSelect.map((state, idx) =>
      idx === index ? true : false
    );
    setIsSelect(newStates);
  }
  return (
    <div className="flex-1">
        <div className="flex flex-col justify-between h-screen shadow-[4px_0_6px_rgba(0,0,0,0.1)]">
          <div className="shadow-lg justify-center  items-center flex pb-7">
            <a href="#" className='text-xl font-bold p-3'>Picture</a>
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
        
    </div>
  )
}

export default ClubMenu