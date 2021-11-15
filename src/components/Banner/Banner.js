import React from 'react';
import './banner.css';

const Banner = () => {
    return (
        <div className="banner">
            <div>
                <img src='https://i.ibb.co/tbmjcHs/michael-c-t-Nse4-Nqif-C4-unsplash.jpg' alt='banner image' />
            </div>
            <div className="overlay"></div>
            <div className='text'>
                <h1>Sales off 20%</h1>
                <p>We are different. We sell top quality products at an affordable cost.</p>
            </div>
        </div>
    )
}

export default Banner;
