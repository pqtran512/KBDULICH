import React, {memo, useState, useEffect, useRef} from 'react';
import icons from '../ultils/icons'
import { createSearchParams, useNavigate, Link } from "react-router-dom";
import { formatVietnameseToString } from '../ultils/formatVietnameseToString';

const { FaRegUser, MdOutlineLocalPhone, MdCalendarToday, MdOutlineStickyNote2, LuFlagTriangleRight, FaRegStar, MdFingerprint } = icons

const SearchBar = ({placeholder, width, newWidth, change, newPlaceholder, optionBar, id, person, staff, tour, phone, email, bookDate, departureDate, rating, note, sendDate, replyDate, path, place, tours, role, setOutput}) => {
    const [changeWidth, setChangeWidth] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [searchTerm, setSearchTerm] = useState('Tên Tour')
    const [searchResults, setSearchResults] = useState([]);
    const divRef = useRef(null);
    const navigate = useNavigate()

    const handleEnterKeyPress = (value) => {
        // Do something with the input value
        if (place) setSearchTerm('Địa điểm')
        const formattedSearchTerms = formatVietnameseToString(searchTerm);
        if (searchText != '') {
            setOutput(searchResults)
            navigate({
                pathname: path,
                search: createSearchParams({
                    [formattedSearchTerms]: value
                }).toString(),
            });
        }
        else { 
            setOutput(tours)
            navigate(path) 
        }
    };
    const getSearchResults = (value) => {
        let field = '';
        if (tours) {
            if (searchTerm === 'Nhân viên') {
                const results = tours.filter((tour) => {
                    return (
                        value &&
                        tour &&
                        tour[field] &&
                        tour.staff.name.toLowerCase().includes(value.toLowerCase())
                    );
                });
                setSearchResults(results);
            }
            else {
                if (searchTerm === 'Mã') field = "tour_ID"
                else if (searchTerm === 'Tên Tour') field = "name"
                else if (searchTerm === 'Ngày khởi hành') field = "starting_date"
                else field = "rating"
                const results = tours.filter((tour) => {
                    return (
                        value &&
                        tour &&
                        tour[field] &&
                        String(tour[field]).toLowerCase().includes(value.toLowerCase())
                    );
                });
                setSearchResults(results);
            }
        }
    };
    return (
        <div ref={divRef} action="" className={`${(changeWidth || searchText !== '')? newWidth : width} transition-all duration-500 relative`}
            onFocus={change? () => setChangeWidth(true) : null}    
            onBlur={() => setChangeWidth(false)}
        >
            <div className='flex relative'>
                <button type="button" className="absolute top-2 left-[10px] flex">
                    <i className="twi-22-search-line text-[16px] leading-4 text-neutral-1-500 xl:text-[20px] xl:leading-5"></i></button>
                
                <input type="search"  placeholder={changeWidth? newPlaceholder : placeholder} 
                    className="w-full h-[30px] pl-8 pr-1 border border-neutral-1-500 rounded-[999px] placeholder:text-body-2 xl:placeholder:text-body-1 xl:h-[34px] xl:pl-10"
                    onChange={(e) => {
                        setSearchText(e.target.value)
                        getSearchResults(e.target.value)
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleEnterKeyPress(e.target.value);
                        }
                    }}/>
            </div>
            <div className={`${changeWidth? 'opacity-100 z-10' : 'opacity-0 -z-10'} p-4 absolute top-11 ${newWidth} ${searchResults && searchResults.length > 0? 'max-h-60' : ''} bg-white border-b-2 border-r-2 border-neutral-2-200 rounded-xl shadow-shad3 overflow-y-scroll scrollbar-width-thin`}>
                <div className='uppercase text-caption-2 font-semibold text-black/40 tracking-tight xl:text-caption-1'>Bạn đang tìm kiếm...</div>
                { optionBar?
                    <div className='pt-4 flex items-center gap-5 flex-wrap'>
                    {id? 
                        <button className={`${searchTerm === "Mã"? 'text-white bg-black/60' : 'text-neutral-1-600 bg-neutral-3-100'} flex items-center gap-1 text-neutral-1-600 rounded-lg w-fit px-2 py-1 xl:gap-2`}
                            onClick={() => setSearchTerm("Mã")} 
                        >
                            <MdFingerprint className='text-title-2 md:text-title-1'/>
                            <div className='text-caption-1 xl:text-body-2 font-semibold'>Mã</div>
                        </button>
                    : <></>}
                    {person? 
                        <button className={`${searchTerm === "Họ Tên"? 'text-white bg-black/60' : 'text-neutral-1-600 bg-neutral-3-100'} flex items-center gap-2 text-neutral-1-600 rounded-lg w-fit px-2 py-1`}
                            onClick={() => setSearchTerm("Họ Tên")} 
                        >
                            <FaRegUser className='text-title-2 md:text-title-1'/>
                            <div className='text-caption-1 xl:text-body-2 font-semibold'>Họ Tên</div>
                        </button>
                    : <></>}
                    {tour? 
                        <button className={`${searchTerm === "Tên Tour"? 'text-white bg-black/60' : 'text-neutral-1-600 bg-neutral-3-100'} flex items-center gap-2 text-neutral-1-600 rounded-lg w-fit px-2 py-1`}
                            onClick={() => setSearchTerm("Tên Tour")} 
                        >
                            <LuFlagTriangleRight className='text-title-2 md:text-title-1'/>
                            <div className='text-caption-1 xl:text-body-2 font-semibold'>Tên Tour</div>
                        </button>
                    : <></>}
                    {phone? 
                        <button className={`${searchTerm === "Số điện thoại"? 'text-white bg-black/60' : 'text-neutral-1-600 bg-neutral-3-100'} flex items-center gap-2 text-neutral-1-600 rounded-lg w-fit px-2 py-1`}
                            onClick={() => setSearchTerm("Số điện thoại")}
                        >
                            <MdOutlineLocalPhone className='text-title-2 md:text-title-1'/>
                            <div className='text-caption-1 xl:text-body-2 font-semibold'>Số điện thoại</div>
                        </button>
                    : <></>}
                    {email? 
                        <button className={`${searchTerm === "Email"? 'text-white bg-black/60' : 'text-neutral-1-600 bg-neutral-3-100'} flex items-center gap-2 text-neutral-1-600 rounded-lg w-fit px-2 py-1`}
                            onClick={() => setSearchTerm("Email")}
                        >
                            <i className='twi-22-mail-line text-[20px] leading-[20px]'></i>
                            <div className='text-caption-1 xl:text-body-2 font-semibold'>Email</div>
                        </button>
                    : <></>}
                    {bookDate? 
                        <button className={`${searchTerm === "Ngày đặt"? 'text-white bg-black/60' : 'text-neutral-1-600 bg-neutral-3-100'} flex items-center gap-2 text-neutral-1-600 rounded-lg w-fit px-2 py-1`}
                            onClick={() => setSearchTerm("Ngày đặt")}
                        >
                            <MdCalendarToday className='text-title-2 md:text-title-1'/>
                            <div className='text-caption-1 xl:text-body-2 font-semibold'>Ngày đặt</div>
                        </button>
                    : <></>}
                    {departureDate? 
                        <button className={`${searchTerm === "Ngày khởi hành"? 'text-white bg-black/60' : 'text-neutral-1-600 bg-neutral-3-100'} flex items-center gap-2 text-neutral-1-600 rounded-lg w-fit px-2 py-1`}
                            onClick={() => setSearchTerm("Ngày khởi hành")}
                        >
                            <MdCalendarToday className='text-title-2 md:text-title-1'/>
                            <div className='text-caption-1 xl:text-body-2 font-semibold'>Ngày khởi hành</div>
                        </button>
                    : <></>}
                    {rating? 
                        <button className={`${searchTerm === "Rating"? 'text-white bg-black/60' : 'text-neutral-1-600 bg-neutral-3-100'} flex items-center gap-2 text-neutral-1-600 rounded-lg w-fit px-2 py-1`}
                            onClick={() => setSearchTerm("Rating")}
                        >
                            <FaRegStar className='text-title-2 md:text-title-1'/>
                            <div className='text-caption-1 xl:text-body-2 font-semibold'>Rating</div>
                        </button>
                    : <></>}
                    {staff? 
                        <button className={`${searchTerm === "Nhân viên"? 'text-white bg-black/60' : 'text-neutral-1-600 bg-neutral-3-100'} flex items-center gap-2 text-neutral-1-600 rounded-lg w-fit px-2 py-1`}
                            onClick={() => setSearchTerm("Nhân viên")} 
                        >
                            <FaRegUser className='text-title-2 md:text-title-1'/>
                            <div className='text-caption-1 xl:text-body-2 font-semibold'>Nhân viên</div>
                        </button>
                    : <></>}
                    {sendDate? 
                        <button className={`${searchTerm === "Ngày gửi"? 'text-white bg-black/60' : 'text-neutral-1-600 bg-neutral-3-100'} flex items-center gap-2 text-neutral-1-600 rounded-lg w-fit px-2 py-1`}
                            onClick={() => setSearchTerm("Ngày gửi")}
                        >
                            <MdCalendarToday className='text-title-2 md:text-title-1'/>
                            <div className='text-caption-1 xl:text-body-2 font-semibold'>Ngày gửi</div>
                        </button>
                    : <></>}
                    {replyDate? 
                        <button className={`${searchTerm === "Ngày phản hồi"? 'text-white bg-black/60' : 'text-neutral-1-600 bg-neutral-3-100'} flex items-center gap-2 text-neutral-1-600 rounded-lg w-fit px-2 py-1`}
                            onClick={() => setSearchTerm("Ngày phản hồi")}
                        >
                            <MdCalendarToday className='text-title-2 md:text-title-1'/>
                            <div className='text-caption-1 xl:text-body-2 font-semibold'>Ngày phản hồi</div>
                        </button>
                    : <></>}
                    {note? 
                        <button className={`${searchTerm === "Ghi chú"? 'text-white bg-black/60' : 'text-neutral-1-600 bg-neutral-3-100'} flex items-center gap-2 text-neutral-1-600 rounded-lg w-fit px-2 py-1`}
                            onClick={() => setSearchTerm("Ghi chú")}
                        >
                            <MdOutlineStickyNote2 size={18}/>
                            <div className='text-caption-1 xl:text-body-2 font-semibold'>Ghi chú</div>
                        </button>
                    : <></>}
                    </div>
                : <></>
                }
                {searchResults && searchResults.length > 0 && (
                    <div className={`${optionBar ? 'pt-5' : 'pt-2'} flex flex-col gap-1 text-neutral-1-900 text-caption-1 md:text-body-2`}>
                        {searchResults.map((result, id) => {
                            return (
                                <div className='flex justify-between px-3 py-1 cursor-pointer w-full rounded-md hover:bg-neutral-3-100'>
                                    <div className='w-1/4 italic'>{result.tour_ID}</div>
                                    <Link to={`/${role}/tour-detail/T-001_2024-02-20`} key={id} className='w-[70%]'>{result.name}</Link>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            
        </div>
    )
}

export default memo(SearchBar)
