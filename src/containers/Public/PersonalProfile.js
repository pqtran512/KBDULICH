import React, { useState, useEffect } from 'react';
import icons from '../../ultils/icons';
import { Button } from '../../components';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import { getOrderOfCustomer, feedbackAdd } from '../../store/actions/orderFeedbackAction';
import { splitDateTime } from '../../ultils/splitDateTime';
import { getProvinceTitle } from '../../ultils/objectsToArr';
import { orderCancel } from '../../store/actions/orderFeedbackAction';

const { MdTour, FaStar, IoClose } = icons

const PersonalProfile = () => {
    const dispatch = useDispatch()
    const [invalidFields, setInvalidFields] = useState([])
    const [option, setOption] = useState('option1');
    const [hover, setHover] = useState(null);
    const [payload, setPayload] = useState({
        tour_ID: '',
        order_ID: '',
        ratings: 0,
        reviews: '', 
    })
    const [isShown, setIsShown] = useState(false);
    const { orders_customer, msg_order, update } = useSelector(state => state.order)
    const { msg } = useSelector(state => state.feedback)
    const [submitCancel, setSubmitCancel] = useState(false)
    // FUNCTION
    useEffect(() => {
        dispatch(getOrderOfCustomer())
    }, [dispatch])
    const handleCancelBooking = (orderID) => {
        Swal.fire({
            title: 'Chắc chắn ?',
            text: "Bạn chắc chắn muốn hủy đặt vé ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Chắc chắn",
            cancelButtonText: "Hủy",
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
            if (result.isConfirmed) {
                setSubmitCancel(true)
                dispatch(orderCancel({order_ID: orderID}))
            }
        })
    }
    useEffect(() => {
        if (msg_order === 'success' && submitCancel) {
            Swal.fire('Hủy tour thành công', 'Vui lòng kiểm tra email trong vòng 15 ngày tới !', 'success')
            dispatch(getOrderOfCustomer())
            setSubmitCancel(false) 
        }
    }, [msg_order, update])
    // Handle feedback
    useEffect(() => {
        if (msg !== '') {
          if (msg === 'success') {
            Swal.fire('Gửi đánh giá thành công !', '', 'success').then((result) => {
                dispatch(getOrderOfCustomer())
                setIsShown(false);
                document.body.style.overflow = "auto";
            })
          }
          else Swal.fire('Oops !', msg, 'error')
        }
    }, [msg])
    const handleSubmitFeedback = async () => {
        let invalids = validate(payload)
        if (invalids === 0) {
            dispatch(feedbackAdd(payload))
        }
    }
    const validate = (payload) => {
        let invalids = 0 // number of invalid fields
        let fields = Object.entries(payload) // tranform an object {key: value} to array [key, value]
        fields.forEach(item => {
            switch (item[0]) {
                case 'rating':
                    if (item[1] === 0) { // item[1] is the value field
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Bạn chưa đánh giá tour !'
                        }])
                        invalids++
                    }
                    break;
                default:
                    break;
            }
        })
        return invalids
    } 
    const showForm = (orderID, tourID) => {
        window.scrollTo(0, 0);
        setIsShown(true);
        document.body.style.overflow = "hidden";
        setPayload(prev => ({...prev, 'order_ID': orderID}))
        setPayload(prev => ({...prev, 'tour_ID': tourID}))
    };
    const closeForm = () => {
        setIsShown(false);
        document.body.style.overflow = "auto";
    };
    // onClick option button
    const handleOption = (optName) => {
        setOption(optName);
    };
    const isOptionActive = (optName) => {
        return option === optName;
    };
    return (
        <section className="mx-auto w-full pt-10 xl:max-w-7xl">
            <div className="relaive min-h-[600px] flex gap-12 px-6 pb-20 lg:px-2 xl:gap-20 2xl:px-0">
                <div className="absolute -top-10 left-0 w-full rotate-180 -z-10">
                    <div className="relative w-full pt-[27.05%] md:pt-[26.62%] xl:pt-[19.69%]">
                        <img className="absolute w-full h-full top-0 left-0 object-contain" src="../img/home/curve.png" alt=''/>
                    </div>
                </div>
                <div className='hidden flex-col gap-16 font-semibold text-title-1 text-neutral-1-900 md:flex'>
                    <div className='text-header-1'>Trang cá nhân</div>
                    <button className={`${isOptionActive('option1')? 'bg-neutral-1-900 text-white' : 'border-neutral-1-300 bg-cyan-50'} rounded-sm text-center py-4 px-6 xl:px-8 border-r border-b transition-all hover:bg-neutral-1-900 text-body-2 xl:text-body-1 hover:text-white`}
                            onClick={() => handleOption('option1')}>Tour đang tiến hành</button>
                    <button className={`${isOptionActive('option2')? 'bg-neutral-1-900 text-white' : 'border-neutral-1-300 bg-cyan-50'} rounded-sm text-center py-4 px-6 xl:px-8 border-r border-b transition-all hover:bg-neutral-1-900 text-body-2 xl:text-body-1 hover:text-white`}
                            onClick={() => handleOption('option2')}>Tour đã kết thúc</button>
                </div>
                <div className='w-full flex flex-col gap-10 text-neutral-1-900 md:w-2/3'>
                    <div className='flex items-center gap-4'>
                        {isOptionActive('option1')? <MdTour color='blue' size={28}/> : <MdTour color='red' size={28}/>}
                        <div className='text-heading-4 font-semibold'>{isOptionActive('option1')? 'Tour đang tiến hành' : 'Tour đã kết thúc'}</div>
                    </div>
                    {isOptionActive('option1')?
                        orders_customer?.map((order, idx) => {
                            if (!order?.order?.is_cancel && order?.tour?.isActive)
                                return ( 
                                    <div key={idx} className='w-full border-b border-neutral-1-200 pb-4'>
                                        <div className='flex justify-between pb-2 text-body-2 xl:text-body-1'>
                                            <div><span className='font-semibold'>Mã đơn: </span>{order.order.order_ID}</div>
                                            <div>{splitDateTime(order.order.date_time)[1]}, {splitDateTime(order.order.date_time)[0]}</div>
                                        </div>
                                        <div className='flex justify-between items-end pb-4'>
                                            <div className='flex gap-2 max-w-2xl'>
                                                <div className="w-1/6 relative aspect-[130/75] rounded-xl overflow-hidden xl:w-[130px]">
                                                {order.tour.places && <img className="absolute w-full h-full top-0 left-0 object-cover transition-all xl:group-hover:scale-125" src={order.tour.places[0].images[0].images} alt=''/>}
                                                </div>
                                                <div className='w-5/6 flex flex-col justify-between'>
                                                    <Link to={'/tour-detail/'+order.order.tour_ID} className='text-[17px] text-primary-1 hover:text-primary-2 font-semibold text-body-2 xl:text-body-1'>{order?.tour?.name} | {order?.tour?.day_num}N{order?.tour?.night_num}Đ</Link>
                                                    <div className='italic text-body-2 tracking-wide flex justify-between'>{order?.tour?.departure} - {getProvinceTitle(order?.tour).join(' - ')}, {order?.tour?.vehicle}</div>
                                                </div>
                                            </div>
                                            <div>x {order.order.ticket_num}</div>
                                        </div>
                                        <div className='flex justify-between items-end'>
                                            <div className='text-body-1 font-semibold'>Thành tiền: <span className='text-secondary-1'>{Number(order?.tour?.price*order?.order?.ticket_num).toLocaleString()} đ</span></div>
                                            <Button 
                                                text='Hủy đặt'
                                                textColor='text-white' 
                                                bgColor='bg-accent-3'
                                                redBtn
                                                onClick={() => handleCancelBooking(order.order.order_ID)}
                                            />
                                        </div>
                                    </div>
                                )
                        })
                    :
                        orders_customer?.map((order, idx) => {
                            if (order.order.is_cancel || !order?.tour?.isActive)
                                return ( 
                                    <div key={idx} className='w-full border-b border-neutral-1-200 pb-4'>
                                        <div className='flex justify-between pb-2 text-body-1'>
                                            <div><span className='font-semibold'>Mã đơn: </span>{order.order.order_ID}</div>
                                            <div>{splitDateTime(order.order.date_time)[1]}, {splitDateTime(order.order.date_time)[0]}</div>
                                        </div>
                                        <div className='flex justify-between items-end pb-4'>
                                            <div className='flex gap-2 max-w-2xl'>
                                                <div className="w-1/6 relative aspect-[110/75] rounded-xl overflow-hidden">
                                                    {order.tour.places && <img className="absolute w-full h-full top-0 left-0 object-cover transition-all xl:group-hover:scale-125" src={order.tour.places[0].images[0].images} alt=''/>}
                                                </div>
                                                <div className='w-5/6 flex flex-col justify-between'>
                                                <Link to={'/tour-detail/'+order.order.tour_ID} className='text-[17px] text-primary-1 hover:text-primary-2 font-semibold text-body-2 xl:text-body-1'>{order?.tour?.name} | {order?.tour?.day_num}N{order?.tour?.night_num}Đ</Link>
                                                    <div className='italic text-body-2 tracking-wide flex justify-between'>{order?.tour?.departure} - {getProvinceTitle(order?.tour).join(' - ')}, {order?.tour?.vehicle}</div>
                                                </div>
                                            </div>
                                            <div>x {order.order.ticket_num}</div>
                                        </div>
                                        <div className='flex justify-between items-end'>
                                            <div className='text-body-1 font-semibold'>Thành tiền: <span className='text-secondary-1'>{Number(order?.tour?.price*order?.order?.ticket_num).toLocaleString()} đ</span></div>
                                            {order.feedback?
                                                <button className='cursor-default py-2 px-8 rounded-md bg-[#919EAB] text-white'>Đã đánh giá</button>
                                            :
                                                <Button 
                                                    text='Đánh giá'
                                                    textColor='text-white' 
                                                    bgColor='bg-primary-2'
                                                    onClick={() => showForm(order.order.order_ID, order.order.tour_ID)}
                                                />   
                                            }
                                        </div>
                                    </div>
                                )
                        })
                    }
                </div>
            </div>
            {/* Feedback form */}
            {isShown && (payload.order_ID !== '') &&
            <div className='absolute z-20 top-[78px] left-0 w-full h-[106%] bg-neutral-600/50 pt-[10%] pl-[35%]'>
                <div className='w-full h-fit p-6 bg-neutral-3-100 rounded-3xl max-w-[60%]'>
                    <div className='flex justify-between'>
                        <div className='pb-3 flex gap-5 border-b-[3px] border-white w-[95%]'>
                            <div className='text-heading-3 text-neutral-1-900 font-semibold'>Gửi đánh giá</div>
                        </div>
                        <IoClose size={30} className='cursor-pointer' onClick={() => closeForm()}/>
                    </div>
                    <form action="" className="pt-5 text-body-2">
                        <div className='flex gap-3 pb-6'>
                            <div className="pr-4 text-header-2 text-neutral-1-900">Đánh giá tour</div>
                            {[...Array(5)].map((star, index) => {
                                const currentRating = index + 1;
                                return (
                                    <label htmlFor={'rating ' + index}>
                                        <input
                                        id={'rating ' + index}
                                        type='radio'
                                        name='rating'
                                        value={currentRating}
                                        onClick={() => {
                                            setInvalidFields([])
                                            setPayload(prev => ({...prev, 'ratings': currentRating}))
                                        }}
                                        className='hidden'
                                        />
                                        <FaStar size={28}
                                        color={currentRating <= (hover || payload.ratings) ? '#FFC400' : '#CDD3DB'} 
                                        className='cursor-pointer'
                                        onMouseEnter={() => setHover(currentRating)}
                                        onMouseLeave={() => setHover(null)}
                                        />
                                    </label>
                                );
                            })}
                        </div>
                        <div className="pr-4 pb-4 text-header-2 text-neutral-1-900">Bình luận về tour</div>
                        <textarea rows="3" 
                            className="mb-6 p-4 w-full rounded-md bg-white border border-neutral-2-200 tracking-[0.1px] text-body-2 text-neutral-1-400 placeholder:text-neutral-1-400" 
                            placeholder="Bình luận của bạn"
                            value={payload.reviews} 
                            onChange={(e) => setPayload(prev => ({...prev, 'reviews': e.target.value}))}
                            spellCheck={false}
                        />
                        {invalidFields.length > 0 && <div className='pt-1 text-title-2 text-accent-3'>{invalidFields[0].message}</div>}
                        <Button 
                        text='Gửi bình luận'
                        textColor='text-white font-semibold' 
                        bgColor='bg-primary-2'
                        mt
                        onClick={handleSubmitFeedback}
                        />
                    </form>
                </div>
            </div>
            }
            
        </section>
    )
}

export default PersonalProfile
