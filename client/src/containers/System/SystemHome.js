import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import '../../index.scss';

const SystemHome = () => {
    return (
        <div className='font-segoe'>
            <Header/>
            <div className='relative xl:flex gap-10 w-full'>
                <Sidebar/>
                <Outlet/>
            </div>
        </div>
    )
}

export default SystemHome
