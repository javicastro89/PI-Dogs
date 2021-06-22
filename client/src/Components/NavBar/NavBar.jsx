import React from "react";
import { NavLink } from "react-router-dom";
import Logo from '../../img/dog.png'

import './NavBar.css'

function NavBar({ navBarFlag }) {

  const spanStyle = {
    color: '#718792',
  }

  return navBarFlag ? (
    <>
    <header className='navBar'>
      <div>
      <NavLink exact to="/home" >
        <img id='dog' src={Logo} alt='Logo' className='logo' />
        </NavLink>
      </div>
      <nav>
        <ul className='list'>
      
          <li className='list-item'>
            <NavLink exact to="/home" >
              Home
            </NavLink>
            <span style={spanStyle}> | </span>
            <NavLink exact to="/create">
              Create Breed
            </NavLink>
            
          </li>
        </ul>
      </nav>
    </header>
    </>
  ) : null;
}

export default NavBar;
