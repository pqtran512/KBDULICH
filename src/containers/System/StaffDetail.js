import React, { useState, useEffect } from 'react'
import { Button2 } from '../../components';
import Swal from 'sweetalert2'
import { Link, useNavigate, useParams } from 'react-router-dom';
import icons from '../../ultils/icons';
import { useDispatch, useSelector } from 'react-redux'
import { getStaff } from '../../store/actions/userAction'
import { splitDate } from '../../ultils/splitDateTime';
import { getTourByStaffID } from '../../store/actions';
import { sorting } from '../../ultils/sorting';

const { CgArrowsExchangeAltV } = icons

const StaffDetail = () => {
    // PARAMS
    const {staffID} = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { staff } = useSelector(state => state.staff)
    const { tours_staff } = useSelector(state => state.tour)
    const [sortData, setSortData] = useState([]);
    const [order, setOrder] = useState("asc")
    // FUNCTIONS
    useEffect(() => {
        setSortData(tours_staff)
    }, [tours_staff]);
    useEffect(() => {
        dispatch(getStaff({staff_ID: staffID}))
        dispatch(getTourByStaffID({staff_ID: staffID}))
    }, [dispatch, staffID])
    const changeToEditMode = () => {
        window.scrollTo(0, 0);
        navigate('/manager/staff-edit/'+staffID)
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
                    <div className='font-semibold'>Mã: <span className='font-normal'>{staff?.staff_ID}</span></div>
                    <div className='flex gap-10'>
                        <div className='flex gap-2 items-center'>
                            <div className='font-semibold'>Tên: </div>
                            <div className='font-normal'>{staff?.firstName}</div> 
                        </div>
                        <div className='flex gap-2 items-center'>
                            <div className='font-semibold'>Họ: </div>
                            <div className='font-normal'>{staff?.lastName}</div>
                        </div>    
                    </div>
                    <div className='flex gap-5 items-center'>
                        <div className='font-semibold'>Giới tính: </div>
                        <div className='font-normal'>{staff?.gender}</div>    
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div className='font-semibold'>Ngày sinh:</div>
                        <div className='font-normal'>{splitDate(staff?.dateOfBirth)[0]}/{splitDate(staff?.dateOfBirth)[1]}/{splitDate(staff?.dateOfBirth)[2]}</div>
                    </div>
                </div>
                <div className='flex flex-col gap-6'>
                    <div className='flex gap-2 items-center'>
                        <div className='font-semibold'>SĐT:</div>
                        <div className='font-normal'>0{staff?.phone_no}</div>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div className='font-semibold'>Email:</div>
                        <div className='font-normal'>{staff?.email}</div>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div className='font-semibold'>Tình trạng:</div>
                        <div className="flex items-center gap-[6px]">
                            <div className='w-2 h-2 rounded-full bg-[#1ABB9C]'></div>
                            {staff?.isActive ? 'Active' : 'Inactive'}
                        </div>
                    </div>
                </div>
            </div>
            <div className='pt-8 flex gap-10 justify-center items-center'>
            { staff?.isActive?
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
                <div className='pt-8 pb-4 text-body-1 text-neutral-1-900'>Tổng số: {tours_staff?.length}</div>
                <table className="mb-8 mytable2 w-full text-body-2 md:mytable xl:text-body-1">
                    <thead></thead>
                    <tr className="h-10 font-semibold tracking-wider bg-neutral-3-200">
                        <td><div className='flex items-center'>
                            <div>#</div>
                            <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'/> 
                        </div></td>
                        <td><div className='flex items-center'>
                            <div className='whitespace-nowrap'>Mã Tour</div>
                            <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'
                                onClick={() => sorting("tour_ID", tours_staff, setSortData, order, setOrder)}/> 
                        </div></td>
                        <td><div className='flex items-center gap-2'>
                            <div>Tên Tour</div>
                            <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'
                                onClick={() => sorting("name", tours_staff, setSortData, order, setOrder)}/> 
                        </div></td>
                        <td className="hidden md:table-cell">
                            <div className='flex items-center'>
                                <div>Tình trạng</div>
                                <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'
                                    onClick={() => sorting("isActive", tours_staff, setSortData, order, setOrder)}/> 
                            </div>
                        </td>
                    </tr>
                    {sortData?.map((tour, idx) => {
                        return ( 
                            <tr key={idx} className='h-12 border-b-2 border-neutral-2-200'>
                                <td className='pr-[6px]'>{idx + 1}</td>
                                <td>{tour.tour_ID}</td>
                                <td><Link to={`/manager/tour-detail/${tour.tour_ID}`} className='block text-accent-10 hover:text-accent-9 md:w-[400px] xl:w-[650px]'>{tour.name}</Link></td>
                                {tour.isActive? 
                                    <td className="hidden md:table-cell">
                                        <div className="flex items-center gap-[6px]">
                                            <div className='w-2 h-2 rounded-full bg-[#1ABB9C]'></div>
                                            Active
                                        </div>
                                    </td>
                                    : <td className="hidden md:table-cell">
                                        <div className="flex items-center gap-[6px]">
                                            <div className='w-2 h-2 rounded-full bg-accent-3'></div>
                                            Inactive
                                        </div>
                                    </td>
                                }
                            </tr>
                        )
                    })}
                </table>
                
            </div>
        </div>
    )
}

export default StaffDetail
