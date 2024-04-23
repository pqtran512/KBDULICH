import React from 'react';
import { CardArticle, SearchBar, Pagination } from '../../components';
import { useLocation } from 'react-router-dom'

const News = () => {
    const location = useLocation()
    return (
        <div>
            <section className="flex justify-center relative w-full bg-sea animate-fade bg-center bg-no-repeat bg-cover rounded-b-[20px] md:bg-sea-md xl:bg-sea-xl">
                <div className="w-full pt-[188px] pb-10 px-6 md:pt-[130px] md:max-w-3xl md:pb-[250px] lg:px-2 xl:max-w-7xl xl:pt-[232px] xl:pb-[196px] 2xl:px-0">
                    <div className="mx-auto flex items-center justify-center pb-[86px] max-w-[242px] md:pb-[37px] md:max-w-[404px] xl:pb-[100px] xl:max-w-[584px]">
                        <div className="font-vampiroOne text-[24px] leading-10 tracking-[0.72px] uppercase text-center md:text-[32px] md:leading-[60px] md:tracking-[0.96px] xl:text-[50px] xl:leading-[99px] xl:tracking-[1.5px]">
                            Beautiful Places <br/> in VietNam</div>
                    </div>
                </div>
            </section>
            <section className="mx-auto w-full animate-fade md:max-w-3xl pb-20 pt-10 xl:max-w-7xl">
                <div className="mx-auto px-6 lg:px-2 2xl:px-0">
                    <div className='flex justify-between items-center'>
                        <div className="flex items-center pb-6 gap-x-1 md:gap-x-2">
                            <div className="text-neutral-1-600 text-body-1 leading-[34px] md:text-[20px]">Du lịch</div>
                            <div className="flex items-center justify-center w-6 h-6">
                                <i className="twi-22-chevron-line text-[16px] text-secondary-1 text-center"></i>
                            </div>
                            <div className="text-neutral-1-900 text-body-1 leading-[34px] md:text-[20px]">Tin tức</div>
                        </div>
                        <SearchBar width='w-12 md:w-24 xl:w-28' change={true} newWidth='w-[380px] md:w-[380px] xl:w-[620px]' placeholder='Nhập ..' newPlaceholde='Nhập địa điểm . . .' 
                                path={location.pathname} place={true} />
                    </div>
                    <div className="pt-6 pb-[25px] text-heading-4 font-semibold text-neutral-1-900 border-b-2 border-neutral-1-200 md:text-heading-3 md:pt-[30px] md:pb-4 xl:pt-8">
                        Tin tức cẩm nang du lịch
                    </div>
                    <div className="py-8 text-body-1 text-neutral-1-900 md:pt-4 md:text-neutral-1-600">
                        <span className="font-semibold">Tin tức Du lịch</span> cung cấp những thông tin về các địa điểm du lịch Việt Nam nổi tiếng và hấp dẫn. 
                        Những địa điểm mới liên tục được cập nhật cùng với các tour được tổ chức sẽ đảm bảo mang đến trải nghiệm tuyệt vời cho bạn!
                    </div>
                    <div className="grid gap-y-8 md:grid-cols-2 md:gap-x-6 xl:grid-cols-3">
                        <CardArticle pb='pb-[15px] xl:pb-[19px]' animation='animate-fade-down md:animate-fade-right xl:animate-fade'/>
                        <CardArticle pb='pb-[15px] xl:pb-[19px]' animation='animate-fade-down md:animate-fade-left xl:animate-fade'/>
                        <CardArticle pb='pb-[15px] xl:pb-[19px]' animation='animate-fade-down md:animate-fade-right xl:animate-fade'/>
                        <CardArticle pb='pb-[15px] xl:pb-[19px]' animation='animate-fade-down md:animate-fade-left xl:animate-fade'/>
                        <CardArticle pb='pb-[15px] xl:pb-[19px]' animation='animate-fade-right animate-fade'/>
                        <CardArticle pb='pb-[15px] xl:pb-[19px]' animation='animate-fade-left animate-fade'/>
                    </div>
                    {/* pagination */}
                    <Pagination />
                </div>      
            </section>
        </div>
    )
}

export default News
