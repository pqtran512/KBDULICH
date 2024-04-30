import React from 'react'
import covietnam from '../assets/img/home/covietnam.png'
import { ButtonRound } from '../components'
import { Link } from 'react-router-dom'
import { formatVietnameseToString } from '../ultils/formatVietnameseToString'

const Card1 = ({tour}) => {
    const getPlaces = () => {
        const provinces = [...new Set(tour.places.map(place => place.province))];
        const formattedProvinces = provinces.join(' - ');
        return formattedProvinces
    }
    return (
        <Link to={`/tour-detail/${tour.tour_ID}`} className='animate-fade'>
            <div className="flex items-center pb-4 xl:pb-2">
                <div className="text-[17px] text-neutral-1-900 leading-6 truncate xl:max-w-[210px] xl:text-[17px]">{getPlaces()}</div>
                <div className="pl-3 xl:pl-[18px]">
                    <img className="w-7 h-[21px] xl:w-10 xl:h-[30px] object-cover" src={covietnam} alt=''/>
                </div>
            </div>
            <div className="relative w-full pt-[47.48%] md:pt-[47.41%]">
                <img className="absolute w-full h-full top-0 left-0 object-cover" src={tour.places[0].images[0].images} alt=''/> 
            </div>
            <div className="flex items-center justify-between pt-4 xl:pt-2">
                <ButtonRound width='w-[117px]' height='h-[39px]' text='Xem thêm' textColor='text-white' bgColor='bg-[#002466]' border='border-[3px] border-white' type='btn2' hoverType='btn-dark' textSize='text-button1'/>
                <div className="min-w-[122px] xl:min-w-fit">
                    {/* fix -> tour name */}
                    <div className="max-w-[200px] truncate text-body-2 text-neutral-1-900 pb-2 leading-[18px] md:max-w-[170px] xl:max-w-[130px]">{tour.name}</div> 
                    <div className="text-end text-title-2 font-semibold text-neutral-1-900 leading-[17px]">{Number(tour.price).toLocaleString()} đ</div>
                </div>
            </div>
        </Link>
    )
}

export default Card1