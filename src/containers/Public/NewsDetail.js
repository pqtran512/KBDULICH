import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import { Card2 } from '../../components';
import { useLocation } from 'react-router-dom'
import { getPlaceCond, getToursCondition } from '../../store/actions/tourPlaceAction';
import { useDispatch, useSelector } from 'react-redux'
import { tourUniqueName } from '../../ultils/objectsToArr';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const NewsDetail = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const province = location.state;
    const { place_cond, count_cond } = useSelector(state => state.place)
    const { tours_cond} = useSelector(state => state.tour)
    const [bg, setBg] = useState('');
    const [relatedTour, setRelatedTour] = useState([]);
    useEffect(() => {
        if (count_cond > 0)
            setBg(place_cond[0].images[0].images)
    }, [count_cond])
    var settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2200,
        swipeToSlide: true
      };
    // Hàm bỏ dấu tiếng Việt
    useEffect(() => {
        dispatch(getPlaceCond({province: province}))
        dispatch(getToursCondition({
            destination: province,
            isActive: true
        }))
    }, [dispatch, province])
    useEffect(() => {
        setRelatedTour(tourUniqueName(tours_cond))
    }, [tours_cond])
    function removeAccents(str) {
        return str.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/đ/g, 'd').replace(/Đ/g, 'D');
    }
    return (
        <div>
            <section style={{ backgroundImage: `url('${bg}')`}} className={`flex justify-center relative w-full animate-fade bg-center bg-no-repeat bg-cover rounded-b-[20px] md:bg-sea-md xl:bg-sea-xl`}>
                <div className="w-full pt-[188px] pb-10 px-6 md:pt-[130px] md:max-w-3xl md:pb-[250px] lg:px-2 xl:max-w-7xl xl:pt-[232px] xl:pb-[196px] 2xl:px-0">
                    <div className="absolute top-0 left-0 h-full w-full bg-black/25 rounded-bl-[20px]"></div>
                    <div className="mx-auto flex items-center justify-center pb-[86px] max-w-[242px] md:pb-[37px] md:max-w-[404px] xl:pb-[100px] xl:max-w-[584px]">
                        <div className="relative z-10 text-white font-vampiroOne text-[24px] leading-10 tracking-[0.72px] uppercase text-center md:text-[32px] md:leading-[60px] md:tracking-[0.96px] xl:text-[50px] xl:leading-[99px] xl:tracking-[1.5px]">
                        {removeAccents(province)}</div>
                    </div>
                </div>
            </section>
            <section className="mx-auto w-full pb-[62px] animate-fade md:max-w-3xl md:pb-8 pt-[50px] xl:max-w-7xl">
                <div className="px-6 lg:px-2 2xl:px-0">
                    <div className="pb-[53px] md:pb-[58px] xl:pb-4">
                        <div className="truncate w-full flex items-center py-[10px] gap-x-1 md:gap-x-2">
                            <div className="text-neutral-1-600 text-body-1 leading-[34px] md:text-[20px]">Du lịch</div>
                            <div className="flex items-center justify-center w-6 h-6">
                                <i className="twi-22-chevron-line text-[16px] text-secondary-1 text-center"></i>
                            </div>
                            <div className="text-body-1 leading-[34px] text-neutral-1-900 md:hidden">Tin tức</div>
                            <div className="text-neutral-1-600 text-body-1 leading-[34px] hidden md:block md:text-[20px]">Du lịch trong nước</div>
                            <div className="items-center justify-center w-6 h-6 hidden md:flex">
                                <i className="twi-22-chevron-line text-[16px] text-secondary-1 text-center"></i>
                            </div>
                            <div className="truncate leading-[34px] text-neutral-1-900 hidden md:block text-[20px]">Du lịch {province} </div>
                        </div>
                        <div className="py-6 text-heading-4 font-semibold text-neutral-1-900 md:text-heading-3 md:pt-8 xl:pb-[22px]">
                            Du lịch {province} </div>
                    </div>
                    <div className="mx-auto md:max-w-[534px] xl:max-w-[920px]">
                        <Slider {...settings} className='cursor-grabbing'>
                            {place_cond?.map((p) => {
                                return ( 
                                    <img className="rounded-md aspect-[366/221] object-cover md:aspect-[720/424] md:rounded-lg xl:aspect-[1280/646]" src={p.images[0].images} alt=''/> 
                                )
                            })}
                        </Slider>
                    </div>
                    <div className="mx-auto pt-8 md:max-w-[534px] md:pt-[37px] xl:pt-12 xl:max-w-7xl">
                        {place_cond?.map((p) => {
                            return ( 
                                <div className='pb-10'>
                                    <p className="text-body-1 text-neutral-1-900 pb-10 text-justify"><span className='text-header-1 font-semibold'>{p.name} </span>{p.description}</p>
                                    <img className="mx-auto rounded-md w-2/3 aspect-[366/221] object-cover md:aspect-[720/424] md:rounded-lg xl:aspect-[1280/646]" src={p.images[0].images} alt=''/> 
                                    <div className='pt-2 italic text-center tracking-wide'>{p.name}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>      
            </section>
            <section className="mx-auto w-full pb-[92px] md:pb-[120px] md:max-w-3xl xl:pb-[156px] xl:max-w-7xl">
                <div className="px-6 lg:px-2 2xl:px-0">
                    <div className="pb-8 text-neutral-1-900 text-heading-4 font-semibold leading-[31px] xl:text-[32px] xl:pb-[60px]">Tour liên quan</div>
                    <div className="grid gap-y-6 md:grid-cols-2 md:gap-x-6 xl:grid-cols-3">
                    {relatedTour?.slice(0, 3).map((t, idx) => {
                        if (idx % 2 === 0) 
                            return ( <Card2 animation='md:animate-fade-right xl:animate-fade' tour={t} key={idx}/> );
                        else 
                            return ( <Card2 animation='md:animate-fade-left xl:animate-fade' tour={t} key={idx}/>  );
                    })}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default NewsDetail
