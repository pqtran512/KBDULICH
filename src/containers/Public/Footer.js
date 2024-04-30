import React from 'react';
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className='bottom-0 left-0 w-full bg-neutral-1-900'>
            <div className='mx-auto md:max-w-3xl xl:max-w-7xl'>
                <div className='relative w-full pt-[26px] px-6 pb-[18px] md:pt-9 md:pb-[21px] lg:px-2 xl:pb-7 xl:pt-[57px] 2xl:px-0'>
                    <div className='pb-6 md:flex md:pb-[13px] xl:justify-between'>
                        <div className='md:w-1/2 xl:flex xl:w-2/3'>
                            <div className='pb-6 md:max-w-[355px] md:pb-8 xl:max-w-[411px] xl:pb-4'>
                                <div className='flex items-center pb-4 md:pb-[18px] xl:pb-5'>
                                    <Link to={'/'}><img className='w-[75px] h-[52px] object-contain' src='../img/header-footer/logo-white.png' alt='logo'/></Link>
                                    <Link to={'/'}><div className='pl-[14px] font-vampiroOne text-[28px] leading-[29px] tracking-[0.84px] text-white text-center uppercase'>
                                        Du lich
                                    </div></Link>
                                </div>
                                <div>
                                    <div className='pb-2 font-semibold text-white text-title-2 md:text-title-1 md:pb-[18px] xl:pb-4'>
                                        KB DULICH - CÔNG TY TNHH GIAO THÔNG VẬN TẢI VÀ DU LỊCH VIỆT NAM
                                    </div>
                                    <div className='flex flex-col gap-y-2 text-neutral-1-300 text-caption-1 md:text-body-2 md:gap-y-4'>
                                        <div className='flex gap-x-2'>
                                            <i className='twi-22-mail-fill text-[24px] leading-[24px] text-neutral-2-300 xl:text-neutral-1-400'></i>
                                            <div>Email: support@kbdulich.com</div>
                                        </div>
                                        <div>Tại TP.Hồ Chí Minh: Số 219 Võ Văn Tần,Phường 5,Quận 3, TP. HCM</div>
                                        <div className='flex gap-x-2'>
                                            <i className='twi-22-phone-fill text-[20px] leading-[20px] text-neutral-2-300 xl:text-neutral-1-400'></i>
                                            <div>Hotline: 1900 5862</div>
                                        </div>
                                        <div>Tại Hà Nội: Tầng 6, Tòa nhà Zentower, số 12 Khuất Duy Tiên, P.Thanh Xuân Trung, Q. Thanh Xuân, Hà Nội</div>
                                        <div className='flex gap-x-2'>
                                            <i className='twi-22-phone-fill text-[20px] leading-[20px] text-neutral-2-300 xl:text-neutral-1-400'></i>
                                            <div>Hotline: 1900 0871</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='pb-6 w-[279px] md:hidden'>
                                <div className='pb-4 font-semibold text-white text-title-2'>
                                    ĐĂNG KÝ EMAIL ĐỂ NHẬN THÔNG TIN KHUYẾN MÃI
                                </div>
                                <div className='pb-[30px] text-neutral-1-300 text-[13px] leading-7'>Đăng nhập để nhận thông tin ưu đãi mới nhất. Chưa có tài khoản? 
                                Đăng ký ngay để có cơ hội giảm 10% cho chuyến đi tiếp theo của Quý khách!</div>
                                <div className='pt-6'>
                                    <img className='w-[151px] h-[58px]' src='../img/header-footer/Đăng ký Bộ Công Thương 1.png' alt=''/>
                                </div>
                            </div>
                            <div className='xl:pl-[120px]'>
                                <div className='pb-2 font-semibold text-white text-title-2 md:pb-4 md:text-title-1'>DỊCH VỤ</div>
                                <div className='text-neutral-1-300 text-header-1 md:text-header-2 xl:w-[218px]'>
                                    <Link to={'/search'} className='block pb-2 md:pb-4'>Tour du lịch</Link>
                                    <Link to={'/news'} className='block pb-2 md:pb-4'>Tin tức du lịch</Link>
                                    <Link to={'/contact'} className='block pb-2 md:pb-4'>Liên hệ</Link>
                                </div>
                            </div>
                        </div>
                        <div className='hidden md:w-1/2 md:block pl-[86px] xl:pl-0 xl:w-1/3'>
                            <div className='pb-4 font-semibold text-white text-title-1'>
                                ĐĂNG KÝ TÀI KHOẢN NGAY !
                            </div>
                            <div className='pb-8 text-neutral-1-300 text-body-2 leading-7 xl:pb-[42px]'>
                                Đăng nhập để lưu lại lịch sử đặt tour và gửi đánh giá cho hành trình của bạn. <Link to={'/login'} className='underline'>Đăng nhập ngay</Link></div>
                        </div>
                    </div>
                    <div className='xl:max-w-7xl mx-auto'>
                        <div className='flex items-center justify-center text-body-2 text-white'>COPYRIGHT © 2023 KBDULICH. All Rights Reserved</div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
