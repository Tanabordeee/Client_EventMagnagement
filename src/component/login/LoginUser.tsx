import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginUser() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();
    const onUserChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setUsername(e.target.value);
    };
    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setEmail(e.target.value);
    };
    const onPassChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setPassword(e.target.value);
    };
    const Clicky = async () => {
        const url = 'http://localhost:3000/api/auth/userlogin';
        try{
            const response = await axios.post(url , {
                username: username,
                email: email,
                password: password
            }, {withCredentials : true,}
            );
            
            console.log(response.data.message);
            if(response.data.message == 'Login Successfully'){
                console.log(response.data.message);
                console.log(document.cookie);
                navigate("/user");
            }
        } catch (error) {
            console.log("fail");
        } 
    };
    const regis = () => {
        navigate("/register")
    };
  return (
    <div>
        <nav className="flex items-center justify-center">
            <div className="flex justify-center items-center">
                <div className="items-center rounded-xl bg-gray-200 p-6 shadow-xl">
                    <div className="text-lg flex-col flex justify-center items-center">
                        <img src="https://th.bing.com/th/id/R.42e6ec3449dea58699565dd1ea96b485?rik=jEWzso5OGALO%2fw&pid=ImgRaw&r=0" className='w-40'/>
                        Login User
                    </div>
                    <br />
                    <div className="grid p-4">
                        <input type="text" placeholder="username" className="bg-cyan-50 rounded-lg p-2 my-2"  value={username} onChange={onUserChange}/>
                        <input type="text" placeholder="email" className="bg-cyan-50 rounded-lg p-2 my-2"  value={email} onChange={onEmailChange}/>
                        <input type="text" placeholder="password" className="bg-cyan-50 rounded-lg p-2 my-2" value={password} onChange={onPassChange}/>
                        <br />
                        <div className="flex justify-between p-1">
                            <button className="bg-slate-800 p-2 rounded-xl text-slate-50 hover:bg-stone-300 hover:text-gray-950" onClick={regis}>Register</button>
                            <button className="bg-green-500 p-2 rounded-xl text-slate-50 hover:bg-stone-300 hover:text-green-500" onClick={Clicky}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default LoginUser