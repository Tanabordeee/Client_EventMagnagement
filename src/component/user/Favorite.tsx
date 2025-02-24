import Event from "../Event"
import axios from "axios"
function Favorite() {
  const url = 'http://localhost:3000/api/event/byuser';
  axios.get(url)
  .then(response => {
    console.log('Response:', response.data); // แสดงข้อมูลที่ได้รับจาก API
  })
  .catch(error => {
    console.error('Error:', error); // แสดงข้อผิดพลาดหากมี
  });
  return (
    <>
        <div className="flex-1 p-3">
            <h2 className='pb-2 pt-1 pl-3 text-2xl font-bold justify-center flex'>Favorite</h2>
            <div className="flex flex-wrap p-3">
                <div className="lg:w-1/3 w-1/2 flex justify-center items-center pt-10">
                  <div className="bg-gray-200 px-3 py-5 rounded-xl shadow-lg"><Event/></div>
                </div>
                <div className="lg:w-1/3 w-1/2 flex justify-center items-center pt-10">
                  <div className="bg-gray-200 px-3 py-5 rounded-xl shadow-lg"><Event/></div>
                </div>
                <div className="lg:w-1/3 w-1/2 flex justify-center items-center pt-10">
                  <div className="bg-gray-200 px-3 py-5 rounded-xl shadow-lg"><Event/></div>
                </div>
                <div className="lg:w-1/3 w-1/2 flex justify-center items-center pt-10">
                  <div className="bg-gray-200 px-3 py-5 rounded-xl shadow-lg"><Event/></div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Favorite