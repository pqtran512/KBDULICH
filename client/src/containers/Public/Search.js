import React, { useState } from 'react';
import { Button, Card2, Datepicker, SelectInput, SearchBar, Pagination } from '../../components';
import { Link } from 'react-router-dom';
import icons from '../../ultils/icons';

const { FiGrid } = icons
const places = [
    { value: 'An Giang', label: 'An Giang' },
    { value: 'Đồng Tháp', label: 'Đồng Tháp' },
    { value: 'Phan Thiết', label: 'Phan Thiết' },
    { value: 'Quảng Bình', label: 'Quảng Bình' }
  ]

const Search = () => {
    // PARAMETERS
    const [rangeValue, setRangeValue] = useState(0)
    const [activeDayBtn, setActiveDayBtn] = useState(null);
    const [activePeopleBtn, setActivePeopleBtn] = useState(null);
    const [activeTourTypeBtn, setActiveTourTypeBtn] = useState(null);
    const [activeVehicleBtn, setActiveVehicleBtn] = useState(null);
    const orderOpts = [
        { value: 'Tour ưu đãi', label: 'Tour ưu đãi' },
        { value: 'Giá rẻ nhất', label: 'Giá rẻ nhất' },
        { value: 'Ngày gần nhất', label: 'Ngày gần nhất' },
      ];
    // FUNCTION
    // Buttons số ngày
    const handleDayBtn= (btnName) => {
        setActiveDayBtn(btnName);
    };
    const isDayBtnActive = (btnName) => {
        return activeDayBtn === btnName;
    };
    // Buttons số lượng người
    const handlePeopleBtn = (btnName) => {
        setActivePeopleBtn(btnName);
    };
    const isPeopleBtnActive = (btnName) => {
        return activePeopleBtn === btnName;
    };
    // Buttons dòng tour
    const handleTourTypeBtn = (btnName) => {
        setActiveTourTypeBtn(btnName);
    };
    const isTourTypeBtnActive = (btnName) => {
        return activeTourTypeBtn === btnName;
    };
    // Buttons phương tiện
    const handleVehicleBtn = (btnName) => {
        setActiveVehicleBtn(btnName);
    };
    const isVehicleBtnActive = (btnName) => {
        return activeVehicleBtn === btnName;
    };
    return (
        <div>
            <section className="flex justify-center relative w-full bg-sea animate-fade bg-center bg-no-repeat bg-cover rounded-b-[20px]">
                <div className="w-full py-28 px-6 md:py-32 md:max-w-3xl lg:px-2 xl:max-w-7xl xl:py-48 2xl:px-0">
                    <div className="mx-auto flex items-center justify-center pb-[86px] max-w-[242px] md:pb-[37px] md:max-w-[404px] xl:pb-[100px] xl:max-w-[584px]">
                        <div className="font-vampiroOne text-[24px] leading-10 tracking-[0.72px] uppercase text-center md:text-[32px] md:leading-[60px] md:tracking-[0.96px] xl:text-[50px] xl:leading-[99px] xl:tracking-[1.5px]">
                            discover the <br/> journey</div>
                    </div>
                </div>
            </section>
            <section className="mx-auto w-full pt-10 pb-[120px] animate-fade md:pb-[120px] xl:pb-[80px] xl:max-w-7xl">
                <div className="px-6 lg:px-2 2xl:px-0">
                    <div className="hidden xl:flex items-center py-[10px] mb-7 gap-x-2">
                        <div className="text-neutral-1-600 text-[20px] leading-[34px]">Du lịch</div>
                        <div className="flex items-center justify-center w-6 h-6">
                            <i className="twi-22-chevron-line text-[16px] text-secondary-1 text-center"></i>
                        </div>
                        <div className="text-neutral-1-900 text-[20px] leading-[34px]">Du lịch trong nước</div>
                    </div>
                    <div className="flex w-full">
                        <div className="hidden xl:grid w-1/3 pr-6 gap-4 h-fit">
                            <div className="text-heading-3 text-neutral-1-900 font-semibold">Lọc kết quả</div>
                            <div>
                                <div className="pt-[10px] pb-[14px] pr-[10px]">
                                    <div className="text-title-1 font-semibold text-neutral-1-900">Điểm đi</div>
                                </div>
                                <SelectInput options={places} myStyle='w-full' placeholder='--- Chọn điểm đi ---'/>
                            </div>
                            <div>
                                <div className="pt-[10px] pb-[14px] pr-[10px]">
                                    <div className="text-title-1 font-semibold text-neutral-1-900">Điểm đến</div>
                                </div>
                                <SelectInput options={places} myStyle='w-full' placeholder='--- Chọn điểm đến ---'/>
                            </div>
                            <div>
                                <div className="pt-[10px] pb-[14px] pr-[10px]">
                                    <div className="text-title-1 font-semibold text-neutral-1-900">Số ngày</div>
                                </div>
                                <div className="flex justify-center">
                                    <div className="grid gap-y-4 gap-x-6 grid-cols-btn">
                                        <button 
                                            className={`${isDayBtnActive('dayBtn1') ? 'activeBtn' : 'hover:bg-neutral-3-50'} py-2 rounded-[6px] shadow-btn `}
                                            onClick={() => handleDayBtn('dayBtn1')}>1-3 ngày</button>
                                        <button 
                                            className={`${isDayBtnActive('dayBtn2') ? 'activeBtn' : 'hover:bg-neutral-3-50'} py-2 rounded-[6px] shadow-btn `}
                                            onClick={() => handleDayBtn('dayBtn2')}>4-7 ngày</button>
                                        <button 
                                            className={`${isDayBtnActive('dayBtn3') ? 'activeBtn' : 'hover:bg-neutral-3-50'} py-2 rounded-[6px] shadow-btn `}
                                            onClick={() => handleDayBtn('dayBtn3')}>8-14 ngày</button>
                                        <button 
                                            className={`${isDayBtnActive('dayBtn4') ? 'activeBtn' : 'hover:bg-neutral-3-50'} py-2 rounded-[6px] shadow-btn `}
                                            onClick={() => handleDayBtn('dayBtn4')}>Trên 14 ngày</button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="pt-[10px] pb-[14px] pr-[10px]">
                                    <div className="text-title-1 font-semibold text-neutral-1-900">Ngày đi</div>
                                </div>
                                <Datepicker width='w-[397px]' outline  min={true}/>
                            </div>
                            <div>
                                <div className="pt-[10px] pb-[14px] pr-[10px]">
                                    <div className="text-title-1 font-semibold text-neutral-1-900">Số lượng người</div>
                                </div>
                                <div className="flex justify-center">
                                    <div className="grid gap-y-4 gap-x-6 grid-cols-btn text-body-1 text-neutral-1-900">
                                        <button 
                                            className={`${isPeopleBtnActive('peopleBtn1') ? 'activeBtn' : 'hover:bg-neutral-3-50'} py-2 rounded-[6px] shadow-btn`}
                                            onClick={() => handlePeopleBtn('peopleBtn1')}>1 người</button>
                                        <button 
                                            className={`${isPeopleBtnActive('peopleBtn2') ? 'activeBtn' : 'hover:bg-neutral-3-50'} py-2 rounded-[6px] shadow-btn`}
                                            onClick={() => handlePeopleBtn('peopleBtn2')}>2 người</button>
                                        <button 
                                            className={`${isPeopleBtnActive('peopleBtn3') ? 'activeBtn' : 'hover:bg-neutral-3-50'} py-2 rounded-[6px] shadow-btn`}
                                            onClick={() => handlePeopleBtn('peopleBtn3')}>3-5 người</button>
                                        <button 
                                            className={`${isPeopleBtnActive('peopleBtn4') ? 'activeBtn' : 'hover:bg-neutral-3-50'} py-2 rounded-[6px] shadow-btn`}
                                            onClick={() => handlePeopleBtn('peopleBtn4')}>5+ người</button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="pt-[10px] pb-[14px] pr-[10px]">
                                    <div className="text-title-1 font-semibold text-neutral-1-900">Dòng Tour</div>
                                </div>
                                <div className="flex justify-center">
                                    <div className="grid gap-y-4 gap-x-6 grid-cols-btn">
                                        <button 
                                            className={`${isTourTypeBtnActive('tourTypeBtn1') ? 'activeBtn' : 'hover:bg-neutral-3-50'} py-2 rounded-[6px] shadow-btn`}
                                            onClick={() => handleTourTypeBtn('tourTypeBtn1')}> &lt; 5 người</button>
                                        <button 
                                            className={`${isTourTypeBtnActive('tourTypeBtn2') ? 'activeBtn' : 'hover:bg-neutral-3-50'} py-2 rounded-[6px] shadow-btn`}
                                            onClick={() => handleTourTypeBtn('tourTypeBtn2')}>5 - 10 người</button>
                                        <button 
                                            className={`${isTourTypeBtnActive('tourTypeBtn3') ? 'activeBtn' : 'hover:bg-neutral-3-50'} py-2 rounded-[6px] shadow-btn`}
                                            onClick={() => handleTourTypeBtn('tourTypeBtn3')}>10 - 15 người</button>
                                        <button 
                                            className={`${isTourTypeBtnActive('tourTypeBtn4') ? 'activeBtn' : 'hover:bg-neutral-3-50'} py-2 rounded-[6px] shadow-btn`}
                                            onClick={() => handleTourTypeBtn('tourTypeBtn4')}> &gt; 15 người</button>
                                    </div>
                                </div>
                            </div>
                             {/* Search Filter  */}
                            <div className="flex items-center justify-between h-[72px]">
                                <div className="w-[47%] pr-2 text-heading-4 text-neutral-1-500 font-semibold">Bộ lọc tìm kiếm</div>
                                <div className="w-[53%] bg-neutral-1-500 h-[1.5px]"></div>
                            </div>
                            <div className="py-4">
                                <input 
                                    className="w-full cursor-pointer" type="range" min="500000" max="10000000" step="500000" 
                                    value={rangeValue} 
                                    onChange={(e)=>setRangeValue(e.target.value)}
                                />
                                <div className="pt-2 text-body-2 flex justify-between items-center">
                                    <div id="range-value" className="text-black">{(rangeValue === 0)? 'Từ 600.000vnđ - 50.000.000vnđ' : Number(rangeValue).toLocaleString() + "  vnđ"}</div>
                                    <div className="text-primary-2">Filter</div>
                                </div>
                            </div>
                            <div>
                                <div className="pt-[10px] pb-[14px] pr-[10px]">
                                    <div className="text-title-1 font-semibold text-neutral-1-900">Thông tin vận chuyển</div>
                                </div>
                                <div className="flex justify-center">
                                    <div className="grid gap-6 grid-cols-btn text-body-1 text-neutral-1-900">
                                        <button 
                                            className={`${isVehicleBtnActive('vehicleBtn1') ? 'activeBtn' : 'hover:bg-neutral-3-50'} py-2 rounded-[6px] shadow-btn`}
                                            onClick={() => handleVehicleBtn('vehicleBtn1')}>Ô tô</button>
                                        <button 
                                            className={`${isVehicleBtnActive('vehicleBtn2') ? 'activeBtn' : 'hover:bg-neutral-3-50'} py-2 rounded-[6px] shadow-btn`}
                                            onClick={() => handleVehicleBtn('vehicleBtn2')}>Xe khách</button>
                                        <button 
                                            className={`${isVehicleBtnActive('vehicleBtn3') ? 'activeBtn' : 'hover:bg-neutral-3-50'} py-2 rounded-[6px] shadow-btn`}
                                            onClick={() => handleVehicleBtn('vehicleBtn3')}>Máy bay</button>
                                    </div>
                                </div>
                            </div>
                            <Button text='Tìm kiếm' textColor='text-white' bgColor='bg-primary-2' mt/>
                        </div>
                        <div className="w-full xl:w-2/3">
                            <SearchBar placeholder='Nhập địa điểm bạn muốn đi . . .'/>
                            <div className="xl:pb-8 xl:pt-4">
                                <div className="text-heading-4 text-neutral-1-900 leading-[39px] font-semibold pb-2 border-b-2 border-neutral-1-200 xl:pb-4 xl:text-[28px]">Du lịch trong nước</div>
                                <div className="pb-2 w-full h-[13px] xl:h-9 xl:pb-4"></div>
                                <p className="text-body-2 text-neutral-1-600 max-w-[359px] md:max-w-full xl:text-body-1">Du lịch trong nước luôn là lựa chọn tuyệt vời. Đường bờ biển dài hơn 3260km, những khu bảo tồn thiên nhiên tuyệt vời, 
                                    những thành phố nhộn nhịp, những di tích lịch sử hào hùng, nền văn hóa độc đáo và hấp dẫn, cùng một danh sách dài những món ăn ngon nhất thế giới, 
                                    Việt Nam có tất cả những điều đó. Với lịch trình dày, khởi hành đúng thời gian cam kết, KB Du Lịch là công ty lữ hành uy tín nhất hiện nay tại Việt Nam, 
                                    luôn sẵn sàng phục vụ du khách mọi lúc, mọi nơi, đảm bảo tính chuyên nghiệp và chất lượng dịch vụ tốt nhất thị trường
                                </p>
                            </div>
                            <div className="py-8 w-full flex justify-end md:py-[18px] xl:hidden">
                                <div className="flex items-center justify-center text-primary-2 border-[1.2px] border-primary-2 bg-white py-2 px-6 w-fit rounded-md">
                                    <i className="twi-22-filter-line text-[28px] leading-7"></i>
                                    <div className="pl-2 text-body-1">Lọc kết quả</div>
                                </div>
                            </div>
                             {/* Sắp xếp theo  */}
                            <div className="bg-neutral-3-100 py-[10px] px-4 md:px-6 xl:pr-[11px] xl:bg-neutral-3-50">
                                <div className="md:flex items-center justify-between">
                                    <div className="md:flex items-center">
                                        <div className="pb-1 text-header-2 text-neutral-1-500 font-semibold w-fit h-fit md:pb-0 md:pr-[18px] xl:pr-[34px]">Sắp xếp theo:</div>
                                        <div className="w-full flex justify-between items-center md:w-fit">
                                            <SelectInput myStyle='h-fit w-48 xl:w-[200px]' options={orderOpts} placeholder='Được đề xuất'/>
                                            <FiGrid className='md:hidden' color='#5A6271' size='26'/>
                                        </div>
                                    </div>
                                    <FiGrid className='hidden md:block' color='#5A6271' size='26'/>
                                </div>
                            </div>
                            {/* Card  */}
                            <div className="pt-6 grid gap-y-6 md:grid-cols-2 md:gap-x-6 md:gap-y-8 xl:py-8">
                                {/* desktop, tablet 8 cards, mobile 3 cards */}
                                <Card2 animation='md:animate-fade-right'/>
                                <Card2 animation='md:animate-fade-left'/>
                                <Card2 animation='md:animate-fade-right'/>
                                
                                <Card2 hidden='hidden md:block' animation='md:animate-fade-left'/>
                                <Card2 hidden='hidden md:block' animation='md:animate-fade-right'/>
                                <Card2 hidden='hidden md:block' animation='md:animate-fade-left'/>
                                <Card2 hidden='hidden md:block' animation='md:animate-fade-right'/>
                                <Card2 hidden='hidden md:block' animation='md:animate-fade-left'/>
                            </div>
                            {/* Pagination  */}
                            <Pagination />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Search
