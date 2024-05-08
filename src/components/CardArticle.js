import React from 'react'
import { Link } from 'react-router-dom'
import { formatVietnameseToString } from '../ultils/formatVietnameseToString'

const CardArticle = ({pb, animation, hidden, place}) => {
    return (
        <Link to={`/news-detail/${formatVietnameseToString(place.province)}`} state={place.province}
              className={`${hidden} ${pb} cursor-pointer bg-white shadow-shad3 md:shadow-none xl:shadow-shad3 ${animation}`}>
            <div className="relative w-full pt-[56.28%] md:pt-[56.32%] xl:pt-[56.1%]">
                <img className="absolute w-full h-full top-0 left-0 object-cover md:object-contain xl:object-cover" src={place.images[0].images} alt=''/>
            </div>
            <div className="pt-4 pl-[30px] pr-[33px] md:pl-[23px] md:pb-[19px] md:pr-[22px] md:pt-2 md:shadow-shad2 xl:shadow-none xl:pb-0 xl:pl-[25px] xl:pr-[23px]">
                <div className="text-body-2 text-neutral-1-500">Cẩm nang du lịch</div>
                <div className="my-2 text-[14px] leading-[20px] font-semibold text-neutral-1-900 md:line-clamp-2 xl:text-title-1">
                    {place.province}</div>
                <div className="text-[14px] mb-2 text-neutral-1-500 leading-[19px] line-clamp-2 md:min-h-[38px]">{place.description}</div>
                <div className="block w-fit text-title-2 text-primary-2 font-semibold xl:text-title-1">Xem thêm</div>
            </div>
        </Link>
    )
}

export default CardArticle