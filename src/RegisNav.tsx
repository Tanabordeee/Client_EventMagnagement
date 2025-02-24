import { useState } from "react";
import { Outlet , Link} from "react-router-dom";
function RegisNav() {
    const [regisSelect, setRegisSelect] = useState([true,false]);
    const text: string[] =[
        "RegisterUser",
        "RegisterClub",
    ];
    const path: string[] = [
        "regisuser",
        "regisclub",
    ];
    const ClickIt  = (index : number) => {
        const newStates = regisSelect.map((state, idx) =>
            idx === index ? true : false
            );
            setRegisSelect(newStates);
    }   
  return (
    <div>
        <div className="flex justify-center">
            <div className="flex">
                <div><Outlet/></div>
                <div className= " flex items-center justify-center">
                    <div className="grid">
                        {regisSelect.map((isActive, index) => (
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

export default RegisNav