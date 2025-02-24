import Search_bar from "./component/Search_bar"
import { Outlet } from "react-router-dom"
import ClubFunc from "./component/club/ClubFunc"
import ClubMenu from "./component/club/ClubMenu"
function Club() {
  return (
    <div className="flex">
        <div className="flex max-sm:hidden">
            <ClubMenu/>
        </div>
        <div className="flex flex-col flex-1 bg-zinc-200">
          <div className="flex justify-between items-center p-3 shadow-lg bg-gray-50">
            <Search_bar/>
            <ClubFunc/>
          </div>
          <div className="flex justify-between pt-2 gap-2">
              <div className="rounded-xl bg-gray-50 flex-1 m-2">
                <Outlet/>
              </div>
          </div>
          </div>
      </div>
  )
}

export default Club