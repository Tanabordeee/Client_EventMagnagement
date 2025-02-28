import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function LoginAdmin() {
    const [adminname, setAdminname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();
    const onAdminChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setAdminname(e.target.value);
    };
    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setEmail(e.target.value);
    };
    const onPassChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setPassword(e.target.value);
    };
    const Clicky = async () => {
        const url = 'http://localhost:3000/api/auth/adminlogin';
        console.log(adminname);
        console.log(email);
        console.log(password);
        try{
            const response = await axios.post(url , {
                adminName: adminname,
                email: email,
                password: password
            }, {withCredentials : true,}
            );
            
            console.log(response.data.message);
            if(response.data.message == 'Login Successfully'){
                console.log(response.data.message);
                console.log(document.cookie);
                navigate("/admin");
            }
        } catch (error) {
            console.log("fail");
        } 
    };
  return (
    <div>
        <nav className="flex items-center justify-center">
            <div className="flex justify-center items-center">
                <div className="items-center  rounded-xl bg-gray-200 p-6 shadow-lg">
                    <div className="text-lg justify-center flex items-center flex-col">
                        <img src="https://th.bing.com/th/id/R.42e6ec3449dea58699565dd1ea96b485?rik=jEWzso5OGALO%2fw&pid=ImgRaw&r=0" className='w-40'/>
                        Login Admin
                    </div>
                    <br />
                    <div className="grid p-4">
                        {/* adminname */}
                        <input type="text" placeholder="adminname" className="bg-cyan-50 rounded-lg p-2 my-2" onChange={onAdminChange}/>
                        {/* email */}
                        <input type="text" placeholder="email" className="bg-cyan-50 rounded-lg p-2 my-2" onChange={onEmailChange}/>
                        {/* password */}
                        <input type="text" placeholder="password" className="bg-cyan-50 rounded-lg p-2 my-2" onChange={onPassChange}/>
                        <br />
                        <div className="flex justify-end p-1">
                            {/* <button className="bg-slate-800 p-2 rounded-xl text-slate-50 hover:bg-stone-300 hover:text-gray-950">Register</button> */}
                            <button className="bg-green-500 p-2 rounded-xl text-slate-50 hover:bg-stone-300 hover:text-green-500" onClick={Clicky}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default LoginAdmin