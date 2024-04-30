import React, { useState, useEffect } from 'react'
import icons from '../../ultils/icons';
import { Button2, InputForm, CheckedBox, Datepicker, SelectInput } from '../../components';
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getRequest } from '../../store/actions/requestAction'
import { getAllPlaces } from '../../store/actions/tourPlaceAction'
import { splitDate, splitDateTime } from '../../ultils/splitDateTime';
import { ratingClassifier } from '../../ultils/ratingClassifier';
import { provinceObjects, placeObjects } from '../../ultils/objectsToArr';

const { FaCheck, FaClockRotateLeft } = icons

const RequestDetail = () => {
    // PARAMS
    const {requestID} = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { request } = useSelector(state => state.request)
    const { places } = useSelector(state => state.place)
    const [invalidFields, setInvalidFields] = useState([])
    const [requestSchedule, setRequestSchedule] = useState([])
    const [requestService, setRequestService] = useState([])
    const services = ['Bảo hiểm', 'Bữa ăn', 'Xe đưa đón', 'Hướng dẫn viên', 'Vé tham quan'] // available services
    const vehicles = ['Xe 4 chỗ', 'Xe 7 chỗ', 'Xe khách', 'Máy bay'] // available vehicles
    const [destination, setDestination] = useState(['Bà Nà Hills'])
    const [payload, setPayload] = useState({ 
        name: '',
        price: 0,
        starting_date: '',
        bookingDeadline: '',
        departure: '',
        tour_destination: destination, //'Bà Nà Hills - Cầu Rồng - Bán Đảo Sơn Trà',
        vehicle: '',
        seat_num: 0,
        night_num: 0,
        day_num: 0,
        schedule: [],
        note: '',
        service: [],
        staff: '',
        reason: 'Số lượng khách hàng đặt tour < 50% (10/50 khách).'
    })
    const [isEdit, setIsEdit] = useState(false)
    const [role, setRole] = useState('')
    const types = [
        { value: 'Add', label: 'Add'},
        { value: 'Edit', label: 'Edit' },
        { value: 'Cancel', label: 'Cancel'}
    ]
    const [newProvinces, setNewProvinces] = useState([]);
    const [newPlaces, setNewPlaces] = useState([]);
    const [maxDay, setMaxDay] = useState(0)
    const [defaultDate, setDefaultDate] = useState('')
    const [defaultBookingDl, setBookingDl] = useState('')
    // FUNCTIONS
    useEffect(() => {
        dispatch(getAllPlaces())
        dispatch(getRequest({request_ID: requestID}))
    }, [dispatch, requestID])
    useEffect(() => {
        if (places) {
            const province_arr = provinceObjects(places)
            setNewProvinces(province_arr)
            const place_arr = placeObjects(places)
            setNewPlaces(place_arr)
        }
    }, [places])
    useEffect(() => {
        if (window.location.pathname.includes("staff") && window.location.pathname.includes("dup")){
            setRole('staff');
            setIsEdit(true);
        }
        if (window.location.pathname.includes("/staff/request-detail")) {
            setRole('staff');
        }
        else if (window.location.pathname.includes("/manager/request-detail")){
            setRole('manager');    
        }
    }, []);
    useEffect(() => {
        if (request?.edit_info?.name) { setPayload(prev => ({...prev, name: request.edit_info.name})) }
        if (request?.edit_info?.price) { setPayload(prev => ({...prev, price: request.edit_info.price})) }
        if (request?.edit_info?.departure) { setPayload(prev => ({...prev, departure: request.edit_info.departure})) }
        if (request?.edit_info?.vehicle) { setPayload(prev => ({...prev, vehicle: request.edit_info.vehicle})) }
        if (request?.edit_info?.schedule) { 
            setRequestSchedule(request.edit_info.schedule) 
            setPayload(prev => ({...prev, schedule: request.edit_info.schedule})) 
        }
        if (request?.edit_info?.service) { setRequestService(request.edit_info.service) }
        if (request?.edit_info?.seat_num) { setPayload(prev => ({...prev, seat_num: request.edit_info.seat_num})) }
        if (request?.edit_info?.note) { setPayload(prev => ({...prev, note: request.edit_info.note})) }
        if (request?.edit_info?.night_num) { setPayload(prev => ({...prev, night_num: request.edit_info.night_num})) }
        if (request?.edit_info?.day_num) { 
            setPayload(prev => ({...prev, day_num: request.edit_info.day_num})) 
            setMaxDay(Math.max(request.edit_info.day_num, request.edit_info.night_num))
        }
        if (request?.edit_info?.starting_date) { 
            setPayload(prev => ({...prev, starting_date: request.edit_info.starting_date}))
            const [year, month, day] = request.edit_info.starting_date.split('-');
            const myDate = new Date(Date.UTC(year, month - 1, day)); 
            setDefaultDate(myDate)
        }
        if (request?.edit_info?.bookingDeadline) { 
            setPayload(prev => ({...prev, bookingDeadline: request.edit_info.bookingDeadline}))
            const [year, month, day] = request.edit_info.bookingDeadline.split('-');
            const myDate = new Date(Date.UTC(year, month - 1, day)); 
            setBookingDl(myDate)
        }
        if (request?.staff_ID) { setPayload(prev => ({...prev, staff: request.staff_ID})) }
    }, [request])
    useEffect(() => {
        const max = Math.max(payload.day_num, payload.night_num)
        setMaxDay(max)
        let newSchedule = requestSchedule;
        if (requestSchedule?.length < max) {
            newSchedule[max - 1] = '';
        }
        else {
            newSchedule = requestSchedule?.slice(0, max);
        }
        setRequestSchedule(newSchedule);
    }, [payload.day_num, payload.night_num]);
    const handleInputChange = (e, index) => {
        let newSchedule = requestSchedule;
        newSchedule[index] = e.target.value;
        setRequestSchedule(newSchedule);
        setPayload(prev => ({...prev, schedule: requestSchedule}))
    };
    const showSchedule = () => {
        var indents = [];
        for (var i = 0; i < maxDay; i++) {
            indents.push(
                <div key={i} className='pl-5 xl:pl-10'>
                    <div className='italic'>Ngày {i+1}:</div>
                    <textarea id={i}
                        className={`w-full h-28 rounded-md p-3 bg-neutral-3-50 text-neutral-1-600`}
                        defaultValue={requestSchedule[i]}
                        onChange={(e) => {
                            handleInputChange(e, e.currentTarget.id)
                        }}
                        onFocus={() => {setInvalidFields([])}}
                        spellCheck="false"
                    />
                </div>
            );
        }
        return indents;
    };
    const showDestination= () => {
        let des = destination;
        var indents = [];
        for (var i = 0; i < des.length - 1; i++) { {/* data */}
            indents.push(
                <div key={i} className='font-normal'>{des[i]} - </div>
            );
        }
        indents.push(<div key={des.length-1} className='font-normal'>{des[des.length-1]}</div>);
        return indents;
    };
    const handle_addDestination = () => {
        const newDes = [...destination, newPlaces[0].value];
        setDestination(newDes)
    }
    const handle_delDestination = (i) => {
        const delDes = [...destination];
        delDes.splice(i, 1)
        setDestination(delDes)
    }
    useEffect(() => {
        setPayload(prev => ({...prev, service: requestService}))
    }, [requestService])
    const submitEdit = async () => {
        setPayload(prev => ({...prev, tour_destination: destination}))
        Swal.fire('Gửi thành công', '', 'success')
        // navigate('/staff/request')
        console.log(payload)
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
                console.log(payload)
                console.log(result)
                Swal.fire('Phản hồi thành công', '', 'success')
                // navigate('/manager/request')
            }
        })
    }
    const handleAccept = () => {
        Swal.fire('Đã cập nhật thay đổi mới', '', 'success')
        navigate('/manager/request')
    }
    const getEditFields = (field) => {
        if (field === 'name') return 'Tên Tour'
        else if (field === 'departure') return 'Điểm xuất phát'
        else if (field === 'vehicle') return 'Phương tiện'
        else if (field === 'seat_num') return 'Số ghế'
        else if (field === 'price') return 'Giá'
        else if (field === 'starting_date') return 'Ngày khởi hành'
        else if (field === 'bookingDeadline') return 'Hạn chót đặt tour'
        else if (field === 'day_num') return 'Số ngày'
        else if (field === 'night_num') return 'Số đêm'
        else if (field === 'note') return 'Ghi chú'
        else if (field === 'schedule') return 'Lịch trình'
        else if (field === 'service') return 'Dịch vụ bao gồm'
        else if (field === 'places') return 'Điểm đến'
        else return ''
    }
    return (
        <div className='w-full px-6 pt-20 pb-10 xl:pt-7 xl:pb-20 lg:px-2 xl:pl-0 xl:pr-10 overflow-x-hidden'>
            <div className='pb-8 flex gap-5 items-center'>
                <div className='w-full flex justify-between gap-5 xl:gap-10'>
                    <div className='font-prata text-neutral-1-900 font-semibold text-header-1 border-b-2 border-neutral-2-200 pb-1 w-full px-4 rounded-xl shadow-title xl:text-heading-4'>{ isEdit ? 'Tạo Đề xuất mới' : 'Thông tin Đề xuất'}</div>
                    { isEdit ? 
                        <SelectInput options={types} myStyle='w-[124px] uppercase tracking-wide' style3={true} placeholder={types[0].value} />
                        : <div className='font-prata pt-2 px-[10px] rounded-md bg-accent-4 uppercase text-white font-semibold text-body-1 tracking-[.14em] md:text-title-2'>{request?.typ}</div>
                    }
                </div> 
            </div>
            { isEdit ? <></>
            : 
            <>
            {/* <div className='mb-3 ml-auto px-2 py-1 w-fit flex items-center gap-4 rounded-md bg-gradient-to-l from-background-7 to-background-6 text-caption-1 xl:text-body-2'>
                <div className='flex gap-2 items-center text-accent-8'>
                    <FaCheck className='text-[14px] ' />
                    <div className='font-semibold whitespace-pre-wrap'>{request?.status}</div>
                </div>
                <div className='italic text-accent-8'>{splitDateTime(request?.date)[0]} {splitDateTime(request?.date)[1]}</div>
            </div> */}
            <div className='ml-auto px-2 py-1 w-fit flex items-center gap-4 rounded-md bg-gradient-to-l from-neutral-3-200 to-neutral-3-50 text-caption-1 xl:text-body-2'>
                <div className='flex gap-2 items-center text-neutral-1-500'>
                    <FaClockRotateLeft className='text-[14px]' />
                    <div className='font-semibold'>Ngày gửi</div>
                </div>
                {request.date && <div className='italic text-neutral-1-400'>{splitDateTime(request.date)[0]} {splitDateTime(request.date)[1]}</div>}
            </div></>
            }
            <div className='mt-6 relative text-body-2 text-neutral-1-900 flex flex-col gap-6 mx-auto px-4 py-6 border-[3px] border-secondary-2 rounded-b-2xl rounded-tr-2xl xl:text-body-1'>
                <div className='absolute -top-6 left-0.5 bg-gradient-to-tr from-secondary-2 to-accent-4 border border-white outline-offset-2 outline outline-[3px] outline-secondary-2 rounded-t-xl w-[100px] h-5'></div>
                <div className='grid grid-rows-2 gap-6 md:grid-rows-1 md:grid-cols-2'>
                    <div className='flex flex-wrap gap-2 items-center'>
                        <div className='font-semibold'>Mã tour: </div>
                        <div className='font-normal'>{request?.tour_ID}</div>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div className='font-semibold whitespace-nowrap'>Tình trạng:</div>
                        {request?.tour_info?.isActive? 
                            <div className="flex items-center gap-[6px]">
                                <div className='w-2 h-2 rounded-full bg-[#1ABB9C]'></div>
                                Active
                            </div>
                            :
                            <div className="flex items-center gap-[6px]">
                                <div className='w-2 h-2 rounded-full bg-accent-3'></div>
                                Inactive
                            </div>
                        }
                    </div>  
                </div>
                <div className='flex flex-wrap gap-2 items-center'>
                    <div className='font-semibold'>Tên chương trình: </div>
                    {isEdit? 
                        <InputForm 
                            invalidFields={invalidFields} 
                            setInvalidFields={setInvalidFields}  
                            value={payload.name}
                            setValue={setPayload} 
                            keyPayload={'name'}
                            width='w-52 md:w-[550px] xl:w-[980px]'
                            style2={true}
                        />
                        :
                        <div className='font-normal'>{request?.tour_info?.name}</div>
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
                        <div className='font-norma'>{Number(request?.tour_info?.price).toLocaleString()} VNĐ</div>
                    }
                </div>
                <div className='grid grid-rows-2 gap-6 md:grid-rows-1 md:grid-cols-2'>
                    <div className='flex gap-2 items-center'>
                        <div className='font-semibold'>Ngày khởi hành:</div>
                        {isEdit? 
                            <Datepicker width='w-[148px]' height='h-7' top='top-[6px]' outline min={true} defaultValue={defaultDate} keyPayload='starting_date' setValue={setPayload} />
                            :
                            request && <div className='font-normal'>{splitDate(request.tour_info?.starting_date)[0]}/{splitDate(request.tour_info?.starting_date)[1]}/{splitDate(request?.tour_info?.starting_date)[2]}</div>
                        }
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div className='font-semibold'>Hạn chót đặt tour:</div>
                        {isEdit? 
                            <Datepicker width='w-[148px]' height='h-7' top='top-[6px]' outline min={true} defaultValue={defaultBookingDl} keyPayload='bookingDeadline' setValue={setPayload} />
                            :
                            request && <div className='font-normal'>{splitDate(request.tour_info?.bookingDeadline)[0]}/{splitDate(request.tour_info?.bookingDeadline)[1]}/{splitDate(request?.tour_info?.bookingDeadline)[2]}</div>
                        }
                    </div>
                </div>
                <div className='flex gap-2 items-center'>
                    <div className='font-semibold'>Xuất phát:</div>
                    {isEdit? 
                        <SelectInput options={newProvinces} myStyle='w-40 xl:w-52' style2={true} placeholder={payload.departure} />
                        :
                        <div className='font-normal'>{request?.tour_info?.departure}</div>
                    }
                </div>
                <div className='flex flex-wrap gap-2 items-center'>
                    <div className='font-semibold'>Điểm đến:</div>
                    {isEdit? 
                        <>
                            {destination?.map((item, i) => {
                                if (item !== '') {
                                    return (
                                    <div className='relative' key={i + 1}>
                                        {newPlaces?.length > 0 && <SelectInput options={newPlaces} myStyle='w-28 xl:w-52' style2={true} placeholder={item} />}
                                        {i > 0 && 
                                            <div className="bg-white flex items-center justify-center cursor-pointer absolute -top-2 -right-2" onClick={() => handle_delDestination(i)}>
                                                <i className="twi-22-x-circle-fill text-[17px] text-accent-3 text-center"></i>
                                            </div>
                                        }
                                    </div>
                                    )
                                }
                                return null;
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
                            vehicles?.map((item, idx) => {
                                if (payload.vehicle.includes(item)) {
                                    return (
                                        <label key={idx} className='gap-1'>
                                            <input type="radio" name="vehicle" value={item} className='w-2 h-2 md:w-3 md:h-3 accent-black cursor-pointer' defaultChecked={true}/>
                                            {' ' + item}
                                        </label>
                                    )
                                }
                                else {
                                    return (
                                        <label key={idx} className='gap-1'>
                                            <input type="radio" name="vehicle" value={item} className='w-2 h-2 md:w-3 md:h-3 accent-black cursor-pointer'
                                                onChange={(e) => setPayload(prev => ({...prev, 'vehicle': e.target.value}))}
                                            />
                                            {' ' + item}
                                        </label>
                                    )
                                }
                            })
                            :
                            <div className='font-normal'>{request?.tour_info?.vehicle}</div>
                        }
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='font-semibold'>Lịch trình:</div>
                    <div className='pl-5 flex gap-2 items-center xl:pl-10'>
                        <div className='font-semibold'>Số ngày:</div>
                        {isEdit? 
                            <>
                                <InputForm 
                                    invalidFields={invalidFields} 
                                    setInvalidFields={setInvalidFields}  
                                    value={payload.day_num}
                                    setValue={setPayload} 
                                    keyPayload={'day_num'}
                                    width='w-16'
                                    type='number'
                                    min={1}
                                    style2={true}
                                />ngày
                                <InputForm 
                                    invalidFields={invalidFields} 
                                    setInvalidFields={setInvalidFields}  
                                    value={payload.night_num}
                                    setValue={setPayload} 
                                    keyPayload={'night_num'}
                                    width='w-16'
                                    type='number'
                                    min={1}
                                    style2={true}
                                />đêm
                            </>
                            :
                            <div className='font-normal'>{request?.tour_info?.day_num} ngày {request?.tour_info?.night_num} đêm</div>
                        }
                    </div>  
                    <div className='font-semibold pl-5 xl:pl-10'>Mô tả chi tiết:</div>
                    { isEdit ? 
                        <>{showSchedule()}</>
                        : 
                        request?.tour_info?.schedule?.map((item, i) => {
                            return (
                                <div key={i} className='pl-5 xl:pl-10'>
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
                            width='w-[275px] md:w-[615px] xl:w-[980px]'
                            style2={true}
                        />
                        :
                        <div className='font-normal'>{request?.tour_info?.note}</div>
                    }
                </div>
                <div className='flex gap-2 md:gap-5 xl:gap-8'>
                    <div className='font-semibold'>Dịch vụ bao gồm:</div>
                    <div className='flex flex-wrap justify-between gap-y-2 md:gap-5 xl:gap-10'>
                        {isEdit? 
                            services?.map((item, i) => {
                                if (requestService?.includes(item)) {
                                    return (
                                        <CheckedBox key={i} value={item} label={item} setValue={setRequestService} keyValue={requestService} color={'accent-black'}/>
                                    )
                                }
                                else {
                                    return (
                                        <div key={i} className='flex gap-1 items-center'>
                                            <input type="checkbox" value={item} className='w-3 h-3 xl:w-4 xl:h-4 accent-black'
                                                onChange={() => {setRequestService([...requestService, item])}}/>
                                            <div>{item}</div>
                                        </div>
                                    )
                                }
                            })
                        : 
                            request?.tour_info?.service?.map((item, idx) => {
                                return (
                                    <div key={idx} className='flex gap-1 items-center'>
                                        <FaCheck color={'black'} className='text-[14px] md:text-[16px]'/>
                                        <div>{item}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='font-semibold'>Đã thay đổi: </div>
                    { request?.edit_fields?.map((item, idx) => {
                        return (
                            <div key={idx} className='pl-5'>{getEditFields(item)} thành <span className='italic'>{request?.edit_info?.[item]}</span></div>
                        )
                    })}
                </div>
                { request?.typ === 'cancel'?
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
                :
                <></>}
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

export default RequestDetail
