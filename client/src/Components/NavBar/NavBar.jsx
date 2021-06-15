import React from "react";
import { NavLink } from "react-router-dom";
import Logo from '../../img/dog.png'

import './NavBar.css'

function NavBar({ navBarFlag }) {
  return navBarFlag ? (
    <header className='navBar'>
      <div>
        <img id='dog' src={Logo} alt='Logo' className='logo' />
      </div>
      <nav>
        <ul className='list'>
          <li className='list-item'>
            <NavLink exact to="/home">
              Home
            </NavLink>
            <NavLink exact to="/create">
              Create Breed
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  ) : null;
}

export default NavBar;
