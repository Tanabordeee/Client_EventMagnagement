import Search_bar from "./component/Search_bar"
import { Outlet } from "react-router-dom"
import ClubFunc from "./component/club/ClubFunc"
import ClubMenu from "./component/club/ClubMenu"
import { useState } from "react"
import Search_nofil from "./component/Search_nofil"
function Club() {
  const [isclick ,setIsclick] = useState(false);
  const click = () => {
    setIsclick(!isclick);
  }
  return (
    <div className="flex" onClick={isclick? click : undefined}>
      <div className="flex">
        <div className="flex flex-col max-sm:hidden">
            <ClubMenu/>
        </div>
        <div className= {`flex sm:hidden relative ${isclick? '' : 'hidden'}`}>
              <div className="flex flex-col"><ClubMenu/></div>
              <button className='absolute mx-20 my-10' onClick={click}>cancle</button>
            </div>
      </div>
      <div className = "flex-1" >
        <div className= {`flex flex-col flex-1 bg-zinc-200 min-h-screen `}>
          <Search_nofil clicker = {isclick}/>
        </div>
      </div>
    </div>
  )
}

export default Club