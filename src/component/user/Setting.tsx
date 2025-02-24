import { useState } from "react"
const Setting = () => {
    const [new_name, setNew_name] = useState('');
    const [new_email, setNew_email] = useState('');
    const [new_pass, setNew_pass] = useState('');
    const [re_pass, setRe_pass] = useState('');
    const onChangeNewname = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNew_name(e.target.value);
        console.log(e.target.value);
    };
    const onChangeNewemail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNew_email(e.target.value);
        console.log(e.target.value);
    };
    const onChangeNewpass = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNew_pass(e.target.value);
        console.log(e.target.value);
    };
    const onChangeRepass = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRe_pass(e.target.value);
    console.log(e.target.value);
    };
  return (
    <div className='flex-1'>
        <div className="flex flex-1 justify-center text-2xl font-bold p-5">
            <h1>Setting</h1>
        </div>
            <div className="flex flex-1 justify-center p-6">
                <div className="bg-gray-200 rounded-lg shadow-lg flex">
                    <div className='flex flex-col justify-center p-5'>
                        <h1>Picture</h1>
                        <h1>Name</h1>
                        <h1>Id</h1>
                    </div>
                    <div className="flex flex-col p-5">
                        <div className="bg-gray-200 m-1"><input type="text" placeholder="new-username" value={new_name} onChange={onChangeNewname}/></div>
                        <div className="bg-gray-200 m-1"><input type="text" placeholder="new-email" value={new_email} onChange={onChangeNewemail}/></div>
                        <div className="bg-gray-200 m-1"><input type="text" placeholder="new-password" value={new_pass} onChange={onChangeNewpass}/></div>
                        <div className="bg-gray-200 m-1"><input type="text" placeholder="re-password" value={re_pass} onChange={onChangeRepass}/></div>
                        <div className="flex">
                            <div className="ml-auto bg-green-500 p-1 m-2 rounded-xl px-2 text-gray-50"><button>save</button></div>
                        </div>
                    </div>
                </div>
                
            </div>
    </div>
  )
}

export default Setting