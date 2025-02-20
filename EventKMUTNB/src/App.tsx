// import { useState } from 'react'

import LoginUser from "./LoginUser"
import User from "./User"
import Calender from "./component/Calender"
import Favorite from "./component/Favorite"
import Notification from "./component/Notification"
import Setting from "./component/Setting"
import { Routes, Route } from "react-router-dom"
// import LoginUser from './LoginUser.tsx'
// import LoginAdmin from './LoginAdmin.tsx'
// import LoginClub from './LoginClub.tsx'
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      {/* <LoginClub/> */}
      {/* <User></User> */}
      {/* <LoginUser/> */}
      <Routes>
        <Route path = "/" element = {<LoginUser/>}/>
        <Route path = "/user" element = {<User/>}>
          <Route index element = {<Calender/>}/>
          <Route path="calender" element = {<Calender/>}/>
          <Route path="favorite" element = {<Favorite/>}/>
          <Route path="notification" element = {<Notification/>}/>
          <Route path="setting" element = {<Setting/>}/>
        </Route>
      </Routes>
        {/* <Menu></Menu> */}
    </>
    
  )
}

export default App
