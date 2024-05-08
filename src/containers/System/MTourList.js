import React, { useState, useEffect } from 'react';
import { SearchBar, Pagination, Loading } from '../../components';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import icons from '../../ultils/icons';
import { getToursCondition } from '../../store/actions/tourPlaceAction';
import { ratingClassifier } from '../../ultils/ratingClassifier';
import * as XLSX from 'xlsx';
import { sorting } from '../../ultils/sorting';

const { CgArrowsExchangeAltV, FaStar } = icons

const MTourList = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const { tours_cond, count_cond} = useSelector(state => state.tour) 
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState("asc")
    const [postsPerPage] = useState(20);
    const [searchParams] = useSearchParams()
    const currentPage = searchParams.get('page') || 1
    const [sortData, setSortData] = useState([]);

    useEffect(() => {
        setLoading(true);
        dispatch(getToursCondition())
            .then(() => {
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false); // Ensure loading is set to false even if an error occurs
            });
    }, [dispatch])
    useEffect(() => {
        setSortData(tours_cond)
    }, [tours_cond]);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage; 
    const currentTours = sortData.slice(indexOfFirstPost, indexOfLastPost);
    const exportToExcel = () => {
        const modifiedData = tours_cond.map(entry => {
            const { places, staff, schedule, service, ...rest } = entry;
            return rest;
          });
        const data = [...modifiedData]
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, "Data");
        XLSX.writeFile(wb, 'tour_data.xlsx');
    };
    return (
        <div className='w-full px-6 pt-20 pb-10 xl:pt-7 xl:pb-20 xl:pl-0 xl:pr-10 overflow-x-hidden'>
            <div className='pb-10 flex flex-col gap-y-5 md:flex-row md:items-center md:justify-between'>
                <div className='font-prata text-neutral-1-900 font-semibold text-header-1 xl:text-heading-4'>Danh sách Tour</div>
                <div className='ml-auto xl:ml-0'>
                    <SearchBar placeholder='Nhập ..' newPlaceholder='Nhập tìm kiếm . . .' width='w-10 md:w-24 xl:w-28' change={true} newWidth='w-[380px] xl:w-[650px]' 
                        optionBar={true} id={true} tour={true} departureDate={true} rating={true} staff={true} path={location.pathname} tours={tours_cond} role={'manager'} setOutput={setSortData}/>
                </div>
            </div>
            <div className='pb-6 flex flex-col gap-2 md:flex-row md:justify-between md:items-end'>
                <div className='flex gap-10'>
                    <div className='text-body-2 xl:text-body-1 text-neutral-1-900'>Tổng số: <span className='font-semibold'>{count_cond}</span></div>
                    <div className='text-body-2 xl:text-body-1 h-fit text-neutral-1-900 px-3 bg-background-7 rounded-xl'>Số Tour đang hoạt động: <span className='font-semibold'>{tours_cond.filter(item => item.isActive === true).length}</span></div>
                </div>
                <button className="w-fit py-1 px-2 text-body-2 rounded-md bg-accent-7 text-white border-[3px] border-background-8 xl:px-3 xl:text-body-1" onClick={exportToExcel}>Export to Excel</button>
            </div>
            <table id="dataTable" className="mb-8 mytable2 w-full text-caption-1 xl:text-body-2 tracking-tight">
                <thead>
                    <tr className="h-10 font-semibold tracking-wider bg-neutral-3-200">
                        <td><div>#</div></td>
                        <td className="xl:min-w-[40px]">
                            <div className='flex items-center'>
                                <div>ID</div>
                                <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'
                                    onClick={() => sorting("tour_ID", tours_cond, setSortData, order, setOrder)}/> 
                            </div>
                        </td>
                        <td><div className='flex items-center gap-2'>
                                <div>Tên Tour</div>
                                <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'
                                    onClick={() => sorting("name", tours_cond, setSortData, order, setOrder)}/> 
                        </div></td>
                        <td className="hidden xl:table-cell">
                            <div className='flex items-center'>
                                <div>Số ghế</div>
                                <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'
                                    onClick={() => sorting("seat_num", tours_cond, setSortData, order, setOrder)}/> 
                            </div>
                        </td>
                        <td className="hidden xl:table-cell">
                            <div className='flex items-center'>
                                <div>Số khách</div>
                                <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'
                                    onClick={() => sorting("cus_num", tours_cond, setSortData, order, setOrder)}/> 
                            </div>
                        </td>
                        <td className="hidden md:table-cell">Phụ trách</td>
                        <td className="hidden xl:table-cell">
                            <div className='flex items-center'>
                                <div>Khởi hành</div>
                                <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'
                                    onClick={() => sorting("starting_date", tours_cond, setSortData, order, setOrder)}/> 
                            </div>
                        </td>
                        <td className="hidden md:table-cell">
                            <div className='flex items-center'>
                                <div>Rating</div>
                                <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'
                                    onClick={() => sorting("rating", tours_cond, setSortData, order, setOrder)}/> 
                            </div>
                        </td>
                        <td className="hidden md:table-cell">
                            <div className='flex items-center'>
                                <div>Tình trạng</div>
                                <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'
                                    onClick={() => sorting("isActive", tours_cond, setSortData, order, setOrder)}/> 
                            </div>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    { loading && 
                        <tr><td></td>
                            <td className="hidden xl:table-cell"></td>
                            <td className="hidden xl:table-cell"></td>
                            <td className="hidden xl:table-cell"></td>
                            <td><Loading loading={loading}/></td>
                            <td></td>
                            <td className="hidden md:table-cell"></td>
                            <td className="hidden md:table-cell"></td>
                            <td className="hidden md:table-cell"></td>
                        </tr>
                    }
                    {!loading && currentTours.map((tour, idx) => {
                        return ( 
                            <tr key={idx} className='h-12 border-b-2 border-neutral-2-200'>
                                <td className='pr-[6px]'>{indexOfFirstPost + idx + 1}</td>
                                <td className='text-caption-1 xl:text-body-2'>{tour.tour_ID}</td>
                                <td><Link to={`/manager/tour-detail/${tour.tour_ID}`} className='md:w-[300px] block text-accent-10 hover:text-accent-9 xl:w-[370px]'>{tour.name}</Link></td>
                                <td className='hidden xl:table-cell xl:pl-6'>{tour.seat_num}</td>
                                <td className='hidden xl:table-cell xl:pl-6'>{tour.cus_num}</td>
                                <td className='hidden md:table-cell'><Link to={`/manager/staff-detail/${tour.staff.staff_ID}`} className='text-accent-10 hover:text-accent-9'>{tour.staff.lastName} {tour.staff.firstName}</Link></td>
                                <td className='hidden xl:table-cell'>{tour.starting_date}</td>
                                <td className='hidden md:table-cell'><div className={`${ratingClassifier(tour.rating) < 3? 'bg-[#1ABB9C]' : 'bg-accent-3'} flex items-center gap-1 w-fit px-2 rounded-full`}>
                                    <div className='text-white'>{tour.rating.toFixed(1)}</div>
                                    <FaStar size={14} className='text-secondary-2'/> 
                                </div></td>
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
            <Pagination limit={20} blackStyle={true} count={sortData.length}/> 
        </div>
    )
}

export default MTourList
