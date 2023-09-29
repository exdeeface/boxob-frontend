import React from "react"
import PageButton from "./PageButton"

function HomePage() {
    return (
      <div className='HomePage'>
        <h1>boxob movie database</h1>
  
        <div className='ButtonGroup'>
          <div className="ButtonDefault">
            <PageButton buttonText="Browse Films" destination="/films" />
          </div>
        </div>
      </div>
    )
}

export default HomePage;