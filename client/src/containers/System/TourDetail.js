import React, { useState, useEffect } from 'react'
import icons from '../../ultils/icons';
import { Button2 } from '../../components';
import CustomerList from './CustomerList';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const { FaCheck } = icons

const TourDetail = () => {
    // PARAMS
    const navigate = useNavigate()
    const [schedule, setSchedule] = useState([
        'Quý khách tập trung tại điểm hẹn, Ga đi trong nước, sân bay Tân Sơn Nhất. Hướng dẫn viên Vietravel hỗ trợ làm thủ tục cho đoàn đáp chuyến bay đi Đà Nẵng. Tại sân bay Đà Nẵng xe và HDV Vietravel đón đoàn: Bán đảo Sơn Trà và viếng Chùa Linh Ứng: Nơi đây có tượng Phật Quan Thế Âm cao nhất Việt Nam... Làng Đá Non Nước Nguyễn Hùng: mua sắm sản phẩm đá mỹ nghệ...',
        'Dùng bữa sáng tại khách sạn. Khu du lịch Bà Nà (chi phí cáp treo & Ăn trưa tự túc): tận hưởng không khí se lạnh tại miền Trung... Bãi biển Mỹ Khê: Một trong những bãi biển quyến rũ nhất hành tinh. Quý khách tự do dạo biển...'
    ])
    const [service, setService] = useState(['Bảo hiểm', 'Hướng dẫn viên', 'Bữa ăn'])
    const [destination, setDestination] = useState(['Bà Nà Hills', 'Cầu Rồng', 'Bán Đảo Sơn Trà'])
    const [payload, setPayload] = useState({ 
        name: 'Du lịch Bà Nà Hills - Cầu Rồng - Bán Đảo Sơn Trà',
        price: 5000000,
        departureDate: '20/01/2024', 
        departure: 'Thành phố Hồ Chí Minh',
        tour_destination: destination, //'Bà Nà Hills - Cầu Rồng - Bán Đảo Sơn Trà',
        vehicle: 'Xe 4 chỗ',
        seatNum: 4,
        dayNum: 2,
        tour_schedule: schedule,
        note: 'Không.',
        tour_service: service,
        staff: 'Nguyễn Thị Anh'
    })
    const [role, setRole] = useState('')
    // FUNCTIONS
    const goToEditMode = () => {
        if (role === 'staff') {
            navigate('/staff/tour-edit')
        }
        else {
            navigate('/manager/tour-edit')
        }
    };
    useEffect(() => {
        let newSchedule = schedule;
        if (schedule.length < payload.dayNum) {
            newSchedule[payload.dayNum - 1] = '';
        }
        setSchedule(newSchedule);
    }, [payload.dayNum, schedule]);
    const showDestination= () => {
        let des = destination;
        var indents = [];
        for (var i = 0; i < des.length - 1; i++) {
            indents.push(
                <div className='font-normal'>{des[i]} - </div>
            );
        }
        indents.push(<div className='font-normal'>{des[des.length-1]}</div>);
        return indents;
    };
    const handleCancle = () => {
        if (role === 'staff') {
            Swal.fire({
                title: "Lí do hủy Tour",
                input: "text",
                showCancelButton: true,
                confirmButtonText: "Gửi",
                cancelButtonText: "Hủy",
                showLoaderOnConfirm: true,
                allowOutsideClick: () => !Swal.isLoading(),
                inputValidator: (value) => {
                    if (!value) {
                      return "Vui lòng điền lí do hủy Tour!";
                    }
                  }
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire('Gửi thành công', '', 'success')
                }
            })
        }
        else {
            Swal.fire('Hủy Tour thành công', '', 'success') 
        }  
    }
    useEffect(() => {
        if (window.location.pathname === "/manager/tour-detail"){
            setRole('manager');
        }
        else if (window.location.pathname === "/staff/tour-detail") {
            setRole('staff');
        }
    }, []);
    return (
        <div className='w-full px-6 pt-20 pb-10 xl:pt-7 xl:pb-20 lg:px-2 xl:pl-0 xl:pr-10 overflow-x-hidden'>
            <div className='pb-16'>
                <div className='font-prata text-neutral-1-900 font-semibold text-header-1 border-b-2 border-neutral-2-200 pb-1 w-full px-4 rounded-xl shadow-title xl:text-heading-4'>Thông tin Tour</div>
            </div>
            <div className='relative text-body-2 text-neutral-1-900 flex flex-col gap-6 mx-auto px-4 py-6 border-[3px] border-secondary-2 rounded-b-2xl rounded-tr-2xl xl:text-body-1'>
                <div className='absolute -top-6 left-0.5 bg-gradient-to-tr from-secondary-2 to-accent-4 border border-white outline-offset-2 outline outline-3 outline-secondary-2 rounded-t-xl w-[100px] h-5'></div>
                <div className='flex flex-col gap-4 xl:flex-row xl:justify-start xl:gap-40'>
                    <div className='flex flex-wrap gap-2 items-center'>
                        <div className='font-semibold'>Tên chương trình: </div>
                        <div className='font-normal'>{payload.name}</div>
                    </div>
                    <div className='flex flex-col gap-4 md:flex-row md:justify-between xl:gap-40'>
                        <div className='flex gap-2 items-center'>
                            <div className='font-semibold'>Giá: </div>
                            <div className='font-normal'>{Number(payload.price).toLocaleString()} VNĐ</div> 
                        </div>
                        <div className='flex gap-2 items-center'>
                            <div className='font-semibold whitespace-nowrap'>Tình trạng:</div>
                            <div className="flex items-center gap-[6px]">
                                <div className='w-2 h-2 rounded-full bg-[#1ABB9C]'></div>
                                Active
                            </div>
                        </div>  
                    </div> 
                </div>
                <div className='flex gap-2 items-center'>
                    <div className='font-semibold'>Ngày khởi hành:</div>
                    <div className='font-normal'>{payload.departureDate}</div>
                </div>
                <div className='flex gap-2 items-center'>
                    <div className='font-semibold'>Xuất phát:</div>
                    <div className='font-normal'>{payload.departure}</div>
                </div>
                <div className='flex flex-wrap gap-2 items-center'>
                    <div className='font-semibold'>Điểm đến:</div>
                    <>{showDestination()}</>
                </div>
                <div className='flex gap-4 xl:gap-16 items-center'>
                    <div className='font-semibold whitespace-nowrap'>Phương tiện:</div>
                    <div className='flex flex-wrap gap-x-8 gap-y-2 xl:gap-16'>
                        <div className='font-normal'>{payload.vehicle}</div>
                    </div>
                </div>
                <div className='flex gap-2 items-center'>
                    <div className='font-semibold'>Số ghế:</div>
                    <div className='font-normal'>{payload.seatNum}</div>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='font-semibold'>Lịch trình:</div>
                    <div className='pl-5 flex gap-2 items-center xl:pl-10'>
                        <div className='font-semibold'>Số ngày:</div>
                        <div className='font-normal'>{payload.dayNum}</div>
                    </div>  
                    <div className='font-semibold pl-5 xl:pl-10'>Mô tả chi tiết:</div>
                    {schedule?.map((item, i) => {
                            return (
                                <div className='pl-5 xl:pl-10'>
                                    <div className='italic'>Ngày {i+1}:</div>
                                    <div className='font-normal text-justify whitespace-pre-wrap'>{item}</div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='flex flex-wrap gap-2 items-center'>
                    <div className='font-semibold'>Ghi chú:</div>
                    <div className='font-normal text-justify'>{payload.note}</div>
                </div>
                <div className='flex gap-2 md:gap-5 xl:gap-8'>
                    <div className='font-semibold'>Dịch vụ bao gồm:</div>
                    <div className='flex flex-wrap justify-between gap-y-2 md:gap-5 xl:gap-16'>
                        {
                            service?.map(item => {
                                return (
                                    <div className='flex gap-1 items-center'>
                                        <FaCheck size={18} color={'black'}/>
                                        <div>{item}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                {role === 'staff' ? <></>
                    : 
                    <div className='flex gap-2 items-center'>
                        <div className='font-semibold'>Nhân viên đảm nhận:</div>
                        <div className='font-normal'>{payload.staff}</div>
                    </div>
                }
            </div>
            
            <div className='pt-6 xl:pt-10 flex gap-28 xl:gap-8 justify-center items-center'>
                <Button2 text='Chỉnh sửa thông tin tour' textColor='text-black' bgColor='bg-accent-5' onClick={goToEditMode}  />
                <Button2 text={`${role === 'staff' ? 'Đề xuất hủy tour' : 'Hủy tour'} `} textColor='text-white' bgColor='bg-[#363837]' onClick={handleCancle}/>
            </div>
            { role === 'staff' ? <CustomerList /> : <></> }
            
        </div>
    )
}

export default TourDetail
