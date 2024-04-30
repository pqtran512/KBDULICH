import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux'
import '../../index.scss';

const SystemHome = () => {
    const { isLoggedIn, role } = useSelector(state => state.auth)
    // if (!isLoggedIn || role === 'customer') return <Navigate to='/system-auth/login' replace={true} />
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
