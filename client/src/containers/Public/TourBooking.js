import React, { useState, useEffect }  from 'react';
import { InputForm, Button } from '../../components'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getTour } from '../../store/actions/tourPlaceAction'
import { splitDate } from '../../ultils/splitDateTime';

const TourBooking = () => {
    const [invalidFields, setInvalidFields] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [payload, setPayload] = useState({
        username: '',
        phone: '', 
        email: '',
        note: '',
        ticket_num: 1,
    })
    const {tourID} = useParams();
    const { tour } = useSelector(state => state.tour)
    useEffect(() => {
        dispatch(getTour({tour_ID: tourID}))
    }, [dispatch, tourID])
    const handleSubmit = async () => {
        let invalids = validate(payload)
        if (invalids === 0) 
            navigate('/tour-booking2/'+ tourID, { state: { payload } });
    }
    // validate inputs function
    const validate = (payload) => {
        let invalids = 0 // number of invalid fields
        let fields = Object.entries(payload) // tranform an object {key: value} to array [key, value]
        fields.forEach(item => {
            switch (item[0]) {
                case 'username':
                    if (item[1] === '') { // item[1] is the value field
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Bạn chưa nhập Tên !'
                        }])
                        invalids++
                    } 
                    else if (item[1].length < 5) {
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Tên phải có tối thiểu 5 kí tự !'
                        }])
                        invalids++
                    }
                    else {
                        if (!(/^([a-z0-9ỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ ]+(_)*)+$/.test(item[1].toLowerCase()))) {
                            setInvalidFields(prev => [...prev, {
                                name: item[0],
                                message: 'Tên chỉ chứa ký tự, số và khoảng trắng !'
                            }])
                            invalids++
                        }
                    }
                    break;
                case 'phone':
                    if (item[1] === '') { // item[1] is the value field
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Bạn chưa nhập số điện thoại !'
                        }])
                        invalids++
                    } 
                    else {
                        if (!(/^[0-9]+$/.test(item[1]))) {
                            setInvalidFields(prev => [...prev, {
                                name: item[0],
                                message: 'Số điện thoại không hợp lệ !'
                            }])
                            invalids++
                        }
                    }
                    break;
                case 'email':
                    if (item[1] === '') { // item[1] is the value field
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Bạn chưa nhập email !'
                        }])
                        invalids++
                    } 
                    else {
                        if (!(/\S+@\S+\.\S+/.test(item[1]))) {
                            setInvalidFields(prev => [...prev, {
                                name: item[0],
                                message: 'Email không hợp lệ !'
                            }])
                            invalids++
                        }
                    }
                    break;
                case 'ticket_num':
                    if (item[1] === 0) { // item[1] is the value field
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Giá trị phải lớn hơn hoặc bằng 1 !'
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
    
    return (
        <div>
            <section className="mx-auto w-full pt-10 xl:max-w-7xl">
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
                        <div className="text-neutral-1-600 text-body-1 leading-[34px] xl:text-[20px]">Du lịch Bà Nà - Cầu Vàng - Sơn Trà - Biển Mỹ Khê - Hội An</div>
                        <div className="flex items-center justify-center w-6 h-6">
                            <i className="twi-22-chevron-line text-[16px] text-secondary-1 text-center"></i>
                        </div>
                        <div className="truncate text-body-1 leading-[34px] text-neutral-1-900 xl:text-[20px]">Thanh toán</div>
                    </div>
                    <div className='pt-5 flex items-center justify-center px-20 xl:justify-between'>
                        <div className='flex flex-col gap-2 items-center justify-center'>
                            <div className='w-11 h-11 flex items-center justify-center rounded-full bg-accent-9 text-header-1 text-white'>1</div>
                            <div className='text-body-1 text-accent-9 md:text-body-2'>Điền thông tin</div>
                        </div>
                        <div className='bg-neutral-3-300 w-60 h-[2px] hidden xl:block'></div>
                        <div className='flex-col gap-2 items-center justify-center hidden xl:flex'>
                            <div className='w-11 h-11 flex items-center justify-center rounded-full bg-neutral-1-300 text-header-1 text-white'>2</div>
                            <div className='text-body-1 text-neutral-1-500 md:text-body-2'>Thanh toán</div>
                        </div>
                        <div className='bg-neutral-3-300 w-60 h-[2px] hidden xl:block'></div>
                        <div className='flex-col gap-2 items-center justify-center hidden xl:flex'>
                            <div className='w-11 h-11 flex items-center justify-center rounded-full bg-neutral-1-300 text-header-1 text-white'>3</div>
                            <div className='text-body-1 text-neutral-1-500 md:text-body-2'>Xác nhận</div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mx-auto w-full pt-10 pb-[120px] md:pb-[120px] xl:pb-[80px] xl:max-w-7xl">
                <div className="px-6 lg:px-2 2xl:px-0">
                    <div className='xl:flex flex-row-reverse justify-center'>
                        <div className='w-full h-fit p-6 bg-neutral-3-100 rounded-3xl max-w-[450px] mx-auto xl:w-1/2'>
                            <div className='text-body-2 font-semibold text-neutral-900 pb-2 md:text-header-1'>Thông tin đặt tour</div>
                            <div className='py-3 flex gap-5 border-b-[3px] border-white'>
                                <img className='h-16 w-24 rounded-md' src='../img/home/sec2-img2.png' alt='' />
                                <div className="text-neutral-1-900 text-title-2 font-semibold xl:text-title-1">{tour.name} | {tour.day_num}N{tour.night_num}Đ</div>
                            </div>
                            <div className="pt-5 flex flex-col gap-6 text-body-2">
                                <div className='flex justify-between'>
                                    <div className="text-neutral-1-500">Mã tour</div>
                                    <div className='text-neutral-1-900'>{tour.tour_ID}</div>
                                </div>
                                <div className='flex justify-between'>
                                    <div className="text-neutral-1-500">Ngày khởi hành</div>
                                    <div className='text-neutral-1-900'>{splitDate(tour.starting_date)[0]}/{splitDate(tour.starting_date)[1]}/{splitDate(tour.starting_date)[2]}</div>
                                </div>
                                <div className='flex justify-between'>
                                    <div className="text-neutral-1-500">Giá 1 khách</div>
                                    <div className='text-neutral-1-900'>{Number(tour.price).toLocaleString()} VND</div>
                                </div>
                            </div>
                        </div>
                        <div className='pt-10 xl:pt-0 xl:w-1/2'>
                            <div className='text-body-2 font-semibold text-neutral-900 pb-5 md:text-header-1'>Điền thông tin liên hệ</div>
                            <div className='flex flex-col gap-10'>
                            <InputForm 
                                invalidFields={invalidFields} 
                                setInvalidFields={setInvalidFields} 
                                label='Họ và tên' 
                                placeholder='Nhập họ và tên' 
                                value={payload.username} 
                                setValue={setPayload} 
                                keyPayload={'username'}
                                asterisk
                                width='w-full'
                            />
                            <InputForm 
                                invalidFields={invalidFields} 
                                setInvalidFields={setInvalidFields} 
                                label='Số điện thoại' 
                                placeholder='Nhập số điện thoại' 
                                value={payload.phone} 
                                setValue={setPayload} 
                                keyPayload='phone'
                                asterisk
                                width='w-full'
                            />
                            <InputForm 
                                invalidFields={invalidFields} 
                                setInvalidFields={setInvalidFields} 
                                label='Email' 
                                placeholder='Nhập email' 
                                value={payload.email} 
                                setValue={setPayload} 
                                keyPayload={'email'}
                                asterisk
                                width='w-full'
                            />
                            <InputForm 
                                invalidFields={invalidFields} 
                                setInvalidFields={setInvalidFields} 
                                label='Ghi chú (nếu có)' 
                                placeholder='Nhập ghi chú' 
                                value={payload.note} 
                                setValue={setPayload} 
                                keyPayload={'note'}
                                width='w-full'
                            />
                            <InputForm 
                                invalidFields={invalidFields} 
                                setInvalidFields={setInvalidFields}
                                label='Số lượng hành khách'  
                                value={payload.ticket_num}
                                setValue={setPayload} 
                                keyPayload={'ticket_num'}
                                width='w-14'
                                type='number'
                                asterisk
                                min={1}
                            />
                            <Button 
                                text='Tiếp tục'
                                textColor='text-white' 
                                bgColor='bg-primary-2'
                                mt
                                wfull
                                onClick={handleSubmit}
                            />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default TourBooking
