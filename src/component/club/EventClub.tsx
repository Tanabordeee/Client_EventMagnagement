import React from 'react'

function EventClub() {
  return (
    <div className="grid p-2 justify-center">
        <h2 className='p-2 text-lg font-bold justify-center flex'>Concert</h2>
        <div className="flex">
            <div className="flex-col py-2">
                <p className='p-2'>picture</p>
                <p className='p-2'>status</p>
            </div>
            <div className="flex-col py-2">
                <h2 className='flex justify-center'>name</h2>
                <p className='flex justify-center'>description</p>
                <p className='flex justify-center'>date</p>
                <p className='flex justify-center'>time</p>
                <p className='flex justify-center'>contact</p>
                <div className="flex justify-end">
                    <button className='px-2 rounded-xl text-md'>Edit</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EventClub