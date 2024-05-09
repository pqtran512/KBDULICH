import React, { useState, useEffect } from 'react';
import icons from '../../ultils/icons';
import { Link, useLocation } from 'react-router-dom'
import blackMountain from '../../assets/img/header-footer/black-mountain.jpg'

const { VscTriangleLeft, CiCircleList, PiGitPullRequestLight, IoBarChartOutline, IoPersonOutline, FaRegUser  } = icons

const Sidebar = () => {
    const [isClose, setIsClose] = useState(window.innerWidth <= 1024? true : false ) // for desktop
    const [switchPage, setSwitchPage] = useState('tour')
    const [isStaff, setIsStaff] = useState(false)
    const location = useLocation();

    const handleCloseBtn = event => {
        setIsClose(current => !current);
    };
    useEffect(() => {
        if (location.pathname.startsWith("/staff")){
            setIsStaff(true);
        }
    }, [location]);
    const handleOpen = event => {
        // 👇️ toggle isOpen state on click
        if (isClose) {
            document.body.style.overflow = "hidden";
        }
        else {
            document.body.style.overflow = "auto";
        }
        setIsClose(current => !current);
    };
    return (
        <div className='relative'>
            <div id='menu-icon' className='absolute z-20 w-8 h-8 left-6 top-4 bg-[#1AAFEA] rounded-full cursor-pointer flex items-center justify-center transition-all xl:hidden' 
                onClick={handleOpen}>
                <i className='twi-22-align-justify-line text-[18px] text-white'></i>
            </div>
            <div className={`${isClose? '-translate-x-full xl:translate-x-0 xl:w-16' : 'translate-x-0 w-full xl:w-52'} p-2 transition-all duration-300 bg-[#000] opacity-100 shadow-shad1 z-10 pt-12 text-body-1 text-accent-12 absolute top-7 h-[calc(100vh-82px)] xl:h-[calc(100vh-55px)] xl:top-12 xl:opacity-90 xl:sticky xl:flex flex-col gap-2`}>
                <div className={`${isClose? 'opacity-0' : 'opacity-100'} text-neutral-1-50 text-body-2 tracking-wide whitespace-nowrap transition-all duration-300`}>Quản lý</div>
                <Link to={`${isStaff ? '/staff/tour' : '/manager/tour' }`} className={`${switchPage === 'tour' ? 'bg-neutral-1-800 opacity-90' : ''} flex gap-3 items-center px-2 py-3 rounded-md cursor-pointer hover:bg-neutral-1-800 hover:opacity-90`}
                    onClick={() => setSwitchPage('tour')}>
                        <CiCircleList size={30} className='p-1 bg-white opacity-80 rounded-md transition-all min-w-[30px]'/>
                        <div className={`${isClose? 'opacity-0' : 'opacity-100'} transition-all duration-300 whitespace-nowrap text-neutral-1-200`}>Quản lý Tour</div>
                </Link>
                <Link to={`${isStaff ? '/staff/request' : '/manager/request' }`} className={`${switchPage === 'request' ? 'bg-neutral-1-800 opacity-90' : ''} mt-1 flex gap-3 items-center px-2 py-3 rounded-md cursor-pointer hover:bg-neutral-1-800 hover:opacity-90`}
                    onClick={() => setSwitchPage('request')}>
                        <PiGitPullRequestLight size={30} className='p-1 bg-white opacity-80 rounded-md min-w-[30px]'/>
                        <div className={`${isClose? 'opacity-0' : 'opacity-100'} transition-all duration-300 whitespace-nowrap text-neutral-1-200`}>Quản lý Đề xuất</div>
                </Link>
                { isStaff ? <></>
                :
                <Link to={'/manager/staff'} className={`${switchPage === 'staff' ? 'bg-neutral-1-800 opacity-90' : ''} flex gap-3 items-center px-2 py-3 rounded-md cursor-pointer hover:hover:bg-neutral-1-800 hover:opacity-90`}
                onClick={() => setSwitchPage('staff')}>
                    <IoPersonOutline size={30} className='p-1 bg-white opacity-80 rounded-md transition-all min-w-[30px]'/>
                    <div className={`${isClose? 'opacity-0' : 'opacity-100'} transition-all duration-300 whitespace-nowrap text-neutral-1-200`}>Quản lý Nhân viên</div>
                </Link>
                }
                <div className={`${isClose? 'opacity-0' : 'opacity-100'} pt-3 text-neutral-1-50 text-body-2 tracking-wide whitespace-nowrap transition-all duration-300`}>Xem</div>
                { isStaff ? <></>
                :
                <Link to={'/manager/report'} className={`${switchPage === 'report' ? 'bg-neutral-1-800 opacity-90' : ''} flex gap-3 items-center px-2 py-3 rounded-md cursor-pointer hover:hover:bg-neutral-1-800 hover:opacity-90`}
                    onClick={() => setSwitchPage('report')}>
                        <IoBarChartOutline size={29} className='p-1 bg-white opacity-80 rounded-md min-w-[30px]'/>
                        <div className={`${isClose? 'opacity-0' : 'opacity-100'} transition-all duration-300 whitespace-nowrap text-neutral-1-200`}>Thống kê</div>
                </Link>
                }
                { isStaff ? 
                    <Link to={'/staff/account'} className={`${switchPage === 'account' ? 'bg-neutral-1-800 opacity-90' : ''} mt-1 flex gap-3 items-center px-2 py-3 rounded-md cursor-pointer hover:hover:bg-neutral-1-800 hover:opacity-90`}
                        onClick={() => setSwitchPage('account')}>
                            <FaRegUser size={27} className='p-1 bg-white opacity-80 rounded-md min-w-[30px] text-neutral-1-600'/>
                            <div className={`${isClose? 'opacity-0' : 'opacity-100'} transition-all duration-300 whitespace-nowrap text-neutral-1-200`}>Tài khoản</div>
                    </Link>
                : <></>
                }
                <div className='hidden xl:block bg-[#1AAFEA] hover:bg-[#0AECB4] rounded-full p-2 absolute -right-4 top-5 cursor-pointer'>
                    <VscTriangleLeft size={22} className={`${isClose? 'rotate-180' : ''} transition-all duration-300 text-white`} onClick={handleCloseBtn}/>
                </div>
                <img className='absolute bottom-0 right-0 -z-10 w-full h-full opacity-60 object-cover xl:object-contain xl:w-52 xl:h-3/4' src={blackMountain} alt='mountain'/>
            </div>
        </div>
    )
}

export default Sidebar
