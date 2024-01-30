import React, { useState, useEffect } from 'react'
import icons from '../../ultils/icons';
import { Button, InputForm, CheckedBox, Datepicker } from '../../components';
import CustomerList from './CustomerList';
import Swal from 'sweetalert2'

const { FaCheck} = icons

const TourDetail = () => {
    // PARAMS
    const [invalidFields, setInvalidFields] = useState([])
    const [schedule, setSchedule] = useState([
        'Quý khách tập trung tại điểm hẹn, Ga đi trong nước, sân bay Tân Sơn Nhất. Hướng dẫn viên Vietravel hỗ trợ làm thủ tục cho đoàn đáp chuyến bay đi Đà Nẵng. Tại sân bay Đà Nẵng xe và HDV Vietravel đón đoàn: Bán đảo Sơn Trà và viếng Chùa Linh Ứng: Nơi đây có tượng Phật Quan Thế Âm cao nhất Việt Nam... Làng Đá Non Nước Nguyễn Hùng: mua sắm sản phẩm đá mỹ nghệ...',
        'Dùng bữa sáng tại khách sạn. Khu du lịch Bà Nà (chi phí cáp treo & Ăn trưa tự túc): tận hưởng không khí se lạnh tại miền Trung... Bãi biển Mỹ Khê: Một trong những bãi biển quyến rũ nhất hành tinh. Quý khách tự do dạo biển...'
    ])
    const [service, setService] = useState(['Bảo hiểm', 'Hướng dẫn viên', 'Bữa ăn'])
    const services = ['Bảo hiểm', 'Bữa ăn', 'Xe đưa đón', 'Hướng dẫn viên', 'Vé tham quan'] // available services
    const [payload, setPayload] = useState({ 
        name: 'Du lịch Bà Nà Hills - Cầu Rồng - Bán Đảo Sơn Trà',
        price: 5000000,
        departureDate: '20/01/2024', 
        departure: 'Thành phố Hồ Chí Minh',
        destination: ['Bà Nà Hills', 'Cầu Rồng', 'Bán Đảo Sơn Trà'], //'Bà Nà Hills - Cầu Rồng - Bán Đảo Sơn Trà',
        vehicle: 'Xe 4 chỗ',
        dayNum: 2,
        tour_schedule: schedule,
        note: 'Không.',
        tour_service: service
    })
    const [isEdit, setIsEdit] = useState(false)
    const [isRequestPage, setIsRequestPage] = useState(false)
    // FUNCTIONS
    const changeToEditMode = () => {
        window.scrollTo(0, 0);
        setIsEdit(true);
    };
    const handleInputChange = (e, index) => {
        let newSchedule = schedule;
        newSchedule[index] = e.target.value;
        setSchedule(newSchedule);
        setPayload(prev => ({...prev, tour_schedule: schedule}))
    };
    const showSchedule = () => {
        var indents = [];
        for (var i = 0; i < payload.dayNum; i++) {
            indents.push(
                <>
                <div>Ngày {i+1}:</div>
                <textarea id={i}
                    className={`w-full h-36 rounded-md p-3 bg-neutral-3-50 text-neutral-1-600`}
                    defaultValue={schedule[i]}
                    onChange={(e) => {
                        handleInputChange(e, e.currentTarget.id)
                    }}
                />
                <br/>
                </>
            );
        }
        return indents;
    };
    const showDestination= () => {
        let des = payload.destination;
        var indents = [];
        for (var i = 0; i < des.length - 1; i++) {
            indents.push(
                <div className='font-normal'>{des[i]} - </div>
            );
        }
        indents.push(<div className='font-normal'>{des[des.length-1]}</div>);
        return indents;
    };
    const submitEdit = async () => {
        setPayload(prev => ({...prev, tour_service: service}))
        Swal.fire('Gửi thành công', '', 'success')
        // console.log(payload)
    };
    const handleCancle = () => {
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
    useEffect(() => {
        if (window.location.pathname === "/staff/request-detail"){
            setIsRequestPage(true);
        }
    }, []);
    return (
        <div className='w-full px-6 pt-10 pb-20 lg:px-2 xl:pl-0 xl:pr-10 overflow-x-hidden'>
            <div className='pb-8 flex gap-5 items-center'>
                { isEdit ? 
                <span className='arrow flex items-center justify-center w-6 h-6 cursor-pointer '>
                    <i className='twi-22-chevron-line rotate-180 text-heading-3 text-primary-2 font-semibold hover:text-primary-1'
                        onClick={() => setIsEdit(false)}>
                    </i>
                </span>
                : <></>
                }
                <div className='w-full flex justify-between'>
                    <div className='text-primary-2 font-semibold text-header-1 md:text-heading-4 xl:text-heading-3'>Tour Du lịch Bà Nà Hills - Cầu Rồng - Bán Đảo Sơn Trà</div>
                    <div className='font-prata pt-2 pb-1 px-3 rounded-md bg-accent-10 text-white font-semibold text-header-1 tracking-widest md:text-title-2 xl:text-title-1'>Edit</div>
                </div> 
            </div>
            <div className='text-body-1 text-neutral-1-900 flex flex-col gap-4'>
                <div className='flex gap-40'>
                    <div className='flex gap-2 items-center'>
                        <div className='font-semibold'>Tên chương trình: </div>
                        {/* <input type='text' value='Du lịch Bà Nà Hills - Cầu Rồng - Bán Đảo Sơn Trà' className='w-96 rounded-md p-1 bg-neutral-3-50 text-neutral-1-600' readonly/> */}
                        {isEdit? 
                            <InputForm 
                                invalidFields={invalidFields} 
                                setInvalidFields={setInvalidFields}  
                                value={payload.name}
                                setValue={setPayload} 
                                keyPayload={'name'}
                                width='w-96'
                            />
                            :
                            <div className='font-normal'>{payload.name}</div>
                        }
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div className='font-semibold'>Giá: </div>
                        {isEdit? 
                            <>
                            <InputForm 
                                invalidFields={invalidFields} 
                                setInvalidFields={setInvalidFields}  
                                value={payload.price}
                                setValue={setPayload} 
                                keyPayload={'price'}
                                width='w-28'
                                type='number'
                            /> VNĐ
                            </>
                            :
                            ( isRequestPage?
                                <div className='flex gap-3'>
                                    <div className='font-normal line-through'>{Number(payload.price).toLocaleString()}</div>
                                    <div className='font-normal text-accent-3'>7,000,000 </div>
                                    VNĐ
                                </div>
                                :
                                <div className='font-normal'>{Number(payload.price).toLocaleString()} VNĐ</div>
                            )
                            
                        }
                    </div>    
                </div>
                <div className='flex gap-2 items-center'>
                    <div className='font-semibold'>Ngày khởi hành:</div>
                    {isEdit? 
                        <Datepicker width='w-40'
                            // defaultValue={payload.departureDate}
                            // value={payload.departureDate}
                            setValue={setPayload} 
                            keyPayload={'departureDate'}
                            textColor='text-neutral-1-600'
                            bgColor='bg-neutral-3-50'
                        />
                        :
                        <div className='font-normal'>{payload.departureDate}</div>
                    }
            </div>
                <div className='flex gap-2 items-center'>
                    <div className='font-semibold'>Xuất phát:</div>
                    {isEdit? 
                        <InputForm 
                            invalidFields={invalidFields} 
                            setInvalidFields={setInvalidFields}  
                            value={payload.departure}
                            setValue={setPayload} 
                            keyPayload={'departure'}
                            width='w-52'
                        />
                        :
                        <div className='font-normal'>{payload.departure}</div>
                    }
                </div>
                <div className='flex gap-2 items-center'>
                    <div className='font-semibold'>Điểm đến:</div>
                    {isEdit? 
                        <InputForm 
                            invalidFields={invalidFields} 
                            setInvalidFields={setInvalidFields}  
                            value={'Bà Nà Hills - Cầu Rồng - Bán Đảo Sơn Trà'}
                            setValue={setPayload} 
                            keyPayload={'destination'}
                            width='w-96'
                        />
                        :
                        <>{showDestination()}</>
                    }
                </div>
                <div className='flex gap-2 items-center'>
                    <div className='font-semibold'>Phương tiện:</div>
                    {isEdit? 
                        <InputForm 
                            invalidFields={invalidFields} 
                            setInvalidFields={setInvalidFields}  
                            value={payload.vehicle}
                            setValue={setPayload} 
                            keyPayload={'vehicle'}
                            width='w-28'
                        />
                        :
                        ( isRequestPage?
                            <div className='flex gap-3'>
                                <div className='font-normal line-through'>{payload.vehicle}</div>
                                <div className='font-normal text-accent-3'>Máy bay</div>
                            </div>
                            :
                            <div className='font-normal'>{payload.vehicle}</div>
                        )
                    }
                </div>
                <div>
                    <div className='font-semibold'>Lịch trình:</div>
                    <div className='pl-10 flex gap-2 items-center'>
                        <div className='font-semibold'>Số ngày:</div>
                        {isEdit? 
                            <InputForm 
                                invalidFields={invalidFields} 
                                setInvalidFields={setInvalidFields}  
                                value={payload.dayNum}
                                setValue={setPayload} 
                                keyPayload={'dayNum'}
                                width='w-16'
                                type='number'
                                min="1"
                            />
                            :
                            <div className='font-normal'>{payload.dayNum}</div>
                        }
                    </div>  
                    <div className='pl-10 font-semibold'>Mô tả chi tiết:</div>
                    { isEdit ? 
                        <>{showSchedule()}</>
                        : 
                        schedule?.map((t, i) => {
                            return (
                                <>
                                <div>Ngày {i+1}:</div>
                                <div className='font-normal whitespace-pre-wrap'>{schedule[0]}</div>
                                <br/>
                                </>
                            )
                        })
                    }
                </div>
                <div className='flex gap-2 items-center'>
                    <div className='font-semibold'>Ghi chú:</div>
                    {isEdit? 
                        <InputForm 
                            invalidFields={invalidFields} 
                            setInvalidFields={setInvalidFields}  
                            value={payload.note}
                            setValue={setPayload} 
                            keyPayload={'note'}
                            width='w-96'
                        />
                        :
                        <div className='font-normal'>{payload.note}</div>
                    }
                </div>
                <div className='flex gap-8'>
                    <div className='font-semibold'>Dịch vụ bao gồm:</div>
                    {isEdit? 
                        services?.map(item => {
                            if (service.includes(item)) {
                                return (
                                    <CheckedBox value={item} label={item} setValue={setService} keyValue={service} />
                                )
                            }
                            else {
                                return (
                                    <div className='flex gap-1 items-center'>
                                        <input type="checkbox" value={item} className='w-5 h-5 accent-primary-1'
                                            onChange={(e) => {setService([...service, item])}}
                                        />
                                        <div>{item}</div>
                                    </div>
                                )
                            }
                        })
                    : 
                        service?.map(item => {
                            return (
                                <div className='flex gap-1 items-center'>
                                    <FaCheck size={18} color={'#1A6DE3'}/>
                                    <div>{item}</div>
                                </div>
                            )
                        })
                    }
                </div>
                {/* isManager ?
                <div className='font-semibold'>Nhân viên đảm nhận: <span className='font-normal'>Không</span></div> */}
                <div className='text-body-1 text-neutral-1-900 font-semibold'>Lý do đề xuất hủy: <span className='font-normal'>Số lượng khách hàng đặt tour &lt; 50% (10/50 khách).</span></div>
            </div>
            { isRequestPage ? <></> :
                <><div className='pt-10 flex gap-10 justify-center items-center'>
                { isEdit? 
                    <Button text='Gửi đề xuất' textColor='text-white' bgColor='bg-primary-2' onClick={submitEdit}/>
                    : 
                    <>
                    <Button text='Chỉnh sửa thông tin tour' textColor='text-white' bgColor='bg-primary-2' onClick={changeToEditMode}/>
                    <Button text='Đề xuất hủy tour' textColor='text-white' bgColor='bg-accent-3' redBtn onClick={handleCancle}/>
                    </> 
                }
                </div>
                <CustomerList />
                </>
            }
        </div>
    )
}

export default TourDetail
