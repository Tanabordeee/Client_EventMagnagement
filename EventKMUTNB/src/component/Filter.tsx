
import { useState } from 'react';
function Filter() {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  return (
    <div className="p-3">
        <div className="label">
            <h2 className='text-xl font-bold'>Filter</h2>
            <br />
        </div>
        <div className="flex flex-col">
            <select name="Faculty" id="Faculty">
                <option value="">Faculty</option>
                <option value="Science">Science</option>
                <option value="Engineer">Engineer</option>
                <option value="Achitecture">Achitecture</option>
            </select>
            <select name="Time" id="Time">
                <option value="">Time</option>
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
            </select>
            <select name="Position" id="Position">
                <option value="">Position</option>
                <option value="Student">Student</option>
                <option value="Porfessor">Porfessor</option>
                <option value="All">All</option>
            </select>
            <br />
        </div>
        <div className="flex flex-col">
            <h2 className='text-xl font-bold'>Option</h2>
            <label >
                <input 
                    type="checkbox"
                    value= "option1"
                    checked={selectedOptions.includes('option1')}
                 />
                 filter
            </label>
            <label >
                <input 
                    type="checkbox"
                    value= "option2"
                    checked={selectedOptions.includes('option2')}
                 />
                 filter
            </label>
            <label >
                <input 
                    type="checkbox"
                    value= "option3"
                    checked={selectedOptions.includes('option3')}
                 />
                 filter
            </label>
        </div>
    </div>
  )
}

export default Filter