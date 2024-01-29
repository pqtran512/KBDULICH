import React from 'react'
import { Link } from 'react-router-dom'
import icons from '../ultils/icons'

const { HiOutlineExternalLink } = icons

const Card2 = ({animation, hidden}) => {
    const tourInfo = [
        '../img/home/sec2-img1.png',
        'Thành phố Đà Nẵng',
        'Du lịch Bà Nà - Cầu Vàng - Sơn Trà - Biển Mỹ Khê - Hội An',
        '3 ngày 2 đêm',
        '11,500,000đ'
      ];
    return (
        <Link to={'/tour-detail'} className={`${hidden} relative pb-5 rounded-[20px] shadow-shad1 overflow-hidden group xl:pb-7 animate-fade-down ${animation}`}>
            <div className="relative w-full pt-[48.09%] md:pt-[44.83%] transition-all xl:pt-[45.63%] xl:overflow-hidden">
                <img className="absolute w-full h-full top-0 left-0 object-cover transition-all xl:group-hover:scale-125" src={tourInfo[0]} alt=''/>
            </div>
            <div className="absolute w-full px-6 top-4 flex items-center justify-between">
                <div className="text-white text-title-2 font-semibold xl:text-title-1">{tourInfo[1]}</div>
            </div>
            <div className="h-full pt-4 px-6 md:pt-[14px] xl:pt-4">
                <div className="flex flex-col justify-between">
                    <div className="my-2 text-caption-1 leading-[17px] font-semibold text-neutral-1-900 min-h-[48px] line-clamp-2 xl:text-title-1">{tourInfo[2]}</div>
                    <div className='flex justify-between items-center'>
                        <div className="text-caption-1 text-neutral-1-600 leading-[17px]">Thời gian : {tourInfo[3]}</div>
                        <div className="text-header-2 text-secondary-1 font-semibold leading-[17px]">{tourInfo[4]}</div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Card2