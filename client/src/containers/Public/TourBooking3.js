import React, { useState }  from 'react';
import bookConfirm from '../../assets/img/home/book-confirm.png'
import icons from '../../ultils/icons';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const { FaCheck } = icons

const TourBooking3 = () => {
    const [selectedValue, setSelectedValue] = useState("option1"); 
    const navigate = useNavigate()

    const handleRadioChange = (value) => { 
        setSelectedValue(value); 
    }; 
    const handleSubmit = async () => {
        // Swal.fire('Thanh toán thành công', '', 'success')
        Swal.fire({
            title: "Thanh toán thành công",
            text: "",
            icon: "success",
            confirmButtonText: "Tiếp tục"
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/tour-booking2')
            }
        })
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
                    <div className='w-full p-6 rounded-3xl max-w-[50%]'>
                        <div className='text-body-2 font-semibold text-neutral-900 pb-2 md:text-header-1'>Chi tiết đơn hàng</div>
                        <div className='py-3 flex gap-5 border-b-[3px] border-neutral-3-200'>
                            <img className='h-16 w-24 rounded-md' src='../img/home/sec2-img2.png' alt='' />
                            <div className="text-neutral-1-900 text-title-2 font-semibold xl:text-title-1">Du lịch Bà Nà - Cầu Vàng - Sơn Trà - Biển Mỹ Khê - Hội An | 3N2Đ</div>
                        </div>
                        <div className="pt-5 flex flex-col gap-6 text-body-2">
                            <div className='flex justify-between'>
                                <div className="text-neutral-1-500">Mã đơn hàng</div>
                                <div className='text-neutral-1-900'>1523</div>
                            </div>
                            <div className='flex justify-between'>
                                <div className="text-neutral-1-500">Ngày khởi hành</div>
                                <div className='text-neutral-1-900'>31/08/2023</div>
                            </div>
                            <div className='flex justify-between'>
                                <div className="text-neutral-1-500">Số khách</div>
                                <div className='text-neutral-1-900'>2 khách</div>
                            </div>
                            <div className='flex justify-between'>
                                <div className="text-neutral-1-500">Thành tiền</div>
                                <div className='text-secondary-1 font-semibold'>22,690,000 VND</div>
                            </div>
                            <div className='w-full h-[2px] bg-neutral-3-200'></div>
                            <div className='text-body-2 font-semibold text-neutral-900 md:text-header-1'>Thông tin liên hệ</div>
                            <div className='flex justify-between'>
                                <div className="text-neutral-1-500">Họ và tên</div>
                                <div className='text-neutral-1-900'>Phạm Quỳnh Trân</div>
                            </div>
                            <div className='flex justify-between'>
                                <div className="text-neutral-1-500">Email</div>
                                <div className='text-neutral-1-900'>abc@gmail.com</div>
                            </div>
                            <div className='flex justify-between'>
                                <div className='text-neutral-1-500'>Số điện thoại</div>
                                <div className='text-neutral-1-900'>029644846151</div>
                            </div>
                            <div className='flex justify-between'>
                                <div className='text-neutral-1-500'>Ghi chú</div>
                                <div className='text-neutral-1-900'>Phòng tầng cao</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default TourBooking3
