import React from 'react';

const Contact = () => {
    return (
        <>
            <section className="flex justify-center relative w-full bg-sea animate-fade bg-center bg-no-repeat bg-cover rounded-b-[20px] md:bg-sea-md xl:bg-sea-xl">
                <div className="w-full pt-[188px] pb-10 px-6 md:pt-[130px] md:max-w-3xl md:pb-[250px] lg:px-2 xl:max-w-7xl xl:pt-[232px] xl:pb-[196px] 2xl:px-0">
                    <div className="mx-auto flex items-center justify-center pb-[86px] max-w-[242px] md:pb-[37px] md:max-w-[404px] xl:pb-[100px] xl:max-w-[584px]">
                        <div className="font-vampiroOne text-[24px] leading-10 tracking-[0.72px] uppercase text-center md:text-[32px] md:leading-[60px] md:tracking-[0.96px] xl:text-[50px] xl:leading-[99px] xl:tracking-[1.5px]">
                            Contact<br/>us </div>
                    </div>
                </div>
            </section>
            <section className="mx-auto w-full pt-10 pb-12 md:max-w-3xl md:pb-20 xl:max-w-7xl">
                <div className="px-6 lg:px-2 2xl:px-0">
                    <div className="flex items-center py-[10px]">
                        <div className="text-neutral-1-600 text-body-1 leading-[34px] md:text-[20px]">Trang chủ</div>
                        <div className="mx-1 flex items-center justify-center w-6 h-6 xl:mx-2">
                            <i className="twi-22-chevron-line text-[16px] text-secondary-1 text-center"></i>
                        </div>
                        <div className="text-neutral-1-900 text-body-1 leading-[34px] md:text-[20px]">Liên hệ</div>
                    </div>
                    <div>
                        <div className="text-center pb-8 text-header-2 font-semibold text-neutral-1-900 md:text-heading-3 md:pb-16 xl:pb-8">
                            Thông tin liên hệ</div>
                        <div className="justify-center xl:flex gap-x-20">
                            <div className="pb-12 animate-fade-down md:pb-16 xl:w-[46%] xl:pb-0 xl:animate-fade-right">
                                {/* Card chi nhánh */}
                                <div className="w-full flex items-center shadow-shad1 mb-8">
                                    <div className="relative w-[38%] md:w-[202px] xl:w-[200px]">
                                        <img src="../img/contact/card1.png" className="aspect-square" alt=""/>
                                    </div>
                                    <div className="w-[62%] px-2 md:pl-[14px] md:pr-4 md:w-[520px] xl:pr-[21px]">
                                        <div className='flex justify-between text-body-2 text-neutral-1-900'>
                                            <div>09:00 - 21:00</div>
                                            <div className='flex gap-x-2'>
                                                <i className='twi-22-phone-fill text-[20px] leading-[20px] text-neutral-2-300 xl:text-neutral-1-400'></i>
                                                <div>1900 5862</div>
                                            </div>
                                        </div>
                                        <div className="text-title-1 text-neutral-1-900 font-semibold py-2 md:py-6">KB Dulich - Công ty TNHH Giao thông vận tải và du lịch Việt Nam</div>
                                        <div className="text-body-2 text-primary-2">219 Võ Văn Tần, Phường 5, Quận 3, TP. Hồ Chí Minh</div>
                                    </div>
                                </div>
                                {/* Map */}
                                <iframe title='map1' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.499195631395!2d106.68461087457482!3d10.773026459257322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f235a55e1d5%3A0x99a29456347f9de3!2zMjE5IFbDtSBWxINuIFThuqduLCBQaMaw4budbmcgNSwgUXXhuq1uIDMsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1704863641830!5m2!1svi!2s" width="100%" height="450" style={{border: 0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                            <div className="pb-12 animate-fade-down md:pb-16 xl:w-[46%] xl:pb-0 xl:animate-fade-right">
                                <div className="w-full flex items-center shadow-shad1 mb-8">
                                    <img src="../img/contact/card2.png" className="aspect-square w-[38%] xl:w-[160px]" alt=""/>
                                    <div className="w-[62%] px-2 md:pl-[14px] md:pr-4 md:w-[520px] xl:pr-[21px]">
                                        <div className='flex justify-between text-body-2 text-neutral-1-900'>
                                            <div>09:00 - 21:00</div>
                                            <div className='flex gap-x-2'>
                                                <i className='twi-22-phone-fill text-[20px] leading-[20px] text-neutral-2-300 xl:text-neutral-1-400'></i>
                                                <div>1900 0871</div>
                                            </div>
                                        </div>
                                        <div className="text-title-1 text-neutral-1-900 font-semibold py-2 md:py-4">KB Dulich - Công ty TNHH Giao thông vận tải và du lịch Việt Nam</div>
                                        <div className="text-body-2 text-primary-2">Tầng 6, tòa nhà Zentower, số 12 Khuất Duy Tiến, P. Thanh Xuân Trung, Q. Thanh Xuân, Hà Nội</div>
                                    </div>
                                </div>
                                {/* Map */}
                                <iframe title='map2' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.979172268802!2d105.7997033747683!3d20.993471988990613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135acbe8bfa4e5b%3A0x1a467b0c80d846da!2sZen%20Tower!5e0!3m2!1svi!2s!4v1704863976158!5m2!1svi!2s" width="100%" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Contact
