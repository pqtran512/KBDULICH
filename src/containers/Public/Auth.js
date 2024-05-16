import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import whiteLogo from '../../assets/img/header-footer/logo-white.png'
import '../../index.scss';

const Auth = () => {
    return (
        <div className='w-full h-screen bg-primary-1 font-segoe text-neutral-1-900 pb-[18px]'>
            <div className='w-full h-full flex flex-col items-center justify-center'>
                <div className='flex items-center'>
                    <Link to='/*'>
                        <img className='w-[60px] h-[42px] object-contain md:w-[75px] md:h-[52px]' src={whiteLogo} alt='logo'/>
                    </Link>
                    <Link to='/*'>
                        <span className='font-vampiroOne text-[24px] text-white tracking-[0.72px] uppercase pl-2 md:pl-4 md:text-[40px] md:tracking-[0.84px]'>
                        Du lich
                        </span>
                    </Link>
                </div>
                <Outlet/>
            </div>
        </div>
    )
}

export default Auth
