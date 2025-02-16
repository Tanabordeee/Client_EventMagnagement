
import Event from './Event'
function Calender() {
  return (
    <div className="flex-1 p-3">
        <h2 className='pb-2 pt-1 pl-3 text-2xl font-bold'>Calender</h2>
        <div className="flex justify-between">
          <div className="flex-1 p-2">
            <h2 className='pl-2'>calender_table</h2>
          </div>
          <Event/>
        </div>
    </div>
  )
}

export default Calender