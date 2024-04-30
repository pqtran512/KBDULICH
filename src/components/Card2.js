import React from 'react'
import { Link } from 'react-router-dom'

const Card2 = ({animation, hidden, tour}) => {
    const convertDateFormat = (inputDate) => {
        const dateParts = inputDate.split('-'); // Split the date string into an array
        const year = dateParts[0];
        const month = dateParts[1];
        const day = dateParts[2];
        
        const formattedDate = `${day}/${month}/${year}`; // Reformat the date string as desired
        return formattedDate;
    }
    const getPlaces = () => {
        const provinces = [...new Set(tour.places.map(place => place.province))];
        const formattedProvinces = provinces.join(' - ');
        return formattedProvinces
    }
    return (
        <Link to={`/tour-detail/${tour.tour_ID}`} className={`${hidden} relative pb-5 rounded-[20px] shadow-shad1 overflow-hidden group xl:pb-7 animate-fade-down ${animation}`}>
            <div className="relative w-full pt-[48.09%] md:pt-[44.83%] transition-all xl:pt-[45.63%] xl:overflow-hidden">
                <img className="absolute w-full h-full top-0 left-0 object-cover transition-all xl:group-hover:scale-125" src={tour.places[0].images[0].images} alt=''/>
                <div className='absolute w-full h-full top-0 left-0 bg-black/10'></div>
            </div>
            <div className="absolute w-full px-6 top-4 flex items-center justify-between">
                <div className="text-white text-title-2 font-semibold xl:text-title-1">{getPlaces()}</div>
            </div>
            <div className="h-full pt-4 px-6 md:pt-[14px] xl:pt-4">
                <div className="flex flex-col justify-between">
                    <div className="my-2 text-title-2 leading-[17px] font-semibold text-neutral-1-900 min-h-[48px] line-clamp-2 xl:text-title-1">{tour.name}</div>
                    <div className='flex justify-between items-center'>
                        <div className="text-caption-1 text-neutral-1-600 leading-[17px]">Ngày khởi hành: {convertDateFormat(tour.starting_date)}</div>
                        <div className="text-header-2 text-secondary-1 font-semibold leading-[17px]">{Number(tour.price).toLocaleString()} đ</div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Card2