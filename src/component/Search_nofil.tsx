import { useEffect, useState } from "react"
import Filter from "./user/Filter";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

type Props = {
  clicker : boolean;
}
function Search_nofil({clicker} : Props) {
    const [search, setSearch] = useState('');
    const {user} = useAuth();
    const [isclick , setIsclick] = useState(clicker)
    const navigate = useNavigate();
    useEffect(() => {
      // if(!user){
      //   navigate("/");
      // }
    }, [])
    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) =>{
      setSearch(e.target.value);
    };
    const click = () => {
      setIsclick(!isclick);
    }
    return (
      <div>
        <div className="flex">
          <div className="flex justify-between flex-1 items-center p-3 shadow-lg">
            <div className='flex items-center'>
              <div className= {`sm:hidden ${isclick? 'hidden' : ''}`}>
                <div className= "pt-2" onClick={click}>
                  <div className="w-8 h-1 bg-gray-400 m-1 rounded-2xl"></div>
                  <div className="w-8 h-1 bg-gray-400 m-1 rounded-2xl"></div>
                  <div className="w-8 h-1 bg-gray-400 m-1 rounded-2xl"></div>
                </div>
              </div>
              <div className="topbar">
                <div className="flex  relative">
                    <input type="text" placeholder="search" value={search} onChange={onChangeSearch} className="bg-gray-200 rounded-xl pl-15 py-1 shadow-lg mx-2"/>
                    <button className="rounded-xl bg-green-300 px-2 text-sm shadow-lg absolute left-2 top-0 p-1 pb-2">search</button>
                </div>
              </div>
            </div>
              <div className="fucntion">
                  <div className="flex p-2">
                      <p className='p-2'>history</p>
                      <p className='p-2'><Link to = "notification">Notification</Link></p>
                      <p className='p-2'><Link to = "setting">Profile</Link></p>
                  </div>
              </div>
            </div> 
          </div>
        
        <div className={`min-h-full bg-gray-50 m-3 rounded-xl shadow-xl ${isclick? 'opacity-20 pointer-events-none': ''}`}>
            <Outlet/>
          </div>
      </div>
      
  )
}

export default Search_nofil