import React from 'react'
import { Link } from 'react-router-dom'

const CardArticle = ({pb, animation, hidden}) => {
    const placeInfo = [
        '../img/home/sec3-img3.png',
        'Du lịch Mũi Né',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit faucibus augue, a maximus elit ex vitae libero...',
        ];
    return (
        <Link to={'/news-detail'} className={`${hidden} ${pb} bg-white shadow-shad3 md:shadow-none xl:shadow-shad3 ${animation}`}>
            <div className="relative w-full pt-[56.28%] md:pt-[56.32%] xl:pt-[56.1%]">
                <img className="absolute w-full h-full top-0 left-0 object-cover md:object-contain xl:object-cover" src={placeInfo[0]} alt=''/>
            </div>
            <div className="pt-4 pl-[30px] pr-[33px] md:pl-[23px] md:pb-[19px] md:pr-[22px] md:pt-2 md:shadow-shad2 xl:shadow-none xl:pb-0 xl:pl-[25px] xl:pr-[23px]">
                <div className="text-body-2 text-neutral-1-500">Cẩm nang du lịch</div>
                <div className="my-2 text-[14px] leading-[20px] font-semibold text-neutral-1-900 md:line-clamp-2 xl:text-title-1">
                    {placeInfo[1]} </div>
                <div className="text-[14px] mb-2 text-neutral-1-500 leading-[19px] line-clamp-2 md:min-h-[38px]">{placeInfo[2]}</div>
                <div className="block w-fit text-title-2 text-primary-2 font-semibold xl:text-title-1">Xem thêm</div>
            </div>
        </Link>
    )
}

export default CardArticle