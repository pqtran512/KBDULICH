import React, {memo, useState, useEffect, useRef} from 'react';
import icons from '../ultils/icons'

const { FaRegUser, MdOutlineLocalPhone, MdCalendarToday, MdOutlineStickyNote2, LuFlagTriangleRight, FaRegStar, MdFingerprint } = icons

const SearchBar = ({placeholder, width, newWidth, change, newPlaceholder, id, person, staff, tour, phone, email, bookDate, departureDate, rating, note, sendDate, replyDate}) => {
    const [changeWidth, setChangeWidth] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [searchTerm, setSearchTerm] = useState([])
    const divRef = useRef(null);

    const toggleSearchTerm = (term) => {
        if (!searchTerm.includes(term)) {
            const newTermArray = [...searchTerm, term];
            setSearchTerm(newTermArray)
        }
        else {
            const newArray = searchTerm.filter(item => item !== term)
            setSearchTerm(newArray)
        }
    };
    useEffect(() => {
        if (searchTerm.length > 0)
            setChangeWidth(true);
    }, [searchTerm]);
    
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
                    
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>
            <div className={`${changeWidth? 'opacity-100 z-10' : 'opacity-0 -z-10'} absolute top-11 ${newWidth} p-4 h-60 bg-white border-b-2 border-r-2 border-neutral-2-200 rounded-xl shadow-shad3 overflow-y-scroll scrollbar-width-thin`}>
                <div className='uppercase text-caption-2 font-semibold text-black/40 tracking-tight xl:text-caption-1'>Bạn đang tìm kiếm...</div>
                <div className='pt-4 flex items-center gap-5 flex-wrap'>
                    {id? 
                        <button className={`${searchTerm.includes("Mã")? 'text-white bg-black/60' : 'text-neutral-1-600 bg-neutral-3-100'} flex items-center gap-1 text-neutral-1-600 rounded-lg w-fit px-2 py-1 xl:gap-2`}
                            onClick={() => toggleSearchTerm("Mã")} 
                        >
                            <MdFingerprint className='text-title-2 md:text-title-1'/>
                            <div className='text-caption-1 xl:text-body-2 font-semibold'>Mã</div>
                        </button>
                    : <></>}
                    {person? 
                        <button className={`${searchTerm.includes("Họ Tên")? 'text-white bg-black/60' : 'text-neutral-1-600 bg-neutral-3-100'} flex items-center gap-2 text-neutral-1-600 rounded-lg w-fit px-2 py-1`}
                            onClick={() => toggleSearchTerm("Họ Tên")} 
                        >
                            <FaRegUser className='text-title-2 md:text-title-1'/>
                            <div className='text-caption-1 xl:text-body-2 font-semibold'>Họ Tên</div>
                        </button>
                    : <></>}
                    {tour? 
                        <button className={`${searchTerm.includes("Tên Tour")? 'text-white bg-black/60' : 'text-neutral-1-600 bg-neutral-3-100'} flex items-center gap-2 text-neutral-1-600 rounded-lg w-fit px-2 py-1`}
                            onClick={() => toggleSearchTerm("Tên Tour")} 
                        >
                            <LuFlagTriangleRight className='text-title-2 md:text-title-1'/>
                            <div className='text-caption-1 xl:text-body-2 font-semibold'>Tên Tour</div>
                        </button>
                    : <></>}
                    {phone? 
                        <button className={`${searchTerm.includes("Số điện thoại")? 'text-white bg-black/60' : 'text-neutral-1-600 bg-neutral-3-100'} flex items-center gap-2 text-neutral-1-600 rounded-lg w-fit px-2 py-1`}
                            onClick={() => toggleSearchTerm("Số điện thoại")}
                        >
                            <MdOutlineLocalPhone className='text-title-2 md:text-title-1'/>
                            <div className='text-caption-1 xl:text-body-2 font-semibold'>Số điện thoại</div>
                        </button>
                    : <></>}
                    {email? 
                        <button className={`${searchTerm.includes("Email")? 'text-white bg-black/60' : 'text-neutral-1-600 bg-neutral-3-100'} flex items-center gap-2 text-neutral-1-600 rounded-lg w-fit px-2 py-1`}
                            onClick={() => toggleSearchTerm("Email")}
                        >
                            <i className='twi-22-mail-line text-[20px] leading-[20px]'></i>
                            <div className='text-caption-1 xl:text-body-2 font-semibold'>Email</div>
                        </button>
                    : <></>}
                    {bookDate? 
                        <button className={`${searchTerm.includes("Ngày đặt")? 'text-white bg-black/60' : 'text-neutral-1-600 bg-neutral-3-100'} flex items-center gap-2 text-neutral-1-600 rounded-lg w-fit px-2 py-1`}
                            onClick={() => toggleSearchTerm("Ngày đặt")}
                        >
                            <MdCalendarToday className='text-title-2 md:text-title-1'/>
                            <div className='text-caption-1 xl:text-body-2 font-semibold'>Ngày đặt</div>
                        </button>
                    : <></>}
                    {departureDate? 
                        <button className={`${searchTerm.includes("Ngày khởi hành")? 'text-white bg-black/60' : 'text-neutral-1-600 bg-neutral-3-100'} flex items-center gap-2 text-neutral-1-600 rounded-lg w-fit px-2 py-1`}
                            onClick={() => toggleSearchTerm("Ngày khởi hành")}
                        >
                            <MdCalendarToday className='text-title-2 md:text-title-1'/>
                            <div className='text-caption-1 xl:text-body-2 font-semibold'>Ngày khởi hành</div>
                        </button>
                    : <></>}
                    {rating? 
                        <button className={`${searchTerm.includes("Rating")? 'text-white bg-black/60' : 'text-neutral-1-600 bg-neutral-3-100'} flex items-center gap-2 text-neutral-1-600 rounded-lg w-fit px-2 py-1`}
                            onClick={() => toggleSearchTerm("Rating")}
                        >
                            <FaRegStar className='text-title-2 md:text-title-1'/>
                            <div className='text-caption-1 xl:text-body-2 font-semibold'>Rating</div>
                        </button>
                    : <></>}
                    {staff? 
                        <button className={`${searchTerm.includes("Nhân viên")? 'text-white bg-black/60' : 'text-neutral-1-600 bg-neutral-3-100'} flex items-center gap-2 text-neutral-1-600 rounded-lg w-fit px-2 py-1`}
                            onClick={() => toggleSearchTerm("Nhân viên")} 
                        >
                            <FaRegUser className='text-title-2 md:text-title-1'/>
                            <div className='text-caption-1 xl:text-body-2 font-semibold'>Nhân viên</div>
                        </button>
                    : <></>}
                    {sendDate? 
                        <button className={`${searchTerm.includes("Ngày gửi")? 'text-white bg-black/60' : 'text-neutral-1-600 bg-neutral-3-100'} flex items-center gap-2 text-neutral-1-600 rounded-lg w-fit px-2 py-1`}
                            onClick={() => toggleSearchTerm("Ngày gửi")}
                        >
                            <MdCalendarToday className='text-title-2 md:text-title-1'/>
                            <div className='text-caption-1 xl:text-body-2 font-semibold'>Ngày gửi</div>
                        </button>
                    : <></>}
                    {replyDate? 
                        <button className={`${searchTerm.includes("Ngày phản hồi")? 'text-white bg-black/60' : 'text-neutral-1-600 bg-neutral-3-100'} flex items-center gap-2 text-neutral-1-600 rounded-lg w-fit px-2 py-1`}
                            onClick={() => toggleSearchTerm("Ngày phản hồi")}
                        >
                            <MdCalendarToday className='text-title-2 md:text-title-1'/>
                            <div className='text-caption-1 xl:text-body-2 font-semibold'>Ngày phản hồi</div>
                        </button>
                    : <></>}
                    {note? 
                        <button className={`${searchTerm.includes("Ghi chú")? 'text-white bg-black/60' : 'text-neutral-1-600 bg-neutral-3-100'} flex items-center gap-2 text-neutral-1-600 rounded-lg w-fit px-2 py-1`}
                            onClick={() => toggleSearchTerm("Ghi chú")}
                        >
                            <MdOutlineStickyNote2 size={18}/>
                            <div className='text-caption-1 xl:text-body-2 font-semibold'>Ghi chú</div>
                        </button>
                    : <></>}
                </div>
                <div className='pt-5 flex flex-col gap-1 text-neutral-1-900 text-body-2 md:text-body-1'>
                    <div className='px-3 py-1 cursor-pointer w-full rounded-md hover:bg-neutral-3-100'>Item 1</div>
                    <div className='px-3 py-1 cursor-pointer w-full rounded-md hover:bg-neutral-3-100'>Item 2</div>
                    <div className='px-3 py-1 cursor-pointer w-full rounded-md hover:bg-neutral-3-100'>Item 3</div>
                    <div className='px-3 py-1 cursor-pointer w-full rounded-md hover:bg-neutral-3-100'>Item 4</div>
                    <div className='px-3 py-1 cursor-pointer w-full rounded-md hover:bg-neutral-3-100'>Item 5</div>
                </div>
            </div>
            
        </div>
    )
}

export default memo(SearchBar)
