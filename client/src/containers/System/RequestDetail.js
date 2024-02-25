import React, { useState, useEffect } from 'react'
import icons from '../../ultils/icons';
import { Button2, InputForm, CheckedBox, Datepicker, SelectInput } from '../../components';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const { FaCheck, FaClockRotateLeft } = icons

const TourDetail = () => {
    // PARAMS
    const navigate = useNavigate()
    const [invalidFields, setInvalidFields] = useState([])
    const [schedule, setSchedule] = useState([
        'Quý khách tập trung tại điểm hẹn, Ga đi trong nước, sân bay Tân Sơn Nhất. Hướng dẫn viên Vietravel hỗ trợ làm thủ tục cho đoàn đáp chuyến bay đi Đà Nẵng. Tại sân bay Đà Nẵng xe và HDV Vietravel đón đoàn: Bán đảo Sơn Trà và viếng Chùa Linh Ứng: Nơi đây có tượng Phật Quan Thế Âm cao nhất Việt Nam... Làng Đá Non Nước Nguyễn Hùng: mua sắm sản phẩm đá mỹ nghệ...',
        'Dùng bữa sáng tại khách sạn. Khu du lịch Bà Nà (chi phí cáp treo & Ăn trưa tự túc): tận hưởng không khí se lạnh tại miền Trung... Bãi biển Mỹ Khê: Một trong những bãi biển quyến rũ nhất hành tinh. Quý khách tự do dạo biển...'
    ])
    const [service, setService] = useState(['Bảo hiểm', 'Hướng dẫn viên', 'Bữa ăn'])
    const services = ['Bảo hiểm', 'Bữa ăn', 'Xe đưa đón', 'Hướng dẫn viên', 'Vé tham quan'] // available services
    const vehicles = ['Xe 4 chỗ', 'Xe 7 chỗ', 'Xe khách', 'Máy bay'] // available vehicles
    const [destination, setDestination] = useState(['Bà Nà Hills', 'Cầu Rồng', 'Bán Đảo Sơn Trà'])
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
        tour_service: service,
        reason: 'Số lượng khách hàng đặt tour < 50% (10/50 khách).'
    })
    const placeDaNang = [
        { value: 'Bà Nà Hills', label: 'Bà Nà Hills'},
        { value: 'Cầu Rồng', label: 'Cầu Rồng'},
        { value: 'Bán Đảo Sơn Trà', label: 'Bán Đảo Sơn Trà'}
    ]
    const province = [
        { value: 'An Giang', label: 'An Giang' },
        { value: 'Bình Thuận', label: 'Bình Thuận'},
        { value: 'Đà Nẵng', label: 'Đà Nẵng'},
        { value: 'Thành phố Hồ Chí Minh', label: 'Thành phố Hồ Chí Minh'}
    ]
    const [isEdit, setIsEdit] = useState(false)
    const [role, setRole] = useState('')
    const types = [
        { value: 'Add', label: 'Add'},
        { value: 'Edit', label: 'Edit' },
        { value: 'Cancel', label: 'Cancel'}
    ]
    // FUNCTIONS
    useEffect(() => {
        if (window.location.pathname === "/staff/request-detail/create"){
            setRole('staff');
            setIsEdit(true);
        }
        if (window.location.pathname === "/staff/request-detail") {
            setRole('staff');
        }
        else if (window.location.pathname === "/manager/request-detail"){
            setRole('manager');    
        }
    }, []);
    useEffect(() => {
        let newSchedule = schedule;
        if (schedule.length < payload.dayNum) {
            newSchedule[payload.dayNum - 1] = '';
        }
        setSchedule(newSchedule);
    }, [payload.dayNum, schedule]);
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
                <div className='pl-5 xl:pl-10'>
                    <div className='italic'>Ngày {i+1}:</div>
                    <textarea id={i}
                        className={`w-full h-24 rounded-md p-3 bg-neutral-3-50 text-neutral-1-600`}
                        defaultValue={schedule[i]}
                        onChange={(e) => {
                            handleInputChange(e, e.currentTarget.id)
                        }}
                        spellcheck="false"
                    />
                </div>
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
    const handle_addDestination = () => {
        const newDes = [...destination, placeDaNang[0].value];
        setDestination(newDes)
    }
    const handle_delDestination = (i) => {
        const delDes = [...destination];
        delDes.splice(i, 1)
        console.log(delDes)
        setDestination(delDes)
    }
    const submitEdit = async () => {
        setPayload(prev => ({...prev, tour_service: service}))
        Swal.fire('Gửi thành công', '', 'success')
        navigate('/staff/request')
        // console.log(payload)
    };
    const handleCancle = () => {
        Swal.fire({
            title: "Lí do từ chối",
            input: "text",
            showCancelButton: true,
            confirmButtonText: "Gửi",
            cancelButtonText: "Hủy",
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Phản hồi thành công', '', 'success')
                navigate('/manager/request')
            }
        })
    }
    const handleAccept = () => {
        Swal.fire('Đã cập nhật thay đổi mới', '', 'success')
        navigate('/manager/request')
    }
    return (
        <div className='w-full px-6 pt-20 pb-10 xl:pt-7 xl:pb-20 lg:px-2 xl:pl-0 xl:pr-10 overflow-x-hidden'>
            <div className='pb-8 flex gap-5 items-center'>
                <div className='w-full flex justify-between gap-5 xl:gap-10'>
                    <div className='font-prata text-neutral-1-900 font-semibold text-header-1 border-b-2 border-neutral-2-200 pb-1 w-full px-4 rounded-xl shadow-title xl:text-heading-4'>{ isEdit ? 'Tạo Đề xuất mới' : 'Thông tin Đề xuất'}</div>
                    { isEdit ? 
                        <SelectInput options={types} myStyle='w-[124px] uppercase tracking-wide' style3={true} placeholder={types[0].value} />
                        : <div className='font-prata pt-2 px-[10px] rounded-md bg-accent-4 uppercase text-white font-semibold text-body-1 tracking-[.14em] md:text-title-2'>Edit</div>
                    }
                </div> 
            </div>
            { isEdit ? <></>
            : 
            <><div className='mb-3 ml-auto px-2 py-1 flex items-center justify-between w-[185px] rounded-md bg-gradient-to-l from-background-7 to-background-6 text-caption-1 xl:text-body-2'>
                <div className='flex gap-2 items-center text-accent-8'>
                    <FaCheck className='text-[14px] ' />
                    <div className='font-semibold'>Đồng ý</div>
                </div>
                <div className='italic text-accent-8'>10/01/2024</div>
            </div>
            <div className='ml-auto px-2 py-1 flex items-center justify-between w-[185px] rounded-md bg-gradient-to-l from-neutral-3-200 to-neutral-3-50 text-caption-1 xl:text-body-2'>
                <div className='flex gap-2 items-center text-neutral-1-500'>
                    <FaClockRotateLeft className='text-[14px]' />
                    <div className='font-semibold'>Ngày gửi</div>
                </div>
                <div className='italic text-neutral-1-400'>07/01/2024</div>
            </div></>
            }
            <div className='mt-6 relative text-body-2 text-neutral-1-900 flex flex-col gap-6 mx-auto px-4 py-6 border-[3px] border-secondary-2 rounded-b-2xl rounded-tr-2xl xl:text-body-1'>
                <div className='absolute -top-6 left-0.5 bg-gradient-to-tr from-secondary-2 to-accent-4 border border-white outline-offset-2 outline outline-[3px] outline-secondary-2 rounded-t-xl w-[100px] h-5'></div>
                <div className='flex flex-col gap-4 md:flex-row md:justify-between xl:justify-start xl:gap-40'>
                    <div className='flex flex-wrap gap-2 items-center'>
                        <div className='font-semibold'>Tên chương trình: </div>
                        {isEdit? 
                            <InputForm 
                                invalidFields={invalidFields} 
                                setInvalidFields={setInvalidFields}  
                                value={payload.name}
                                setValue={setPayload} 
                                keyPayload={'name'}
                                width='w-52 xl:w-96'
                                style2={true}
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
                                style2={true}
                            />
                            <div className='font-semibold'>{Number(payload.price).toLocaleString()} </div>
                            VNĐ
                            </>
                            :
                            <div className='flex gap-3'>
                                <div className='font-normal line-through'>{Number(payload.price).toLocaleString()}</div>
                                <div className='font-normal text-accent-3'>7,000,000 </div>
                                VNĐ
                            </div>
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
                            min={true}
                        />
                        :
                        <div className='font-normal'>{payload.departureDate}</div>
                    }
                </div>
                <div className='flex gap-2 items-center'>
                    <div className='font-semibold'>Xuất phát:</div>
                    {isEdit? 
                        <SelectInput options={province} myStyle='w-40 xl:w-52' style2={true} placeholder={payload.departure} />
                        :
                        <div className='font-normal'>{payload.departure}</div>
                    }
                </div>
                <div className='flex flex-wrap gap-2 items-center'>
                    <div className='font-semibold'>Điểm đến:</div>
                    {isEdit? 
                        <>
                            <SelectInput options={province} myStyle='w-40 xl:w-52' style2={true} placeholder={'Đà Nẵng'} />
                            {destination?.map((item, i) => {
                                return (
                                    <div className='relative'>
                                        <SelectInput options={placeDaNang} myStyle='w-28 xl:w-40' style2={true} placeholder={item} />
                                        <div className="bg-white flex items-center justify-center cursor-pointer absolute -top-2 -right-2" onClick={() => handle_delDestination(i)}>
                                            <i className="twi-22-x-circle-fill text-[17px] text-accent-3 text-center"></i>
                                        </div>
                                    </div>
                                )
                            })}
                            <div className='cursor-pointer rounded-md bg-black text-white text-[20px] text-center w-5 pb-1 ml-2 hover:bg-accent-5 hover:text-black'
                                onClick={handle_addDestination}>+</div>    
                        </>
                        :
                        <>{showDestination()}</>
                    }
                </div>
                <div className={`flex ${isEdit? 'gap-4 xl:gap-16' : 'gap-2'} items-center`}>
                    <div className='font-semibold whitespace-nowrap'>Phương tiện:</div>
                    <div className='flex flex-wrap gap-x-8 gap-y-2 xl:gap-16'>
                        {isEdit? 
                            vehicles?.map(item => {
                                if (payload.vehicle.includes(item)) {
                                    return (
                                        <label className='gap-1'>
                                            <input type="radio" name="vehicle" value={item} className='w-2 h-2 md:w-3 md:h-3 accent-black cursor-pointer' checked/>
                                            {' ' + item}
                                        </label>
                                    )
                                }
                                else {
                                    return (
                                        <label className='gap-1'>
                                            <input type="radio" name="vehicle" value={item} className='w-2 h-2 md:w-3 md:h-3 accent-black cursor-pointer'
                                                onChange={(e) => setPayload(prev => ({...prev, 'vehicle': e.target.value}))}
                                            />
                                            {' ' + item}
                                        </label>
                                    )
                                }
                            })
                            :
                            <div className='flex gap-3'>
                                <div className='font-normal line-through'>{payload.vehicle}</div>
                                <div className='font-normal text-accent-3'>Máy bay</div>
                            </div>
                        }
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='font-semibold'>Lịch trình:</div>
                    <div className='pl-5 flex gap-2 items-center xl:pl-10'>
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
                                min={1}
                                style2={true}
                            />
                            :
                            <div className='font-normal'>{payload.dayNum}</div>
                        }
                    </div>  
                    <div className='font-semibold pl-5 xl:pl-10'>Mô tả chi tiết:</div>
                    { isEdit ? 
                        <>{showSchedule()}</>
                        : 
                        schedule?.map((item, i) => {
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
                    {isEdit? 
                        <InputForm 
                            invalidFields={invalidFields} 
                            setInvalidFields={setInvalidFields}  
                            value={payload.note}
                            setValue={setPayload} 
                            keyPayload={'note'}
                            width='w-[275px] md:w-[615px] xl:w-[1035px]'
                            style2={true}
                        />
                        :
                        <div className='font-normal'>{payload.note}</div>
                    }
                </div>
                <div className='flex gap-2 md:gap-5 xl:gap-8'>
                    <div className='font-semibold'>Dịch vụ bao gồm:</div>
                    <div className='flex flex-wrap justify-between gap-y-2 md:gap-5 xl:gap-10'>
                        {isEdit? 
                            services?.map(item => {
                                if (service.includes(item)) {
                                    return (
                                        <CheckedBox value={item} label={item} setValue={setService} keyValue={service} color={'accent-black'} />
                                    )
                                }
                                else {
                                    return (
                                        <div className='flex gap-1 items-center'>
                                            <input type="checkbox" value={item} className='w-3 h-3 xl:w-4 xl:h-4 accent-black'
                                                onChange={() => {setService([...service, item])}}/>
                                            <div>{item}</div>
                                        </div>
                                    )
                                }
                            })
                        : 
                            service?.map(item => {
                                return (
                                    <div className='flex gap-1 items-center'>
                                        <FaCheck color={'black'} className='text-[14px] md:text-[16px]'/>
                                        <div>{item}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='flex gap-2 items-center'>
                    <div className='font-semibold'>Lí do đề xuất hủy:</div>
                    {isEdit? 
                        <InputForm 
                            invalidFields={invalidFields} 
                            setInvalidFields={setInvalidFields}  
                            value={payload.reason}
                            setValue={setPayload} 
                            keyPayload={'reason'}
                            width='w-[210px] md:w-[550px] xl:w-[955px]'
                            style2={true}
                        />
                        :
                        <div className='font-normal'>{payload.reason}</div>
                    }
                </div>
            </div>
            <div className='pt-6 xl:pt-10 flex gap-6 justify-center items-center'>
                { role === 'staff' ?
                        isEdit? 
                        <Button2 text='Gửi đề xuất' textColor='text-white' bgColor='bg-[#363837]' onClick={submitEdit}/>
                        : 
                        <></>
                    :
                    <>
                    <Button2 text='Đồng ý' textColor='text-black' bgColor='bg-accent-5' onClick={handleAccept}/>
                    <Button2 text='Từ chối' textColor='text-white' bgColor='bg-[#363837]' redBtn onClick={handleCancle}/>
                    </>
                }
            </div>
        </div>
    )
}

export default TourDetail
