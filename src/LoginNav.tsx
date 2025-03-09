import { useNavigate } from "react-router-dom";

function LoginNav() {
    const navigate = useNavigate(); 
    const loginuser = () => {
        navigate('loginuser');
    }
    const loginclub = () => {
        navigate('loginclub');
    }
    const loginadmin = () => {
        navigate('loginadmin');
    }
  return (
    <div className="flex max-sm:bg-gray-50 bg-gray-300 h-screen">
        <div className="flex flex-1 justify-center rounded-xl bg-gray-200 p-10 m-5 shadow-xl max-sm:shadow-none">
            <div className= " flex items-center justify-center">
                <div className="flex flex-col justify-center items-center max">
                    <div className="text-lg justify-center flex items-center flex-col py-2 pr-1">
                        <img src="https://th.bing.com/th/id/R.42e6ec3449dea58699565dd1ea96b485?rik=jEWzso5OGALO%2fw&pid=ImgRaw&r=0" className='w-40 h-12 object-over'/>
                        {/* Login Club */}
                    </div>
                    <button className="hover:cursor-pointer m-3 w-30 h-15 rounded-xl flex justify-center items-center shadow-xl bg-green-500 text-center text-lg text-white transition-transform transform hover:scale-110"
                        onClick={loginuser}>
                        User
                    </button>
                    <button className="hover:cursor-pointer m-3 w-30 h-15 rounded-xl flex justify-center items-center shadow-xl bg-green-500 text-center text-lg text-white transition-transform transform hover:scale-110"
                        onClick={loginclub}>
                        Club
                    </button>
                    <button className="hover:cursor-pointer m-3 w-30 h-15 rounded-xl flex justify-center items-center shadow-xl bg-green-500 text-center text-lg text-white transition-transform transform hover:scale-110"
                        onClick={loginadmin}>
                        Admin
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginNav