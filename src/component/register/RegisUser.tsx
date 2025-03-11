import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function RegisUser() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    let navigate = useNavigate();
    const [succ, setSucc] = useState(false);
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
                    regissucc();
                }
            } catch (error) {
                console.log("fail");
                setUsername('');
                setEmail('');
                setPassword('');
                setRepassword('');
            } 
        }else{
            setPassword('');
            setRepassword('');
        }
        
    };
    const back = () => {
        navigate("/loginuser");
    }
    const regissucc = () => {
        setSucc(true);
        setTimeout(() => {
            setSucc(false);
            navigate('/loginuser');
        },3000)
    }
  return (
    <div>
         <nav className="flex justify-center min-h-screen bg-gray-300 max-sm:bg-gray-50 relative">
            <div className="flex flex-1 justify-center items-center bg-gray-50 shasow-xl rounded-xl m-4 ">
                <div className="items-center rounded-xl p-6  max-sm:bg-gray-200">
                    <div className="text-lg justify-center flex items-center flex-col">
                        <div className="text-lg justify-center flex items-center flex-col">
                            <img src="https://th.bing.com/th/id/R.42e6ec3449dea58699565dd1ea96b485?rik=jEWzso5OGALO%2fw&pid=ImgRaw&r=0" className='w-40'/>
                            {/* Register User */}
                        </div>
                        <br />
                        <div className="grid p-4">
                            {/* username */}
                            <input type="text" placeholder="username" className="bg-gray-200 max-sm:bg-gray-50 rounded-lg p-2 my-2 transition-transform transform hover:scale-110"  value={username} onChange={onUserChange}/>
                            {/* email */}
                            <input type="text" placeholder="email" className="bg-gray-200 max-sm:bg-gray-50 rounded-lg p-2 my-2 transition-transform transform hover:scale-110"  value={email} onChange={onEmailChange}/>
                            {/* password */}
                            <input type="password" placeholder="password" className="bg-gray-200 max-sm:bg-gray-50 rounded-lg p-2 my-2 transition-transform transform hover:scale-110" value={password} onChange={onPassChange}/>
                            {/* password */}
                            <input type="password" placeholder="re-password" className="bg-gray-200 max-sm:bg-gray-50 rounded-lg p-2 my-2 transition-transform transform hover:scale-110" value={repassword} onChange={onRepassChange}/>
                            <br />
                            <div className="flex justify-between p-1">
                                <button className="hover:cursor-pointer p-2 rounded-xl text-red-600 hover:text-red-400" onClick={back}>Back</button>
                                <button className="hover:cursor-pointer bg-green-500 p-2 rounded-xl text-slate-50 hover:bg-stone-300 hover:text-green-500" onClick={Clicky}>Register</button>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            <div className= {`flex flex-col absolute bg-gray-50 shadow-xl backdrop:opacity-20 p-15 top-35 rounded-xl ${succ? '' : 'hidden'}`}>
                <img width="150" height="150" src="https://img.icons8.com/ios-filled/150/40C057/ok--v1.png" alt="ok--v1"/>
               <div className="flex justify-center">Already sent</div>
            </div>
        </nav>
    </div>
  )
}

export default RegisUser