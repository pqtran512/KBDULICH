import React from 'react'
import { Link } from 'react-router-dom'
import icons from '../ultils/icons'
import { ratingClassifier } from '../ultils/ratingClassifier';

const { FaStar } = icons

const Card3 = ({row, type}) => {
    const getPlaces = () => {
        const provinces = [...new Set(row.row.places.map(place => place.province))];
        const formattedProvinces = provinces.join(' - ');
        return formattedProvinces
    }
    const getRatingLabel = (rating) => {
        const r = ratingClassifier(rating)
        if (r === 1) return 'Tuyệt vời'
        else if (r === 2) return 'Tốt'
        else if (r === 3) return 'Trung bình'
        else return 'Tệ'
    }
    
    return (
        <Link to={`/tour-detail/${row.row.tour_ID}`} className={`relative overflow-hidden rounded-[20px] ${(type === '1')? 'h-[366px] md:h-[348px] xl:h-[302px]' : (type==='2')? 'md:row-span-2 h-[505px] md:h-[720px] xl:h-[628px]': 'md:col-span-2 h-[366px] md:h-[302px]'}`}>
            <img src={row.row.places[0].images[0].images} className='absolute top-0 left-0 w-full h-full ascpect-[628/395] object-cover' alt=''/>
            {/* <div className="w-fit ">
                <div className="bg-secondary-1 text-body-2 text-white rounded-md py-2 pl-[9px] pr-[6px]"> quan tâm</div>
            </div> */}
            <div className="w-[43px] h-10 bg-frame bg-no-repeat bg-contain flex justify-center mb-1 ml-auto mr-6 md:mr-[22px] xl:mr-[31px]">
                
            </div>
            <div className="w-fit absolute top-6 right-6">
                <div className="relative pb-2">
                    <FaStar className="ml-[35px]" color="#F59E0B" size='58'/>
                    <div className="absolute top-5 left-[56%] text-white text-[16px] leading-[17px] font-semibold">{row.average_rating.toFixed(1)}</div>
                </div>
                <div>
                    <div className="bg-black/[.15] rounded-lg pr-[9px] pl-2 pt-[5px] pb-[13px] text-body-2 text-white">
                        <div className="w-fit ml-auto mr-0 pb-1 font-semibold">{getRatingLabel(row.average_rating)}</div>
                        <div className="bg-black/[.15] rounded-md py-2 pl-[9px] pr-[6px]">{row.order} lượt đặt</div> 
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 w-full h-[38%] bg-grad3 pb-5 pl-6 flex items-end">
                <div className='w-full'>
                    <div className="truncate pb-2 text-title-1 leading-[18px] text-white font-semibold">{row.row.name}</div>
                    <div className="text-caption-1 text-white">{getPlaces()}</div>
                </div>
            </div>
        </Link>
    )
}

export default Card3