import { Link } from "react-router-dom"
import { useState } from "react"
function ClubMenu() {
  const text: string[] = [
    "Event",
    "History",
    "List",
  ]
  const logo: string[] = [
    "https://media.discordapp.net/attachments/1344393907634573434/1347587598545191023/homee.png?ex=67cc5e40&is=67cb0cc0&hm=ca20d63cf2ea6817c81df8ed7a8c92a33e026cb65fa3591406a8c6d8bb54a50c&=&format=webp&quality=lossless",
    "https://media.discordapp.net/attachments/1344393907634573434/1347587598314508428/history.png?ex=67cc5e40&is=67cb0cc0&hm=7f4b89d45738ebbc8b2b075734e7838359762ba4f581a34f32eecc372fb8d0bb&=&format=webp&quality=lossless",
    "https://media.discordapp.net/attachments/1344393907634573434/1347587598796984342/list.png?ex=67cc5e40&is=67cb0cc0&hm=9f732c5dcb83da629f0b3feaead209c18e33054c83b139873af1961a46acdd0a&=&format=webp&quality=lossless",
  ]
  const path: string[] = [
    "addevent",
    "historyadd",
    "list",
  ]
  const [isSelect, setIsSelect] = useState([true, false, false]);
  const Clicky = (index: number) => {
    const newStates = isSelect.map((_, idx) =>
      idx === index ? true : false
    );
    setIsSelect(newStates);
  }
  return (
    <div className="flex flex-col justify-between flex-1 shadow-[4px_0_6px_rgba(0,0,0,0.1)]">
        <div className="shadow-lg justify-center  items-center flex pb-4 pt-3">
        <img src="https://th.bing.com/th/id/R.42e6ec3449dea58699565dd1ea96b485?rik=jEWzso5OGALO%2fw&pid=ImgRaw&r=0" className="w-40 m-2"/>
        </div>
        <div className="flex-1">
          <div className="flex-col flex py-5">
            {isSelect.map((isSelect , index) => (
              <button
                key = {index}
                onClick={() => Clicky(index)} 
                className= {`text-xl p-2 ${isSelect ? 'text-red-500' : 'text-gray-900'}`}>
                <Link to = {path[index]}> <div className="flex transition-transform transform hover:scale-110"><img src= {logo[index]} className="w-5 h-5 mt-2 mx-2 object-cover" /><div className="flex justify-start h-10 w-30 mt-1">{text[index]}</div></div> </Link>
              </button>
            ))}
          </div>
        </div>
        <footer className='footer'>
          <p>Contact us</p>
          <p>tell : 099-999-9999</p>
          <p>line : @gm2</p>
        </footer>
        
      </div>
  )
}

export default ClubMenu