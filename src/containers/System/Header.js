import React, { useState } from 'react';
import icons from '../../ultils/icons';
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import whiteLogo from '../../assets/img/header-footer/logo-white.png'
import avatarMan from '../../assets/img/header-footer/avatar-man.png'
import avatarWoman from '../../assets/img/header-footer/avatar-woman.png'
import avatar from '../../assets/img/header-footer/avatar.png'

const { IoNotifications, IoLogOut } = icons

const Header = () => {
    const [isDropdown, setIsDropdown] = useState(false);
    const {isLoggedIn, role} = useSelector(state => state.auth)
    const {currentData} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleDropdown = event => {
        setIsDropdown(current => !current); 
    };
    const logout = async () => {
        dispatch(actions.logout())
        navigate('/system-auth/login')
    }
    return (
        <header className='w-full bg-gradient-to-tr from-[#1AAFEA] to-[#0AECB4] brightness-[.98] shadow-shad1 sticky top-0 z-50'>
            <div className='mx-auto w-full xl:max-w-7xl'>
                <div className='h-[55px] px-6 flex justify-between items-center lg:px-2 2xl:px-0'>
                    <div className='flex items-center'>
                        <Link to={`${role === 'staff'? '/staff' : '/manager'}`} >
                            <img className='w-12 h-8 object-contain md:w-[65px] md:h-[40px]' src={whiteLogo} alt='logo'/>
                        </Link>
                        <Link to={`${role === 'staff'? '/staff' : '/manager'}`} >
                            <span className='font-vampiroOne text-[20px] text-white tracking-[0.72px] uppercase pl-2 md:pl-[10px] md:text-[24px] md:tracking-[0.7px]'>
                            Du lich
                            </span>
                        </Link>
                    </div>
                    <div className='flex items-center gap-8'>
                        <div className='relative w-fit'>
                            <IoNotifications color='#fff' className='cursor-pointer text-[18px] xl:text-[24px]' onClick={handleDropdown}/>
                            <span className="absolute right-0.5 top-0 flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-3 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-3"></span>
                            </span>
                            <ul className={(isDropdown ? 'block' : 'hidden') + ' bg-white shadow-md transition-all duration-150 text-neutral-1-900 absolute z-20 py-1 mt-2 rounded-md text-body-2 xl:text-body-1 ' + (role === 'staff' ? 'w-[220px] right-0 xl:-right-10 xl:w-[250px]' : 'w-[240px] right-0 xl:-left-28 xl:w-[280px]')}>
                                <li className='cursor-pointer px-3 py-[10px] mb-[10px] border-b border-neutral-2-200 hover:bg-neutral-3-100'>
                                    {role === 'staff' ? <div>Request R_001 đã được chấp nhận</div> : <div>Nguyễn Thị Anh đã gửi 1 request</div>}
                                    <div className='text-caption-1 text-primary-1'>21:28 19/01/2024</div>
                                </li>
                                <li className='cursor-pointer px-3 py-[10px] hover:bg-neutral-3-100'>
                                {role === 'staff' ? <div>Request R_002 đã bị từ chối</div> : <div>Trần Văn Bình đã gửi 1 request</div>}
                                    <div className='text-caption-1 text-primary-1'>21:28 19/01/2024</div>
                                </li>
                            </ul>
                        </div>
                        {isLoggedIn && 
                            <button className='hidden h-fit xl:block' onClick={logout}>
                                <IoLogOut color='#fff' className='text-[18px] xl:text-[24px]'/>
                            </button>
                        }
                        <div className='hidden items-center gap-1 md:flex'>
                            { currentData?.gender === 'Nam'?
                                <img className='object-contain  md:w-9 md:h-9' src={avatarMan} alt='logo'/>
                            : currentData?.gender === 'Nữ'? 
                                <img className='object-contain  md:w-9 md:h-9' src={avatarWoman} alt='logo'/>
                            :   <img className='object-contain  md:w-9 md:h-9' src={avatar} alt='logo'/>
                            }
                            <div className='text-body-2 text-white'>{currentData?.lastName} {currentData?.firstName}</div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
