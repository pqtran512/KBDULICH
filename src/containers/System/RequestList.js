import React, { useState, useEffect } from 'react';
import { SearchBar, Pagination, Loading } from '../../components';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllRequests, getRequestsByStaff } from '../../store/actions/requestAction';
import icons from '../../ultils/icons';
import { splitDateTime } from '../../ultils/splitDateTime';
import { sorting } from '../../ultils/sorting';
import * as XLSX from 'xlsx';
import { requestStatus } from '../../ultils/requestStatus';

const { MdContentCopy, CgArrowsExchangeAltV, FaArrowUpRightFromSquare } = icons

const RequestList = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { requests } = useSelector(state => state.request) 
    const { role } = useSelector(state => state.auth)
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState("asc")
    const [dataPerPage] = useState(20);
    const [searchParams] = useSearchParams()
    const currentPage = searchParams.get('page') || 1
    const [sortData, setSortData] = useState([]);
    
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            if (role === 'staff') {
                dispatch(getRequestsByStaff())
                    .then(() => { setLoading(false);})
            }
            else {
                dispatch(getAllRequests()).then(() => { setLoading(false);})
            }
        }, 300)
    }, [dispatch, role])
    useEffect(() => {
        if (requests.length > 0) {
            requests && sorting("date", requests, setSortData, "asc", setOrder)
        }
    }, [requests]);
    const indexOfLastPost = currentPage * dataPerPage;
    const indexOfFirstPost = indexOfLastPost - dataPerPage; 
    const currentData = sortData.slice(indexOfFirstPost, indexOfLastPost);
    const handleDuplicate = async (request_ID) => {
        navigate('/staff/request-detail/' + request_ID + '/dup')
    }
    const exportToExcel = () => {
        const data = [...requests]
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, "Data");
        XLSX.writeFile(wb, 'request_data.xlsx');
    };
    return (
        <div className='w-full px-6 pt-20 pb-10 xl:pt-7 xl:pb-20 xl:pl-0 xl:pr-10 overflow-x-hidden'>
            <div className='pb-4 flex flex-col gap-y-5 md:pb-10 md:flex-row md:items-center md:justify-between'>
                <div className='font-prata text-neutral-1-900 font-semibold text-header-1 xl:text-heading-4'>Danh sách Đề xuất</div>
                <div className='ml-auto xl:ml-0'>
                    <SearchBar placeholder='Nhập ..' newPlaceholder='Nhập tìm kiếm . . .  (Nhập ngày theo định dạng yyyy-mm-dd)' width='w-12 md:w-24 xl:w-28' change={true} newWidth='w-[380px] md:w-[520px]' 
                        optionBar={true} id={true} tour_id={true} sendDate={true} path={location.pathname} requests={requests} setOutput={setSortData}/>
                </div>
            </div>
            <div className='pb-6 flex flex-col gap-2 md:flex-row md:justify-between md:items-end'>
                <div className='flex gap-10'>
                    <div className='text-body-2 text-neutral-1-900 xl:text-body-1 '>Tổng số: <span className='font-semibold'>{requests?.length}</span></div>
                    <div className='text-body-2 text-neutral-1-900 h-fit px-3 bg-background-4 rounded-xl xl:text-body-1'>Số request đang chờ: <span className='font-semibold'>{requests?.filter(item => item.status === 0).length}</span></div>
                </div>
                <button className="w-fit py-1 px-2 text-body-2 rounded-md bg-accent-7 text-white border-[3px] border-background-8 xl:px-3 xl:text-body-1" onClick={exportToExcel}>Export to Excel</button>
            </div>
            <table className={`mb-8 mytable2 ${role === 'staff' ? 'xl:mytable' : 'xl:mytable2'} w-full text-body-2 xl:text-body-1`}>
                <thead>
                    <tr className="h-10 font-semibold tracking-wider bg-neutral-3-200">
                    <   td><div>#</div></td>
                        <td className="xl:min-w-[66px]">
                            <div className='flex items-center'>
                                <div>ID</div>
                                <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'
                                    onClick={() => sorting("request_ID", requests, setSortData, order, setOrder)}/>
                            </div>
                        </td>
                        <td className="w-[100px]">
                            <div className='flex items-center gap-3'>
                                <div>Mã Tour</div>
                                <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'
                                    onClick={() => sorting("tour_ID", requests, setSortData, order, setOrder)}/> 
                            </div>
                        </td>
                        {role === 'staff' ? <></> : 
                            <td className="hidden md:table-cell"><div className='flex items-center'>
                                <div>Mã nhân viên</div>
                                <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'
                                    onClick={() => sorting("staff_ID", requests, setSortData, order, setOrder)}/> 
                            </div></td>
                        }
                        <td className="hidden md:table-cell">
                            <div className='flex items-center gap-1'>
                                <div>Loại</div>
                                <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'
                                    onClick={() => sorting("typ", requests, setSortData, order, setOrder)}/> 
                            </div>
                        </td>
                        <td className="hidden md:table-cell">
                            <div className='flex items-center gap-1'>
                                <div>Trạng thái</div>
                                <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'
                                    onClick={() => sorting("status", requests, setSortData, order, setOrder)}/> 
                            </div>
                        </td>
                        <td className='hidden xl:table-cell'>
                            <div className='flex items-center gap-1'>
                                <div>Ngày gửi</div>
                                <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'
                                    onClick={() => sorting("date", requests, setSortData, order, setOrder)}/> 
                            </div>
                        </td>
                        {/* <td className='hidden xl:table-cell'>
                            <div className='flex items-center gap-1'>
                                <div>Ngày phản hồi</div>
                                <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'/> 
                            </div>
                        </td> */}
                        <td>Chi tiết</td>
                        {role === 'staff' ? <td></td> : <></>}
                    </tr>
                </thead>
                <tbody>
                    { loading && <tr><td></td>
                        <td className="hidden md:table-cell"></td>
                        <td className="hidden xl:table-cell"></td>
                        <td><Loading loading={loading}/></td>
                        <td></td>
                        <td className="hidden md:table-cell"></td>
                        <td className="hidden md:table-cell"></td>
                        {/* <td className="hidden xl:table-cell"></td> */}
                    </tr> }
                    {!loading && currentData.map((r, idx) => {
                        return ( 
                            <tr key={idx} className='h-12 border-b-2 border-neutral-2-200'>
                                <td className='pr-[6px]'>{indexOfFirstPost + idx + 1}</td>
                                <td>{r.request_ID}</td>
                                <td><Link to={`/${role}/tour-detail/${r.tour_ID}`} className='w-[150px] block text-accent-10 hover:text-accent-9 md:w-[200px]'>{r.tour_ID}</Link></td>
                                {role === 'staff' ? <></> : <td className='hidden md:table-cell pl-7'><Link to={`/manager/tour-detail/${r.staff_ID}`} className='text-accent-10 hover:text-accent-9'>{r.staff_ID}</Link></td>}
                                <td className='hidden md:table-cell'>{r.typ}</td>
                                <td className='hidden md:table-cell'>
                                    <div className={`${r.status === 1? 'bg-[#1ABB9C]' : r.status === -1? 'bg-accent-3' : 'bg-secondary-2' } text-white text-caption-1 font-semibold w-fit pt-[1px] pb-0.5 px-2 rounded-full`}>{requestStatus(r.status)}</div>
                                </td>
                                <td className='hidden xl:table-cell'>{splitDateTime(r.date)[0]}</td>
                                {/* <td className='hidden xl:table-cell'></td> */}
                                <td><FaArrowUpRightFromSquare onClick={() => navigate(`/${role}/request-detail/${r.request_ID}`)} className='ml-5 text-[12px] text-neutral-1-600 hover:text-neutral-1-500 cursor-pointer xl:text-[14px]'/></td>
                                {role === 'staff' && r.typ !== 'cancel' ? <td><MdContentCopy className='cursor-pointer text-neutral-1-800 hover:text-neutral-1-700 text-[15px] xl:text-[17px]' onClick={() => handleDuplicate(r.request_ID)} /></td> : <></>}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {/* Pagination  */}
            <Pagination limit={20} blackStyle={true} count={sortData.length}/> 
        </div>
    )
}

export default RequestList
