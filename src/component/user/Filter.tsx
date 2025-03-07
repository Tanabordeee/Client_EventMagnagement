
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
type Searching = {
    search : string;
}
function Filter({search}: Searching) {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    // console.log(search);
    const option : string[] = [
        "consert",
        "event",
        "study",
    ];
    const [isChoose, setisChoose] = useState([false, false, false]);
    const choose = (index : number) => {
        const newOption = isChoose.map((state, indx) =>
            indx === index ? !state : state
        );
        setisChoose(newOption);
    }
    const [isclick, setIsclick] = useState(false);
    const click = () => {
        setIsclick(!isclick);
    }
  return (
    <div className="flex justify-between pt-2 gap-2 relative">
        <div className="rounded-xl bg-gray-50 flex-1 m-2 flex relative">
            <Outlet context={search}/>
            <button className='sm:hidden absolute right-4 top-5' onClick={click}>Filter</button>
        </div>
        <div className= {`absolute right-4 ${isclick? '' : 'hidden'}`}>
            <div className="p-3 rounded-xl bg-gray-50 m-2 ">
                <div className="label">
                    <button className='text-xl font-bold p-2' onClick={click}><p className='underline'>Filter</p></button>
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
                    <div className="py-2 flex-col flex">
                        {isChoose.map((Choose, index) => (
                            <label key = {index}>
                                <input type="checkbox" 
                                value={option[index]}
                                onClick={() => choose(index)}/>
                                {option[index]}
                            </label>
                        ))}
                    </div>
                    
                </div>
            </div>
        </div>
        <div className="p-3 rounded-xl bg-gray-50 m-2 max-sm:hidden">
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
                <div className="py-2 flex-col flex">
                    {isChoose.map((Choose, index) => (
                        <label>
                            <input type="checkbox" 
                            key = {index}
                            value={option[index]}
                            onClick={() => choose(index)}/>
                            {option[index]}
                        </label>
                    ))}
                </div>
                
            </div>
        </div>
    </div>
    
  )
}

export default Filter