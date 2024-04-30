import React, { useState, useEffect, useRef } from 'react';
import { Button, Card2, Datepicker, SelectInput, Pagination, RangeSlider, Loading } from '../../components';
import icons from '../../ultils/icons';
import { useDispatch, useSelector } from 'react-redux'
import { getToursCondition, getAllPlaces } from '../../store/actions/tourPlaceAction'
import { useSearchParams, createSearchParams, useNavigate, useLocation } from "react-router-dom";
import { formatVietnameseToString } from '../../ultils/formatVietnameseToString';
import { provinceObjects } from '../../ultils/objectsToArr';

const { MdSort } = icons

const Search = () => {
    // PARAMETERS
    const location = useLocation();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [openFilter, setOpenFilter] = useState(false);
    const currentPage = searchParams.get('page') || 1
    const { tours_cond, count_cond } = useSelector(state => state.tour)
    const { places } = useSelector(state => state.place)
    const [prices, setPrices] = useState([1000000, 20000000]);
    const [searchOption, setSearchOption] = useState({ 
        departure: '',
        destination: '',
        day_num: '',
        starting_date: '',
        ticket_num: '',
        seat_num: '',
        price: 'F'+prices[0]+'T'+prices[1],
        vehicle: '',
        isActive: 1,
    })
    const [order, setOrder] = useState(searchParams.get('order') || 'asc');
    const [filter, setFilter] = useState(searchParams.get('sort') || 'rating');
    const filterOpts = [
        { value: 'rating', label: 'Yêu thích nhất' }, 
        { value: 'price', label: 'Giá' },
        { value: 'starting_date', label: 'Ngày khởi hành' }, // ngày gần nhất
    ];
    const [sortTour, setSortTour] = useState([]);
    const [toursPerPage] = useState(8);
    const searchRef = useRef()
    const [loading, setLoading] = useState(false);
    const [newPlaces, setNewPlaces] = useState([]);
    // FUNCTION
    useEffect(() => {
        if (places) {
            const place_arr = provinceObjects(places, true)
            setNewPlaces(place_arr)
        }
    }, [places])
    const getDefaultDeparture = () => { 
        const entries = searchParams.entries()
        for (let entry of entries) {
            if (entry[0] === 'departure') {
                const defaultValue= newPlaces.find(place => formatVietnameseToString(place.value) === searchParams.get('departure'));
                return defaultValue
            }
        }
        return null
    }
    const getDefaultDestination = () => { 
        const entries = searchParams.entries()
        for (let entry of entries) {
            if (entry[0] === 'destination') {
                const defaultValue= newPlaces.find(place => formatVietnameseToString(place.value) === searchParams.get('destination'));
                return defaultValue
            }
        }
        return null
    }
    const getDefaultSDate= () => { 
        const entries = searchParams.entries()
        for (let entry of entries) {
            if (entry[0] === 'starting_date') {
                const [year, month, day] = searchParams.get('starting_date').split('_');
                const myDate = new Date(Date.UTC(year, month - 1, day));
                return myDate
            }
        }
        return null
    }
    useEffect(() => {
        searchRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, [currentPage])
    const isDayBtnActive = (btnName) => { // Buttons số ngày
        return searchOption.day_num === btnName;
    };
    const isPeopleBtnActive = (btnName) => { // Buttons số lượng người
        return searchOption.ticket_num === btnName;
    };
    const isTourTypeBtnActive = (btnName) => { // Buttons dòng tour
        return searchOption.seat_num === btnName;
    };
    const isVehicleBtnActive = (btnName) => { // Buttons phương tiện
        return searchOption.vehicle === btnName;
    };
    useEffect(() => {
        setSearchOption(prev => ({...prev, price:'F'+prices[0]+'T'+prices[1]}))
    }, [prices])
    const handleSubmit = async () => {
        let params = {}
        if (searchOption.departure !== '') {
            params.departure = formatVietnameseToString(searchOption.departure);
        }
        if (searchOption.destination !== '') {
            params.destination = formatVietnameseToString(searchOption.destination);
        }
        if (searchOption.day_num !== '') {
            params.day_num = searchOption.day_num;
        }
        if (searchOption.starting_date !== '') {
            params.starting_date = searchOption.starting_date;
        }
        if (searchOption.ticket_num !== '') {
            params.ticket_num = searchOption.ticket_num;
        }
        params.price_lower = prices[0];
        params.price_upper = prices[1];
        if (searchOption.vehicle !== '') {
            params.vehicle = searchOption.vehicle;
        }
        navigate({
            pathname: location?.pathname,
            search: createSearchParams(params).toString(),
        });
        console.log(prices)
        console.log('submit', searchOption)
        setLoading(true);
        dispatch(getToursCondition(searchOption))
            .then(() => {
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false); // Ensure loading is set to false even if an error occurs
            });
        searchRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    const getFilterLabel = () => {
        const selectedOption = filterOpts.find(option => option.value === filter);
        return selectedOption ? selectedOption.label : 'Yêu thích nhất';
    };
    useEffect(() => {
        searchOption.page = searchParams.get('page')
    }, [searchParams, searchOption])
    useEffect(() => {
        dispatch(getAllPlaces())
    }, [dispatch])
    useEffect(() => {
        if (newPlaces.length > 0) {
            setLoading(true);
            const departure = getDefaultDeparture()
            const destination = getDefaultDestination()
            const search_date = searchParams.get('starting_date')
            const price_lower = searchParams.get('price_lower')
            const price_upper = searchParams.get('price_upper')
            const daynum = searchParams.get('day_num')
            const ticketnum = searchParams.get('ticket_num')
            const seatnum = searchParams.get('seat_num')
            const vehicle = searchParams.get('vehicle')
            const updatedOptions = {};
            if (departure) { updatedOptions.departure = departure.value;}
            if (destination) { updatedOptions.destination = destination.value;}
            if (search_date) { updatedOptions.starting_date = search_date;}
            if (price_lower) { updatedOptions.price = 'F'+price_lower+'T'+price_upper;}
            if (search_date) { updatedOptions.starting_date = search_date;}
            if (daynum) { updatedOptions.day_num = daynum;}
            if (ticketnum) { updatedOptions.ticket_num = ticketnum;}
            if (seatnum) { updatedOptions.seat_num = seatnum;}
            if (vehicle) { updatedOptions.vehicle = vehicle;}
            setSearchOption(prev => ({ ...prev, ...updatedOptions }));
            dispatch(getToursCondition({
                departure: (departure && departure.value) || '',
                destination: (destination && destination.value) || '',
                starting_date: search_date || '',
                price: (price_lower && ('F'+price_lower+'T'+price_upper)) || 'F1000000T20000000',
                day_num: daynum || '',
                ticket_num: ticketnum || '',
                seat_num: seatnum || '',
                vehicle: vehicle || '',
                isActive: 1,
            })).then(() => {
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false); // Ensure loading is set to false even if an error occurs
            });
        }
    }, [dispatch, newPlaces]);
    // sort
    const sorting = (col) => {
        if (col === null) {
            const sorted = [...tours_cond]
            setSortTour(sorted)
        }
        else if (col !== 'rating') {
            if (order === "asc") {
                const sorted = [...tours_cond].sort((a, b) => 
                    a[col] > b[col] ? 1 : -1
                );
                setSortTour(sorted)
                setOrder('dsc')
            }
            if (order === "dsc") {
                const sorted = [...tours_cond].sort((a, b) => 
                    a[col] < b[col] ? 1 : -1
                );
                setSortTour(sorted)
                setOrder('asc')
            }
        }
    }
    useEffect(() => {
        sorting(searchParams.get('sort'));
    }, [tours_cond, filter]);
    // pagination
    const indexOfLastPost = currentPage * toursPerPage;
    const indexOfFirstPost = indexOfLastPost - toursPerPage; 
    const currentTours = sortTour.slice(indexOfFirstPost, indexOfLastPost);
    return (
        <main className='overflow-x-hidden'>
            <section className="flex justify-center relative w-full bg-sea animate-fade bg-center bg-no-repeat bg-cover rounded-b-[20px]">
                <div className="w-full py-28 px-6 md:py-32 md:max-w-3xl lg:px-2 xl:max-w-7xl xl:py-48 2xl:px-0">
                    <div className="mx-auto flex items-center justify-center pb-[86px] max-w-[242px] md:pb-[37px] md:max-w-[404px] xl:pb-[100px] xl:max-w-[584px]">
                        <div className="font-vampiroOne text-[24px] leading-10 tracking-[0.72px] uppercase text-center md:text-[32px] md:leading-[60px] md:tracking-[0.96px] xl:text-[50px] xl:leading-[99px] xl:tracking-[1.5px]">
                            discover the <br/> journey</div>
                    </div>
                </div>
            </section>
            <section ref={searchRef} className="mx-auto w-full pt-10 pb-[120px] animate-fade md:pb-[120px] xl:pb-[80px] xl:max-w-7xl">
                <div className="px-6 lg:px-2 2xl:px-0">
                    <div className="hidden xl:flex items-center py-[10px] mb-7 gap-x-2">
                        <div className="text-neutral-1-600 text-[20px] leading-[34px]">Du lịch</div>
                        <div className="flex items-center justify-center w-6 h-6">
                            <i className="twi-22-chevron-line text-[16px] text-secondary-1 text-center"></i>
                        </div>
                        <div className="text-neutral-1-900 text-[20px] leading-[34px]">Du lịch trong nước</div>
                    </div>
                    <div className="flex flex-col w-full xl:flex-row">
                        <div className="w-full flex justify-end md:py-5 xl:hidden" onClick={() => setOpenFilter(curr => !curr)}>
                            <div className="flex items-center justify-center text-primary-2 border-[1.2px] border-primary-2 bg-white py-2 px-6 w-fit rounded-md">
                                <i className="twi-22-filter-line text-[24px] leading-6"></i>
                                <div className="pl-2 text-body-1">Lọc kết quả</div>
                            </div>
                        </div>
                        <div className={`${openFilter? 'max-h-[1100px] overflow-clip xl:overflow-visible my-8': 'max-h-0 overflow-hidden'}  grid gap-2 h-fit transition-all duration-500 xl:w-1/3 xl:gap-4 xl:pr-6 xl:my-0 xl:max-h-max xl:overflow-visible`}>
                            <div className="text-heading-4 text-neutral-1-900 font-semibold xl:text-heading-3">Lọc kết quả</div>
                            <div className='md:flex gap-40 xl:flex-col xl:gap-4'>
                                <div>
                                    <div className="pt-[10px] pr-[10px] pb-2 xl:pb-[14px]">
                                        <div className="text-title-1 font-semibold text-neutral-1-900">Điểm đi</div>
                                    </div>
                                    { newPlaces.length > 0 &&
                                        <SelectInput options={newPlaces} myStyle='w-[200px] text-body-2 xl:w-full xl:text-body-1' placeholder='--- Chọn điểm đi ---' keyPayload='departure' setValue={setSearchOption} defaultValue={() => getDefaultDeparture()} />
                                    }
                                </div>
                                <div>
                                    <div className="pt-[10px] pr-[10px] pb-2 xl:pb-[14px]">
                                        <div className="text-title-1 font-semibold text-neutral-1-900">Điểm đến</div>
                                    </div>
                                    { newPlaces.length > 0 &&
                                    <   SelectInput options={newPlaces} myStyle='w-[200px] text-body-2 xl:w-full xl:text-body-1' placeholder='--- Chọn điểm đến ---' keyPayload='destination' setValue={setSearchOption} defaultValue={() => getDefaultDestination()} />
                                    }
                                </div>
                            </div>
                            <div>
                                <div className="pt-[10px] pr-[10px] pb-2 xl:pb-[14px]">
                                    <div className="text-title-1 font-semibold text-neutral-1-900">Số ngày</div>
                                </div>
                                <div className="flex pl-1 xl:pl-0 xl:justify-center">
                                    <div className="grid gap-y-4 gap-x-6 grid-cols-btn text-neutral-1-900 text-body-2 xl:text-body-1">
                                        <button 
                                            className={`${isDayBtnActive('F1T3') ? 'activeBtn' : 'hover:bg-neutral-3-50'} py-2 rounded-[6px] shadow-btn`}
                                            onClick={() => setSearchOption(prev => ({...prev, 'day_num': 'F1T3'}))}>1-3 ngày</button>
                                        <button 
                                            className={`${isDayBtnActive('F4T7') ? 'activeBtn' : 'hover:bg-neutral-3-50'} py-2 rounded-[6px] shadow-btn`}
                                            onClick={() => setSearchOption(prev => ({...prev, 'day_num': 'F4T7'}))}>4-7 ngày</button>
                                        <button 
                                            className={`${isDayBtnActive('F8T10') ? 'activeBtn' : 'hover:bg-neutral-3-50'} py-2 rounded-[6px] shadow-btn`}
                                            onClick={() => setSearchOption(prev => ({...prev, 'day_num': 'F8T10'}))}>8-10 ngày</button>
                                        <button 
                                            className={`${isDayBtnActive('A10') ? 'activeBtn' : 'hover:bg-neutral-3-50'} py-2 rounded-[6px] shadow-btn`}
                                            onClick={() => setSearchOption(prev => ({...prev, 'day_num': 'A10'}))}>Trên 10 ngày</button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="pt-[10px] pr-[10px] pb-2 xl:pb-[14px]">
                                    <div className="text-title-1 font-semibold text-neutral-1-900">Ngày đi</div>
                                </div>
                                <div className='ml-1 w-[200px] xl:ml-0 xl:w-full'>
                                    <Datepicker width='w-[176px] xl:w-[397px]' height='h-9' top='top-[10px]' outline keyPayload='starting_date' setValue={setSearchOption} 
                                        defaultValue={getDefaultSDate()}/>
                                </div>
                            </div>
                            <div className='md:flex gap-10 xl:flex-col xl:gap-4'>
                                <div>
                                    <div className="pt-[10px] pr-[10px] pb-2 xl:pb-[14px]">
                                        <div className="text-title-1 font-semibold text-neutral-1-900">Số lượng người</div>
                                    </div>
                                    <div className="flex pl-1 xl:pl-0 xl:justify-center">
                                        <div className="grid gap-y-4 gap-x-6 grid-cols-btn text-neutral-1-900 text-body-2 xl:text-body-1">
                                            <button 
                                                className={`${isPeopleBtnActive('A1') ? 'activeBtn' : 'hover:bg-neutral-3-50'} py-2 rounded-[6px] shadow-btn`}
                                                onClick={() => setSearchOption(prev => ({...prev, 'ticket_num': 'A1'}))}>1 người</button>
                                            <button 
                                                className={`${isPeopleBtnActive('A2') ? 'activeBtn' : 'hover:bg-neutral-3-50'} py-2 rounded-[6px] shadow-btn`}
                                                onClick={() => setSearchOption(prev => ({...prev, 'ticket_num': 'A2'}))}>2 người</button>
                                            <button 
                                                className={`${isPeopleBtnActive('A3') ? 'activeBtn' : 'hover:bg-neutral-3-50'} py-2 rounded-[6px] shadow-btn`}
                                                onClick={() => setSearchOption(prev => ({...prev, 'ticket_num': 'A3'}))}>3-5 người</button>
                                            <button 
                                                className={`${isPeopleBtnActive('A5') ? 'activeBtn' : 'hover:bg-neutral-3-50'} py-2 rounded-[6px] shadow-btn`}
                                                onClick={() => setSearchOption(prev => ({...prev, 'ticket_num': 'A5'}))}>5+ người</button>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="pt-[10px] pr-[10px] pb-2 xl:pb-[14px]">
                                        <div className="text-title-1 font-semibold text-neutral-1-900">Dòng Tour</div>
                                    </div>
                                    <div className="flex pl-1 xl:pl-0 xl:justify-center">
                                        <div className="grid gap-y-4 gap-x-6 grid-cols-btn text-neutral-1-900 text-body-2 xl:text-body-1">
                                            <button 
                                                className={`${isTourTypeBtnActive('U5') ? 'activeBtn' : 'hover:bg-neutral-3-50'} py-2 rounded-[6px] shadow-btn`}
                                                onClick={() => setSearchOption(prev => ({...prev, 'seat_num': 'U5'}))}> &lt; 5 người</button>
                                            <button 
                                                className={`${isTourTypeBtnActive('F5T10') ? 'activeBtn' : 'hover:bg-neutral-3-50'} py-2 rounded-[6px] shadow-btn`}
                                                onClick={() => setSearchOption(prev => ({...prev, 'seat_num': 'F5T10'}))}>5 - 10 người</button>
                                            <button 
                                                className={`${isTourTypeBtnActive('F10T15') ? 'activeBtn' : 'hover:bg-neutral-3-50'} py-2 rounded-[6px] shadow-btn`}
                                                onClick={() => setSearchOption(prev => ({...prev, 'seat_num': 'F10T15'}))}>10 - 15 người</button>
                                            <button 
                                                className={`${isTourTypeBtnActive('A15') ? 'activeBtn' : 'hover:bg-neutral-3-50'} py-2 rounded-[6px] shadow-btn`}
                                                onClick={() => setSearchOption(prev => ({...prev, 'seat_num': 'A15'}))}> &gt; 15 người</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                             {/* Search Filter  */}
                            <div className="flex items-center justify-between h-[72px]">
                                <div className="w-[47%] pr-2 text-header-1 text-neutral-1-500 font-semibold xl:text-heading-4">Bộ lọc tìm kiếm</div>
                                <div className="w-[53%] bg-neutral-1-500 h-[1.5px]"></div>
                            </div>
                            <div className="py-4">
                                <RangeSlider values={prices} setValues={setPrices}/>
                            </div>
                            <div>
                                <div className="pt-[10px] pr-[10px] pb-2 xl:pb-[14px]">
                                    <div className="text-title-1 font-semibold text-neutral-1-900">Thông tin vận chuyển</div>
                                </div>
                                <div className="flex pl-1 xl:pl-0 xl:justify-center">
                                    <div className="grid gap-y-4 gap-x-6 grid-cols-btn text-neutral-1-900 text-body-2 xl:text-body-1">
                                        <button 
                                            className={`${isVehicleBtnActive('car') ? 'activeBtn' : 'hover:bg-neutral-3-50'} py-2 rounded-[6px] shadow-btn`}
                                            onClick={() => setSearchOption(prev => ({...prev, 'vehicle': 'car'}))}>Ô tô</button>
                                        <button 
                                            className={`${isVehicleBtnActive('bus') ? 'activeBtn' : 'hover:bg-neutral-3-50'} py-2 rounded-[6px] shadow-btn`}
                                            onClick={() => setSearchOption(prev => ({...prev, 'vehicle': 'bus'}))}>Xe khách</button>
                                        <button 
                                            className={`${isVehicleBtnActive('plane') ? 'activeBtn' : 'hover:bg-neutral-3-50'} py-2 rounded-[6px] shadow-btn`}
                                            onClick={() => setSearchOption(prev => ({...prev, 'vehicle': 'plane'}))}>Máy bay</button>
                                    </div>
                                </div>
                            </div>
                            <Button text='Tìm kiếm' textColor='text-white' bgColor='bg-primary-2' mt onClick={handleSubmit}/>
                        </div>
                        <div className="w-full xl:w-2/3">
                            <div className="pb-8 pt-4">
                                <div className="text-heading-4 text-neutral-1-900 leading-[39px] font-semibold pb-2 border-b-2 border-neutral-1-200 xl:pb-4 xl:text-[28px]">Du lịch trong nước</div>
                                <div className="pb-2 w-full h-[13px] xl:h-9 xl:pb-4"></div>
                                <p className="text-body-2 text-neutral-1-600 max-w-[359px] md:max-w-full xl:text-body-1">Du lịch trong nước luôn là lựa chọn tuyệt vời. Đường bờ biển dài hơn 3260km, những khu bảo tồn thiên nhiên tuyệt vời, 
                                    những thành phố nhộn nhịp, những di tích lịch sử hào hùng, nền văn hóa độc đáo và hấp dẫn, cùng một danh sách dài những món ăn ngon nhất thế giới, 
                                    Việt Nam có tất cả những điều đó. Với lịch trình dày, khởi hành đúng thời gian cam kết, KB Du Lịch là công ty lữ hành uy tín nhất hiện nay tại Việt Nam, 
                                    luôn sẵn sàng phục vụ du khách mọi lúc, mọi nơi, đảm bảo tính chuyên nghiệp và chất lượng dịch vụ tốt nhất thị trường
                                </p>
                            </div>
                             {/* Sắp xếp theo  */}
                            <div className="bg-neutral-3-100 py-[10px] px-4 md:px-6 xl:pr-[11px] xl:bg-neutral-3-50">
                                <div className="md:flex items-center justify-between">
                                    <div className="md:flex items-center">
                                        <div className="pb-2 text-title-1 text-neutral-1-500 font-semibold w-fit h-fit md:pb-0 md:pr-[18px] xl:pr-[34px] xl:text-header-2">Sắp xếp theo:</div>
                                        <div className="w-full flex justify-between items-center md:w-fit">
                                            <SelectInput myStyle='h-fit w-48 xl:w-[200px]' options={filterOpts} placeholder={getFilterLabel()} setVar={setFilter} path={location?.pathname}/>
                                            <MdSort className={`${order === 'asc'? '' : 'rotate-180'} md:hidden text-primary-2 p-0.5 rounded-md cursor-pointer`} size='26'
                                                onClick={() => sorting(filter)} />
                                        </div>
                                    </div>
                                    <MdSort className={`${order === 'asc'? '' : 'rotate-180'} hidden md:block text-primary-2 p-0.5 rounded-md cursor-pointer hover:text-primary-1`} size='28'
                                            onClick={() => sorting(filter)} />
                                </div>
                            </div>
                            <Loading loading={loading} />
                            { count_cond? <div className='pt-4 text-header-2 text-neutral-1-500'>Tìm kiếm được {count_cond} kết quả</div> : <></> }
                            {/* Card  */}
                            <div className="pt-6 grid gap-y-6 md:grid-cols-2 md:gap-x-6 md:gap-y-8 xl:py-8">
                                {/* desktop, tablet 8 cards, mobile 3 cards */}
                                {count_cond > 0 ? 
                                    (currentTours.map((tour, idx) => (
                                        <>
                                        <Card2
                                            animation={idx % 2 === 0 ? 'md:animate-fade-right' : 'md:animate-fade-left'}
                                            tour={tour}
                                            key={idx}
                                        />
                                        </>
                                    ))) 
                                    :  <div className='text-right text-header-2 font-semibold text-neutral-1-500'>Không tìm thấy kết quả phù hợp .</div>
                                }
                            </div>
                            {/* Pagination  */}
                            <div className='pt-8'>
                                <Pagination limit={8} count={count_cond}/> 
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Search
