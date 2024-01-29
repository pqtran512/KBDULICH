import React from 'react'
import { Link } from 'react-router-dom'
import icons from '../ultils/icons'

const { FaStar } = icons

const Card3 = ({img, number, text1, text2, type}) => {
    return (
        <Link className={`relative overflow-hidden rounded-[20px] ${(type==='1')? 'h-[366px] md:h-[348px] xl:h-[302px]' : (type==='2')? 'md:row-span-2 h-[505px] md:h-[720px] xl:h-[628px]': 'md:col-span-2 h-[366px] md:h-[302px]'}`}>
            <img src={img} className='absolute top-0 left-0 w-full h-full' alt=''/>
            {/* <div className="w-fit ">
                <div className="bg-secondary-1 text-body-2 text-white rounded-md py-2 pl-[9px] pr-[6px]"> quan tâm</div>
            </div> */}
            <div className="w-[43px] h-10 bg-frame bg-no-repeat bg-contain flex justify-center mb-1 ml-auto mr-6 md:mr-[22px] xl:mr-[31px]">
                
            </div>
            <div className="w-fit absolute top-6 right-6">
                <div className="relative pb-2">
                    <FaStar className="ml-[35px]" color="#F59E0B" size='58'/>
                    <div className="absolute top-5 left-1/2 text-white text-[16px] leading-[17px] font-semibold">4.9</div>
                </div>
                <div>
                    <div className="bg-black/[.15] rounded-lg pr-[9px] pl-2 pt-[5px] pb-[13px] text-body-2 text-white">
                        <div className="w-fit ml-auto mr-0 pb-1 font-semibold">Tuyệt vời</div>
                        <div className="bg-black/[.15] rounded-md py-2 pl-[9px] pr-[6px]">{number} lượt đặt</div>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 w-full h-[38%] bg-grad3 pb-5 pl-6 flex items-end">
                <div>
                    <div className="pb-2 text-title-1 leading-[18px] text-white font-semibold">{text1}</div>
                    <div className="text-caption-1 text-white">{text2}</div>
                </div>
            </div>
        </Link>
    )
}

export default Card3