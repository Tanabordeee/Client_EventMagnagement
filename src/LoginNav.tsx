import { Outlet, Link} from "react-router-dom"
import { useState } from "react"
function LoginNav() {
    const [isSelect, setIsSelect] = useState([true,false,false]);
    const text: string[] =[
        "LoginUser",
        "LoginClub",
        "LoginAdmin",
    ];
    const path: string[] = [
        "loginuser",
        "loginclub",
        "loginadmin",
    ]
    const ClickIt  = (index : number) => {
        const newStates = isSelect.map((state, idx) =>
            idx === index ? true : false
          );
          setIsSelect(newStates);
    }   
  return (
    <div className="flex justify-center items-center max-sm:bg-gray-50 bg-gray-300 h-screen">
        <div className="flex justify-center rounded-xl bg-gray-50 shadow-lg max-sm:shadow-none">
            <div className="flex justify-between px-20 py-10">
                <div><Outlet/></div>
                <div className= " flex items-center justify-center">
                    <div className="grid">
                        {isSelect.map((isActive, index) => (
                            <button
                            key={index}
                            onClick={() => ClickIt(index)}
                            className={`m-3 w-30 h-15 rounded-xl flex justify-center items-center shadow-xl ${
                                isActive ? 'bg-green-300' : 'bg-gray-300 hover:bg-green-200'
                            }`}
                            >
                            <Link to = {path[index]}> <div className="w-30 h-15 justify-center items-center flex">{text[index]}</div> </Link>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginNav