import React, { useState, useEffect } from 'react';
import icons from '../../ultils/icons';
import { Button } from '../../components';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import { getOrderOfCustomer } from '../../store/actions/orderFeedbackAction';
import { splitDateTime } from '../../ultils/splitDateTime';

const { MdTour, FaStar, IoClose } = icons

const PersonalProfile = () => {
    const dispatch = useDispatch()
    const [invalidFields, setInvalidFields] = useState([])
    const [option, setOption] = useState('option1');
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [feedback, setFeedback] = useState({
        rating: 0,
        comment: '', 
    })
    const [isShown, setIsShown] = useState(false);
    const { orders_customer } = useSelector(state => state.order)
    const [ feedbackOfTour, setFeedbackOfTour] = useState(''); // which tour user choose to feedback
    // FUNCTION
    useEffect(() => {
        dispatch(getOrderOfCustomer({customer_id: 'U_050'}))
    }, [dispatch])
    const handleCancelBooking = async () => {
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
                Swal.fire('Hủy thành công', 'Vui lòng kiểm tra email trong vòng 7 ngày tới !', 'success')
            }
        })
    }
    // Handle feedback
    const handleSubmitFeedback = async () => {
        let invalids = validate(feedback)
        // console.log(feedback)
        if (invalids === 0) {
            Swal.fire('Gửi đánh giá thành công !', '', 'success').then((result) => {
                setIsShown(false);
                document.body.style.overflow = "auto";
            })
        }
    }
    // validate inputs function
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
    const showForm = (orderID) => {
        window.scrollTo(0, 0);
        setIsShown(true);
        document.body.style.overflow = "hidden";
        setFeedbackOfTour(orderID)
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
            <div className="relaive min-h-[600px] flex gap-20 px-6 pb-20 lg:px-2 2xl:px-0">
                <div className="absolute -top-10 left-0 w-full rotate-180 -z-10">
                    <div className="relative w-full pt-[27.05%] md:pt-[26.62%] xl:pt-[19.69%]">
                        <img className="absolute w-full h-full top-0 left-0 object-contain" src="../img/home/curve.png" alt=''/>
                    </div>
                </div>
                <div className='hidden flex-col gap-16 font-semibold text-title-1 text-neutral-1-900 md:flex'>
                    <div className='text-header-1'>Trang cá nhân</div>
                    <button className={`${isOptionActive('option1')? 'bg-neutral-1-900 text-white' : 'border-neutral-1-300 bg-cyan-50'} rounded-sm text-center py-4 px-8 border-r border-b transition-all hover:bg-neutral-1-900 hover:text-white`}
                            onClick={() => handleOption('option1')}>Tour đang tiến hành</button>
                    <button className={`${isOptionActive('option2')? 'bg-neutral-1-900 text-white' : 'border-neutral-1-300 bg-cyan-50'} rounded-sm text-center py-4 px-8 border-r border-b transition-all hover:bg-neutral-1-900 hover:text-white`}
                            onClick={() => handleOption('option2')}>Tour đã kết thúc</button>
                </div>
                <div className='w-full flex flex-col gap-10 text-neutral-1-900 md:w-2/3'>
                    <div className='flex items-center gap-4'>
                        {isOptionActive('option1')? <MdTour color='blue' size={28}/> : <MdTour color='red' size={28}/>}
                        <div className='text-heading-4 font-semibold'>{isOptionActive('option1')? 'Tour đang tiến hành' : 'Tour đã kết thúc'}</div>
                    </div>
                    {isOptionActive('option1')?
                        orders_customer?.map((order, idx) => {
                            return ( 
                                <div key={idx} className='w-full border-b border-neutral-1-200 pb-4'>
                                    <div className='flex justify-between pb-2 text-body-1'>
                                        <div><span className='font-semibold'>Mã đơn: </span>{order.order.order_ID}</div>
                                        <div>{splitDateTime(order.order.date_time)[1]}, {splitDateTime(order.order.date_time)[0]}</div>
                                    </div>
                                    <div className='flex justify-between items-end pb-4'>
                                        <div className='flex gap-2'>
                                            <div className="relative w-[130px] aspect-[130/75] rounded-xl overflow-hidden">
                                                <img className="absolute w-full h-full top-0 left-0 object-cover transition-all xl:group-hover:scale-125" src='../img/home/sec2-img1.png' alt=''/>
                                            </div>
                                            <div className='flex flex-col justify-between'>
                                                <Link to={'/tour-detail/'+order.order.tour_ID} className='text-[17px] text-primary-1 hover:text-primary-2 font-semibold'>Du lịch Bà Nà - Cầu Vàng - Sơn Trà - Hội An | 3N2Đ</Link>
                                                <div className='italic text-body-2 tracking-wide flex justify-between'>TP. Hồ Chí Minh - Đà Nẵng, Máy bay</div>
                                            </div>
                                        </div>
                                        <div>x {order.order.ticket_num}</div>
                                    </div>
                                    <div className='flex justify-between items-end'>
                                        <div className='text-body-1 font-semibold'>Thành tiền: <span className='text-secondary-1'>8,500,000 đ</span></div>
                                        <Button 
                                            text='Hủy đặt'
                                            textColor='text-white' 
                                            bgColor='bg-accent-3'
                                            redBtn
                                            onClick={handleCancelBooking}
                                        />
                                    </div>
                                </div>
                            )
                        })
                    :
                        orders_customer?.map((order, idx) => {
                            return ( 
                                <div key={idx} className='w-full border-b border-neutral-1-200 pb-4'>
                                    <div className='flex justify-between pb-2 text-body-1'>
                                        <div><span className='font-semibold'>Mã đơn: </span>{order.order.order_ID}</div>
                                        <div>{splitDateTime(order.order.date_time)[1]}, {splitDateTime(order.order.date_time)[0]}</div>
                                    </div>
                                    <div className='flex justify-between items-end pb-4'>
                                        <div className='flex gap-2'>
                                            <div className="relative w-[130px] aspect-[130/75] rounded-xl overflow-hidden">
                                                <img className="absolute w-full h-full top-0 left-0 object-cover transition-all xl:group-hover:scale-125" src='../img/home/sec2-img1.png' alt=''/>
                                            </div>
                                            <div className='flex flex-col justify-between'>
                                            <Link to={'/tour-detail/'+order.order.tour_ID} className='text-[17px] text-primary-1 hover:text-primary-2 font-semibold'>Du lịch Bà Nà - Cầu Vàng - Sơn Trà - Hội An | 3N2Đ</Link>
                                                <div className='italic text-body-2 tracking-wide flex justify-between'>TP. Hồ Chí Minh - Đà Nẵng, Máy bay</div>
                                            </div>
                                        </div>
                                        <div>x {order.order.ticket_num}</div>
                                    </div>
                                    <div className='flex justify-between items-end'>
                                        <div className='text-body-1 font-semibold'>Thành tiền: <span className='text-secondary-1'>8,500,000 đ</span></div>
                                        {!order.feedback.feedback_ID?
                                            <button className='cursor-default py-2 px-8 rounded-md bg-[#919EAB] text-white'>Đã đánh giá</button>
                                        :
                                            <Button 
                                                text='Đánh giá'
                                                textColor='text-white' 
                                                bgColor='bg-primary-2'
                                                onClick={() => showForm(order.order.order_ID)}
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
            {isShown && (feedbackOfTour !== '') &&
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
                                            setFeedback(prev => ({...prev, 'rating': currentRating}))
                                        }}
                                        className='hidden'
                                        />
                                        <FaStar size={28}
                                        color={currentRating <= (hover || feedback.rating) ? '#FFC400' : '#CDD3DB'} 
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
                            value={feedback.comment} 
                            onChange={(e) => setFeedback(prev => ({...prev, 'comment': e.target.value}))}
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
