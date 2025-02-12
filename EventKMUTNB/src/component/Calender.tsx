import './Calender.css'
import Event from './Event'
function Calender() {
  return (
    <div className="calender">
        <h2 className='header_calender'>Calender</h2>
        <div className="contain_calender">
          <div className="table">
            <h2>calender_table</h2>
          </div>
          <Event/>
        </div>
    </div>
  )
}

export default Calender