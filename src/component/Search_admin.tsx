import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom";
import AdminMenu from "./admin/AdminMenu";
import { Search } from "lucide-react";
import axios from "axios";

type Props = {
  clicker : boolean;
}
function Search_admin
({clicker} : Props) {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const [isclick , setIsclick] = useState(clicker)
    const [gosearch, setGosearch] = useState('')
    useEffect(() => {
      const user = localStorage.getItem('admin')
      if(!user){
        navigate("/");
        return;
      }
      const verifyUser = async () => {
        try {
          const response = await axios.post(`${import.meta.env.VITE_REACT_API_URL}auth/verifyadmin`, { adminID : user });
  
          if (!response.data.isValid) {
            navigate("/"); 
          }
        } catch (error) {
          console.error("Error verifying admin:", error);
          navigate("/");
        }
      };
      verifyUser();
    }, []);
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
    const logout = ()=>{
      localStorage.removeItem("admin");
      navigate("/");
    }
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        searching();
      }
    };
    return (
      <div className="flex">
      <div className={`sm:hidden ${isclick ? "" : "hidden"}`}>
        <div className="flex min-h-screen h-full">
          <AdminMenu />
        </div>
      </div>
      <div className = "flex flex-1" onClick={isclick? click : undefined}>
        <div className={`flex-1 ${isclick? 'pointer-events-none': ''}`} >
          <div className="flex">
            <div className="flex flex-1 items-center justify-between p-3 shadow-lg bg-[#E7E9EC]">
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
                      onKeyPress={handleKeyPress}
                      className="absolute left-2 top-0 mx-1 rounded-xl bg-white pl-8 py-1 shadow-lg w-90 max-md:w-40"
                    />
                    <button className="absolute left-2 top-0 backdrop-opacity-0 px-2 py-1 pb-2 text-sm" onClick={searching}>
                      <Search size={20} className="text-gray-500 mt-1 transition-transform transform hover:scale-125 hover:text-black hover:cursor-pointer" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="fucntion">
                <div className="flex p-2">
                  <button className="p-2 rounded-xl text-sm pointer-events-auto hover:text-red-400 mt-2 cursor-pointer" onClick={logout}>LOG OUT</button>
                </div>
              </div>
            </div>
          </div>

          <div className={` bg-gray-50 max-md:m-4 rounded-3xl shadow-xl m-8 ${isclick ? "max-sm:opacity-20" : ""}`}>
            <Outlet context={gosearch}/>
          </div>
        </div>
      </div>
    
  </div>
      
  )
}

export default Search_admin
