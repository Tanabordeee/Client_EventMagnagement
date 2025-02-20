import axios from 'axios';
import { useEffect, useState } from 'react';
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
        console.log(username);
        console.log(email);
        console.log(password);
        
        const url = 'http://localhost:3000/api/auth/userlogin';
        try{
            const response = await axios.post(url , {
                username: username,
                email: email,
                password: password
            });
            
            console.log(response.data.message);
            if(response.data.message == 'Login Successfully'){
                console.log(response.data.message);
                navigate("/user");
            }
        } catch (error) {
            console.log("fail");
        } 
    }
    // useEffect(() => {
    //     const url = 'http://localhost:3000/api/auth/userlogin';
    //     try{
    //         axios.post(url , {
    //             username:"wave",
    //             email:"wave@55.com",
    //             password:"wave2"
    //         });
    //     } catch (error) {
    //         console.log("error");
    //     }
    // }, []);
    // const [id, setIdPoke] = useState();
    // useEffect(() => {
    //     const url = 'http://localhost:3000/api/event/byuser';
    //     axios.get(url)
    //         .then((response) => {
    //             console.log(response.data.id);
    //             setIdPoke(response.data.id);
    //         });
    // }, []);
  return (
    <div>
        <nav className="h-screen flex items-center justify-center">
            <div className="flex justify-center items-center">
                <div className="items-center  rounded-xl bg-cyan-100 p-6 shadow-lg">
                    <div className="font-bold text-2xl justify-center flex">
                        Login User
                    </div>
                    <br />
                    <div className="grid p-4">
                        username
                        <input type="text" placeholder="username" className="bg-cyan-50 rounded-lg pl-1"  value={username} onChange={onUserChange}/>
                        email
                        <input type="text" placeholder="email" className="bg-cyan-50 rounded-lg pl-1"  value={email} onChange={onEmailChange}/>
                        password
                        <input type="text" placeholder="password" className="bg-cyan-50 rounded-lg pl-1" value={password} onChange={onPassChange}/>
                        <br />
                        <div className="flex justify-between p-1">
                            <button className="bg-slate-800 p-2 rounded-xl text-slate-50 hover:bg-stone-300 hover:text-gray-950">Register</button>
                            <button className="bg-green-500 p-2 rounded-xl text-slate-50 hover:bg-stone-300 hover:text-green-500" onClick={Clicky}>Login</button>
                        </div>
                    </div>
                </div>
                {/* <div className="text-xl text-red-500">{id}</div> */}
            </div>
        </nav>
    </div>
  )
}

export default LoginUser