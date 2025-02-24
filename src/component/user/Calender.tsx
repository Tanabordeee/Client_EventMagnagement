
import Event from '../Event'
function Calender() {
  return (
    <div className="flex-1 p-3">
        <h2 className='py-3 px-7 text-2xl font-bold'>Calender</h2>
        <div className="flex justify-between">
          <div className="flex-1 p-2">
            <h2 className='px-7'>calender_table</h2>
          </div>
          <div className="flex justify-center bg-gray-200 rounded-lg shadow-lg p-4">
            <Event/>
          </div>
        </div>
    </div>
  )
}

export default Calender