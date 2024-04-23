import React, { useState } from 'react';
import icons from '../../ultils/icons';
import { InputForm, Button } from '../../components';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const { BsClockFill, FaKey, FaStar, IoClose } = icons

const PersonalProfile = () => {
    const [option, setOption] = useState('option1');
    const [invalidFields, setInvalidFields] = useState([])
    const [payload, setPayload] = useState({ 
        oldPass: '',
        newPass: '',
        newPass2: ''
    })
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [feedback, setFeedback] = useState({
        rating: 0,
        comment: '', 
    })
    const [isShown, setIsShown] = useState(false);
    const navigate = useNavigate()
    // FUNCTION
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
                setPayload(prev => ({...prev, 'isActive': true}))
                Swal.fire('Hủy thành công', 'Vui lòng kiểm tra email trong vòng 7 ngày tới !', 'success')
            }
        })
    }
    // Handle feedback
    const handleSubmitFeedback = async () => {
        // console.log(feedback)
        Swal.fire('Gửi đánh giá thành công !', '', 'success').then((result) => {
            setIsShown(false);
            document.body.style.overflow = "auto";
        })
    }
    const showForm = () => {
        window.scrollTo(0, 0);
        setIsShown(true);
        document.body.style.overflow = "hidden";
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
    // change Pass submit 
    const handleSubmitPass = async () => {
        let invalids = validate(payload)
        // if (invalids === 0) 
        //     dispatch(actions.
    }
    const validate = (payload) => {
        let invalids = 0 // number of invalid fields
        let fields = Object.entries(payload) // tranform an object {key: value} to array [key, value]
        fields.forEach(item => {
            switch (item[0]) {
                case 'oldPass':
                    if (item[1] === '') {
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Bạn chưa nhập mật khẩu !'
                        }])
                        invalids++
                    } else {
                        if (item[1].length < 6) {
                            setInvalidFields(prev => [...prev, {
                                name: item[0],
                                message: 'Mật khẩu phải có tối thiểu 6 kí tự !'
                            }])
                            invalids++
                        }
                    }
                    break;
                    case 'newPass':
                        if (item[1] === '') {
                            setInvalidFields(prev => [...prev, {
                                name: item[0],
                                message: 'Bạn chưa nhập mật khẩu !'
                            }])
                            invalids++
                        } else {
                            if (item[1].length < 6) {
                                setInvalidFields(prev => [...prev, {
                                    name: item[0],
                                    message: 'Mật khẩu phải có tối thiểu 6 kí tự !'
                                }])
                                invalids++
                            }
                        }
                        break;
                case 'newPass2':
                    if (item[1] === '') {
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Bạn chưa nhập mật khẩu !'
                        }])
                        invalids++
                    } else {
                        if (item[1].length < 6) {
                            setInvalidFields(prev => [...prev, {
                                name: item[0],
                                message: 'Mật khẩu phải có tối thiểu 6 kí tự !'
                            }])
                            invalids++
                        }
                    }
                    break;
                default:
                    break;
            }
        })
        return invalids
    }
    const checkout = () => {
        navigate('/auth/login')
    }
    return (
        <section className="mx-auto w-full pt-10 xl:max-w-7xl">
            <div className="relaive flex gap-20 px-6 pb-20 lg:px-2 2xl:px-0">
                <div className="absolute -top-10 left-0 w-full rotate-180 -z-10">
                    <div className="relative w-full pt-[27.05%] md:pt-[26.62%] xl:pt-[19.69%]">
                        <img className="absolute w-full h-full top-0 left-0 object-contain" src="../img/home/curve.png" alt=''/>
                    </div>
                </div>
                <div className='hidden flex-col gap-16 font-semibold text-title-1 text-neutral-1-900 md:flex'>
                    <div className='text-header-1'>Trang cá nhân</div>
                    <button className={`${isOptionActive('option1')? 'bg-neutral-1-500 text-white' : ''} text-center py-4 px-8 border-r border-b border-neutral-1-300 transition-all hover:bg-neutral-1-500 hover:text-white`}
                            onClick={() => handleOption('option1')}>Lịch sử đặt tour</button>
                    <button className={`${isOptionActive('option2')? 'bg-neutral-1-500 text-white' : ''} text-center py-4 px-8 border-r border-b border-neutral-1-300 transition-all hover:bg-neutral-1-500 hover:text-white`}
                            onClick={() => handleOption('option2')}>Đổi mật khẩu</button>
                    <button className='text-center py-4 px-8 border-r border-b border-neutral-1-300 transition-all hover:bg-neutral-1-500 hover:text-white'
                            onClick={() => checkout()}>Đăng xuất</button>
                </div>
                <div className='w-full flex flex-col gap-10 text-neutral-1-900 md:w-2/3'>
                    <div className='flex gap-4'>
                        {isOptionActive('option1')? <BsClockFill size={28}/> : <FaKey size={28}/>}
                        <div className='text-heading-4 font-semibold'>{isOptionActive('option1')? 'Lịch sử đặt tour' : 'Đổi mật khẩu'}</div>
                    </div>
                    {isOptionActive('option1')?
                        <>
                            {/* Card 1 */}
                            <div className='w-full border-b border-neutral-1-200 pb-4'>
                                <div className='flex justify-between pb-2 text-body-1'>
                                    <div><span className='font-semibold'>Mã đơn: </span>T_0512</div>
                                    <div>31/08/2023</div>
                                </div>
                                <div className='flex justify-between items-end pb-4'>
                                    <div className='flex gap-2'>
                                        <div className="relative w-[130px] aspect-[130/75] rounded-xl overflow-hidden">
                                            <img className="absolute w-full h-full top-0 left-0 object-cover transition-all xl:group-hover:scale-125" src='../img/home/sec2-img1.png' alt=''/>
                                        </div>
                                        <div className='flex flex-col justify-between'>
                                            <div className='text-header-2'>Du lịch Bà Nà - Cầu Vàng - Sơn Trà - Hội An | 3N2Đ</div>
                                            <div className='italic text-body-2 tracking-wide flex justify-between'>TP. Hồ Chí Minh - Đà Nẵng, Máy bay</div>
                                        </div>
                                    </div>
                                    <div>x 1</div>
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
                            {/* Card 2 */}
                            <div className='w-full border-b border-neutral-1-200 pb-4'>
                                <div className='flex justify-between pb-2 text-body-1'>
                                    <div><span className='font-semibold'>Mã đơn: </span>T_0512</div>
                                    <div>31/08/2023</div>
                                </div>
                                <div className='flex justify-between items-end pb-4'>
                                    <div className='flex gap-2'>
                                        <div className="relative w-[130px] aspect-[130/75] rounded-xl overflow-hidden">
                                            <img className="absolute w-full h-full top-0 left-0 object-cover transition-all xl:group-hover:scale-125" src='../img/home/sec2-img1.png' alt=''/>
                                        </div>
                                        <div className='flex flex-col justify-between'>
                                            <div className='text-header-2'>Du lịch Bà Nà - Cầu Vàng - Sơn Trà - Hội An | 3N2Đ</div>
                                            <div className='italic text-body-2 tracking-wide flex justify-between'>TP. Hồ Chí Minh - Đà Nẵng, Máy bay</div>
                                        </div>
                                    </div>
                                    <div>x 1</div>
                                </div>
                                <div className='flex justify-between items-end'>
                                    <div className='text-body-1 font-semibold'>Thành tiền: <span className='text-secondary-1'>8,500,000 đ</span></div>
                                    <Button 
                                        text='Đánh giá'
                                        textColor='text-white' 
                                        bgColor='bg-primary-2'
                                        onClick={() => showForm()}
                                    />
                                </div>
                            </div>
                            {/* Card 3 */}
                            <div className='w-full pb-4'>
                                <div className='flex justify-between pb-2 text-body-1'>
                                    <div><span className='font-semibold'>Mã đơn: </span>T_0512</div>
                                    <div>31/08/2023</div>
                                </div>
                                <div className='flex justify-between items-end pb-4'>
                                    <div className='flex gap-2'>
                                        <div className="relative w-[130px] aspect-[130/75] rounded-xl overflow-hidden">
                                            <img className="absolute w-full h-full top-0 left-0 object-cover transition-all xl:group-hover:scale-125" src='../img/home/sec2-img1.png' alt=''/>
                                        </div>
                                        <div className='flex flex-col justify-between'>
                                            <div className='text-header-2'>Du lịch Bà Nà - Cầu Vàng - Sơn Trà - Hội An | 3N2Đ</div>
                                            <div className='italic text-body-2 tracking-wide flex justify-between'>TP. Hồ Chí Minh - Đà Nẵng, Máy bay</div>
                                        </div>
                                    </div>
                                    <div>x 1</div>
                                </div>
                                <div className='flex justify-between items-end'>
                                    <div className='text-body-1 font-semibold'>Thành tiền: <span className='text-secondary-1'>8,500,000 đ</span></div>
                                    <button className='cursor-default py-2 px-8 rounded-md bg-[#919EAB] text-white'>Đã đánh giá</button>
                                </div>
                            </div>
                        </>
                    :
                        <div className='flex flex-col gap-10'>
                        <InputForm 
                            invalidFields={invalidFields} 
                            setInvalidFields={setInvalidFields} 
                            label='Mật khẩu hiện tại' 
                            placeholder='Nhập mật khẩu hiện tại' 
                            value={payload.oldPass} 
                            setValue={setPayload} 
                            keyPayload={'oldPass'}
                            type='password'
                            width='w-full'
                        />
                        <InputForm 
                            invalidFields={invalidFields} 
                            setInvalidFields={setInvalidFields} 
                            label='Mật khẩu mới' 
                            placeholder='Nhập mật khẩu mới' 
                            value={payload.newPass} 
                            setValue={setPayload} 
                            keyPayload={'newPass'}
                            type='password'
                            width='w-full'
                        />
                        <InputForm 
                            invalidFields={invalidFields} 
                            setInvalidFields={setInvalidFields} 
                            label='Nhập lại mật khẩu mới' 
                            placeholder='Nhập lại mật khẩu mới' 
                            value={payload.newPass2} 
                            setValue={setPayload} 
                            keyPayload={'newPass2'}
                            type='password'
                            width='w-full'
                        />
                        <Button 
                            text='Xác nhận'
                            textColor='text-white' 
                            bgColor='bg-primary-2'
                            onClick={handleSubmitPass}
                        />
                        </div> 
                    }
                </div>
            </div>
            {/* Feedback form */}
            {isShown &&
            <div className='absolute top-[78px] left-0 w-full h-[106%] bg-neutral-600/50 pt-[10%] pl-[35%]'>
                <div className='w-full h-fit p-6 bg-neutral-3-100 rounded-3xl max-w-[60%]'>
                    <div className='flex justify-between'>
                        <div className='py-3 flex gap-5 border-b-[3px] border-white w-[95%]'>
                            <img className='h-16 w-24 rounded-md' src='../img/home/sec2-img2.png' alt='' />
                            <div className="text-neutral-1-900 text-title-2 font-semibold xl:text-title-1">Du lịch Bà Nà - Cầu Vàng - Sơn Trà - Biển Mỹ Khê - Hội An | 3N2Đ</div>
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
                                        onClick={() => setFeedback(prev => ({...prev, 'rating': currentRating}))}
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
                            {/* <p>{rating}</p> */}
                        </div>
                        <div className="pr-4 pb-4 text-header-2 text-neutral-1-900">Bình luận về tour</div>
                        <textarea rows="3" 
                            className="mb-6 p-4 w-full rounded-md bg-white border border-neutral-2-200 tracking-[0.1px] text-body-2 text-neutral-1-400 placeholder:text-neutral-1-400" 
                            placeholder="Bình luận của bạn"
                            value={feedback.comment} 
                            onChange={(e) => setFeedback(prev => ({...prev, 'comment': e.target.value}))}
                        />
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
