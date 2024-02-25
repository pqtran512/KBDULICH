import React from 'react';
import icons from '../../ultils/icons';
import { Button2, SearchBar } from '../../components';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

const { CgArrowsExchangeAltV } = icons

const STourList = () => {
    const navigate = useNavigate()
    return (
        <div className='w-full px-6 pt-20 xl:pt-7 xl:pl-0 xl:pr-10 overflow-x-hidden'>
            <div className='pb-10 flex flex-col gap-y-5 md:flex-row md:items-center md:justify-between'>
                <div className='font-prata text-neutral-1-900 font-semibold text-header-1 xl:text-heading-4'>Danh sách Tour</div>
                <div className='ml-auto xl:ml-0'>
                    <SearchBar placeholder='Nhập ..' newPlaceholder='Nhập tìm kiếm . . .' width='w-10 md:w-24 xl:w-28' change={true} newWidth='w-[380px] xl:w-[500px]' 
                    id={true} tour={true} departureDate={true}/>
                </div>
            </div>
            <div className='pb-3 flex gap-10'>
                <div className='text-body-2 xl:text-body-1 text-neutral-1-900'>Tổng số: <span className='font-semibold'>2</span></div>
                <div className='text-body-2 xl:text-body-1 text-neutral-1-900 px-3 bg-background-7 rounded-xl'>Số Tour đang hoạt động: <span className='font-semibold'>1</span></div>
            </div>
            <table className="mb-8 mytable2 w-full text-body-2 xl:text-body-1">
                <tr className="h-10 font-semibold tracking-wider bg-neutral-3-100">
                    <td className="xl:min-w-[66px]">
                        <div className='flex items-center'>
                            <div>#</div>
                            <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'/> 
                        </div>
                    </td>
                    <td><div className='flex items-center gap-3'>
                            <div>Tên Tour</div>
                            <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'/> 
                    </div></td>
                    <td className="hidden xl:table-cell xl:min-w-[100px]">
                        <div className='flex items-center'>
                            <div>Số ghế</div>
                            <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'/> 
                        </div>
                    </td>
                    <td className="hidden xl:table-cell xl:min-w-[141px]">
                        <div className='flex items-center'>
                            <div>SL khách đã đặt</div>
                            <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'/> 
                        </div>    
                    </td>
                    <td className="hidden md:table-cell min-w-[100px] xl:min-w-[128px]">
                        <div className='flex items-center'>
                            <div>Khởi hành</div>
                            <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'/> 
                        </div>
                    </td>
                    <td className="hidden md:table-cell">
                        <div className='flex items-center'>
                            <div>Tình trạng</div>
                            <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'/> 
                        </div>
                    </td>
                </tr>
                <tr className='h-12 border-b-2 border-neutral-2-200'>
                    <td>T1</td>
                    <td><Link to={'/staff/tour-detail'} className='text-accent-10 hover:text-accent-9 block xl:w-[400px]'>Du lịch Bà Nà Hills - Cầu Rồng - Bán Đảo Sơn Trà</Link></td>
                    <td className='hidden xl:table-cell xl:pl-4'>30</td>
                    <td className='hidden xl:table-cell xl:pl-12'>20</td>
                    <td className='hidden md:table-cell'>01/01/2024</td>
                    <td className="hidden md:table-cell">
                        <div className="flex items-center gap-[6px]">
                            <div className='w-2 h-2 rounded-full bg-[#1ABB9C]'></div>
                            Active
                        </div>
                    </td>
                </tr>
                <tr className='h-12 border-b-2 border-neutral-2-200'>
                    <td>T2</td>
                    <td><Link to={'/staff/tour-detail'} className='text-accent-10 hover:text-accent-9 block xl:w-[400px]'>Tour Bán Đảo Sơn Trà - Cầu Quay Sông Hàn</Link></td>
                    <td className='hidden xl:table-cell xl:pl-4'>45</td>
                    <td className='hidden xl:table-cell xl:pl-12'>30</td>
                    <td className='hidden md:table-cell'>09/09/2024</td>
                    <td className="hidden md:table-cell">
                        <div className="flex items-center gap-[6px]">
                            <div className='w-2 h-2 rounded-full bg-accent-3'></div>
                            Inactive
                        </div>
                    </td>
                </tr>
            </table>
            {/* Pagination  */}
            <div className="flex items-center justify-end gap-2 text-caption-1 xl:text-body-2">
                <Link className="flex items-center justify-center cursor-pointer rounded bg-white border-2 border-black text-black font-semibold transition-all hover:bg-black hover:text-white w-6 h-6 xl:w-8 xl:h-8">
                    1</Link>
                <Link className="flex items-center justify-center cursor-pointer rounded bg-white border-2 border-black text-black font-semibold transition-all hover:bg-black hover:text-white w-6 h-6 xl:w-8 xl:h-8">2</Link>
                <Link className="flex items-center justify-center cursor-pointer rounded bg-white border-2 border-black text-black font-semibold transition-all hover:bg-black hover:text-white w-6 h-6 xl:w-8 xl:h-8">
                    <i className="twi-22-chevron-line text-[10px] font-semibold xl:text-[12px] leading-6"></i>
                </Link>
            </div>
            <Button2 text='+ Thêm tour mới' textColor='text-white' bgColor='bg-[#363837]' btn3={true} onClick={() => navigate('/staff/tour-new')}/>
        </div>
    )
}

export default STourList
