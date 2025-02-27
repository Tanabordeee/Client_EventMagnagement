// import { useState } from 'react'

import LoginNav from "./LoginNav.tsx"
import User from "./User"
import Calender from "./component/user/Calender.tsx"
import Favorite from "./component/user/Favorite.tsx"
import Notification from "./component/user/Notification.tsx"
import Setting from "./component/user/Setting.tsx"
import { Routes, Route } from "react-router-dom"
import LoginUser from './component/login/LoginUser.tsx'
import LoginAdmin from './component/login/LoginAdmin.tsx'
import LoginClub from './component/login/LoginClub.tsx'
import AddEvent from "./component/club/AddEvent.tsx"
import HistoryAdd from "./component/club/HistoryAdd.tsx"
import List from "./component/club/List.tsx"
import Club from "./Club.tsx"
import Manage from "./component/admin/Manage.tsx"
import Admin from "./Admin.tsx"
import RegisUser from "./component/register/RegisUser.tsx"
import RegisClub from "./component/register/RegisClub.tsx"
import RegisNav from "./RegisNav.tsx"
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path = "/" element = {<LoginNav/>}>
          <Route index element = {<LoginUser/>}></Route>
          <Route path="loginuser" element = {<LoginUser/>}></Route>
          <Route path="loginclub" element = {<LoginClub/>}></Route>
          <Route path="loginadmin" element = {<LoginAdmin/>}></Route>
        </Route>
        <Route path = "/register" element = {<RegisNav/>}>
          <Route index element = {<RegisUser/>}></Route>
          <Route path="regisuser" element = {<RegisUser/>}></Route>
          <Route path="regisclub" element = {<RegisClub/>}></Route>
        </Route>
        <Route path = "/user" element = {<User/>}>
          <Route index element = {<Calender/>}/>
          <Route path="calender" element = {<Calender/>}/>
          <Route path="favorite" element = {<Favorite/>}/>
          <Route path="notification" element = {<Notification/>}/>
          <Route path="setting" element = {<Setting/>}/>
          <Route path = "addevent" element = {<AddEvent/>}/>
          <Route path = "historyadd" element = {<HistoryAdd/>}/>
          <Route path = "list" element = {<List/>}/>
        </Route>
        <Route path="/club" element = {<Club/>}>
          <Route index element = {<AddEvent/>}/>
          <Route path = "addevent" element = {<AddEvent/>}/>
          <Route path = "historyadd" element = {<HistoryAdd/>}/>
          <Route path = "list" element = {<List/>}/>
        </Route>
        <Route path="/admin" element = {<Admin/>}>
          <Route index element = {<Manage/>}/>
          <Route path = "manage" element = {<Manage/>}/>
        </Route>
      </Routes>
    </>
    
  )
}

export default App
