import { useEffect, useState } from "react"
import axios from "axios";
import Swal from 'sweetalert2';
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
        const url = `${import.meta.env.VITE_REACT_API_URL}users/update`;
        if(new_name != "" || new_email != "" || new_pass != "" || re_pass != ""){
            if(new_pass == re_pass){
                try{
                    const updateData: any = {};
                    if(new_name) updateData.username = new_name;
                    if(new_email) updateData.email = new_email; 
                    if(new_pass) updateData.password = new_pass;

                    const response = await axios.patch(url, updateData, {
                        withCredentials: true,
                    });
                    
                    if(response.data.username == new_name){
                        setUser({
                            username : response.data.username,
                            userId : response.data.userId
                        })
                        setNew_name('');
                        setNew_email('');
                        setNew_pass('');
                        setRe_pass('');
                        Swal.fire({
                          title: 'สำเร็จ!',
                          text: 'อัพเดทข้อมูลเรียบร้อยแล้ว',
                          icon: 'success',
                          confirmButtonText: 'ตกลง'
                        });
                    }
                    
                } catch (error) {
                    console.log("fail", error);
                    setNew_name('');
                    setNew_email('');
                    setNew_pass('');
                    setRe_pass('');
                } 
            }else{
                setNew_pass('');
                setRe_pass('');
            }
        }
    };
    useEffect(() => {
        const url = `${import.meta.env.VITE_REACT_API_URL}users/profile`;
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
  return (
    <div className='flex-1 relative'>
        <div className="flex flex-1 justify-center text-4xl font-bold p-5">
            <h1>Setting</h1>
        </div>
            <div className="flex flex-1 justify-center p-6">
                <div className=" flex max-sm:flex-col">
                    <div className='flex flex-col justify-center items-center p-5 lg:px-18'>
                        <img src="https://img2.pic.in.th/pic/human-icon-symbol-design-illustration-vector.jpg" className="w-50 h-60 rounded-xl object-cover"/>
                        <h1 className="flex justify-center text-2xl font-bold">{user.username}</h1>
                    </div>
                    <div className="flex flex-col p-5 lg:px-18">
                        <div className="bg-[#E7E9EC] m-1 rounded-xl px-3 py-2"><input type="text" placeholder="new-username" value={new_name} onChange={onChangeNewname}/></div>
                        <div className="bg-[#E7E9EC] m-1 rounded-xl px-3 py-2"><input type="text" placeholder="new-email" value={new_email} onChange={onChangeNewemail}/></div>
                        <div className="bg-[#E7E9EC] m-1 rounded-xl px-3 py-2"><input type="password" placeholder="new-password" value={new_pass} onChange={onChangeNewpass}/></div>
                        <div className="bg-[#E7E9EC] m-1 rounded-xl px-3 py-2"><input type="password" placeholder="re-password" value={re_pass} onChange={onChangeRepass}/></div>
                        <div className="flex">
                            <button className="flex justify-center items-center ml-auto bg-green-500 m-2 rounded-xl px-4 py-2 text-gray-50 hover:bg-green-300" onClick={Clicky}>save</button>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Setting