import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../AuthContext";

function LoginClub() {
    const [club, setClub] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, setUser } = useAuth(); 
    let navigate = useNavigate();
    const onClubChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setClub(e.target.value);
    };
    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setEmail(e.target.value);
    };
    const onPassChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setPassword(e.target.value);
    };
    useEffect(() => {
        if (user) {
            // navigate('/club');
        }
        }, [user, navigate]);
    const Clicky = async () => {
        const url = `${import.meta.env.VITE_REACT_API_URL}auth/clublogin`;
        try{
            const response = await axios.post(url , {
                club,
                email,
                password
            }, {withCredentials : true,}
            );
            setUser(response.data.user);
            if(response.data.message == 'Login Successfully'){
                console.log(response.data.message);
                console.log(document.cookie);
                navigate("/club");
            }
        } catch (error) {
            setClub('')
            setEmail('')
            setPassword('')
        } 
    };
    const regis = () => {
        navigate("/regisclub")
    };
    const selectLogin =() => {
        navigate('/')
    }
  return (
    <div>
    <nav className="flex justify-center min-h-screen bg-gray-300 max-sm:bg-gray-50 relative">
        <div className="flex flex-1 justify-center items-center bg-gray-50 shasow-xl rounded-xl m-4 ">
            <div className="items-center rounded-xl p-6  max-sm:bg-gray-200">
                <div className="text-lg justify-center flex items-center flex-col">
                    <img src="https://th.bing.com/th/id/R.42e6ec3449dea58699565dd1ea96b485?rik=jEWzso5OGALO%2fw&pid=ImgRaw&r=0" className='w-40'/>
                    {/* Login Club */}
                </div>
                <br />
                <div className="grid p-4">
                    {/* username */}
                    <input type="text" placeholder="clubname" className="bg-gray-200 max-sm:bg-gray-50 rounded-lg p-2 my-2 transition-transform transform hover:scale-110" onChange={onClubChange}/>
                    {/* email */}
                    <input type="text" placeholder="email" className="bg-gray-200 max-sm:bg-gray-50 rounded-lg p-2 my-2 transition-transform transform hover:scale-110" onChange={onEmailChange}/>
                    {/* password */}
                    <input type="password" placeholder="password" className="bg-gray-200 max-sm:bg-gray-50 rounded-lg p-2 my-2 transition-transform transform hover:scale-110" onChange={onPassChange}/>
                    <br />
                    <div className="flex justify-between p-1">
                        <button className="hover:cursor-pointer bg-slate-800 p-2 rounded-xl text-slate-50 hover:bg-stone-300 hover:text-gray-950" 
                            onClick={regis}>
                            Register
                        </button>
                        <button className="hover:cursor-pointer bg-green-500 p-2 rounded-xl text-slate-50 hover:bg-stone-300 hover:text-green-500" 
                            onClick={Clicky}>
                            Login
                        </button>
                    </div>
                    <button className="hover:cursor-pointer absolute bottom-10 left-10 text-xl text-red-500"
                    onClick={selectLogin}>back</button>
                </div>
            </div>
        </div>
    </nav>
</div>
  )
}

export default LoginClub