import React from 'react';
import { useSelector } from 'react-redux'

const Account = () => {
    const {currentData} = useSelector(state => state.user)
    const {role} = useSelector(state => state.auth)
    return (
        <div className='relative w-full px-6 pt-20 pb-20 xl:pt-7 xl:pl-0 xl:pr-10 overflow-x-hidden'>
            <div className='pb-4 font-prata text-neutral-1-900 font-semibold text-header-1 md:text-heading-4 xl:pb-6'>Tài khoản</div>
            <div className={`relative p-6 flex justify-center w-full ${currentData?.gender === 'Nam'? 'bg-wallpaper1' : 'bg-wallpaper2'} animate-fade bg-center bg-no-repeat bg-cover rounded-[20px] md:p-10`}>
                <div className="absolute top-0 left-0 h-full w-full bg-black/50 rounded-[20px]"></div>
                <div className='z-0 w-full'>
                    <div className='font-prata pb-4 flex justify-between items-start xl:pb-10'>
                        <div className=' text-white font-semibold text-header-2 md:text-header-1'>{currentData?.lastName} {currentData?.firstName}</div>
                        <div className='py-1 px-2 bg-white rounded text-neutral-1-900 font-semibold text-body-2 xl:text-body-1'>{role === 'staff'? 'Staff' : 'Manager'}</div>
                    </div>
                    <div className='text-body-2 text-white flex flex-col gap-6 md:grid grid-cols-2 md:gap-20 xl:text-body-1'>
                        <div className='flex flex-col gap-6'>
                            <div className='font-semibold'>Mã: <span className='font-normal'>{currentData?.staff_ID}</span></div>
                            <div className='flex flex-col gap-6 xl:flex-row xl:gap-10'>
                                <div className='flex gap-2 items-center min-w-[95px]'>
                                    <div className='font-semibold'>Tên: </div>
                                    <div className='font-normal'>{currentData?.firstName}</div>  
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <div className='font-semibold'>Họ: </div>
                                    <div className='font-normal'>{currentData?.lastName}</div>
                                </div>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <div className='font-semibold'>Giới tính: </div>
                                <div className='font-normal'>{currentData?.gender}</div>    
                            </div>
                            <div className='flex gap-2 items-center'>
                                <div className='font-semibold'>Ngày sinh:</div>
                                <div className='font-normal'>{currentData?.gender}</div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-6'>
                            <div className='flex gap-2 items-center'>
                                <div className='font-semibold'>SĐT:</div>
                                <div className='font-normal'>0{currentData?.phone_no}</div>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <div className='font-semibold'>Email:</div>
                                <div className='font-normal'>{currentData?.email}</div>
                            </div>
                            {currentData?.isActive? 
                                    <div className='flex gap-4 items-center'>
                                        <div className='font-semibold'>Tình trạng:</div>
                                        <div className="flex items-center gap-[6px]">
                                            <div className='w-2 h-2 rounded-full bg-[#1ABB9C]'></div>
                                            Active
                                        </div>
                                    </div>
                                    : <div className='flex gap-4 items-center'>
                                        <div className='font-semibold'>Tình trạng:</div>
                                        <div className="flex items-center gap-[6px]">
                                            <div className='w-2 h-2 rounded-full bg-accent-3'></div>
                                            Inactive
                                        </div>
                                    </div>
                                }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account
