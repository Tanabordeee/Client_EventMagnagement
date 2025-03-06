import AdminMenu from './component/admin/AdminMenu'
import Search_bar from './component/Search_bar'
import Function from './component/Function'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Search_nofil from './component/Search_admin'
import Search_admin from './component/Search_admin'
function Admin() {
  const [isclick ,setIsclick] = useState(false);
  const click = () => {
    setIsclick(!isclick);
  }
  return (
    <div className="flex" onClick={isclick? click : undefined}>
      <div className='flex'>
        <div className="flex flex-col max-sm:hidden">
            <AdminMenu/>
        </div>
        <div className= {`flex sm:hidden relative ${isclick? '' : 'hidden'}`}>
              <div className="flex flex-col"><AdminMenu/></div>
              <button className='absolute mx-20 my-10' onClick={click}>cancle</button>
            </div>
      </div>
      <div className='flex-1' >
        <div className= {`flex flex-col flex-1 bg-zinc-200 min-h-screen `}>
          <Search_admin clicker = {isclick}/>
        </div>
      </div>
    </div>
  )
}

export default Admin