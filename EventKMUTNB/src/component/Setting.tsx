import React from 'react'

const Setting = () => {
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
                        <div className="bg-gray-200 m-1"><input type="text" placeholder="new-username" className="new_username" /></div>
                        <div className="bg-gray-200 m-1"><input type="text" placeholder="new-email" className="new_email" /></div>
                        <div className="bg-gray-200 m-1"><input type="text" placeholder="new-password" className="new_password" /></div>
                        <div className="bg-gray-200 m-1"><input type="text" placeholder="re-password" className="re_password" /></div>
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