import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function RegisUser() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
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
    const onRepassChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setRepassword(e.target.value);
    };
    const Clicky = async () => {
        // const url = 'http://localhost:3000/api/users/register';
        const url = `${import.meta.env.VITE_REACT_API_URL}users/register`;
        if(password == repassword){
            try{
                const response = await axios.post(url , {
                    username: username,
                    email: email,
                    password: password
                }, {withCredentials : true,}
                );
                
                console.log(response.data.message);
                if(response.data.username == username){
                    console.log(response.data.message);
                    console.log(document.cookie);
                    navigate("/");
                }
            } catch (error) {
                console.log("fail");
                setPassword('');
                setRepassword('');
            } 
        }
        
    };
    const back = () => {
        navigate("/");
    }
  return (
    <div>
         <nav className="flex items-center justify-center">
            <div className="flex justify-center items-center">
                <div className="items-center  rounded-xl bg-gray-200 p-6 shadow-lg">
                    <div className="text-lg justify-center flex items-center flex-col">
                        <div className="text-lg justify-center flex items-center flex-col">
                            <img src="https://th.bing.com/th/id/R.42e6ec3449dea58699565dd1ea96b485?rik=jEWzso5OGALO%2fw&pid=ImgRaw&r=0" className='w-40'/>
                            {/* Register User */}
                        </div>
                        <br />
                        <div className="grid p-4">
                            {/* username */}
                            <input type="text" placeholder="username" className="bg-cyan-50 rounded-lg p-2 my-2"  value={username} onChange={onUserChange}/>
                            {/* email */}
                            <input type="text" placeholder="email" className="bg-cyan-50 rounded-lg p-2 my-2"  value={email} onChange={onEmailChange}/>
                            {/* password */}
                            <input type="text" placeholder="password" className="bg-cyan-50 rounded-lg p-2 my-2" value={password} onChange={onPassChange}/>
                            {/* password */}
                            <input type="text" placeholder="re-password" className="bg-cyan-50 rounded-lg p-2 my-2" value={repassword} onChange={onRepassChange}/>
                            <br />
                            <div className="flex justify-between p-1">
                                <button className="p-2 rounded-xl text-red-600 hover:text-red-400" onClick={back}>Back</button>
                                <button className="bg-green-500 p-2 rounded-xl text-slate-50 hover:bg-stone-300 hover:text-green-500" onClick={Clicky}>Register</button>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default RegisUser