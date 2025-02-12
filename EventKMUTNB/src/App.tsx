// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Menu from './component/Menu.tsx'
import Search_bar from './component/Search_bar.tsx'
import Calender from './component/Calender.tsx'
import Function from './component/Function.tsx'
import Filter from './component/Filter.tsx'
function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="container">
      <div className="sidebar">
        <Menu/>
      </div>
      <div className="main">
        <div className="search_bar">
          <Search_bar/>
          <Function/>
        </div>
        <div className="content">
          <Calender/>
          <Filter/>
        </div>
      </div>
    </div>
  )
}

export default App
