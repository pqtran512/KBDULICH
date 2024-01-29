import React from 'react'
import covietnam from '../assets/img/home/covietnam.png'
import { ButtonRound } from '../components'
import { Link } from 'react-router-dom'

const Card1 = ({img, text1, text2, price}) => {
    return (
        <Link to={'/tour-detail'}>
            <div className="flex items-center pb-9 md:pb-6 xl:pb-2">
                <div className="text-[20px] text-neutral-1-900 leading-6">{text1}</div>
                <div className="pl-[18px]">
                    <img className="w-10 h-[30px] object-cover" src={covietnam} alt=''/>
                </div>
            </div>
            <div className="relative w-full pt-[47.48%] md:pt-[47.41%]">
                <img className="absolute w-full h-full top-0 left-0 object-cover" src={img} alt=''/> 
            </div>
            <div className="flex items-center justify-between pt-9 md:pt-6 xl:pt-2">
                <ButtonRound width='w-[117px]' height='h-[39px]' text='Xem thêm' textColor='text-white' bgColor='bg-[#002466]' border='border-[3px] border-white' type='btn2' hoverType='btn-dark' textSize='text-button1'/>
                <div className="min-w-[122px] xl:min-w-fit">
                    <div className="text-body-2 text-neutral-1-900 pb-2 leading-[18px]">{text2}</div>
                    <div className="text-title-2 font-semibold text-neutral-1-900 leading-[17px]">{price}</div>
                </div>
            </div>
        </Link>
    )
}

export default Card1