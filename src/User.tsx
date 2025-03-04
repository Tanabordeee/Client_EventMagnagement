import Menu from './component/user/Menu.tsx'
import Search_bar from './component/Search_bar.tsx'
import Function from './component/Function.tsx'
import Filter from './component/user/Filter.tsx'
import {Route, Outlet} from 'react-router'
import { useState } from 'react'

function User() {
  const [isclick ,setIsclick] = useState(false);
  const click = () => {
    setIsclick(!isclick);
  }
  return (
    <div className= "flex" onClick={isclick? click : undefined}>
        <div className="flex">
            <div className="flex flex-col max-sm:hidden">
              <Menu/>
            </div>
            <div className= {`flex sm:hidden relative ${isclick? '' : 'hidden'}`}>
              <div className="flex flex-col"><Menu/></div>
              <button className='absolute mx-20 my-10' onClick={click}>cancle</button>
            </div>
        </div>
        <div className= {`flex flex-col flex-1 bg-zinc-200 min-h-screen`} >
          <div className="flex justify-between items-center p-3 shadow-lg ">
            <div className='flex items-center'>
              <div className= {`sm:hidden ${isclick? 'hidden' : ''}`}>
                <div className= "pt-2" onClick={click}>
                  <div className="w-8 h-1 bg-gray-400 m-1 rounded-2xl"></div>
                  <div className="w-8 h-1 bg-gray-400 m-1 rounded-2xl"></div>
                  <div className="w-8 h-1 bg-gray-400 m-1 rounded-2xl"></div>
                </div>
              </div>
              <Search_bar/>
            </div>
            <Function/>
          </div>
          <div className={`min-h-full ${isclick? 'opacity-20 pointer-events-none': ''}`}>
            <Filter/>
          </div>
          
        </div>
      </div>
  )
}

export default User