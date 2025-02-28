import Search_bar from "./component/Search_bar"
import { Outlet } from "react-router-dom"
import ClubFunc from "./component/club/ClubFunc"
import ClubMenu from "./component/club/ClubMenu"
import { useState } from "react"
function Club() {
  const [isclick ,setIsclick] = useState(false);
  const click = () => {
    setIsclick(!isclick);
  }
  return (
    <div className="flex">
      <div>
        <div className="flex flex-col max-sm:hidden">
            <ClubMenu/>
        </div>
        <div className= {`flex sm:hidden relative ${isclick? '' : 'hidden'}`}>
              <div className="flex flex-col"><ClubMenu/></div>
              <button className='absolute mx-20 my-10' onClick={click}>cancle</button>
            </div>
      </div>
      <div className = "flex-1" onClick={isclick? click : undefined}>
        <div className= {`flex flex-col flex-1 bg-zinc-200 min-h-screen ${isclick? 'opacity-40 pointer-events-none': 'bg-black'}`}>
            <div className="flex justify-between items-center p-3 shadow-lg ">
              <div className='flex items-center'>
                <div className="sm:hidden">
                  <button className= {`pt-2${isclick? 'hidden' : ''}`} onClick={click}>
                    <div className="w-8 h-1 bg-gray-400 m-1 rounded-2xl"></div>
                    <div className="w-8 h-1 bg-gray-400 m-1 rounded-2xl"></div>
                    <div className="w-8 h-1 bg-gray-400 m-1 rounded-2xl"></div>
                  </button>
                </div>
              <Search_bar/>
              </div>
              <ClubFunc/>
            </div>
            <div className="flex justify-between pt-2 gap-2">
                <div className="rounded-xl bg-gray-50 flex-1 m-2">
                  <Outlet/>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Club