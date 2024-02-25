import React, { useState } from 'react'
import { Button2, SearchBar } from '../../components';
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom';
import icons from '../../ultils/icons';

const { CgArrowsExchangeAltV } = icons

const StaffDetail = () => {
    // PARAMS
    const [payload, setPayload] = useState({
        id: 1, 
        fname: 'Nguyễn Thị',
        lname: 'Anh',
        sex: 'Nữ',
        birthday: '20/01/1994', 
        phone: '0123456789',
        email: 'anh.n5@kbdulich.vn',
        isActive: true
    })
    const navigate = useNavigate()
    // FUNCTIONS
    const changeToEditMode = () => {
        window.scrollTo(0, 0);
        navigate('/manager/staff-edit')
    };
    const handleDeactivate = () => {
        Swal.fire({
            title: "Không thể vô hiệu hóa !",
            text: "Bạn cần xử lý tất cả tour đang hoạt động phụ trách bởi nhân viên này trước khi vô hiệu hóa",
            icon: "warning",
            allowOutsideClick: () => !Swal.isLoading(),
        })
        // Swal.fire({
        //     title: "Bạn chắc chắn muốn vô hiệu hóa nhân viên ?",
        //     icon: "warning",
        //     showCancelButton: true,
        //     confirmButtonText: "Chắc chắn",
        //     cancelButtonText: "Hủy",
        //     showLoaderOnConfirm: true,
        //     allowOutsideClick: () => !Swal.isLoading(),
        // }).then((result) => {
        //     if (result.isConfirmed) {
        //         setPayload(prev => ({...prev, 'isActive': false}))
        //         Swal.fire('Vô hiệu hóa thành công', '', 'success')
        //     }
        // })
    }
    const handleActivate = () => {
        Swal.fire({
            title: "Bạn chắc chắn muốn kích hoạt nhân viên ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Chắc chắn",
            cancelButtonText: "Hủy",
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
            if (result.isConfirmed) {
                setPayload(prev => ({...prev, 'isActive': true}))
                Swal.fire('Kích hoạt thành công', '', 'success')
            }
        })
    }
    return (
        <div className='w-full px-6 pt-20 pb-10 xl:pt-7 xl:pb-20 lg:px-2 xl:pl-0 xl:pr-10 overflow-x-hidden'>
            <div className='pb-16'>
                <div className='font-prata text-neutral-1-900 font-semibold text-header-1 border-b-2 border-neutral-2-200 pb-1 w-full px-4 rounded-xl shadow-title md:text-heading-4'>Thông tin Nhân viên</div>
            </div>
            <div className='relative text-body-1 text-[#363837] grid gap-6 mx-auto px-4 py-6 border-[3px] border-secondary-2 rounded-b-2xl rounded-tr-2xl md:grid-cols-2 xl:gap-40 xl:w-[900px]'>
                <div className='absolute -top-6 left-0.5 bg-gradient-to-tr from-secondary-2 to-accent-4 border border-white outline-offset-2 outline outline-[3px] outline-secondary-2 rounded-t-xl w-[100px] h-5'></div>
                <div className='flex flex-col gap-6'>
                    <div className='font-semibold'>Mã: <span className='font-normal'>{payload.id}</span></div>
                    <div className='flex gap-10'>
                        <div className='flex gap-2 items-center'>
                            <div className='font-semibold'>Tên: </div>
                            <div className='font-normal'>{payload.lname}</div> 
                        </div>
                        <div className='flex gap-2 items-center'>
                            <div className='font-semibold'>Họ: </div>
                            <div className='font-normal'>{payload.fname}</div>
                        </div>    
                    </div>
                    <div className='flex gap-5 items-center'>
                        <div className='font-semibold'>Giới tính: </div>
                        <div className='font-normal'>{payload.sex}</div>    
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div className='font-semibold'>Ngày sinh:</div>
                        <div className='font-normal'>{payload.birthday}</div>
                    </div>
                </div>
                <div className='flex flex-col gap-6'>
                    <div className='flex gap-2 items-center'>
                        <div className='font-semibold'>SĐT:</div>
                        <div className='font-normal'>{payload.phone}</div>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div className='font-semibold'>Email:</div>
                        <div className='font-normal'>{payload.email}</div>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div className='font-semibold'>Tình trạng:</div>
                        <div className="flex items-center gap-[6px]">
                            <div className='w-2 h-2 rounded-full bg-[#1ABB9C]'></div>
                            {payload.isActive ? 'Active' : 'Inactive'}
                        </div>
                    </div>
                </div>
            </div>
            <div className='pt-8 flex gap-10 justify-center items-center'>
            { payload.isActive?
                <>
                <Button2 text='Chỉnh sửa thông tin' textColor='text-black' bgColor='bg-accent-5' onClick={changeToEditMode}/>
                <Button2 text='Vô hiệu hóa nhân viên' textColor='text-white' bgColor='bg-[#363837]' onClick={handleDeactivate}/>
                </> 
                :
                <Button2 text='Kích hoạt nhân viên' textColor='text-white' bgColor='bg-[#363837]' onClick={handleActivate}/>
            }
            </div>
            <div className='pt-16'>
                <div className='pb-1 font-prata text-neutral-1-900 font-semibold border-b-2 border-neutral-2-200 w-full px-4 rounded-xl shadow-title text-header-2 md:text-header-1'>Các Tour phụ trách</div>
                <div className='pt-6 w-full flex justify-end'>
                    <SearchBar placeholder='Nhập ..' newPlaceholder='Nhập tìm kiếm . . .' width='w-12 md:w-24 xl:w-28' change={true} newWidth='w-[380px] md:w-[380px] xl:w-[620px]' 
                        id={true} tour={true} 
                    />
                </div>
                <div className='pb-3 text-body-1 text-neutral-1-900'>Tổng số: 2</div>
                <table className="mb-8 mytable2 w-full text-body-2 md:mytable xl:text-body-1">
                    <tr className="h-10 font-semibold tracking-wider bg-neutral-3-200">
                        <td><div className='flex items-center'>
                            <div>#</div>
                            <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'/> 
                        </div></td>
                        <td><div className='flex items-center'>
                            <div className='whitespace-nowrap'>Mã Tour</div>
                            <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'/> 
                        </div></td>
                        <td><div className='flex items-center gap-2'>
                            <div>Tên Tour</div>
                            <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'/> 
                        </div></td>
                        <td className="hidden md:table-cell">Tình trạng</td>  
                    </tr>
                    <tr className='h-12 border-b-2 border-neutral-2-200'>
                        <td>1</td>
                        <td>T_048</td>
                        <td><Link to={'/manager/tour-detail'} className='block text-accent-10 hover:text-accent-9'>Du lịch Bà Nà Hills - Cầu Rồng - Bán Đảo Sơn Trà</Link></td>
                        <td className="hidden md:table-cell">
                            <div className="flex items-center gap-[6px]">
                                <div className='w-2 h-2 rounded-full bg-[#1ABB9C]'></div>
                                Active
                            </div>
                        </td>
                    </tr>
                    <tr className='h-12 border-b-2 border-neutral-2-200'>
                        <td>2</td>
                        <td>T_064</td>
                        <td><Link to={'/manager/tour-detail'} className='block text-accent-10 hover:text-accent-9'>Du lịch Bà Nà Hills - Cầu Rồng - Bán Đảo Sơn Trà</Link></td>
                        <td className="hidden md:table-cell">
                            <div className="flex items-center gap-[6px]">
                                <div className='w-2 h-2 rounded-full bg-accent-3'></div>
                                Inactive
                            </div>
                        </td>
                    </tr>
                </table>
                
            </div>
        </div>
    )
}

export default StaffDetail
