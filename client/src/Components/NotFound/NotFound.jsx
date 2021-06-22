import React from 'react'
import pic from '../../img/NotFound.png'
import './NotFound.css'

export default function NotFound() {
    return (
        <div className='notFound'>
            <h1 className='titleNotFound'>404 Page Not Found</h1>
            <h2 className='subtitle'>Are you lost?</h2>
            <img src={pic} alt='Not Found' className='notFoundPic'/>
        </div>
    )
}
