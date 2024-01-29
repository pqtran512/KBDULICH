import React from 'react';
import Slider from "react-slick";
import { Card2 } from '../../components';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const NewsDetail = () => {
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
    // Hàm bỏ dấu tiếng Việt
    function removeAccents(str) {
        return str.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/đ/g, 'd').replace(/Đ/g, 'D');
    }
    return (
        <div>
            <section className="flex justify-center relative w-full bg-sea animate-fade bg-center bg-no-repeat bg-cover rounded-b-[20px] md:bg-sea-md xl:bg-sea-xl">
                <div className="w-full pt-[188px] pb-10 px-6 md:pt-[130px] md:max-w-3xl md:pb-[250px] lg:px-2 xl:max-w-7xl xl:pt-[232px] xl:pb-[196px] 2xl:px-0">
                    <div className="mx-auto flex items-center justify-center pb-[86px] max-w-[242px] md:pb-[37px] md:max-w-[404px] xl:pb-[100px] xl:max-w-[584px]">
                        <div className="font-vampiroOne text-[24px] leading-10 tracking-[0.72px] uppercase text-center md:text-[32px] md:leading-[60px] md:tracking-[0.96px] xl:text-[50px] xl:leading-[99px] xl:tracking-[1.5px]">
                        {removeAccents('Hội An')}</div>
                    </div>
                </div>
            </section>
            <section className="mx-auto w-full pb-[62px] animate-fade md:max-w-3xl md:pb-8 pt-[50px] xl:max-w-7xl">
                <div className="px-6 lg:px-2 2xl:px-0">
                    <div className="pb-[53px] md:pb-[58px] xl:pb-4">
                        <div className="truncate w-full flex items-center py-[10px] gap-x-1 md:gap-x-2">
                            <div className="text-neutral-1-600 text-body-1 leading-[34px] md:text-[20px]">Du lịch</div>
                            <div className="flex items-center justify-center w-6 h-6">
                                <i className="twi-22-chevron-line text-[16px] text-secondary-1 text-center"></i>
                            </div>
                            <div className="text-body-1 leading-[34px] text-neutral-1-900 md:hidden">Tin tức</div>
                            <div className="text-neutral-1-600 text-body-1 leading-[34px] hidden md:block md:text-[20px]">Du lịch trong nước</div>
                            <div className="items-center justify-center w-6 h-6 hidden md:flex">
                                <i className="twi-22-chevron-line text-[16px] text-secondary-1 text-center"></i>
                            </div>
                            <div className="truncate leading-[34px] text-neutral-1-900 hidden md:block text-[20px]">Du lịch Hội An </div>
                        </div>
                        <div className="py-6 text-heading-4 font-semibold text-neutral-1-900 md:text-heading-3 md:pt-8 xl:pb-[22px]">
                            Du lịch Hội An </div>
                    </div>
                    <div className="mx-auto md:max-w-[534px] xl:max-w-[920px]">
                        <Slider {...settings} className='cursor-grabbing'>
                            <img className="rounded-md aspect-[366/221] object-cover md:aspect-[720/424] md:rounded-lg xl:aspect-[1280/646]" src="../img/home/tintuc-ct.png" alt=''/>
                            <img className="rounded-md aspect-[366/221] object-cover md:aspect-[720/424] md:rounded-lg xl:aspect-[1280/646]" src="../img/home/tintuc-ct.png" alt=''/>
                            <img className="rounded-md aspect-[366/221] object-cover md:aspect-[720/424] md:rounded-lg xl:aspect-[1280/646]" src="../img/home/tintuc-ct.png" alt=''/>
                        </Slider>
                    </div>
                    <div className="mx-auto pt-8 md:max-w-[534px] md:pt-[37px] xl:pt-12 xl:max-w-7xl">
                        <p className="text-body-1 text-neutral-1-900 pb-12 text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis consequat sed eu felis. Nunc sed porta augue.  augue a volutpat hendrerit, sapien tortor faucibus bugd augue.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis consequat sed eu felis. Nunc sed porta augue.  augue a volutpat hendrerit, sapien tortor faucibus bugd augue.Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Aliquam placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis consequat sed eu felis. Nunc sed porta augue.  augue a volutpat hendrerit, sapien tortor faucibus bugd augue.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis consequat sed eu felis. Nunc sed porta augue.  augue a volutpat hendrerit, sapien tortor faucibus bugd augue.</p>
                        <div className="pb-[109px] text-neutral-1-900 md:pb-9 xl:pb-[59px]">
                            <div className="text-heading-2 pb-6">Những hoạt động nổi bật</div>
                            <div className="text-body-1 pb-[10px] md:pb-[22px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero.</div>
                            <ul className="pl-5">
                                <li className="text-body-1 leading-8">● consectetur adipiscing elit. Aliquam placerat</li>
                                <li className="text-body-1 leading-8">● Lorem ipsum dolor sit amet consectetur</li>
                                <li className="text-body-1 leading-8">● sapien tortor faucibus augue</li>
                                <li className="text-body-1 leading-8">● a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisi</li>
                            </ul>
                        </div>
                    </div>
                </div>      
            </section>
            <section className="mx-auto w-full pb-[92px] md:pb-[120px] md:max-w-3xl xl:pb-[156px] xl:max-w-7xl">
                <div className="px-6 lg:px-2 2xl:px-0">
                    <div className="pb-8 text-neutral-1-900 text-heading-4 font-semibold leading-[31px] xl:text-[32px] xl:pb-[60px]">Tour liên quan</div>
                    <div className="grid gap-y-6 md:grid-cols-2 md:gap-x-6 xl:grid-cols-3">
                        <Card2 animation='md:animate-fade-right'/>
                        <Card2 animation='md:animate-fade-left'/>
                        <Card2 animation='md:animate-fade-right'/>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default NewsDetail
