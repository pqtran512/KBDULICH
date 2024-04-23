import React, { useState, useEffect } from 'react'
import { Button2, InputForm, Datepicker, SelectInput } from '../../components';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

const TourNew = () => {
    const navigate = useNavigate()
    const [invalidFields, setInvalidFields] = useState([])
    const [schedule, setSchedule] = useState([])
    const [service, setService] = useState([])
    const services = ['Bảo hiểm', 'Bữa ăn', 'Xe đưa đón', 'Hướng dẫn viên', 'Vé tham quan'] // available services
    const vehicles = ['Xe 4 chỗ', 'Xe 7 chỗ', 'Xe khách', 'Máy bay'] // available vehicles
    const [destination, setDestination] = useState([])
    const [payload, setPayload] = useState({ 
        id: '',
        name: '',
        price: 0,
        departureDate: '', 
        departure: '',
        destination: destination,
        vehicle: 'Xe 4 chỗ',
        dayNum: 1,
        tour_schedule: schedule,
        note: '',
        tour_service: service
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
    useEffect(() => {
        let newSchedule = schedule;
        if (schedule.length < payload.dayNum) {
            newSchedule[payload.dayNum - 1] = '';
        }
        setSchedule(newSchedule);
    }, [payload.dayNum, schedule]);
    const handleInputChange = (e, index) => {
        if (schedule.length <= index) {
            setSchedule([...schedule, e.target.value])
        }
        else {
            let newSchedule = schedule;
            newSchedule[index] = e.target.value;
            setSchedule(newSchedule);
        }
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
                        onChange={(e) => {
                            handleInputChange(e, e.currentTarget.id)
                        }}
                        onFocus={() => setInvalidFields([])}
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
        console.log(delDes)
        setDestination(delDes)
    }
    const handleSubmit = async () => {
        setPayload(prev => ({...prev, tour_service: service}))
        let invalids = validate(payload)
        if (invalids === 0) {
            Swal.fire('Gửi thành công', '', 'success').then((result) => {
                navigate('/manager/staff/tour')
            })
            // console.log(payload)
        }
    };
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
                case 'departure':
                    if (item[1] === '') { // item[1] is the value field
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Bạn chưa nhập điểm xuất phát !'
                        }])
                        invalids++
                    }
                    break;
                case 'tour_schedule':
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
    return (
        <div className='w-full px-6 pt-20 pb-10 xl:pt-7 xl:pb-20 lg:px-2 xl:pl-0 xl:pr-10 overflow-x-hidden'>
            <div className='font-prata text-neutral-1-900 font-semibold text-header-1 border-b-2 border-neutral-2-200 pb-1 w-full px-4 rounded-xl shadow-title xl:text-heading-4'>Thêm Tour mới</div>
            <div className='relative mt-16 text-body-2 text-neutral-1-900 flex flex-col gap-6 mx-auto px-4 py-6 border-[3px] border-secondary-2 rounded-b-2xl rounded-tr-2xl xl:text-body-1'>
                <div className='absolute -top-6 left-0.5 bg-gradient-to-tr from-secondary-2 to-accent-4 border border-white outline-offset-2 outline outline-[3px] outline-secondary-2 rounded-t-xl w-[100px] h-5'></div>
                <div className='flex flex-col gap-6 xl:flex-row xl:justify-between'>
                    <div className='flex gap-2 items-center xl:gap-[73px]'>
                        <div className='font-semibold'>Mã tour: </div>
                        <InputForm 
                            invalidFields={invalidFields} 
                            setInvalidFields={setInvalidFields}  
                            value={payload.id}
                            setValue={setPayload} 
                            keyPayload={'id'}
                            placeholder='Nhập mã Tour'
                            width='w-40'
                            style2={true}
                        />
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div className='font-semibold'>Tên chương trình: </div>
                        <InputForm 
                            invalidFields={invalidFields} 
                            setInvalidFields={setInvalidFields}  
                            value={payload.name}
                            setValue={setPayload} 
                            keyPayload={'name'}
                            placeholder='Nhập tên Tour'
                            width='w-52 xl:w-96'
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
                        <div className='font-semibold'>{Number(payload.price).toLocaleString()} </div>
                            VNĐ
                    </div>    
                </div>
                <div className='flex gap-[18px] items-center'>
                    <div className='font-semibold'>Ngày khởi hành:</div>
                    <Datepicker width='w-[148px]' height='h-7' top='top-[6px]' outline min={true}/>
            </div>
                <div className='flex items-center gap-2 xl:gap-[63px]'>
                    <div className='font-semibold'>Xuất phát:</div>
                    <SelectInput 
                        options={province} 
                        myStyle='w-40 xl:w-52' 
                        placeholder={'Chọn tỉnh'}
                        setValue={setPayload} 
                        keyPayload={'departure'} 
                        invalidFields={invalidFields} 
                        setInvalidFields={setInvalidFields}
                        style2={true}
                    />
                </div>
                <div className='flex flex-wrap gap-2 items-center'>
                    <div className='font-semibold xl:pr-14'>Điểm đến:</div>
                    <SelectInput 
                        options={province} 
                        myStyle='w-40 xl:w-52'
                        placeholder={'Chọn tỉnh'} 
                        // setValue={setPayload} 
                        // keyPayload={'departure'}
                        invalidFields={invalidFields} 
                        setInvalidFields={setInvalidFields}
                        style2={true}
                    />
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
                    <div className='cursor-pointer rounded-md bg-black text-white text-[16px] text-center w-4 pb-1 ml-2 hover:bg-accent-5 hover:text-black xl:text-[20px] xl:w-5'
                        onClick={handle_addDestination}>+</div>     
                </div>
                <div className='flex gap-4 items-center xl:gap-11'>
                    <div className='font-semibold whitespace-nowrap'>Phương tiện:</div>
                    <div className='flex flex-wrap gap-x-8 gap-y-2 xl:gap-16'>
                        { vehicles?.map(item => {
                            if (payload.vehicle.includes(item)) {
                                return (
                                    <div className='flex gap-1 items-center'>
                                        <input type="radio" name="vehicle" value={item} className='w-3 h-3 accent-black cursor-pointer' checked/>
                                        <div>{item}</div>
                                    </div>
                                )
                            }
                            else {
                                return (
                                    <div className='flex gap-1 items-center'>
                                        <input type="radio" name="vehicle" value={item} className='w-3 h-3 accent-black cursor-pointer'
                                            onChange={(e) => setPayload(prev => ({...prev, 'vehicle': e.target.value}))}
                                        />
                                        <div>{item}</div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='font-semibold'>Lịch trình:</div>
                    <div className='pl-5 flex gap-2 items-center xl:pl-10'>
                        <div className='font-semibold'>Số ngày:</div>
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
                    </div>  
                    <div className='font-semibold pl-5 xl:pl-10'>Mô tả chi tiết:</div>
                        <>{showSchedule()}</>
                </div>
                <div className='flex gap-2 items-center justify-between'>
                    <div className='font-semibold'>Ghi chú:</div>
                    <InputForm 
                        invalidFields={invalidFields} 
                        setInvalidFields={setInvalidFields}  
                        value={payload.note}
                        setValue={setPayload} 
                        keyPayload={'note'}
                        width='w-[275px] md:w-[615px] xl:w-[1060px]'
                        style2={true}
                    />
                </div>
                <div className='flex gap-2 md:gap-5 xl:gap-8'>
                    <div className='font-semibold'>Dịch vụ bao gồm:</div>
                    <div className='flex flex-wrap justify-between gap-y-2 md:gap-5 xl:gap-16'>
                        { services?.map(item => {
                            return (
                                <div className='flex gap-1 items-center'>
                                    <input type="checkbox" value={item} className='w-3 h-3 xl:w-4 xl:h-4 accent-black'
                                        onChange={(e) => {setService([...service, item])}}
                                    />
                                    <div>{item}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className='pt-6 xl:pt-10 flex gap-10 justify-center items-center'>
                <Button2 text='Gửi đề xuất' textColor='text-white' bgColor='bg-[#363837]' onClick={handleSubmit}/>
                <Button2 text='Hủy' textColor='text-white' bgColor='bg-accent-3' onClick={() => navigate('/staff/tour')}/>
            </div>
        </div>
    )
}

export default TourNew
