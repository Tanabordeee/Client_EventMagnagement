import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom";
import AdminMenu from "./admin/AdminMenu";
import { Search } from "lucide-react";

type Props = {
  clicker : boolean;
}
function Search_admin
({clicker} : Props) {
    const [search, setSearch] = useState('');
    const [isclick , setIsclick] = useState(clicker)
    const [gosearch, setGosearch] = useState('')
    const profil_icon = 'https://img.icons8.com/windows/32/user-male-circle.png'
    const history_icon = 'https://img.icons8.com/material-rounded/24/time-machine.png'
    const noti_icon = 'https://img.icons8.com/windows/32/appointment-reminders--v1.png'
    useEffect(() => {

      // if(!user){
      //   // navigate("/");
      // }
    }, [])
    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) =>{
      setSearch(e.target.value);
    };
    const click = () => {
      setIsclick(!isclick);
    }
    const searching = () => {
      setGosearch(search);
      setSearch('');
    }
    return (
      <div className="flex">
      <div className={`${isclick ? "" : "hidden"}`}>
        <div className="flex min-h-screen h-full">
          <AdminMenu />
        </div>
      </div>
      <div className = "flex flex-1" onClick={isclick? click : undefined}>
        <div className={`flex-1 ${isclick? 'pointer-events-none': ''}`} >
          <div className="flex">
            <div className="flex flex-1 items-center justify-between p-3 shadow-lg">
              <div className="flex items-center">
                <div className={`sm:hidden ${isclick ? "hidden" : ""}`}>
                  <div className="pt-2 transition-transform transform hover:scale-125" onClick={click}>
                    <div className="m-1 h-1 w-8 rounded-2xl bg-gray-400"></div>
                    <div className="m-1 h-1 w-8 rounded-2xl bg-gray-400"></div>
                    <div className="m-1 h-1 w-8 rounded-2xl bg-gray-400"></div>
                  </div>
                </div>
                <div className="topbar">
                  <div className="relative flex mb-6">
                    <input
                      type="text"
                      placeholder="search"
                      value={search}
                      onChange={onChangeSearch}
                      className="absolute left-2 top-0 mx-1 rounded-xl bg-gray-200 pl-8 py-1 shadow-lg w-50"
                    />
                    <button className="absolute left-2 top-0 backdrop-opacity-0 px-2 py-1 pb-2 text-sm" onClick={searching}>
                      <Search size={20} className="text-gray-500 mt-1 transition-transform transform hover:scale-125 hover:text-black hover:cursor-pointer" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="fucntion">
                <div className="flex p-2">
                  <p className="p-2">
                    <img src={noti_icon} className="w-6 mt-2 object-cover"/>
                  </p>
                  <p className="p-2">
                    <img src={history_icon} className="w-6 mt-2 object-cover"/>
                  </p>
                  <p className="p-2">
                    <img src={profil_icon} className="w-6 mt-2 object-cover"/>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={`min-h-full bg-gray-50 m-2 rounded-xl shadow-xl ${isclick ? "opacity-20 pointer-events-none" : ""}`}>
            <Outlet context={gosearch}/>
          </div>
        </div>
      </div>
    
  </div>
      
  )
}

export default Search_admin
