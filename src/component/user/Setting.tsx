import { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface User {
    username : string;
    userId : string;
}
const Setting = () => {
    const [new_name, setNew_name] = useState('');
    const [new_email, setNew_email] = useState('');
    const [new_pass, setNew_pass] = useState('');
    const [re_pass, setRe_pass] = useState('');
    const [user, setUser] = useState<User>({
        username : '',
        userId : ''
    });
    const navigator = useNavigate();
    const onChangeNewname = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNew_name(e.target.value);
    };
    const onChangeNewemail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNew_email(e.target.value);
    };
    const onChangeNewpass = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNew_pass(e.target.value);
    };
    const onChangeRepass = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRe_pass(e.target.value);
    };
    const Clicky = async () => {
        const url = 'http://localhost:3000/api/users/update';
        const login = 'http://localhost:3000/api/auth/userlogin';
        if(new_name != "" || new_email != "" || new_pass != "" || re_pass != ""){
            if(new_pass == re_pass){
                try{
                    const response = await axios.patch(url , {
                        username: new_name,
                        email: new_email,
                        password: new_pass
                    }, {withCredentials : true,}
                    );
                    
                    console.log(response.data);
                    if(response.data.username == new_name){
                        console.log(document.cookie);
                        setNew_name('');
                        setNew_email('');
                        setNew_pass('');
                        setRe_pass('');
                        getuser();
                    }
                } catch (error) {
                    console.log("fail", error);
                    setNew_name('');
                    setNew_email('');
                    setNew_pass('');
                    setRe_pass('');
                } 
            }else{
                console.log("wrong pass");
                setNew_pass('');
                setRe_pass('');
            }
        }
    };
    const getuser = () => {
        useEffect(() => {
            const url = 'http://localhost:3000/api/users/profile';
            const fetchuser = async() => {
                try{
                    const respon = await axios.get(url, {withCredentials : true});
                    setUser(respon.data);
                }catch(error){
                    console.log("error : " , error);
                    // navigator("/")
                }
            };
            fetchuser();
        }, []);
    }
    getuser();
  return (
    <div className='flex-1'>
        <div className="flex flex-1 justify-center text-2xl font-bold p-5">
            <h1>Setting</h1>
        </div>
            <div className="flex flex-1 justify-center p-6">
                <div className="bg-gray-200 rounded-lg shadow-lg flex max-sm:flex-col max-sm:bg-inherit">
                    <div className='flex flex-col justify-center p-5'>
                        <h1 className="flex justify-center">Picture</h1>
                        <h1 className="flex justify-center">{user.username}</h1>
                        <h1 className="flex justify-center">{user.userId}</h1>
                    </div>
                    <div className="flex flex-col p-5">
                        <div className="max-sm:bg-gray-200 bg-white m-1 rounded-xl px-2 py-1"><input type="text" placeholder="new-username" value={new_name} onChange={onChangeNewname}/></div>
                        <div className="max-sm:bg-gray-200 bg-white m-1 rounded-xl px-2 py-1"><input type="text" placeholder="new-email" value={new_email} onChange={onChangeNewemail}/></div>
                        <div className="max-sm:bg-gray-200 bg-white m-1 rounded-xl px-2 py-1"><input type="text" placeholder="new-password" value={new_pass} onChange={onChangeNewpass}/></div>
                        <div className="max-sm:bg-gray-200 bg-white m-1 rounded-xl px-2 py-1"><input type="text" placeholder="re-password" value={re_pass} onChange={onChangeRepass}/></div>
                        <div className="flex">
                            <button className="flex justify-center items-center ml-auto bg-green-500 m-2 rounded-xl px-2 text-gray-50 hover:bg-green-300" onClick={Clicky}>save</button>
                        </div>
                    </div>
                </div>
                
            </div>
    </div>
  )
}

export default Setting