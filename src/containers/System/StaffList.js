import React, { useState, useEffect } from 'react';
import { SearchBar, Loading, Pagination } from '../../components';
import { Button2 } from '../../components';
import { useNavigate, useSearchParams } from 'react-router-dom'
import icons from '../../ultils/icons';
import { useDispatch, useSelector } from 'react-redux'
import { getAllStaff } from '../../store/actions/userAction';
import { formatVietnameseToString } from '../../ultils/formatVietnameseToString';
import * as XLSX from 'xlsx';

const { CgArrowsExchangeAltV, FaArrowUpRightFromSquare } = icons

const StaffList = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { staffs } = useSelector(state => state.staff) 
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams()
    const currentPage = searchParams.get('page') || 1
    const [sortStaff, setSortStaff] = useState([]);
    const [dataPerPage] = useState(10);
    const [order, setOrder] = useState("asc")

    useEffect(() => {
        setLoading(true);
        dispatch(getAllStaff())
            .then(() => {
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false); // Ensure loading is set to false even if an error occurs
            });
    }, [dispatch])
    useEffect(() => {
        setSortStaff(staffs)
    }, [staffs]);
    const indexOfLast = currentPage * dataPerPage;
    const indexOfFirst = indexOfLast - dataPerPage; 
    const currentStaff = sortStaff.slice(indexOfFirst, indexOfLast);
    const sorting = (col) => {
        if (typeof staffs[0][col] === 'string') {
            if (order === "asc") {
                const sorted = [...staffs].sort((a, b) => 
                    formatVietnameseToString(a[col]) > formatVietnameseToString(b[col]) ? 1 : -1
                );
                setSortStaff(sorted)
                setOrder('dsc')
            }
            if (order === "dsc") {
                const sorted = [...staffs].sort((a, b) => 
                    formatVietnameseToString(a[col]) < formatVietnameseToString(b[col]) ? 1 : -1
                );
                setSortStaff(sorted)
                setOrder('asc')
            }
        }
        else {
            if (order === "asc") {
                const sorted = [...staffs].sort((a, b) => 
                    a[col] > b[col] ? 1 : -1
                );
                setSortStaff(sorted)
                setOrder('dsc')
            }
            if (order === "dsc") {
                const sorted = [...staffs].sort((a, b) => 
                    a[col] < b[col] ? 1 : -1
                );
                setSortStaff(sorted)
                setOrder('asc')
            }
        }
    }
    const exportToExcel = () => {
        const data = [...staffs]
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, "Data");
        XLSX.writeFile(wb, 'staff_data.xlsx');
    };
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
            <div className='pb-6 flex flex-col gap-2 md:flex-row md:justify-between'>
                <div className='flex gap-10'>
                    <div className='text-body-2 text-neutral-1-900 xl:text-body-1 '>Tổng số: <span className='font-semibold'>{staffs?.length}</span></div>
                    <div className='text-body-2 text-neutral-1-900 h-fit px-3 bg-background-7 rounded-xl xl:text-body-1'>Số nhân viên đang hoạt động: <span className='font-semibold'>{staffs?.filter(item => item.isActive === 1).length}</span></div>
                </div>
                <button className="w-fit py-1 px-2 text-body-2 rounded-md bg-accent-7 text-white border-[3px] border-background-8 xl:px-3 xl:text-body-1" onClick={exportToExcel}>Export to Excel</button>
            </div>
            <table id="dataTable" className="mb-8 mytable2 w-full text-body-2 xl:text-body-1">
                <thead>
                    <tr className="h-10 font-semibold tracking-wider bg-neutral-3-200">
                        <td><div>#</div></td>
                        <td className="xl:min-w-[66px]">
                            <div className='flex items-center gap-1'>
                                <div>ID</div>
                                <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'
                                    onClick={() => sorting("staff_ID")}/> 
                            </div>
                        </td>
                        <td><div className='flex items-center gap-1'>
                                <div>Tên</div>
                                <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'
                                    onClick={() => sorting("firstName")}/> 
                        </div></td>
                        <td><div className='flex items-center gap-1'>
                                <div>Họ</div>
                                <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'
                                    onClick={() => sorting("lastName")}/> 
                        </div></td>
                        <td className="hidden md:table-cell">
                            <div className='flex items-center gap-1'>
                                    <div>Email</div>
                                    <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'
                                        onClick={() => sorting("email")}/> 
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
                                <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'
                                    onClick={() => sorting("isActive")}/> 
                        </div></td>
                        <td>Chi tiết</td>
                    </tr>
                </thead>
                <tbody>
                    { loading && <tr><td></td><td></td>
                        <td className="hidden md:table-cell"></td>
                        <td><Loading loading={loading}/></td>
                        <td className="hidden md:table-cell"></td>
                        <td className="hidden md:table-cell"></td>
                        <td className="hidden md:table-cell"></td>
                    </tr> }
                    {!loading && currentStaff.map((staff, idx) => {
                        return ( 
                            <tr key={idx} className='h-12 border-b-2 border-neutral-2-200'>
                                <td className='pr-[6px]'>{indexOfFirst + idx + 1}</td>
                                <td className='text-caption-1 xl:text-body-2'>{staff.staff_ID}</td>
                                <td>{staff.firstName}</td>
                                <td>{staff.lastName}</td>
                                <td className='hidden md:table-cell'>{staff.email}</td> {/* data */}
                                <td className='hidden md:table-cell md:pl-8 xl:pl-12'>2 Tour</td>
                                {staff.isActive? 
                                    <td><div className="flex items-center gap-[6px] pl-4">
                                        <div className='w-2 h-2 rounded-full bg-[#1ABB9C]'></div>
                                        Active
                                    </div></td>
                                    : <td><div className="flex items-center gap-[6px] pl-4">
                                        <div className='w-2 h-2 rounded-full bg-accent-3'></div>
                                        Inactive
                                    </div></td>
                                }
                                <td><FaArrowUpRightFromSquare onClick={() => (navigate('/manager/staff-detail'))} className='ml-5 text-[12px] text-neutral-1-600 hover:text-neutral-1-500 cursor-pointer xl:text-[14px]'/></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {/* Pagination  */}
            <Pagination limit={10} blackStyle={true} count={staffs?.length}/> 
            <Button2 text='+ Thêm nhân viên mới' textColor='text-white' bgColor='bg-[#363837]' onClick={() => navigate('/manager/staff-new')}/>
        </div>
    )
}

export default StaffList
