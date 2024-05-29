import React, { useState, useEffect }  from 'react';
import bookConfirm from '../../assets/img/home/book-confirm.png'
import icons from '../../ultils/icons';
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { getTour } from '../../store/actions/tourPlaceAction'
import { splitDate } from '../../ultils/splitDateTime';

const { FaCheck } = icons

const TourBooking3 = () => {
    const dispatch = useDispatch() 
    const location = useLocation();
    const payload = location.state;
    const {tourID} = useParams();
    const { tour } = useSelector(state => state.tour)
    useEffect(() => {
        dispatch(getTour({tour_ID: tourID}))
    }, [dispatch, tourID])
    return (
        <div>
            <section className="mx-auto w-full pt-10 xl:max-w-7xl">
                <div className="px-6 lg:px-2 2xl:px-0">
                    <div className="truncate w-full flex items-center py-[10px] gap-x-2">
                        <div className="text-neutral-1-600 text-body-1 leading-[34px] xl:text-header-2">Du lịch</div>
                        <div className="flex items-center justify-center w-6 h-6">
                            <i className="twi-22-chevron-line text-[16px] text-secondary-1 text-center"></i>
                        </div>
                        <div className="text-neutral-1-600 text-body-1 leading-[34px] xl:text-header-2">Du lịch trong nước</div>
                        <div className="flex items-center justify-center w-6 h-6">
                            <i className="twi-22-chevron-line text-[16px] text-secondary-1 text-center"></i>
                        </div>
                        <div className="text-neutral-1-600 text-body-1 leading-[34px] xl:text-header-2">{tour?.name}</div>
                        <div className="flex items-center justify-center w-6 h-6">
                            <i className="twi-22-chevron-line text-[16px] text-secondary-1 text-center"></i>
                        </div>
                        <div className="truncate text-neutral-1-900 text-body-1 leading-[34px] xl:text-header-2">Thanh toán</div>
                    </div>
                    <div className='pt-5 flex items-center justify-center px-20 xl:justify-between'>
                        <div className='flex flex-col gap-2 items-center justify-center'>
                            <div className='w-11 h-11 flex items-center justify-center rounded-full bg-accent-6 text-header-1'>
                                <FaCheck size={20} color='white'/>
                            </div>
                            <div className='text-body-1 text-accent-6 md:text-body-2'>Điền thông tin</div>
                        </div>
                        <div className='bg-neutral-3-300 w-60 h-[2px] hidden xl:block'></div>
                        <div className='flex-col gap-2 items-center justify-center hidden xl:flex'>
                        <div className='w-11 h-11 flex items-center justify-center rounded-full bg-accent-6 text-header-1'>
                                <FaCheck size={20} color='white'/>
                            </div>
                            <div className='text-body-1 text-accent-6 md:text-body-2'>Thanh toán</div>
                        </div>
                        <div className='bg-neutral-3-300 w-60 h-[2px] hidden xl:block'></div>
                        <div className='flex-col gap-2 items-center justify-center hidden xl:flex'>
                            <div className='w-11 h-11 flex items-center justify-center rounded-full bg-accent-9 text-header-1 text-white'>3</div>
                            <div className='text-body-1 text-accent-9 md:text-body-2'>Xác nhận</div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mx-auto w-full pt-10 pb-[120px] md:pb-[120px] xl:pb-[80px] xl:max-w-7xl">
                <div className="px-6 lg:px-2 2xl:px-0">
                    <div className='flex flex-col items-center gap-6 pb-10'>
                        <div className='text-body-2 font-semibold text-neutral-900 pb-2 md:text-header-1'>Đặt tour thành công</div>
                        <img className="object-contain w-36 h-36" src={bookConfirm} alt=''/>
                        <div className='text-body-2 font-semibold text-neutral-900 pb-2 md:text-header-1'>KB DULICH xin cảm ơn Quý Khách !</div>
                    </div>
                    <div className='mx-auto w-full p-6 rounded-3xl max-w-[50%]'>
                        <div className='text-body-2 font-semibold text-neutral-900 pb-2 md:text-header-1'>Chi tiết đơn hàng</div>
                        <div className='py-3 flex gap-5 border-b-[3px] border-neutral-3-200'>
                            {tour.places && <img className='h-16 w-24 rounded-md' src={tour.places[0].images[0].images} alt='' />}
                            <div className="text-neutral-1-900 text-title-2 font-semibold xl:text-title-1">{tour?.name} | {tour?.day_num}N{tour?.night_num}Đ</div>
                        </div>
                        <div className="pt-5 flex flex-col gap-6 text-body-2">
                            <div className='flex justify-between'>
                                <div className="text-neutral-1-500">Mã đơn hàng</div>
                                <div className='text-neutral-1-900'>{payload?.order_ID}</div> {/* data */}
                            </div>
                            <div className='flex justify-between'>
                                <div className="text-neutral-1-500">Ngày khởi hành</div>
                                <div className='text-neutral-1-900'>{splitDate(tour?.starting_date)[0]}/{splitDate(tour?.starting_date)[1]}/{splitDate(tour?.starting_date)[2]}</div>
                            </div>
                            <div className='flex justify-between'>
                                <div className="text-neutral-1-500">Số khách</div>
                                <div className='text-neutral-1-900'>{payload?.ticket_num} khách</div>
                            </div>
                            <div className='flex justify-between'>
                                <div className="text-neutral-1-500">Thành tiền</div>
                                <div className='text-secondary-1 font-semibold'>{Number(payload?.total_bill).toLocaleString()} VND</div>
                            </div>
                            <div className='w-full h-[2px] bg-neutral-3-200'></div>
                            <div className='text-body-2 font-semibold text-neutral-900 md:text-header-1'>Thông tin liên hệ</div>
                            <div className='flex justify-between'>
                                <div className="text-neutral-1-500">Họ và tên</div>
                                <div className='text-neutral-1-900'>{payload?.name}</div>
                            </div>
                            <div className='flex justify-between'>
                                <div className="text-neutral-1-500">Email</div>
                                <div className='text-neutral-1-900'>{payload?.email}</div>
                            </div>
                            <div className='flex justify-between'>
                                <div className='text-neutral-1-500'>Số điện thoại</div>
                                <div className='text-neutral-1-900'>{payload?.phone_no}</div>
                            </div>
                            <div className='flex justify-between'>
                                <div className='text-neutral-1-500'>Ghi chú</div>
                                <div className='text-neutral-1-900'>{payload?.note}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default TourBooking3
