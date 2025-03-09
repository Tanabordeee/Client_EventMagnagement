import { Link } from "react-router-dom"
import { useState } from "react"
function Menu() {
  const text: string[] = [
    "Home",
    "Favorite",
    "Notification",
    "Setting",
  ]
  const logo: string[] = [
    "https://media.discordapp.net/attachments/1344393907634573434/1347587598545191023/homee.png?ex=67cc5e40&is=67cb0cc0&hm=ca20d63cf2ea6817c81df8ed7a8c92a33e026cb65fa3591406a8c6d8bb54a50c&=&format=webp&quality=lossless",
    "https://media.discordapp.net/attachments/1344393907634573434/1347587598092341340/fav.png?ex=67cc5e40&is=67cb0cc0&hm=02349ac173c77abd8a30a02bed92545c141a39c79dcee54eb54962f0b53229d7&=&format=webp&quality=lossless",
    "https://media.discordapp.net/attachments/1344393907634573434/1347587599279194264/noti.png?ex=67cc5e40&is=67cb0cc0&hm=5bbf70f05d48995765a4186c4072c9c4f4d21ac5006a366c2cd50ca11fca71b8&=&format=webp&quality=lossless",
    "https://media.discordapp.net/attachments/1344393907634573434/1347587599870595257/setting.png?ex=67cc5e40&is=67cb0cc0&hm=1cd7dd212e17456eb8a7b628643ee7e98615e77735611083e6883b2a961b3e99&=&format=webp&quality=lossless",
  ]
  const path: string[] = [
    "calender",
    "favorite",
    "notification",
    "setting",
  ]
  const [isSelect, setIsSelect] = useState([true, false, false, false]);
  const Clicky = (index: number) => {
    const newStates = isSelect.map((_, idx) =>
      idx === index ? true : false
    );
    setIsSelect(newStates);
  }
  return (
      <div className="flex flex-col flex-1 justify-between shadow-[4px_0_6px_rgba(0,0,0,0.1)]">
          <div className="shadow-lg justify-center  items-center flex pb-4 pt-3">
            {/* <a href="#" className='text-xl font-bold p-3'>Picture</a> */}
            <img src="https://th.bing.com/th/id/R.42e6ec3449dea58699565dd1ea96b485?rik=jEWzso5OGALO%2fw&pid=ImgRaw&r=0" className="w-40 m-2"/>
          </div>
          <div className="flex-1">
            <div className="flex-col flex py-5">
              {isSelect.map((isSelect , index) => (
                <button
                  key = {index}
                  onClick={() => Clicky(index)} 
                  className= {`text-xl p-2 ${isSelect ? 'text-red-500' : 'text-gray-900'}`}>
                  <Link to = {path[index]}> <div className="flex transition-transform transform hover:scale-120"><img src= {logo[index]} className="w-5 h-5 mt-2 mx-2 object-cover" /><div className="flex justify-start h-10 w-30 mt-1">{text[index]}</div></div> </Link>
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

export default Menu