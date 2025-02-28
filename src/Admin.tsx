import AdminMenu from './component/admin/AdminMenu'
import Search_bar from './component/Search_bar'
import Function from './component/Function'
import { Outlet } from 'react-router-dom'
function Admin() {
  return (
    <div className="flex">
        <div className="flex max-sm:hidden">
            <AdminMenu/>
        </div>
        <div className="flex flex-col flex-1 bg-zinc-200">
            <div className="flex justify-between items-center p-3 shadow-lg bg-gray-200">
            <Search_bar/>
            <Function/>
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

export default Admin