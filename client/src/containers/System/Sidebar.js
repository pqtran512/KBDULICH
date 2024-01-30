import React, { useState } from 'react';
import icons from '../../ultils/icons';
import { Link } from 'react-router-dom'

const { VscTriangleLeft } = icons

const Sidebar = () => {
    const [isClose, setIsClose] = useState(false)
    const handleCloseBtn = event => {
        setIsClose(current => !current);
    };
    const [onRequestPage, setOnRequestPage] = useState(false)
    return (
        <div className={`${isClose? 'w-10' : 'w-64'} transition-all duration-300 h-[calc(100vh-64px)] bg-[#ECF5FF] shadow-shad1 sticky top-16 z-10 pt-10 text-body-1 text-accent-12 font-semibold hidden xl:block`}>
            {isClose ? 
            ''
            : 
            <>
            <Link to={'/staff'} className={`${onRequestPage? '' : 'bg-background-10'} block mb-10 pl-4 py-4 cursor-pointer truncate hover:bg-background-10`}
                onClick={() => setOnRequestPage(false)}>Danh sách Tour</Link>
            <Link to={'/staff/request'} className={`${onRequestPage? 'bg-background-10' : ''} block pl-4 py-4 cursor-pointer truncate hover:bg-background-10`}
                onClick={() => setOnRequestPage(true)}>Danh sách các đề xuất</Link>
            </> 
            }
            <VscTriangleLeft size={26} className={`${isClose? 'rotate-180' : ''} transition-all duration-300 absolute right-0 top-1/2 cursor-pointer text-neutral-1-300 hover:text-neutral-1-600`} onClick={handleCloseBtn}/>
        </div>
    )
}

export default Sidebar
