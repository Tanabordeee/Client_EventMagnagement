
function EventDetail() {
    return (
      <div>
          <div className="flex justify-center text-lg font-bold">Concert1</div>
          <div className="flex justify-center">
              <div className="flex max-sm:grid">
                  <div className="justify-center p-5  flex-col">
                      <h2 className="p-1 flex justify-center">Picture</h2>
                      <h1 className="p-1 flex justify-center">Status</h1>
                  </div>
                  <div className="justify-center p-5">
                      <p className="p-1 pr-5 pl-5 flex justify-center">eiei tour</p>
                      <p className="p-1 pr-5 pl-5 flex justify-center">detail</p>
                      <p className="p-1 pr-5 pl-5 flex justify-center">date</p>
                      <p className="p-1 pr-5 pl-5 flex justify-center">time</p>
                      <p className="p-1 pr-5 pl-5 flex justify-center">contact</p>
                      <p className="p-1 pr-5 pl-5 flex justify-center">status</p>
                  </div>
              </div>
          </div>
          <div className="flex justify-center">
              <div className="flex justify-center bg-lime-300 rounded-lg px-3">Status confirm detail</div>
          </div>
          
      </div>
    )
  }
  
  export default EventDetail