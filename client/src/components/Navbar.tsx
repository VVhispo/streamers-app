import React from 'react'
import "../styles/Navbar.css"

export const Navbar: React.FC = () => {
    return(
        <div className='navbar'>
            <a href="/"><img className='navbar_logo' src='/logo_purple.png' alt='logo' height={120} width={120}/></a>
        </div>
    )
}