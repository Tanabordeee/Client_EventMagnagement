import { useEffect, useState } from "react"
import Filter from "./user/Filter";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import ClubMenu from "./club/ClubMenu";

type Props = {
  clicker : boolean;
}
function Search_club({clicker}: Props) {
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
    <div className="flex">
      <div className={`${isclick ? "" : "hidden"}`}>
        <div className="flex min-h-screen h-full">
          <ClubMenu />
        </div>
      </div>
      <div className = "flex flex-1" onClick={isclick? click : undefined}>
        <div className={`flex-1 ${isclick? 'pointer-events-none': ''}`} >
          <div className="flex">
            <div className="flex flex-1 items-center justify-between p-3 shadow-lg">
              <div className="flex items-center">
                <div className={`sm:hidden ${isclick ? "hidden" : ""}`}>
                  <div className="pt-2" onClick={click}>
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
                      className="absolute left-2 top-0 mx-1 rounded-xl bg-gray-200 pl-15 py-1 shadow-lg w-50"
                    />
                    <button className="absolute left-2 top-0 rounded-xl bg-green-300 px-2 py-1 pb-2 text-sm shadow-lg">
                      search
                    </button>
                  </div>
                </div>
              </div>
              <div className="fucntion">
                <div className="flex p-2">
                  <p className="p-2">history</p>
                  <p className="p-2">
                    <Link to="notification">Notification</Link>
                  </p>
                  <p className="p-2">
                    <Link to="setting">Profile</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={`min-h-full ${isclick ? "opacity-20 pointer-events-none" : ""}`}>
            <Outlet/>
          </div>
        </div>
      </div>
    
  </div>
  )
}

export default Search_club