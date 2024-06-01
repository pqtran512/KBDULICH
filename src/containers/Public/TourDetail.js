import React, { useState, useEffect } from 'react';
import icons from '../../ultils/icons';
import { Button, Card2, Pagination } from '../../components';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getTour, getTourByName, getToursCondition } from '../../store/actions/tourPlaceAction'
import { getFeedbackByTourType, countByTourType } from '../../store/actions/orderFeedbackAction'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { splitDate, splitDateTime } from '../../ultils/splitDateTime';
import { getProvinceTitle } from '../../ultils/objectsToArr';

const { BsThreeDotsVertical, FaRegStar, FaStar, FaStarHalfAlt, MdCalendarToday } = icons

const TourDetail = () => {
    const {tourID} = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [ searchParams ] = useSearchParams()
    const { tour, tours_name, count_name } = useSelector(state => state.tour)
    let {tours_cond, count_cond } = useSelector(state => state.tour)
    const { feedbacks } = useSelector(state => state.feedback)
    const { count_order_tourtype } = useSelector(state => state.order)
    const [relatedTour, setRelatedTour] = useState([]);
    const [countRelatedTour, setCountRelatedTour] = useState(0);
    const [count, setCount] = useState(0);
    const [feedbacksPerPage] = useState(4);
    const [showOption, setShowOption] = useState(false);
    const [tourOption, setTourOption] = useState('detail');
    var settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        swipeToSlide: true
      };
    useEffect(() => {
        dispatch(getTour({tour_ID: tourID}))
        const tourType_ID = tourID.split('_')[0];
        dispatch(getFeedbackByTourType({tour_ID: tourType_ID}))
        dispatch(countByTourType({tour_ID: tourType_ID}))
    }, [dispatch, tourID])
    useEffect(() => {
        tour.name && dispatch(getTourByName({name: tour.name}))
    }, [tour.name])
    useEffect(() => {
        if (tours_cond) {
            tours_cond = []
            count_cond = 0
        }
        getRelatedTour(0)
    }, [tour])
    useEffect(() => {
        let arr_related = []
        let count_related = 0
        if (count_cond > 0) {
            for (var i = 0; i < count_cond; i++) {
                if (getProvinceTitle(tours_cond[i]).includes(tour.places[count].province)) {
                    if (tours_cond[i].name !== tour.name) {
                        arr_related = [...arr_related, tours_cond[i]]
                        count_related = count_related + 1
                    }
                }
            }
            setRelatedTour([...relatedTour, ...arr_related])
            setCountRelatedTour(countRelatedTour + count_related)
            if (count_related < 3) {
                let c = count + 1
                setCount(c)
                getRelatedTour(c)
            }
        }
    }, [tours_cond])
    const getRelatedTour = (count) => {
        if(tour.places && tour.places[count]) {
            dispatch(getToursCondition({
                destination: tour.places[count].province,
                isActive: true
            }))
        }
    }
    // Hàm bỏ dấu tiếng Việt
    function removeAccents(str) {
        return str.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/đ/g, 'd').replace(/Đ/g, 'D');
    }
    const navigateBooking = () => {
        navigate('/policy', { state: { tourID } });
    };
    const splitTitle = (paragraph) => {
        const firstNewlineIndex = paragraph.indexOf('\n');
        const firstSentence = paragraph.slice(0, firstNewlineIndex);
        const restOfParagraph = paragraph.slice(firstNewlineIndex + 1);
        return [firstSentence, restOfParagraph];
    }
    const rating_stars = (ratings, s) => {
        const fullStars = Math.floor(ratings);
        const hasFraction = ratings % 1 > 0;
        const emptyStars = 5 - Math.ceil(ratings);
        // Generate full stars
        let stars = []
        if (fullStars) {
            stars = Array.from({ length: fullStars }, (_, idx) => (
                <FaStar key={idx} size={s} color='#F8CC1A'/>
            ));
        }
        // Add a regular star if there is a fractional part
        if (hasFraction) {
            stars.push(<FaStarHalfAlt key='fractional' size={s} color='#F8CC1A'/>);
          }
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FaRegStar key={`emptyStar-${i}`} size={s} color='#F8CC1A'/>);
        }
        return stars
    }
    const getAvRating = () => {
        let sum = 0
        if (feedbacks.length) {
            for (var i = 0; i < feedbacks.length; i++) { 
                sum = sum + feedbacks[i].ratings
            }
            return (sum / feedbacks.length).toFixed(1)
        }
        else return 0
    }
    // pagination
    const currentPage = searchParams.get('page') || 1
    const indexOfLastPost = currentPage * feedbacksPerPage;
    const indexOfFirstPost = indexOfLastPost - feedbacksPerPage; 
    const currentFeedbacks = feedbacks.slice(indexOfFirstPost, indexOfLastPost);
    return (
        <main>
            <section className="flex justify-center relative w-full bg-sea animate-fade bg-center bg-no-repeat bg-cover rounded-b-[20px]">
                <div className="w-full py-28 px-6 md:py-32 md:max-w-3xl lg:px-2 xl:max-w-7xl xl:py-48 2xl:px-0">
                    <div className="mx-auto flex items-center justify-center pb-[86px] md:pb-[37px] xl:pb-[100px]">
                        <div className="whitespace-pre-wrap font-vampiroOne text-[24px] leading-10 tracking-[0.72px] uppercase text-center md:text-[32px] md:leading-[60px] md:tracking-[0.96px] xl:text-[50px] xl:leading-[99px] xl:tracking-[1.5px]">
                            {removeAccents(getProvinceTitle(tour).join('\n'))}</div>
                    </div>
                </div>
            </section>
            <section className="mx-auto w-full pt-10 pb-[120px] md:pb-[120px] xl:pb-[80px] xl:max-w-7xl">
                <div className="px-6 lg:px-2 2xl:px-0">
                    <div className="truncate w-full flex items-center py-[10px] gap-x-2">
                        <div className="text-neutral-1-600 text-body-1 leading-[34px] xl:text-[20px]">Du lịch</div>
                        <div className="flex items-center justify-center w-6 h-6">
                            <i className="twi-22-chevron-line text-[16px] text-secondary-1 text-center"></i>
                        </div>
                        <div className="text-neutral-1-600 text-body-1 leading-[34px] xl:text-[20px]">Du lịch trong nước</div>
                        <div className="flex items-center justify-center w-6 h-6">
                            <i className="twi-22-chevron-line text-[16px] text-secondary-1 text-center"></i>
                        </div>
                        <div className="truncate text-body-1 leading-[34px] text-neutral-1-900 xl:text-[20px]">{tour.name}</div>
                    </div>
                    <div className='flex flex-col justify-between xl:items-center xl:flex-row xl:gap-10'>
                        <div className="pt-[34px] pb-6 text-heading-4 text-neutral-1-900 font-semibold md:pt-8 xl:pb-7 xl:pt-[29px] xl:text-heading-3">{tour.name}</div>
                        <div className="h-[57px] w-fit min-w-[150px] px-4 shadow-btn rounded-[6px] flex items-center justify-center gap-x-2">
                            <i className="twi-22-heart-fill text-[20px] leading-[18px] text-[#EA2733]"></i>
                            <div className="text-body-1 text-neutral-1-900">{count_order_tourtype} lượt đặt</div>
                        </div>
                    </div>
                    <div className="pt-6 md:pt-8 xl:pt-7 xl:grid xl:grid-cols-845 xl:gap-x-6">
                        {/* carousel  */}
                        <Slider {...settings} className='cursor-grabbing'> 
                        {tour.places?.map((place, idx) => {
                          return ( 
                            <img key={idx} className="rounded-md aspect-[366/420] object-cover md:aspect-[720/446] xl:aspect-[845/480] xl:rounded-lg" src={place.images[0].images} alt=''/>
                          )
                        })}
                        </Slider>
                        <div className="grid grid-cols-1 gap-y-6 h-fit xl:row-span-2">
                             {/* Tour info  */}
                            <div className="hidden xl:block px-6 w-full border-[1.5px] border-neutral-2-200">
                                <div className="py-4 text-header-2 text-primary-2 font-semibold shadow-line">{tour?.name}</div>
                                <div className="py-4 text-body-2 text-neutral-1-900 shadow-line">Mã Tour: {tourID}</div>
                                <div className="py-4 text-body-2 text-neutral-1-900 shadow-line">Thời gian: {tour?.day_num} ngày {tour?.night_num} đêm</div>
                                <div className="py-4 text-body-2 text-neutral-1-900 shadow-line">Khởi hành: {splitDate(tour?.starting_date)[0]}/{splitDate(tour?.starting_date)[1]}/{splitDate(tour?.starting_date)[2]}</div>
                                <div className="py-4 text-body-2 text-neutral-1-900 shadow-line">Vận chuyển: {tour?.vehicle}</div>
                                <div className="py-4 text-body-2 text-neutral-1-900 shadow-line">Xuất phát: Từ {tour?.departure}</div>
                                <div className="py-4 text-body-2 text-neutral-1-900">SĐT hỗ trợ: 0{tour?.staff?.phone_no}</div>
                            </div>
                             {/* Giá  */}
                            <div className="border-[1.5px] border-neutral-2-200 pt-8 md:pt-6 xl:pt-0">
                                <div className="w-full text-center py-4 bg-neutral-2-100 text-primary-2 text-heading-4 font-semibold md:text-heading-3">
                                    {Number(tour.price).toLocaleString()} đ</div>
                                <Button textColor='text-white' bgColor='bg-primary-2' text='ĐẶT TOUR' wfull onClick={navigateBooking}/>
                            </div>
                            {/* Tour menu list  */}
                            <div className="w-full bg-neutral-2-100 px-6 hidden xl:block">
                                <a href="#diemnhan" className="flex items-center gap-x-6 py-4 shadow-white-line text-neutral-1-900 hover:text-primary-2">
                                    <i className="twi-22-alert-circle-line text-[24px] leading-6"></i>
                                    <div className="text-title-1 font-semibold leading-[39px]">Điểm nhấn hành trình</div>
                                </a>
                                <a href="#lichtrinh" className="flex items-center gap-x-6 py-4 shadow-white-line text-neutral-1-900 hover:text-primary-2">
                                    <i className="twi-22-map-fill text-[24px] leading-6"></i>
                                    <div className="text-title-1 font-semibold leading-[39px]">Lịch trình</div>
                                </a>
                                <a href="#dichvu" className="flex items-center gap-x-6 py-4 shadow-white-line text-neutral-1-900 hover:text-primary-2">
                                    <i className="twi-22-paperclip-line text-[24px] leading-6"></i>
                                    <div className="text-title-1 font-semibold leading-[39px]">Dịch vụ bao gồm và không bao gồm</div>
                                </a>
                                <a href="#ghichu" className="flex items-center gap-x-6 py-4 shadow-white-line text-neutral-1-900 hover:text-primary-2">
                                    <i className="twi-22-book-open-fill text-[24px] leading-6"></i>
                                    <div className="text-title-1 font-semibold leading-[39px]">Ghi chú</div>
                                </a>
                                <a href="#ngaykhoihanh" className="flex items-center gap-x-6 py-4 shadow-white-line text-neutral-1-900 group hover:text-primary-2">
                                    <MdCalendarToday size={23} />
                                    <div className="text-title-1 font-semibold leading-[39px]">Chuyến khác</div>
                                </a>
                            </div>
                        </div>
                        
                        {/* Tour detail  */}
                        <div className="pt-8">
                            <div className='mb-6 w-full pb-1 flex border-b border-neutral-1-800'>
                                <div className={`${tourOption === 'detail'? 'border-neutral-1-800 text-accent-4' : 'border-white text-neutral-1-600 hover:text-secondary-1 hover:bg-neutral-3-100'} transition-all cursor-pointer px-3 py-2 font-semibold rounded-md border-t border-x`}
                                    onClick={() => setTourOption('detail')}>Chương trình Tour</div>
                                <div className={`${tourOption === 'policy'? 'border-neutral-1-800 text-accent-4' : 'border-white text-neutral-1-600 hover:text-secondary-1 hover:bg-neutral-3-100'} transition-all cursor-pointer px-3 py-2 font-semibold rounded-md border-t border-x`}
                                    onClick={() => setTourOption('policy')}>Chính sách Tour</div>
                            </div>
                            { tourOption === 'detail'? 
                                <>
                                {/* Điểm nhấn hành trình  */}
                                <div id="diemnhan">
                                    <div className="flex items-center gap-x-4 pb-2 shadow-line mb-6 md:gap-x-6 md:pb-4">
                                        <i className="twi-22-alert-circle-line text-[28px] text-primary-2 leading-7"></i>
                                        <div className="text-title-1 text-neutral-1-900 font-semibold leading-[39px] md:text-[20px]">Điểm nhấn hành trình</div>
                                    </div>
                                    <div className="pb-8">
                                        <div className="grid grid-cols-101 gap-y-2 text-body-1 text-neutral-1-900md:text-body-2 xl:gap-x-2">
                                            <div className='font-semibold'>Hành trình</div>
                                            <div>{tour?.name}</div>
                                            <div className='font-semibold'>Lịch trình</div>
                                            <div>{tour?.day_num} ngày {tour?.night_num} đêm</div>
                                            <div className='font-semibold'>Khởi hành</div>
                                            <div>{splitDate(tour?.starting_date)[0]}/{splitDate(tour?.starting_date)[1]}/{splitDate(tour?.starting_date)[2]}</div>
                                            <div className='font-semibold'>Vận chuyển</div>
                                            <div>{tour?.vehicle}</div>
                                            <div className='font-semibold'>Số chỗ còn lại</div>
                                            <div>{tour?.seat_num - tour?.cus_num}</div>
                                        </div>
                                        <div className="pt-4 text-caption-1 leading-5 tracking-wider font-semibold md:text-[14px] xl:pt-6">{tour.name} ({tour.departure} - {getProvinceTitle(tour).join(' - ')}). </div>
                                        <p className="whitespace-pre-wrap text-caption-1 leading-5 tracking-wider md:text-[14px]">{tour?.tour_description}</p>
                                    </div>
                                </div>
                                 {/* Lịch trình  */}
                                <div id="lichtrinh">
                                    <div className="flex items-center gap-x-6 pb-2 shadow-line md:pb-4">
                                        <i className="twi-22-map-fill text-[24px] text-primary-2 leading-6"></i>
                                        <div className="text-title-1 text-neutral-1-900 font-semibold leading-[39px] md:text-[20px]">Lịch trình</div>
                                    </div>
                                    <div className="pb-8">
                                        {tour.schedule?.map((sched, idx) => {
                                            return ( 
                                                <div key={idx} className="pt-6 text-caption-1 text-neutral-1-900 tracking-wider md:text-body-2 md:pt-8">
                                                    <div className="font-semibold">{splitTitle(sched)[0]}</div> 
                                                    <div className="pt-2 flex md:pt-6">
                                                        <div className="flex flex-col">
                                                            <div className="w-[14px] h-4 rounded-[50%] bg-primary-2"></div>
                                                            <div className="border-r-[1.5px] border-dashed border-primary-2 h-line w-1/2"></div>
                                                            <div className="w-[14px] h-4 rounded-[50%] bg-primary-2"></div>
                                                        </div>
                                                        {idx === (tour.schedule.length - 1)?
                                                        <p className="pl-[31px] whitespace-pre-wrap">{splitTitle(sched)[1]}</p>
                                                        :
                                                        <p className="pl-[31px] whitespace-pre-wrap">{splitTitle(sched)[1]}</p>
                                                        }
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                {/* Dịch vụ  */}
                                <div id="dichvu" className="flex items-center gap-x-4 pb-2 shadow-line mb-4 md:gap-x-6 md:pb-4">
                                    <i className="twi-22-paperclip-line text-[28px] text-primary-2 leading-7"></i>
                                    <div className="text-title-1 text-neutral-1-900 leading-[39px] md:text-[20px] font-semibold">Dịch vụ kèm theo</div>
                                </div>
                                <div className='pb-8 pl-12 tracking-wider'>
                                    { tour.service?.map((item, idx) => {
                                        return (
                                            <div key={idx} className='text-caption-1 text-neutral-1-900 md:text-body-2'>- {item}</div>
                                        )
                                    })}
                                </div>
                                {/* Ghi chú  */}
                                <div id="ghichu" className="flex items-center gap-x-4 pb-2 shadow-line mb-4 md:gap-x-6 md:pb-4">
                                    <i className="twi-22-book-open-fill text-[28px] text-primary-2 leading-7"></i>
                                    <div className="text-title-1 text-neutral-1-900 leading-[39px] font-semibold md:text-[20px]">Ghi chú</div>
                                </div>
                                <div className='pb-8 pl-12 tracking-wider'>
                                    {tour.note === 'No note'? <></> : <div className='text-caption-1 text-neutral-1-900 md:text-body-2'>- {tour.note}</div>}
                                </div>
                                {/* Ngày khởi hành khác  */}
                                {count_name > 1?
                                    <div id="ngaykhoihanh">
                                        <div className="flex items-center gap-x-4 pb-2 shadow-line md:gap-x-6 md:pb-4">
                                            <MdCalendarToday className='text-primary-2' size={28} />
                                            <div className="text-title-1 text-neutral-1-900 leading-[39px] font-semibold md:text-[20px]">Chuyến khác</div>
                                        </div>
                                        <table className="tourtable table-auto text-body-2 xl:text-body-1">
                                            <thead>
                                                <tr className="font-semibold tracking-wider">
                                                    <td className="w-[40px] xl:min-w-[66px]">STT</td>
                                                    <td className="xl:min-w-[130px]">Ngày khởi hành</td>
                                                    <td className="min-w-[94px] xl:min-w-[141px]">Giá</td>
                                                    <td className="min-w-[100px] xl:min-w-[128px]">Số chỗ</td>
                                                    <td>Book tour</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tours_name?.map((t, idx) => {
                                                    if (t.tour_ID !== tour.tour_ID)
                                                        return (
                                                            <tr key={idx}>
                                                                <td>{idx+1}</td>
                                                                <td>{splitDate(t.starting_date)[0]}/{splitDate(t.starting_date)[1]}/{splitDate(t.starting_date)[2]}</td>
                                                                <td>{Number(t.price).toLocaleString()} đ</td>
                                                                <td>Còn {t.seat_num - t.cus_num} chỗ</td>
                                                                <td className='relative md:hidden'><BsThreeDotsVertical onClick={() => setShowOption(current => !current)}/>
                                                                    {showOption && 
                                                                        <div className='absolute'>
                                                                            <Link to={`/tour-booking/${t.tour_ID}`} className="bg-primary-2 w-16 h-7 flex items-center justify-center rounded-md shadow-shad1 hover:bg-primary-1">
                                                                                <div className="text-white text-body-2">Book</div></Link>
                                                                            <Link to={`/tour-detail/${t.tour_ID}`}  className="bg-white w-16 h-7 flex items-center justify-center rounded-md shadow-btn hover:bg-neutral-3-50">
                                                                                <div className="text-neutral-1-900 text-body-2">Chi tiết</div></Link>
                                                                        </div>
                                                                    }
                                                                </td>
                                                                <td className="gap-x-[11px] pt-4 hidden md:flex">
                                                                    <Link to={`/tour-booking/${t.tour_ID}`} className="bg-primary-2 w-16 h-7 flex items-center justify-center rounded-md shadow-shad1 hover:bg-primary-1">
                                                                        <div className="text-white text-body-2">Book</div></Link>
                                                                    <Link to={`/tour-detail/${t.tour_ID}`}  className="bg-white w-16 h-7 flex items-center justify-center rounded-md shadow-btn hover:bg-neutral-3-50">
                                                                        <div className="text-neutral-1-900 text-body-2">Chi tiết</div></Link>
                                                                </td>
                                                            </tr>
                                                        );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                    : <></>
                                } 
                                </>
                            :
                                <>
                                    <div className="text-center text-title-1 text-neutral-1-900 font-semibold leading-[39px] md:text-[20px]">Thông tin chính sách</div>
                                    <div className="pb-8">
                                        <div className="pt-4 pb-2 font-semibold">* Trường hợp hủy vé landtour, quý khách vui lòng thanh toán các khoản sau:</div>
                                        <p className="text-caption-1 text-justify leading-5 tracking-wider md:text-[14px]">
                                            - Hủy vé trong vòng 24 giờ hoặc ngay ngày khởi hành, chịu phạt 100% tiền tour.<br/>
                                            - Hủy vé trước ngày khởi hành từ 2 - 7 ngày, chịu phạt 80% tiền tour.<br/>
                                            - Hủy vé trước ngày khởi hành từ 8 - 14 ngày, chịu phạt 50% tiền tour.<br/>
                                            - Hủy vé trước ngày khởi hành từ 15 ngày trở lên, chịu phạt 30% tiền tour.<br/>
                                            - Sau khi hủy tour, du khách vui lòng kiểm tra email từ KBDulich hoặc đến nhận tiền trong vòng 15 ngày kể từ ngày kết thúc tour. Chúng tôi chỉ thanh toán trong khỏang thời gian nói trên.
                                        </p>
                                        <div className="pt-4 pb-2 font-semibold">* Quy định vé máy bay:</div>
                                        <p className="text-caption-1 text-justify leading-5 tracking-wider md:text-[14px]">
                                            - Giá vé máy bay không bao gồm suất ăn/uống trên máy bay.<br/>
                                            - Không được hoàn hoặc hủy vé máy bay. Nếu hủy, vui lòng chịu phạt 100% chi phí vé máy bay.<br/>
                                            - Khi đăng ký VMB, quý khách cung cấp họ và tên, ngày tháng năm sinh (đúng từng ký tự ghi trong hộ chiếu hoặc CMND/CCCD).<br/>
                                            - Không được thay đổi thông tin đặt chỗ: họ tên hành khách, chuyến bay, ngày bay, chặng bay, tách đoàn, gia hạn vé.<br/>
                                            - Số lượng khách tối thiểu để tổ chức tour: <span className='font-semibold'>10 khách/đoàn.</span><br/>
                                            - Du khách được miễn cước 1 KIỆN (23 kg) hành lý ký gởi và 1 KIỆN (10kg) hành lý xách tay.<br/>
                                            - Trường hợp hủy tour do sự cố khách quan như thiên tai, dịch bệnh hoặc do máy bay hoãn - hủy chuyến, Lữ hành KBDulich sẽ không chịu trách nhiệm bồi thường thêm bất kỳ chi phí nào khác ngoài việc hoàn trả chi phí những dịch vụ chưa được sử dụng của tour đó (ngoại trừ chi phí vé máy bay).
                                        </p>
                                        <div className="pt-4 pb-2 font-semibold">* Hành lý và giấy tờ tùy thân:</div>
                                        <p className="text-caption-1 text-justify leading-5 tracking-wider md:text-[14px]">
                                        - Du khách mang theo giấy tờ tùy thân còn thời hạn sử dụng: Chứng Minh Nhân Dân / Căn cước Công Dân hoặc Hộ chiếu. Đối với du khách là Việt kiều, Quốc tế nhập cảnh Việt Nam bằng visa rời, vui lòng mang theo visa khi đăng ký và khi đi tour.<br/>
                                        - Khách lớn tuổi (từ 70 tuổi trở lên), khách tàn tật tham gia tour, phải có thân nhân đi kèm và cam kết đảm bảo đủ sức khỏe khi tham gia tour du lịch.<br/>
                                        - Trẻ em dưới 14 tuổi khi đi tour phải mang theo giấy khai sinh hoặc hộ chiếu. Trẻ em từ 14 tuổi trở lên phải mang theo giấy Chứng Minh Nhân Dân / Căn cước Công Dân. <br/>
                                        <span className='font-semibold'>- Tất cả giấy tờ tùy thân mang theo đều phải bản chính.</span> <br/>
                                        - Du khách mang theo hành lý gọn nhẹ và phải tự bảo quản hành lý, tiền bạc, tư trang trong suốt thời gian đi du lịch.<br/>
                                        - Khách Việt Nam ở cùng phòng với khách Quốc tế hoặc Việt kiều yêu cầu phải có giấy hôn thú.<br/>
                                        <span className='font-semibold'>- Quý khách có mặt tại sân bay trước 3 tiếng so với giờ khởi hành.</span>  
                                        </p>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="pt-16 px-6 lg:px-2 2xl:px-0">
                    <div className="text-heading-2 leading-[42px] text-neutral-1-900 font-comfortaa font-semibold">Bình luận</div>
                    <div className="pt-6 flex items-center gap-1">
                        <div className="text-body-1 tracking-[0.2px] text-neutral-1-500 border-b border-neutral-1-500 w-fit">{getAvRating()}</div>
                        <div className="flex gap-x-0.5 px-2">
                            {feedbacks? rating_stars(getAvRating(), 24) : <></>}
                        </div>
                        <div className="text-neutral-1-900 text-body-1 tracking-[0.2px]">{feedbacks? feedbacks.length : 0} đánh giá</div>
                    </div>
                    {/* Comments */}
                    { currentFeedbacks.length > 0 && currentFeedbacks?.map((item, idx) => {
                        return ( 
                            <div key={idx} className="w-full py-10 border-b border-neutral-2-200">
                                <div className="w-full flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="text-title-3 font-semibold text-neutral-1-900">{item.customer.username}</div>
                                        <div className="flex gap-x-0.5">
                                            {rating_stars(item.ratings, 20)}
                                        </div>
                                    </div>
                                    <div className="text-caption-1 tracking-[0.2px] text-neutral-1-600">{splitDateTime(item.datetime)[1] + ', ' + splitDateTime(item.datetime)[0]}</div> {/* 18:20, 18/09/2019 */}
                                </div>
                                <p className="pt-2 text-neutral-1-900 text-body-2 tracking-[0.1px]">{item.reviews}</p>
                            </div>
                        );
                    })}
                    <div className='pt-8'>
                        <Pagination limit={4} count={feedbacks?.length}/> 
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
        </main>
    )
}

export default TourDetail
