import React, { useState, useEffect } from 'react'
import { Button2, InputForm, CheckedBox, Datepicker, SelectInput } from '../../components';
import CustomerList from './CustomerList';
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getTour } from '../../store/actions/tourAction'

const EditTour = () => {
    // PARAMS
    const {tourID} = useParams();
    const dispatch = useDispatch()
    const { tour } = useSelector(state => state.tour)
    const navigate = useNavigate()
    const [invalidFields, setInvalidFields] = useState([])
    const [tourSchedule, setTourSchedule] = useState([])
    const [tourService, setTourService] = useState([])
    const services = ['Bảo hiểm', 'Bữa ăn', 'Xe đưa đón', 'Hướng dẫn viên', 'Vé tham quan'] // available services
    const vehicles = ['Xe 4 chỗ', 'Xe 7 chỗ', 'Xe khách', 'Máy bay'] // available vehicles
    const [destination, setDestination] = useState(['Bà Nà Hills', 'Cầu Rồng', 'Bán Đảo Sơn Trà'])
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
        staff: 'Nguyễn Thị Anh'
    })
    const [maxDay, setMaxDay] = useState(0)
    const [defaultDate, setDefaultDate] = useState('')
    const staffList = [
        { value: 'Nguyễn Thị Anh', label: 'Nguyễn Thị Anh' },
        { value: 'Trần Thị Bình', label: 'Trần Thị Bình' },
        { value: 'Phan Thanh Vy', label: 'Phan Thanh Vy' },
        { value: 'Lê Ngọc Ý', label: 'Lê Ngọc Ý' }
    ]
    const placeDaNang = [
        { value: 'Bà Nà Hills', label: 'Bà Nà Hills'},
        { value: 'Cầu Rồng', label: 'Cầu Rồng'},
        { value: 'Bán Đảo Sơn Trà', label: 'Bán Đảo Sơn Trà'}
    ]
    const provinceOption = [
        { value: 'An Giang', label: 'An Giang' },
        { value: 'Bình Thuận', label: 'Bình Thuận'},
        { value: 'Đà Nẵng', label: 'Đà Nẵng'},
        { value: 'Thành phố Hồ Chí Minh', label: 'Thành phố Hồ Chí Minh'}
    ]
    const [role, setRole] = useState('')
    // FUNCTIONS
    useEffect(() => {
        if (tour.name) { setPayload(prev => ({...prev, name: tour.name})) }
        if (tour.price) { setPayload(prev => ({...prev, price: tour.price})) }
        if (tour.departure) { setPayload(prev => ({...prev, departure: tour.departure})) }
        if (tour.vehicle) { setPayload(prev => ({...prev, vehicle: tour.vehicle})) }
        if (tour.schedule) { setTourSchedule(tour.schedule) }
        if (tour.service) { setTourService(tour.service) }
        if (tour.seat_num) { setPayload(prev => ({...prev, seat_num: tour.seat_num})) }
        if (tour.night_num) { setPayload(prev => ({...prev, night_num: tour.night_num})) }
        if (tour.day_num) { 
            setPayload(prev => ({...prev, day_num: tour.day_num})) 
            setMaxDay(Math.max(payload.day_num, payload.night_num))
        }
        if (tour.starting_date) { 
            setPayload(prev => ({...prev, starting_date: tour.starting_date}))
            const [year, month, day] = tour.starting_date.split('-');
            const myDate = new Date(Date.UTC(year, month - 1, day)); 
            setDefaultDate(myDate)
        }
    }, [tour])
    useEffect(() => {
        dispatch(getTour({tour_ID: tourID}))
    }, [dispatch, tourID])
    useEffect(() => {
        const max = Math.max(payload.day_num, payload.night_num)
        setMaxDay(max)
        let newSchedule = tourSchedule;
        if (tourSchedule?.length < max) {
            newSchedule[max - 1] = '';
        }
        else {
            newSchedule = tourSchedule?.slice(0, max);
        }
        setTourSchedule(newSchedule);
    }, [payload.day_num, payload.night_num]);
    const handleInputChange = (e, index) => {
        let newSchedule = tourSchedule;
        newSchedule[index] = e.target.value;
        setTourSchedule(newSchedule);
        setPayload(prev => ({...prev, schedule: tourSchedule}))
    };
    const splitNote = (paragraph) => {
        const indexOfNote = paragraph.indexOf("Ghi chú:");
        // Split the paragraph into two parts
        const beforeNote = paragraph.slice(0, indexOfNote).trim();
        const afterNote = paragraph.slice(indexOfNote + "Ghi chú:".length).trim();
        return [beforeNote, afterNote];
    }
    useEffect(() => {
        if (tour.schedule?.length > 0) {
            const afterNote = tour && splitNote(tour.schedule[tour.schedule.length - 1])[1]
            const newNote = tour.note === 'No note'? afterNote : `${tour.note}\n- ${afterNote}`;
            setPayload(prev => ({...prev, note: newNote}))
        }
    }, [tour])
    const showSchedule = () => {
        var indents = [];
        for (var i = 0; i < maxDay; i++) {
            indents.push(
                <div key={i} className='pl-5 xl:pl-10'>
                    <div className='italic'>Ngày {i+1}:</div>
                    <textarea id={i}
                        className={`w-full h-28 rounded-md p-3 bg-neutral-3-50 text-neutral-1-600`}
                        defaultValue={tourSchedule[i]}
                        onChange={(e) => {
                            handleInputChange(e, e.currentTarget.id)
                        }}
                        onFocus={() => {setInvalidFields([])}}
                        spellCheck="false"
                    />
                </div>
            );
        }
        invalidFields.length > 0 && invalidFields.some(i => i.name === 'tour_schedule')
            && indents.push(<div className='pt-1 text-title-2 text-accent-3'>{invalidFields.find(i => i.name === 'tour_schedule')?.message}</div>);
        
        return indents;
    };
    const handle_addDestination = () => {
        const newDes = [...destination, placeDaNang[0].value];
        setDestination(newDes)
    }
    const handle_delDestination = (i) => {
        const delDes = [...destination];
        delDes.splice(i, 1)
        setDestination(delDes)
    }
    const validate = (payload) => {
        let invalids = 0 // number of invalid fields
        let fields = Object.entries(payload) // tranform an object {key: value} to array [key, value]
        fields.forEach(item => {
            switch (item[0]) {
                case 'name':
                    if (item[1] === '') { // item[1] is the value field
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Bạn chưa nhập tên Tour !'
                        }])
                        invalids++
                    }
                    break;
                case 'price':
                    if (item[1] === '') { // item[1] is the value field
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Bạn chưa nhập giá Tour !'
                        }])
                        invalids++
                    }
                    break;
                case 'starting_date':
                    if (item[1] === '') { // item[1] is the value field
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Bạn chưa chọn ngày khởi hành !'
                        }])
                        invalids++
                    }
                    break;
                case 'departure':
                    if (item[1] === '') { // item[1] is the value field
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Bạn chưa nhập điểm xuất phát !'
                        }])
                        invalids++
                    }
                    break;
                case 'schedule':
                    for (let i = 0; i < item[1].length; i++) {
                        if (item[1][i] === '') { 
                            setInvalidFields(prev => [...prev, {
                                name: item[0],
                                message: 'Bạn chưa nhập lịch trình ngày ' + (i+1) + ' !'
                            }])
                            invalids++
                        }
                    } 
                    break;
                default:
                    break;
            }
        })
        return invalids
    }
    const submitEdit = async () => {
        setPayload(prev => ({...prev, tour_destination: destination}))
        setPayload(prev => ({...prev, service: tourService}))
        let invalids = validate(payload)
        console.log(payload)
        if (invalids === 0){
            if (role === 'staff') {
                Swal.fire('Gửi thành công', '', 'success').then((result) => {
                    navigate('/staff/tour-detail')
                })
            }
            else {
                Swal.fire('Đã cập nhật thông tin mới', '', 'success').then((result) => {
                    navigate('/manager/tour-detail')
                })
            }
        }
    };
    useEffect(() => {
        if (window.location.pathname.includes("manager")){
            setRole('manager');
        }
        else if (window.location.pathname.includes("/staff/tour-edit")) {
            setRole('staff');
        }
    }, []);
    return (
        <div className='w-full px-6 pt-20 pb-10 xl:pt-7 xl:pb-20 lg:px-2 xl:pl-0 xl:pr-10 overflow-x-hidden'>
            <div className='pb-16'>
                <div className='font-prata text-neutral-1-900 font-semibold text-header-1 border-b-2 border-neutral-2-200 pb-1 w-full px-4 rounded-xl shadow-title xl:text-heading-4'>Chỉnh sửa thông tin Tour</div>
            </div>
            <div className='relative text-body-2 text-neutral-1-900 flex flex-col gap-6 mx-auto px-4 py-6 border-[3px] border-secondary-2 rounded-b-2xl rounded-tr-2xl xl:text-body-1'>
                <div className='absolute -top-6 left-0.5 bg-gradient-to-tr from-secondary-2 to-accent-4 border border-white outline-offset-2 outline outline-[3px] outline-secondary-2 rounded-t-xl w-[100px] h-5'></div>
                <div className='grid grid-rows-2 gap-6 md:grid-rows-1 md:grid-cols-2'>
                    <div className='flex flex-wrap gap-2 items-center'>
                        <div className='font-semibold'>Mã tour: </div>
                        <div className='font-normal'>{tour.tour_ID}</div>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div className='font-semibold whitespace-nowrap'>Tình trạng:</div>
                        {tour.isActive? 
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
                <div className='flex flex-wrap justify-between items-center'>
                    <div className='font-semibold'>Tên chương trình: </div>
                    <InputForm 
                        invalidFields={invalidFields} 
                        setInvalidFields={setInvalidFields}  
                        value={payload.name}
                        setValue={setPayload} 
                        keyPayload={'name'}
                        width='w-52 md:w-[550px] xl:w-[1000px]'
                        style2={true}
                    />
                </div>
                <div className='flex gap-2 items-center'>
                    <div className='font-semibold'>Giá: </div>
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
                    <div className='font-semibold'>{Number(payload.price).toLocaleString()} </div>VNĐ
                </div>
                <div className='grid grid-rows-2 gap-6 md:grid-rows-1 md:grid-cols-2'>
                    <div className='flex gap-2 items-center'>
                        <div className='font-semibold'>Ngày khởi hành:</div>
                        <Datepicker width='w-[148px]' height='h-7' top='top-[6px]' outline min={true} defaultValue={defaultDate} keyPayload='starting_date' setValue={setPayload} />
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div className='font-semibold'>Hạn chót đặt tour:</div>
                        <Datepicker width='w-[148px]' height='h-7' top='top-[6px]' outline min={true} defaultValue={defaultDate} keyPayload='bookingDeadline' setValue={setPayload} />
                    </div>
                </div>
                <div className='flex gap-2 items-center'>
                    <div className='font-semibold'>Xuất phát:</div>
                    <SelectInput options={provinceOption} myStyle='w-40 xl:w-52' style2={true} placeholder={payload.departure} keyPayload='departure' setValue={setPayload} />
                </div>
                <div className='flex flex-wrap gap-2 items-center'>
                    <div className='font-semibold'>Điểm đến:</div>
                    {destination?.map((item, i) => {
                        if (item !== '') {
                            return (
                            <div className='relative' key={i + 1}>
                                <SelectInput options={placeDaNang} myStyle='w-28 xl:w-40' style2={true} placeholder={item} />
                                <div className="bg-white flex items-center justify-center cursor-pointer absolute -top-2 -right-2" onClick={() => handle_delDestination(i)}>
                                    <i className="twi-22-x-circle-fill text-[17px] text-accent-3 text-center"></i>
                                </div>
                            </div>
                            )
                        }
                        return null;
                    })}
                    <div className='cursor-pointer rounded-md bg-black text-white text-[20px] text-center w-5 pb-1 ml-2 hover:bg-accent-5 hover:text-black'
                        onClick={handle_addDestination}>+</div>    
                </div>
                <div className='flex gap-2 items-center'>
                    <div className='font-semibold whitespace-nowrap'>Phương tiện:</div>
                    <div className='flex flex-wrap gap-x-8 gap-y-2 xl:gap-16'>
                        { vehicles?.map((item, i) => {
                                if (payload.vehicle?.includes(item)) {
                                    return (
                                        <label key={i}><input type="radio" name="vehicle" value={item} className='w-2 h-2 md:w-3 md:h-3 accent-black cursor-pointer' checked/>
                                        {' ' + item}</label>
                                    )
                                }
                                else {
                                    return (
                                        <label key={i}><input type="radio" name="vehicle" value={item} className='w-2 h-2 md:w-3 md:h-3 accent-black cursor-pointer'
                                                onChange={(e) => setPayload(prev => ({...prev, 'vehicle': e.target.value}))}
                                        />{' ' + item}</label>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
                <div className='flex gap-2 items-center'>
                    <div className='font-semibold'>Số ghế:</div>
                    <InputForm 
                        invalidFields={invalidFields} 
                        setInvalidFields={setInvalidFields}  
                        value={payload.seat_num}
                        setValue={setPayload} 
                        keyPayload={'seat_num'}
                        width='w-16'
                        type='number'
                        min={1}
                        style2={true}
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='font-semibold'>Lịch trình:</div>
                    <div className='pl-5 flex gap-2 items-center xl:pl-10'>
                        <div className='font-semibold'>Số ngày:</div>
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
                    </div>  
                    <div className='font-semibold pl-5 xl:pl-10'>Mô tả chi tiết:</div>
                    <>{tour.schedule? showSchedule() : <></>}</>
                </div>
                <div className='flex flex-wrap gap-2 items-center'>
                    <div className='font-semibold'>Ghi chú:</div>
                    <InputForm 
                        invalidFields={invalidFields} 
                        setInvalidFields={setInvalidFields}  
                        value={payload.note}
                        setValue={setPayload} 
                        keyPayload={'note'}
                        width='w-[275px] md:w-[615px] xl:w-[1075px]'
                        style2={true}
                    />
                </div>
                <div className='flex gap-2 md:gap-5 xl:gap-8'>
                    <div className='font-semibold'>Dịch vụ bao gồm:</div>
                    <div className='flex flex-wrap justify-between gap-y-2 md:gap-5 xl:gap-16'>
                        { tourService.length > 0 && services?.map((item, i) => {
                                if (tourService.includes(item)) {
                                    return (
                                        <CheckedBox key={i} value={item} label={item} setValue={setTourService} keyValue={tourService} color={'accent-black'}/>
                                    )
                                }
                                else {
                                    return (
                                        <div key={i} className='flex gap-1 items-center'>
                                            <input type="checkbox" value={item} className='w-3 h-3 xl:w-4 xl:h-4 accent-black'
                                                onChange={() => {setTourService([...tourService, item])}}/>
                                            <div>{item}</div>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
                {role === 'staff' ? <></>
                    : 
                    <div className='flex gap-2 items-center'>
                        <div className='font-semibold'>Nhân viên đảm nhận:</div>
                        {/* data */}
                        {/* <SelectInput options={staffList} myStyle='w-64' placeholder={payload.staff}/>  */}
                    </div>
                }
                <div className='flex gap-2 items-center'>
                    <div className='font-semibold'>Rating:</div>
                    <div className='font-normal'>4.0</div> {/* data */} 
                </div>
            </div>
            
            <div className='flex gap-10 justify-center items-center pt-6 xl:pt-10'>
                <Button2 text={`${role === 'staff' ? 'Gửi đề xuất' : 'Xác nhận'} `} textColor='text-white' bgColor='bg-[#363837]' onClick={submitEdit}/>
                <Button2 text='Hủy' textColor='text-white' bgColor='bg-accent-3' onClick={() => {
                    if (role === 'staff')
                        navigate('/staff/tour')
                    else navigate('/manager/tour')
                }}/>
            </div>
            { role === 'staff' ? <CustomerList /> : <></> }
            
        </div>
    )
}

export default EditTour
