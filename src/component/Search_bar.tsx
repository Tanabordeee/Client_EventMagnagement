import { useState } from "react"
function Search_bar() {
  const [search, setSearch] = useState('');
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setSearch(e.target.value);
  };
  return (
    <div className="topbar">
        
        <div className="flex  relative">
            <input type="text" placeholder="search" value={search} onChange={onChangeSearch} className="bg-gray-200 rounded-xl px-3 py-1 shadow-lg mx-2"/>
            <button className="rounded-xl bg-green-300 px-2 text-sm shadow-lg absolute right-2 top-0 p-1 pb-2">search</button>
        </div>
        
    </div>
  )
}

export default Search_bar