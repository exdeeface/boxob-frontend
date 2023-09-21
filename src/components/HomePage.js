import React from "react"
import PageButton from "./PageButton"

function HomePage() {
    return (
      <div className='HomePage'>
        <h1>boxop movie database</h1>
        <h2>the world largest locally hosted database for movies and actors</h2>
  
        <div className='ButtonGroup'>
          <div className="ButtonDefault">
            <PageButton buttonText="films" destination="/films" />
            <PageButton buttonText="actors" destination="/actors" />
          </div>
        </div>
      </div>
    )
}

export default HomePage;