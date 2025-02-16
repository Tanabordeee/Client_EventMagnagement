import Event from "./Event"

function Favorite() {
  return (
    <>
        <div className="flex-1 p-3">
            <h2 className='pb-2 pt-1 pl-3 text-2xl font-bold justify-center flex'>Favorite</h2>
            <div className="flex flex-wrap p-3">
                <div className="w-1/3"><Event/></div>
                <div className="w-1/3"><Event/></div>
                <div className="w-1/3"><Event/></div>
                <div className="w-1/3"><Event/></div>
            </div>
        </div>
    </>
  )
}

export default Favorite