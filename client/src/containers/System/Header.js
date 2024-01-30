import React, { useState } from 'react';
import icons from '../../ultils/icons';
import {Link} from 'react-router-dom'

const { FiLogOut, FaHome, FaRegUser, IoNotifications } = icons

const Header = () => {
    const [isDropdown, setIsDropdown] = useState(false);
    // dropdown navbar submenu on mobile/ tablet screen
    const handleDropdown = event => {
        // 👇️ toggle isDropdown state on click
        setIsDropdown(current => !current);
    };
    return (
        <header className='w-full bg-background-10 shadow-shad1 sticky top-0 z-50'>
            <div className='mx-auto w-full xl:max-w-7xl'>
                <div className='h-[60px] px-6 flex justify-between items-center lg:px-2 2xl:px-0'>
                    <div className='flex items-center'>
                        <Link to={'/staff'} >
                            <FaHome size={25} className='cursor-pointer' />
                        </Link>
                        <Link to={'/staff'} >
                            <span className='hidden font-semibold text-[22px] text-neutral-1-900 tracking-[0.72px] uppercase pl-2 md:pl-[14px] md:tracking-[0.84px] xl:block'>
                            Home
                            </span>
                        </Link>
                    </div>
                    <div className='flex items-center gap-10'>
                        <div className='w-full relative xl:w-fit'>
                            <IoNotifications className='cursor-pointer text-[18px] xl:text-[24px]' onClick={handleDropdown}/>
                            <ul className={(isDropdown ? 'block' : 'hidden') + ' bg-white shadow-md text-body-1 text-neutral-1-900 xl:absolute xl:z-20 xl:-left-20 xl:py-1 xl:mt-4 xl:w-[250px] xl:rounded-md'}>
                                <li className='mx-3 py-[10px] mb-[10px] border-b border-neutral-2-200'>
                                    <div>Request 3 đã được chấp nhận</div>
                                    <div className='text-caption-1 text-primary-1'>21:28 19/01/2024</div>
                                </li>
                                <li className='mx-3 py-[10px'>
                                    <div>Request 2 đã bị từ chối</div>
                                    <div className='text-caption-1 text-primary-1'>21:28 19/01/2024</div>
                                </li>
                            </ul>
                        </div>
                        <Link to={'/auth/login'} className='h-fit pl-4'>
                            <FaRegUser className='text-[18px] xl:text-[24px]'/>
                        </Link>
                        {/* {isLoggedIn &&  */}
                            <button className='hidden h-fit xl:block'>
                                <FiLogOut className='text-[18px] xl:text-[24px]'/>
                            </button>
                        {/* } */}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
