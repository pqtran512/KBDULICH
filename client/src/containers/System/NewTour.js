import React, { useState } from 'react'
import { Button, InputForm, Datepicker } from '../../components';
import Swal from 'sweetalert2'

const NewTour = () => {
    const [invalidFields, setInvalidFields] = useState([])
    const [schedule, setSchedule] = useState([])
    const [service, setService] = useState([])
    const services = ['Bảo hiểm', 'Bữa ăn', 'Xe đưa đón', 'Hướng dẫn viên', 'Vé tham quan'] // available services
    const vehicles = ['Xe 4 chỗ', 'Xe 7 chỗ', 'Xe khách', 'Máy bay'] // available vehicles
    const [payload, setPayload] = useState({ 
        name: '',
        price: 0,
        departureDate: '', 
        departure: '',
        destination: [],
        vehicle: 'Xe 4 chỗ',
        dayNum: 1,
        tour_schedule: schedule,
        note: '',
        tour_service: service
    })
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
                <>
                <div>Ngày {i+1}:</div>
                <textarea id={i}
                    className={`w-full h-36 rounded-md p-3 bg-neutral-3-50 text-neutral-1-600`}
                    onChange={(e) => {
                        handleInputChange(e, e.currentTarget.id)
                    }}
                />
                <br/>
                </>
            );
        }
        invalidFields.length > 0 && invalidFields.some(i => i.name === 'tour_schedule')
            && indents.push(<div className='pt-1 text-title-2 text-accent-3'>{invalidFields.find(i => i.name === 'tour_schedule')?.message}</div>);
        
        return indents;
    };
    const handleSubmit = async () => {
        
        setPayload(prev => ({...prev, tour_service: service}))
        let invalids = validate(payload)
        if (invalids === 0)
            Swal.fire('Gửi thành công', '', 'success')
        
        console.log(payload)
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
                case 'departureDate':
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
                case 'tour_schedule':
                    if (item[1].length === 0) { 
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Bạn chưa nhập tất cả lịch trình !'
                        }])
                        invalids++
                    }
                    break;
                default:
                    break;
            }
        })
        return invalids
    }
    return (
        <div className='w-full px-6 pt-10 pb-20 lg:px-2 xl:pl-0 xl:pr-10 overflow-x-hidden'>
            <div className='pb-8 flex gap-5 items-center'>
                <div className='text-primary-2 font-semibold text-header-1 md:text-heading-4 xl:text-heading-3'>Thêm Tour mới</div>
            </div>
            <div className='text-body-1 text-neutral-1-900 flex flex-col gap-4'>
                <div className='flex gap-40'>
                    <div className='flex gap-2 items-center'>
                        <div className='font-semibold'>Tên chương trình: </div>
                        <InputForm 
                            invalidFields={invalidFields} 
                            setInvalidFields={setInvalidFields}  
                            value={payload.name}
                            setValue={setPayload} 
                            keyPayload={'name'}
                            width='w-96'
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
                        /> VNĐ
                    </div>    
                </div>
                <div className='flex gap-2 items-center'>
                    <div className='font-semibold'>Ngày khởi hành:</div>
                    <Datepicker width='w-40'
                        // defaultValue={payload.departureDate}
                        // value={payload.departureDate}
                        setValue={setPayload} 
                        keyPayload={'departureDate'}
                        textColor='text-neutral-1-600'
                        bgColor='bg-neutral-3-50'
                    />
            </div>
                <div className='flex gap-2 items-center'>
                    <div className='font-semibold'>Xuất phát:</div>
                    <InputForm 
                        invalidFields={invalidFields} 
                        setInvalidFields={setInvalidFields}  
                        value={payload.departure}
                        setValue={setPayload} 
                        keyPayload={'departure'}
                        width='w-52'
                    />
                </div>
                <div className='flex gap-2 items-center'>
                    <div className='font-semibold'>Điểm đến:</div>
                    <InputForm 
                        invalidFields={invalidFields} 
                        setInvalidFields={setInvalidFields}  
                        value={payload.destination}
                        setValue={setPayload} 
                        keyPayload={'destination'}
                        width='w-96'
                    />
                </div>
                <div className='flex gap-16 items-center'>
                    <div className='font-semibold'>Phương tiện:</div>
                    { vehicles?.map(item => {
                        if (payload.vehicle.includes(item)) {
                            return (
                                <div className='flex gap-1 items-center'>
                                    <input type="radio" name="vehicle" value={item} className='w-5 h-5 accent-primary-1 cursor-pointer' checked/>
                                    <div>{item}</div>
                                </div>
                            )
                        }
                        else {
                            return (
                                <div className='flex gap-1 items-center'>
                                    <input type="radio" name="vehicle" value={item} className='w-5 h-5 accent-primary-1 cursor-pointer'
                                        onChange={(e) => setPayload(prev => ({...prev, 'vehicle': e.target.value}))}
                                    />
                                    <div>{item}</div>
                                </div>
                            )
                        }
                    })}
                </div>
                <div>
                    <div className='font-semibold'>Lịch trình:</div>
                    <div className='pl-10 flex gap-2 items-center'>
                        <div className='font-semibold'>Số ngày:</div>
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
                    </div>  
                    <div className='pl-10 font-semibold'>Mô tả chi tiết:</div>
                        <>{showSchedule()}</>
                </div>
                <div className='flex gap-2 items-center'>
                    <div className='font-semibold'>Ghi chú:</div>
                    <InputForm 
                        invalidFields={invalidFields} 
                        setInvalidFields={setInvalidFields}  
                        value={payload.note}
                        setValue={setPayload} 
                        keyPayload={'note'}
                        width='w-96'
                    />
                </div>
                <div className='flex gap-8'>
                    <div className='font-semibold'>Dịch vụ bao gồm:</div>
                    { services?.map(item => {
                        return (
                            <div className='flex gap-1 items-center'>
                                <input type="checkbox" value={item} className='w-5 h-5 accent-primary-1'
                                    onChange={(e) => {setService([...service, item])}}
                                />
                                <div>{item}</div>
                            </div>
                        )
                    })}
                </div>
                {/* isManager ?
                <div className='font-semibold'>Nhân viên đảm nhận: <span className='font-normal'>Không</span></div> */}
            </div>
            <div className='pt-10 flex gap-10 justify-center items-center'>
                <Button text='Gửi đề xuất' textColor='text-white' bgColor='bg-primary-2' onClick={handleSubmit}/>
            </div>
        </div>
    )
}

export default NewTour
