import React from 'react';
import { SearchBar } from '../../components';
import { Link } from 'react-router-dom';
import icons from '../../ultils/icons';

const { CgArrowsExchangeAltV, FaStar } = icons

const MTourList = () => {
    return (
        <div className='w-full px-6 pt-20 xl:pt-7 xl:pl-0 xl:pr-10 overflow-x-hidden'>
            <div className='pb-10 flex flex-col gap-y-5 md:flex-row md:items-center md:justify-between'>
                <div className='font-prata text-neutral-1-900 font-semibold text-header-1 xl:text-heading-4'>Danh sách Tour</div>
                <div className='ml-auto xl:ml-0'>
                    <SearchBar placeholder='Nhập ..' newPlaceholder='Nhập tìm kiếm . . .' width='w-10 md:w-24 xl:w-28' change={true} newWidth='w-[380px] xl:w-[650px]' 
                        id={true} tour={true} departureDate={true} rating={true} staff={true}/>
                </div>
            </div>
            <div className='pb-3 flex gap-10'>
                <div className='text-body-2 xl:text-body-1 text-neutral-1-900'>Tổng số: <span className='font-semibold'>2</span></div>
                <div className='text-body-2 xl:text-body-1 text-neutral-1-900 px-3 bg-background-7 rounded-xl'>Số Tour đang hoạt động: <span className='font-semibold'>1</span></div>
            </div>
            <table className="mb-8 mytable2 w-full text-body-2 xl:text-body-1">
                <tr className="h-10 font-semibold tracking-wider bg-neutral-3-200">
                    <td className="xl:min-w-[40px]">
                        <div className='flex items-center'>
                            <div>#</div>
                            <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'/> 
                        </div>
                    </td>
                    <td><div className='flex items-center gap-2'>
                            <div>Tên Tour</div>
                            <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'/> 
                    </div></td>
                    <td className="hidden xl:table-cell">
                        <div className='flex items-center'>
                            <div>Số ghế</div>
                            <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'/> 
                        </div>
                    </td>
                    <td className="hidden xl:table-cell">
                        <div className='flex items-center'>
                            <div>Số khách</div>
                            <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'/> 
                        </div>
                    </td>
                    <td className="hidden md:table-cell">
                        <div className='flex items-center gap-1'>
                            <div>Phụ trách</div>
                            <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'/> 
                        </div>
                    </td>
                    <td className="hidden xl:table-cell">
                        <div className='flex items-center'>
                            <div>Khởi hành</div>
                            <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'/> 
                        </div>
                    </td>
                    <td className="hidden md:table-cell">
                        <div className='flex items-center'>
                            <div>Rating</div>
                            <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'/> 
                        </div>
                    </td>
                    <td className="hidden md:table-cell">Tình trạng</td>
                </tr>
                <tr className='h-12 border-b-2 border-neutral-2-200'>
                    <td>T2</td>
                    <td><Link to={'/manager/tour-detail'} className='md:w-[300px] block text-accent-10 hover:text-accent-9 xl:w-[400px]'>Du lịch Bà Nà Hills - Cầu Rồng - Bán Đảo Sơn Trà</Link></td>
                    <td className='hidden xl:table-cell xl:pl-6'>40</td>
                    <td className='hidden xl:table-cell xl:pl-6'>30</td>
                    <td className='hidden md:table-cell'><Link to={'/manager/staff-detail'} className='text-accent-10 hover:text-accent-9'>Nguyễn Thị Anh</Link></td>
                    <td className='hidden xl:table-cell'>01/01/2024</td>
                    <td className='hidden md:table-cell pl-4'></td>
                    <td className="hidden md:table-cell">
                        <div className="flex items-center gap-[6px]">
                            <div className='w-2 h-2 rounded-full bg-[#1ABB9C]'></div>
                            Active
                        </div>
                    </td>
                </tr>
                <tr className='h-12 border-b-2 border-neutral-2-200'>
                    <td>T1</td>
                    <td><Link to={'/manager/tour-detail'} className='md:w-[300px] block text-accent-10 hover:text-accent-9 xl:w-[400px]'>Du lịch Bán Đảo Sơn Trà - Cầu Quay Sông Hàn</Link></td>
                    <td className='hidden xl:table-cell xl:pl-6'>45</td>
                    <td className='hidden xl:table-cell xl:pl-6'>45</td>
                    <td className='hidden md:table-cell'><Link to={'/manager/staff-detail'} className='text-accent-10 hover:text-accent-9'>Trần Văn Bình</Link></td>
                    <td className='hidden xl:table-cell'>09/09/2024</td>
                    <td className='hidden md:table-cell'><div className='flex items-center gap-1 bg-[#1ABB9C] w-fit px-2 rounded-full'>
                            <div className='text-white'>4.8</div>
                            <FaStar size={15} className='text-secondary-2'/> 
                    </div></td>
                    <td className="hidden md:table-cell">
                        <div className="flex items-center gap-[6px]">
                            <div className='w-2 h-2 rounded-full bg-accent-3'></div>
                            Inactive
                        </div>
                    </td>
                </tr>
            </table>
            {/* Pagination  */}
            <div className="hidden xl:flex items-center justify-end gap-2">
                <Link className="flex items-center justify-center w-8 h-8 cursor-pointer rounded text-body-2 bg-white border-2 border-black text-black font-semibold transition-all hover:bg-black hover:text-white">
                    1</Link>
                <Link className="flex items-center justify-center w-8 h-8 cursor-pointer rounded text-body-2 bg-white border-2 border-black text-black font-semibold transition-all hover:bg-black hover:text-white">2</Link>
                <Link className="flex items-center justify-center w-8 h-8 cursor-pointer rounded text-body-2 bg-white border-2 border-black text-black font-semibold transition-all hover:bg-black hover:text-white">
                    <i className="twi-22-chevron-line text-[12px] leading-6"></i>
                </Link>
            </div>
        </div>
    )
}

export default MTourList
