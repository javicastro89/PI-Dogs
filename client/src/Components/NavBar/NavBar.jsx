import React from "react";
import { NavLink } from "react-router-dom";
import Logo from '../../img/dog.png'

import './NavBar.css'

function NavBar({ navBarFlag }) {
  return navBarFlag ? (
    <>
    {/* <div className='top'>
    THE DOG APP
    </div> */}
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
