import React, { useState, useEffect } from 'react';
import { SearchBar } from '../../components';
import { Link, useNavigate } from 'react-router-dom';
import icons from '../../ultils/icons';

const { MdContentCopy, CgArrowsExchangeAltV, FaArrowUpRightFromSquare } = icons

const RequestList = () => {
    const navigate = useNavigate()
    const [role, setRole] = useState('')

    const handleDuplicate = async () => {
        navigate('/staff/request-detail/create')
    }
    useEffect(() => {
        if (window.location.pathname === "/manager/request"){
            setRole('manager');
        }
        else if (window.location.pathname === "/staff/request") {
            setRole('staff');
        }
    }, []);
    return (
        <div className='w-full px-6 pt-20 xl:pt-7 xl:pl-0 xl:pr-10 overflow-x-hidden'>
            <div className='pb-4 flex flex-col gap-y-5 md:pb-10 md:flex-row md:items-center md:justify-between'>
                <div className='font-prata text-neutral-1-900 font-semibold text-header-1 xl:text-heading-4'>Danh sách Đề xuất</div>
                <div className='ml-auto xl:ml-0'>
                    <SearchBar placeholder='Nhập ..' newPlaceholder='Nhập tìm kiếm . . .' width='w-12 md:w-24 xl:w-28' change={true} newWidth='w-[380px] md:w-[500px]' 
                        id={true} tour={true} sendDate={true} replyDate={true}
                    />
                </div>
            </div>
            <div className='pb-3 text-body-1 text-neutral-1-900'>Tổng số: <span className='font-semibold'>3</span></div>
            <table className={`mb-8 mytable2 ${role === 'staff' ? 'xl:mytable' : 'xl:mytable2'} w-full text-body-2 xl:text-body-1`}>
                <tr className="h-10 font-semibold tracking-wider bg-neutral-3-200">
                    <td className="xl:min-w-[40px]">
                        <div className='flex items-center gap-0.5'>
                            <div>#</div>
                            <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'/> 
                        </div>
                    </td>
                    <td className="w-[100px]">
                        <div className='flex items-center gap-3'>
                            <div>Tên Tour</div>
                            <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'/> 
                        </div>
                    </td>
                    {role === 'staff' ? <></> : 
                        <td className="hidden md:table-cell"><div className='flex items-center'>
                            <div>Nhân viên</div>
                            <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'/> 
                        </div></td>
                    }
                    <td className="hidden md:table-cell">
                        <div className='flex items-center gap-1'>
                            <div>Loại</div>
                            <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'/> 
                        </div>
                    </td>
                    <td className="hidden md:table-cell">
                        <div className='flex items-center gap-1'>
                            <div>Trạng thái</div>
                            <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'/> 
                        </div>
                    </td>
                    <td className='hidden xl:table-cell'>
                        <div className='flex items-center gap-1'>
                            <div>Ngày gửi</div>
                            <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'/> 
                        </div>
                    </td>
                    <td className='hidden xl:table-cell'>
                        <div className='flex items-center gap-1'>
                            <div>Ngày phản hồi</div>
                            <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'/> 
                        </div>
                    </td>
                    <td>Chi tiết</td>
                    {role === 'staff' ? <td></td> : <></>}
                </tr>
                <tr className='h-12 border-b-2 border-neutral-2-200'>
                    <td>3</td>
                    <td><Link to={'/staff/tour-detail'} className='w-[250px] block text-accent-10 hover:text-accent-9 xl:w-[400px]'>Du lịch Bà Nà Hills - Cầu Rồng - Bán Đảo Sơn Trà</Link></td>
                    {role === 'staff' ? <></> : <td className='hidden md:table-cell'><Link to={'/manager/staff-detail'} className='text-accent-10 hover:text-accent-9'>Nguyễn Thị Anh</Link></td>}
                    <td className='hidden md:table-cell'>Tạo</td>
                    <td className='hidden md:table-cell'></td>
                    <td className='hidden xl:table-cell'>07/01/2024</td>
                    <td className='hidden xl:table-cell'></td>
                    <td><FaArrowUpRightFromSquare onClick={() => (role === 'staff' ? navigate('/staff/request-detail') : navigate('/manager/request-detail'))} className='ml-5 text-[12px] text-neutral-1-600 hover:text-neutral-1-500 cursor-pointer xl:text-[14px]'/></td>
                    {role === 'staff' ? <td><MdContentCopy className='cursor-pointer text-neutral-1-800 hover:text-neutral-1-700 text-[15px] xl:text-[17px]'  onClick={handleDuplicate} /></td> : <></>}
                </tr>
                <tr className='h-12 border-b-2 border-neutral-2-200'>
                    <td>2</td>
                    <td><Link to={'/staff/tour-detail'} className='w-[250px] text-accent-10 hover:text-accent-9 xl:w-[400px]'>Du lịch Bán Đảo Sơn Trà - Cầu Quay Sông Hàn</Link></td>
                    {role === 'staff' ? <></>: <td className='hidden md:table-cell'><Link to={'/manager/staff-detail'} className='text-accent-10 hover:text-accent-9'>Nguyễn Ngọc Ý</Link></td>}
                    <td className='hidden md:table-cell'>Chỉnh sửa</td>
                    <td className='hidden md:table-cell'>
                        <span className='text-white text-caption-1 font-semibold bg-[#1ABB9C] w-fit pt-[1px] pb-0.5 px-2 rounded-full'>Đồng ý</span>
                    </td>
                    <td className='hidden xl:table-cell'>01/01/2024</td>
                    <td className='hidden xl:table-cell'>03/01/2024</td>
                    <td><FaArrowUpRightFromSquare onClick={() => (role === 'staff' ? navigate('/staff/request-detail') : navigate('/manager/request-detail'))} className='ml-5 text-[12px] text-neutral-1-600 hover:text-neutral-1-500 cursor-pointer xl:text-[14px]'/></td>
                    {role === 'staff' ? <td><MdContentCopy className='cursor-pointer text-neutral-1-800 hover:text-neutral-1-700 text-[15px] xl:text-[17px]'  onClick={handleDuplicate} /></td> : <></>}
                </tr>
                <tr className='h-12 border-b-2 border-neutral-2-200'>
                    <td>1</td>
                    <td><Link to={'/staff/tour-detail'} className='w-[250px] text-accent-10 hover:text-accent-9 xl:w-[400px]'>Du lịch Bán Đảo Sơn Trà - Cầu Quay Sông Hàn</Link></td>
                    {role === 'staff' ? <></>: <td className='hidden md:table-cell'><Link to={'/manager/staff-detail'} className='text-accent-10 hover:text-accent-9'>Trần Văn Bình</Link></td>}
                    <td className='hidden md:table-cell'>Hủy</td>
                    <td className='hidden md:table-cell'>
                        <span className='text-white text-caption-1 font-semibold bg-accent-3 w-fit pt-[1px] pb-0.5 px-2 rounded-full'>Từ chối</span>
                    </td>
                    <td className='hidden xl:table-cell'>21/12/2023</td>
                    <td className='hidden xl:table-cell'>03/01/2024</td>
                    <td><FaArrowUpRightFromSquare onClick={() => (role === 'staff' ? navigate('/staff/request-detail') : navigate('/manager/request-detail'))} className='ml-5 text-[12px] text-neutral-1-600 hover:text-neutral-1-500 cursor-pointer xl:text-[14px]'/></td>
                    {role === 'staff' ? <td><MdContentCopy className='cursor-pointer text-neutral-1-800 hover:text-neutral-1-700 text-[15px] xl:text-[17px]' onClick={handleDuplicate} /></td> : <></>}
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
        </div>
    )
}

export default RequestList
