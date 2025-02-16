
function LoginUser() {
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
                        <input type="text" placeholder="username" className="bg-cyan-50 rounded-lg pl-1" />
                        password
                        <input type="text" placeholder="password" className="bg-cyan-50 rounded-lg pl-1" />
                        <br />
                        <div className="flex justify-between p-1">
                            <button className="bg-slate-800 p-2 rounded-xl text-slate-50 hover:bg-stone-300 hover:text-gray-950">Register</button>
                            <button className="bg-green-500 p-2 rounded-xl text-slate-50 hover:bg-stone-300 hover:text-green-500">Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default LoginUser