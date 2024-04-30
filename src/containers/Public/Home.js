import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import '../../index.scss';

const Home = () => {
    return (
        <div className='font-segoe'>
           <Header/>
            <div className='w-full'>
                <Outlet/>
            </div>
           <Footer/>
        </div>
    )
}

export default Home
