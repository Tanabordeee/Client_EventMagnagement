import Menu from './component/user/Menu.tsx'
import Search_bar from './component/Search_bar.tsx'
import Function from './component/Function.tsx'
import Filter from './component/user/Filter.tsx'
import {Route, Outlet} from 'react-router'

function User() {
  return (
    <div className="flex">
        <div className="flex">
            <Menu/>
        </div>
        <div className="flex flex-col flex-1 bg-zinc-200">
          <div className="flex justify-between items-center p-3 shadow-lg bg-gray-50">
            <Search_bar/>
            <Function/>
          </div>
          <div className="flex justify-between pt-2 gap-2">
              <div className="rounded-xl bg-gray-50 flex-1 m-2">
                <Outlet/>
              </div>
              <div className="rounded-xl bg-gray-50 m-2"><Filter/></div>
          </div>
          </div>
      </div>
  )
}

export default User