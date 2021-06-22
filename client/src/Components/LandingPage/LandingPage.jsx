import React, { useEffect } from "react";
import {useHistory} from 'react-router-dom'
import Landing1 from '../../img/Landing_6.png'

import './LandingPage.css'

function LandingPage({ handler }) {

  const history = useHistory()

  function handleClick() {
    history.push('/home')
  }

    useEffect(() => {
        handler(false)
        return () => handler(true)
    }, [handler])

  return (
    <div className='landingContainer'>
      <div className='picContainer'>
      <img src={Landing1} alt='Dog img' className='landingPic'/>
      </div>
      <div className='divWelcome'>
      <h1 className='welcome'>Welcome to the "Dog App"</h1>
      <h3 className='subtitle'>Where you can find information on more than 150 breeds of dogs</h3>
      <button onClick={handleClick} className='enterBtn'>Enter to the site</button>
      </div>
      
    </div>
  );
}

export default LandingPage;
