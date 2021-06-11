import React from 'react'

function NavBar({navBarFlag}) {
    return (
        (navBarFlag) ? 
            <div>
                <h1>NavBar</h1>
            </div>
         : null
        
    )
}

export default NavBar
