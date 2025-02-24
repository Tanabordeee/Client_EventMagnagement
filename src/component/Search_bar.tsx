import { useState } from "react"
function Search_bar() {
  const [search, setSearch] = useState('');
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setSearch(e.target.value);
  };
  return (
    <div className="topbar">
        
        <div className="flex">
            <input type="text" placeholder="search" value={search} onChange={onChangeSearch} className="bg-gray-200 rounded-xl px-3 py-1 shadow-lg mx-2"/>
            <div className="rounded-xl bg-green-300 px-2 text-sm shadow-lg flex"><button>search</button></div>
        </div>
        
    </div>
  )
}

export default Search_bar