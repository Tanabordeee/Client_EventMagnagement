import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
function AdminMenu() {
  const text: string[] = [
    "Home",
    "Manage",
  ]
  const logo: string[] = [
    "https://img.icons8.com/windows/32/today.png",
    "https://img.icons8.com/windows/32/users-settings.png",
  ]
  const path: string[] = [
    "adminhome", 
    "manage",
  ]
  const [isSelect, setIsSelect] = useState([true, false]);
  const Clicky = (index: number) => {
    const newStates = isSelect.map((_, idx) =>
      idx === index ? true : false
    );
    setIsSelect(newStates);
  }
  const navigate = useNavigate();
  const logout = async() => {
    const url_logout = `${import.meta.env.VITE_REACT_API_URL}auth/logout`;
    try{
      await axios.post(url_logout, {}, {withCredentials  : true})
      navigate('/')
    }catch(error){
      console.log(error);
    }
  }
  return (
    <div className="flex flex-col justify-between flex-1 shadow-[4px_0_6px_rgba(0,0,0,0.1)]">
        <div className="shadow-lg justify-center  items-center flex pb-4 pt-3">
          <img src="https://th.bing.com/th/id/R.42e6ec3449dea58699565dd1ea96b485?rik=jEWzso5OGALO%2fw&pid=ImgRaw&r=0" className="w-40 m-2" onClick={logout}/>
        </div>
        <div className="flex-1">
          <div className="flex-col flex py-5 mr-5">
            {isSelect.map((isSelect , index) => (
              <button
                key = {index}
                onClick={() => Clicky(index)} 
                className= {`text-xl p-2 ${isSelect ? 'text-red-500' : 'text-gray-900'}`}>
                <Link to = {path[index]}> <div className="flex transition-transform transform hover:scale-110"><img src= {logo[index]} className="w-6 h-6 mt-2 mx-2 object-cover" /><div className="flex justify-start h-10 w-30 mt-1">{text[index]}</div></div> </Link>
              </button>
            ))}
          </div>
        </div>
        <footer className='footer'>
          <p>Contact us</p>
          <p>tell : 099-999-9999</p>
          <p>line : @gm2</p>
        </footer>
        
      </div>
  )
}

export default AdminMenu