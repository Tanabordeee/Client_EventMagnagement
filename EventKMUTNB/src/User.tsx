import Menu from './component/Menu.tsx'
import Search_bar from './component/Search_bar.tsx'
import Calender from './component/Calender.tsx'
import Function from './component/Function.tsx'
import Filter from './component/Filter.tsx'
import Favorite from './component/Favorite.tsx'
import Notification from './component/Notification.tsx'
import {Route, Routes } from 'react-router'
import Setting from './component/Setting.tsx'

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
                <Routes>
                  <Route path='/' element = {<Calender/>}/>
                  <Route path='/favorite' element = {<Favorite/>}/>
                  <Route path='/notification' element = {<Notification/>}/>
                  <Route path='/setting' element = {<Setting/>}/>
                </Routes>
              </div>
              <div className="rounded-xl bg-gray-50 m-2"><Filter/></div>
          </div>
          </div>
      </div>
  )
}

export default User