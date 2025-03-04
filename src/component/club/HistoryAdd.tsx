import EventClub from "./EventClub"

function HistoryAdd() {
  return (
    <div>
        <div className="m-4 bg-green-300">
            <div className="flex text-xl font-bold p-4">History</div>
            <div className="flex flex-wrap p-3">
                <div className="xl:w-1/3 w-1/2 max-sm:w-1/1 flex justify-center items-center pt-10">
                    <div className="bg-gray-200 px-3 py-2 rounded-xl shadow-lg"><EventClub/></div></div>
                <div className="xl:w-1/3 w-1/2 max-sm:w-1/1 flex justify-center items-center pt-10">
                    <div className="bg-gray-200 px-3 py-2 rounded-xl shadow-lg"><EventClub/></div></div>
                <div className="xl:w-1/3 w-1/2 max-sm:w-1/1 flex justify-center items-center pt-10">
                    <div className="bg-gray-200 px-3 py-2 rounded-xl shadow-lg"><EventClub/></div></div>
                <div className="xl:w-1/3 w-1/2 max-sm:w-1/1 flex justify-center items-center pt-10">
                    <div className="bg-gray-200 px-3 py-2 rounded-xl shadow-lg"><EventClub/></div></div>
            </div>
        </div>
    </div>
  )
}

export default HistoryAdd