import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import whiteLogo from '../../assets/img/header-footer/logo-white.png'
import '../../index.scss';

const Auth = () => {

    return (
        <div className='w-full h-screen bg-gradient-to-br from-[#1AAFEA] to-[#0AECB4] brightness-[.98] font-segoe text-neutral-1-900 pb-[18px]'>
        <Link to='/auth/login' className='block text-neutral-1-800 text-right tracking-wide pt-2 pr-7 hover:text-neutral-1-900 hover:font-semibold'>Login as a customer ?</Link>
            <div className='w-full h-[98%] flex flex-col items-center justify-center'>
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
