import Menu from './component/user/Menu.tsx'
import Search_bar from './component/Search_bar.tsx'
import { useState } from 'react'

function User() {
  const [isclick ,setIsclick] = useState(false);
  const click = () => {
    setIsclick(!isclick);
  }
  // const {user, setUser} = useAuth();
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
        <div className="flex-1">
          <div className= {`flex flex-col flex-1 bg-zinc-200 min-h-screen`} >
            <Search_bar clicker = {isclick}/>
          </div>
        </div>
        
      </div>
  )
}

export default User