import React from 'react';
import { SearchBar } from '../../components';
import { Link } from 'react-router-dom';
import { Button2 } from '../../components';
import { useNavigate } from 'react-router-dom'
import icons from '../../ultils/icons';

const { CgArrowsExchangeAltV, FaArrowUpRightFromSquare } = icons

const StaffList = () => {
    const navigate = useNavigate()
    return (
        <div className='w-full px-6 pt-20 xl:pt-7 xl:pl-0 xl:pr-10 overflow-x-hidden'>
            <div className='pb-10 flex flex-col gap-y-5 md:flex-row md:items-center md:justify-between'>
                <div className='font-prata text-neutral-1-900 font-semibold text-header-1 xl:text-heading-4'>Danh sách Nhân viên</div>
                <div className='ml-auto xl:ml-0'>
                    <SearchBar placeholder='Nhập ..' newPlaceholder='Nhập tìm kiếm . . .' width='w-10 md:w-24 xl:w-28' change={true} newWidth='w-[380px] xl:w-[500px]' 
                        optionBar={true} person={true} email={true}
                    />
                </div>
            </div>
            <div className='pb-3 flex gap-10'>
                <div className='text-body-2 text-neutral-1-900 xl:text-body-1 '>Tổng số: <span className='font-semibold'>2</span></div>
                <div className='text-body-2 text-neutral-1-900 px-3 bg-background-7 rounded-xl xl:text-body-1'>Số nhân viên đang hoạt động: <span className='font-semibold'>1</span></div>
            </div>
            <table className="mb-8 mytable2 w-full text-body-2 xl:text-body-1">
                <tr className="h-10 font-semibold tracking-wider bg-neutral-3-200">
                    <td className="xl:min-w-[40px]">
                        <div className='flex items-center gap-1'>
                            <div>#</div>
                            <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'/> 
                        </div>
                    </td>
                    <td><div className='flex items-center gap-1'>
                            <div>Tên</div>
                            <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'/> 
                    </div></td>
                    <td><div className='flex items-center gap-1'>
                            <div>Họ</div>
                            <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'/> 
                    </div></td>
                    <td className="hidden md:table-cell">
                        <div className='flex items-center gap-1'>
                                <div>Email</div>
                                <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'/> 
                        </div>
                    </td>
                    <td className="hidden md:table-cell">
                        <div className='flex items-center gap-1'>
                            <div>Đang phụ trách</div>
                            <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'/> 
                        </div>
                    </td>
                    <td><div className='flex items-center gap-1'>
                            <div>Tình trạng</div>
                            <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'/> 
                    </div></td>
                    <td>Chi tiết</td>
                </tr>
                <tr className='h-12 border-b-2 border-neutral-2-200'>
                    <td>1</td>
                    <td>Anh</td>
                    <td>Nguyễn Thị</td>
                    <td className='hidden md:table-cell'>anh.n5@kbdulich.com</td>
                    <td className='hidden md:table-cell xl:pl-12'>2 Tour</td>
                    <td><div className="flex items-center gap-[6px]">
                        <div className='w-2 h-2 rounded-full bg-[#1ABB9C]'></div>
                        Active
                    </div></td>
                    <td><FaArrowUpRightFromSquare onClick={() => (navigate('/manager/staff-detail'))} className='ml-5 text-[12px] text-neutral-1-600 hover:text-neutral-1-500 cursor-pointer xl:text-[14px]'/></td>
                </tr>
                <tr className='h-12 border-b-2 border-neutral-2-200'>
                    <td>2</td>
                    <td>Bình</td>
                    <td>Trần Văn</td>
                    <td className='hidden md:table-cell'>binh.t2@kbdulich.com</td>
                    <td className='hidden md:table-cell xl:pl-12'>5 Tour</td>
                    <td><div className="flex items-center gap-[6px]">
                            <div className='w-2 h-2 rounded-full bg-accent-3'></div>
                            Inactive
                    </div></td>
                    <td><FaArrowUpRightFromSquare onClick={() => (navigate('/manager/staff-detail'))} className='ml-5 text-[12px] text-neutral-1-600 hover:text-neutral-1-500 cursor-pointer xl:text-[14px]'/></td>
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
            <Button2 text='+ Thêm nhân viên mới' textColor='text-white' bgColor='bg-[#363837]' onClick={() => navigate('/manager/staff-new')}/>
        </div>
    )
}

export default StaffList
