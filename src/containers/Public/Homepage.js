import React, { useEffect, useState } from 'react';
import logoBlue from '../../assets/img/header-footer/logo-blue.png'
import { Datepicker, ButtonRound, Card1, Card2, Card3, CardArticle, SelectInput, Loading } from '../../components'
import { getToursCondition, getToursRating, getAllPlaces } from '../../store/actions/tourPlaceAction';
import { useDispatch, useSelector } from 'react-redux'
import { createSearchParams, useNavigate, Link } from "react-router-dom";
import { formatVietnameseToString } from '../../ultils/formatVietnameseToString';
import { provinceObjects } from '../../ultils/objectsToArr';
  
const Homepage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchOption, setSearchOption] = useState({ 
        departure: '',
        destination: '',
        starting_date: '',
    })
    const [loading, setLoading] = useState(false);
    const { tours_cond, count_cond, tours_rating } = useSelector(state => state.tour)
    const { places } = useSelector(state => state.place)
    const [newPlaces, setNewPlaces] = useState([]);
    // Functions
    useEffect(() => {
        setLoading(true);
        dispatch(getAllPlaces())
        dispatch(getToursRating())
        dispatch(getToursCondition({ isActive: true }))
            .then(() => {
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false); // Ensure loading is set to false even if an error occurs
            });
    }, [dispatch])
    useEffect(() => {
        if (places) {
            const place_arr = provinceObjects(places, true)
            setNewPlaces(place_arr)
        }
    }, [places])
    const handleSearch = () => {
        let params = {}
        if (searchOption.departure !== '') {
            params.departure = formatVietnameseToString(searchOption.departure);
        }
        if (searchOption.destination !== '') {
            params.destination = formatVietnameseToString(searchOption.destination);
        }
        if (searchOption.starting_date !== '') {
            params.starting_date = searchOption.starting_date;
        }
        console.log(searchOption)
        navigate({
            pathname: 'search',
            search: createSearchParams(params).toString()
        });
    }
    return (
        <div className='overflow-x-hidden'>
            {/* Banner giới thiệu */}
            <section className="flex justify-center relative w-full bg-mountain animate-fade md:bg-mountain-md xl:bg-mountain-xl bg-center bg-no-repeat bg-cover rounded-b-[20px]">
                <div className="w-full pt-20 pb-10 px-6 md:pt-16 md:max-w-3xl md:pb-[200px] lg:px-2 xl:max-w-7xl xl:pt-[150px] xl:pb-[196px] 2xl:px-0">
                    <div className="absolute top-0 left-0 h-full right-1/2 bg-grad opacity-80 rounded-bl-[20px] md:right-1/3 xl:right-1/2"></div>
                    <div className="relative z-10">
                        <div className="text-black pb-[71px] font-semibold md:pb-[26px] xl:pb-[62px]">
                            <div className="pb-4 text-heading-4 md:text-heading-3 xl:pb-6 xl:text-[48px] xl:leading-[64px] xl:max-w-[660px]">Khám phá các điểm đến được yêu thích</div>
                            <ButtonRound link='/search' width='w-[170px]' height='h-12' text='Khám phá ngay' textColor='text-white' bgColor='bg-primary-2' type='btn1' hoverType='btn-dark' textSize='text-body-2 md:text-button' />
                        </div>
                        <div className="relative animate-fade-down">
                            <div className="bg-white rounded-[20px] shadow-shad1 py-[18px] px-6 md:rounded-[6px] md:pt-5 md:pr-[7px] md:flex md:mr-4 md:justify-between xl:mr-[326px] xl:pr-[21px]">
                                <div className="flex justify-between pb-6 md:pb-0 md:gap-x-[18px] xl:gap-x-[75px]">
                                    <div className="md:w-[156px]">
                                        <div className='text-[14px] h-[31px] text-neutral-1-900 font-semibold xl:text-[18px]'>Nhập điểm đi</div>
                                        { newPlaces?.length > 0?
                                            <SelectInput options={newPlaces} keyPayload='departure' setValue={setSearchOption} myStyle='w-[148px] text-body-2 md:w-[130px] xl:text-body-1 xl:w-[148px]'/>
                                        : <SelectInput myStyle='w-[148px] text-body-2 md:w-[130px] xl:text-body-1 xl:w-[148px]'/>
                                        }
                                    </div>
                                    <div className="md:w-[163px]">
                                        <div className='text-[14px] h-[31px] text-neutral-1-900 font-semibold xl:text-[18px]'>Nhập điểm đến</div>
                                        <SelectInput options={newPlaces} keyPayload='destination' setValue={setSearchOption} myStyle='w-[148px] text-body-2 md:w-[130px] xl:text-body-1 xl:w-[148px]'/>
                                    </div>
                                </div>
                                <div className="flex justify-between items-end md:items-center md:gap-x-[37px] xl:gap-x-[104px]">
                                    <div className="min-w-[148px]">
                                        <div className="pr-2 text-[14px] h-[31px] text-neutral-1-900 font-semibold xl:text-[18px]">Chọn ngày</div>
                                       <Datepicker width='w-[120px] xl:w-[148px]' height='h-9' top='top-[10px]' outline keyPayload='starting_date' setValue={setSearchOption}/>
                                    </div>
                                    <ButtonRound link='/search' width='w-[120px] xl:w-[148px]' height='h-10 md:h-12 xl:h-[52px]' text='Tìm kiếm' textColor='text-white' bgColor='bg-primary-2' type='btn1' hoverType='btn-dark' textSize='text-caption-2 md:text-button1'
                                        onClick={handleSearch} />
                                </div>
                            </div>
                            <div className="absolute -z-10 bg-grad2 rounded-[20px] backdrop-blur-md shadow-[20px_20px_59px_11px_rgba(0,0,0,0.07)] w-full top-28 pt-[95px] px-6 pb-6 md:pt-[43px] md:top-20 xl:pt-16 xl:px-[85px] xl:pb-[83px] xl:top-[63px]">
                                <div className="pb-4 text-[18px] text-neutral-1-900 leading-[31px] font-semibold md:pb-6 md:text-[20px] xl:text-[24px]">Tour giờ chót</div>
                                <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-20 xl:grid-cols-3 xl:gap-x-36">
                                    { loading?
                                    <>
                                        <div className="animate-pulse rounded-md outline outline-slate-300 outline-offset-4 bg-slate-200 h-[125px] w-[265px]"></div>
                                        <div className="animate-pulse rounded-md outline outline-slate-300 outline-offset-4 bg-slate-200 h-[125px] w-[265px]"></div>
                                        <div className="animate-pulse rounded-md outline outline-slate-300 outline-offset-4 bg-slate-200 h-[125px] w-[265px]"></div>
                                    </>
                                    :
                                    tours_cond.length > 0 && (() => {
                                            const sorted = [...tours_cond].sort((a, b) => 
                                                a['bookingDeadline'] > b['bookingDeadline'] ? 1 : -1
                                            );
                                            return sorted?.slice(0, 3).map((tour, idx) => (
                                                <Card1 key={idx} tour={tour}/>
                                            ));
                                        })()
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Tour ưu đãi */}
            <section className="mx-auto w-full pt-[230%] pb-20 md:max-w-3xl md:pb-[120px] md:pt-[461px] xl:pb-[100px] xl:pt-[289px] xl:max-w-7xl">
                <div className="px-6 lg:px-2 2xl:px-0">
                    <div className="pb-8 xl:pb-[60px] text-neutral-1-900">
                        <div className="pb-4 text-[23px] font-semibold leading-[31px] md:text-[24px] md:pb-2 xl:pb-4 xl:text-[32px]">Khám phá hành trình hấp dẫn</div>
                        <div className="text-body-2 xl:text-body-1">Đừng bỏ lỡ các tour du lịch vô cùng hấp dẫn !</div>
                    </div>
                    {loading ? (
                        <div className='mx-auto'><Loading loading={loading}/></div>
                    ) : (
                        <div className="grid gap-y-6 md:grid-cols-2 md:gap-x-6 md:gap-y-8 xl:grid-cols-3 ">
                            {/* mobile (3 cards), tablet (6 cards), desktop (9 cards) */}
                            {tours_cond?.slice(0, 3).map((tour, idx) => {
                                if (idx % 2 === 0) 
                                    return ( <Card2 animation='md:animate-fade-right xl:animate-fade-down' tour={tour} key={idx}/> );
                                else 
                                    return ( <Card2 animation='md:animate-fade-left xl:animate-fade-down' tour={tour} key={idx}/>  );
                            })}
                            {tours_cond?.slice(3, 6).map((tour, idx) => {
                                if (idx % 2 === 0) 
                                    return ( <Card2 hidden='hidden md:block' animation='md:animate-fade-left xl:animate-fade-down' tour={tour} key={idx}/> );
                                else 
                                    return ( <Card2 hidden='hidden md:block' animation='md:animate-fade-right xl:animate-fade-down' tour={tour} key={idx}/>  );
                            })}
                            {tours_cond?.slice(6, 9).map((tour, idx) => (
                                <Card2 hidden='hidden xl:block' animation='xl:animate-fade-down' tour={tour} key={idx} />
                            ))}
                        </div>
                        )   
                    }
                    <div className="pt-6 w-full flex items-center justify-center xl:pt-11">
                        <ButtonRound onClick={() => navigate('/search')} width='w-[142px]' height='h-[51px]' text='Xem thêm' textColor='text-neutral-1-900' border='border-[2px] border-primary-2' type='btn3' hoverType='btn-light' textSize='text-button1 font-semibold xl:text-black xl:text-button'/>
                    </div>
                </div>
            </section>
            {/* Banner cây dừa */}
            <section className="pt-[42px] pb-10 w-full bg-coconut bg-center bg-no-repeat bg-cover md:bg-coconut-md md:pt-[30px] xl:bg-coconut-xl xl:pt-[111px] xl:pb-[148px]">
                <div className="mx-auto lg:px-2 xl:max-w-7xl 2xl:px-0">
                    <div className="mx-auto max-w-[319px] md:max-w-[446px] xl:ml-0">
                        <div className="pb-2 flex items-center md:pb-4 xl:pb-6">
                            <img className="w-[75px] h-[52px] object-contain xl:w-[80px] xl:h-[56px]" src={logoBlue} alt=''/>
                            <div className="w-[141px] font-vampiroOne text-[28px] leading-[29px] tracking-[0.84px] text-neutral-1-900 text-center uppercase md:ml-2 xl:ml-[14px] xl:text-[32px]">
                                Du lich
                            </div>
                        </div>
                        <div className="pb-[69px] text-neutral-1-900 text-body-2 md:pb-[33px] xl:pb-[110px] xl:text-body-1">KBDulich luôn mong muốn đem đến cho khách hàng thông tin dịch vụ mới, chất lượng và trở thành “người bạn đồng hành” trên mọi hành trình. 
                            Tính đến năm 2023, KBDulich đã đạt được những con số sau: </div>
                    </div>
                    <div className="flex items-center justify-center xl:items-start xl:justify-start">
                        <div className="grid gap-y-8 xl:grid-cols-3 xl:gap-x-8 xl:animate-fade-right">
                            <div className="w-[257px] min-h-[94px] flex items-center justify-center bg-white/60 rounded-[50px] backdrop-blur-sm md:bg-white/80">
                                <div className="w-fit">
                                    <div className="font-prata text-[28px] leading-[50px] text-primary-2 text-center">+119</div>
                                    <div className="text-body-1 text-neutral-1-900/80 text-center">Địa điểm trên cả nước</div>
                                </div>
                            </div>
                            <div className="w-[257px] min-h-[94px] flex items-center justify-center bg-white/60 rounded-[50px] backdrop-blur-sm md:bg-white/80">
                                <div className="w-fit">
                                    <div className="font-prata text-[28px] leading-[50px] text-primary-2 text-center">+{count_cond}</div>
                                    <div className="text-body-1 text-neutral-1-900/80 text-center">Tour trong nước</div>
                                </div>
                            </div>
                            <div className="w-[257px] min-h-[94px] flex items-center justify-center bg-white/60 rounded-[50px] backdrop-blur-sm md:bg-white/80">
                                <div className="w-fit">
                                    <div className="font-prata text-[28px] leading-[50px] text-primary-2 text-center">+174</div>
                                    <div className="text-body-1 text-neutral-1-900/80 text-center">Khách hàng</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Điểm đến yêu thích */}
            <section className="pt-20 pb-20 xl:pt-[100px]">
                <div className="mx-auto px-6 md:max-w-3xl lg:px-2 xl:max-w-7xl 2xl:px-0">
                    <div className="text-heading-4 font-semibold text-neutral-1-900 pb-4 md:pb-2 xl:hidden">Điểm đến được yêu thích nhất</div>
                    <div className="hidden pb-4 text-[32px] font-semibold leading-[31px] text-neutral-1-900 xl:block">
                        Điểm đến được yêu thích nhất
                    </div>
                    <div className="pb-8 text-body-2 text-neutral-1-900 xl:pb-[60px] xl:text-body-1">
                        Sự lựa chọn hoàn hảo và được yêu thích nhất dựa trên đánh giá từ du khách.
                    </div>
                    <div className="grid gap-6 animate-fade-down md:animate-fade xl:grid-cols-xl">
                        <div className="grid gap-6 md:grid-flow-col md:grid-cols-md md:grid-rows-2 xl:grid-subcols-xl">
                            {tours_rating?.length > 0 && tours_rating?.slice(0, 2).map((row) => {
                                return ( <Card3 key={row.row.tour_ID} row={row} type='1'/> )
                            })}
                            {/* longest card */}
                            {tours_rating?.length > 0 && tours_rating?.slice(2, 3).map((row) => {
                                return ( <Card3 key={row.row.tour_ID} row={row} type='2'/> )
                            })}
                        </div>
                        <div className="grid gap-6 md:grid-cols-md md:grid-rows-temp xl:grid-subcols2-xl">
                            {/* largest card */}
                            {tours_rating?.length > 0 && tours_rating?.slice(3, 4).map((row) => {
                                return ( <Card3 key={row.row.tour_ID} row={row} type='3'/> )
                            })}
                            {tours_rating?.length > 0 && tours_rating?.slice(4, 6).map((row) => {
                                return ( <Card3 key={row.row.tour_ID} row={row} type='1'/> )
                            })}
                        </div>
                    </div>
                </div>
            </section>
            {/* Tin tức */}
            <section className="pt-30 pb-[195px] md:pt-8 md:pb-[188px] xl:py-[100px]">
                <div className="relative">
                    <div className="absolute top-0 left-0 w-full">
                        <div className="relative w-full pt-[27.05%] md:pt-[26.62%] xl:pt-[19.69%]">
                            <img className="absolute w-full h-full top-0 left-0 object-contain" src="../img/home/curve.png" alt=''/>
                        </div>
                    </div>
                    <div className="mx-auto px-6 lg:px-2 md:max-w-3xl xl:max-w-7xl 2xl:px-0">
                        <div className="pt-[88px] pb-4 text-[24px] font-semibold text-neutral-1-900 leading-[31px] md:pb-2 md:pt-[190px] xl:pb-4 xl:pt-[224px] xl:text-[32px]">
                            Tin tức cẩm nang du lịch
                        </div>
                        <div className="pb-8 text-body-2 text-neutral-1-900 xl:pb-[60px] xl:text-body-1">
                            Sự lựa chọn hoàn hảo và được yêu thích nhất dựa trên đánh giá từ du khách.
                        </div>
                        <div className="grid gap-y-8 md:grid-cols-2 md:gap-x-6 xl:grid-cols-3">
                            {places?.[10] && <CardArticle key={10} pb='pb-[15px] md:pb-0 xl:pb-[19px]' animation='animate-fade-down md:animate-fade-right xl:animate-fade-down' place={places[10]}/>}
                            {places?.[11] && <CardArticle key={11} pb='pb-[15px] md:pb-0 xl:pb-[19px]' animation='animate-fade-down md:animate-fade-left xl:animate-fade-down' place={places[11]}/>}
                            {places?.[12] && <CardArticle pb='xl:pb-[19px]' animation='md:animate-fade-right xl:animate-fade-down' hidden='hidden md:block' place={places[12]}/>}
                            {places?.[13] && <CardArticle hidden='hidden md:block xl:hidden' animation='md:animate-fade-left xl:animate-fade-down' place={places[13]}/>}
                        </div>
                        <div className="pt-6 w-full flex items-center justify-center xl:pt-8">
                            <Link to={'/news'} className="relative py-3 px-8 text-button1 font-semibold text-neutral-1-900 border-[2px] border-primary-2 rounded-[99px] shadow-shad1 btn-light btn3 hover-filled-slide-right xl:text-black xl:text-button">
                                <span className="relative z-10">Xem thêm</span></Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Homepage
