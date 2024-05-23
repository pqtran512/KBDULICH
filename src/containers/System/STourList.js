import React, { useState, useEffect } from 'react';
import icons from '../../ultils/icons';
import { Button2, SearchBar, Pagination, Loading } from '../../components';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getTourByStaff } from '../../store/actions/tourPlaceAction';
import { sorting } from '../../ultils/sorting';

const { CgArrowsExchangeAltV } = icons

const STourList = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { tours_staff } = useSelector(state => state.tour)
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState("asc")
    const [dataPerPage] = useState(20);
    const [searchParams] = useSearchParams()
    const currentPage = searchParams.get('page') || 1
    const [sortData, setSortData] = useState([]);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            dispatch(getTourByStaff())
                .then(() => {
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                    setLoading(false); // Ensure loading is set to false even if an error occurs
                });
          }, 300)
    }, [dispatch])
    useEffect(() => {
        setSortData(tours_staff)
    }, [tours_staff]);
    // pagination
    const indexOfLastPost = currentPage * dataPerPage;
    const indexOfFirstPost = indexOfLastPost - dataPerPage; 
    const currentTours = sortData.slice(indexOfFirstPost, indexOfLastPost);
    return (
        <div className='w-full px-6 py-20 xl:pt-7 xl:pl-0 xl:pr-10 overflow-x-hidden'>
            <div className='pb-10 flex flex-col gap-y-5 md:flex-row md:items-center md:justify-between'>
                <div className='font-prata text-neutral-1-900 font-semibold text-header-1 xl:text-heading-4'>Danh sách Tour</div>
                <div className='ml-auto xl:ml-0'>
                    <SearchBar placeholder='Nhập ..' newPlaceholder='Nhập tìm kiếm . . . (Nhập ngày theo định dạng yyyy-mm-dd)' width='w-10 md:w-24 xl:w-28' change={true} newWidth='w-[380px] xl:w-[520px]' 
                        optionBar={true} id={true} tour={true} departureDate={true} path={location.pathname} tours={tours_staff} role={'staff'} setOutput={setSortData}/>
                </div>
            </div>
            <div className='pb-6 flex gap-10'>
                <div className='text-body-2 xl:text-body-1 text-neutral-1-900'>Tổng số: <span className='font-semibold'>{tours_staff?.length}</span></div>
                <div className='text-body-2 xl:text-body-1 text-neutral-1-900 px-3 h-fit bg-background-7 rounded-xl'>Số Tour đang hoạt động: <span className='font-semibold'>{tours_staff?.filter(item => item.isActive === true).length}</span></div>
            </div>
            <table id="dataTable" className="mb-8 mytable2 w-full text-body-2 xl:text-body-1 tracking-tight">
                <thead>
                    <tr className="h-10 font-semibold tracking-wider bg-neutral-3-100">
                        <td><div>#</div></td>
                        <td className="xl:min-w-[66px]">
                            <div className='flex items-center'>
                                <div>ID</div>
                                <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'
                                    onClick={() => sorting("tour_ID", tours_staff, setSortData, order, setOrder)}/>
                            </div>
                        </td>
                        <td><div className='flex items-center gap-3'>
                            <div>Tên Tour</div>
                            <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'
                                onClick={() => sorting("name", tours_staff, setSortData, order, setOrder)}/> 
                        </div></td>
                        <td className="hidden xl:table-cell xl:min-w-[100px]">
                            <div className='flex items-center'>
                                <div>Số ghế</div>
                                <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'
                                    onClick={() => sorting("seat_num", tours_staff, setSortData, order, setOrder)}/> 
                            </div>
                        </td>
                        <td className="hidden xl:table-cell xl:min-w-[141px]">
                            <div className='flex items-center'>
                                <div>Số khách</div>
                                <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'
                                    onClick={() => sorting("cus_num", tours_staff, setSortData, order, setOrder)}/> 
                            </div>    
                        </td>
                        <td className="hidden md:table-cell min-w-[100px] xl:min-w-[110px]">
                            <div className='flex items-center'>
                                <div>Khởi hành</div>
                                <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'
                                    onClick={() => sorting("starting_date", tours_staff, setSortData, order, setOrder)}/> 
                            </div>
                        </td>
                        <td className="hidden md:table-cell">
                            <div className='flex items-center'>
                                <div>Trạng thái</div>
                                <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'
                                    onClick={() => sorting("isActive", tours_staff, setSortData, order, setOrder)}/> 
                            </div>
                        </td>
                    </tr>
                </thead>
                <tbody className='text-caption-1 xl:text-body-2'>
                    { loading && <tr><td></td>
                        <td className="hidden xl:table-cell"></td>
                        <td className="hidden xl:table-cell"></td>
                        <td><Loading loading={loading}/></td>
                        <td className="hidden md:table-cell"></td>
                        <td className="hidden md:table-cell"></td>
                    </tr> }
                    {!loading && currentTours.map((tour, idx) => {
                        return ( 
                            <tr key={idx} className='h-12 border-b-2 border-neutral-2-200'>
                                <td className='pr-[6px]'>{indexOfFirstPost + idx + 1}</td>
                                <td className='text-caption-1 xl:text-body-2'>{tour.tour_ID}</td>
                                <td><Link to={`/staff/tour-detail/${tour.tour_ID}`} className='text-accent-10 hover:text-accent-9 block xl:max-w-[380px]'>{tour.name}</Link></td>
                                <td className='hidden xl:table-cell xl:pl-4'>{tour.seat_num}</td>
                                <td className='hidden xl:table-cell xl:pl-6'>{tour.cus_num}</td>
                                <td className='hidden md:table-cell'>{tour.starting_date}</td>
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
                </tbody>
            </table>
            {/* Pagination  */}
            <Pagination limit={20} blackStyle={true} count={tours_staff?.length}/> 
            <Button2 text='+ Thêm tour mới' textColor='text-white' bgColor='bg-[#363837]' onClick={() => navigate('/staff/tour-new')}/>
        </div>
    )
}

export default STourList
