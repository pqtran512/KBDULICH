import React, { useState } from 'react'
import { Button2, InputForm, Datepicker } from '../../components';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

const StaffNew = () => {
    const navigate = useNavigate()
    const [invalidFields, setInvalidFields] = useState([])
    const sexes = ['Nam', 'Nữ'] // available vehicles
    const [payload, setPayload] = useState({
        fname: '',
        lname: '',
        sex: 'Nam',
        birthday: new Date(), 
        phone: ''
    })
    const handleSubmit = async () => {
        let invalids = validate(payload)
        if (invalids === 0)
            Swal.fire('Thêm nhân viên thành công', '', 'success').then((result) => {
                navigate('/manager/staff')
            })
    };
    const validate = (payload) => {
        let invalids = 0 // number of invalid fields
        let fields = Object.entries(payload) // tranform an object {key: value} to array [key, value]
        fields.forEach(item => {
            switch (item[0]) {
                case 'fname':
                    if (item[1] === '') { // item[1] is the value field
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Bạn chưa nhập tên !'
                        }])
                        invalids++
                    }
                    break;
                case 'lname':
                    if (item[1] === '') { // item[1] is the value field
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Bạn chưa nhập họ !'
                        }])
                        invalids++
                    }
                    break;
                case 'birthday':
                    if (item[1] === '') { // item[1] is the value field
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Bạn chưa chọn ngày khởi hành !'
                        }])
                        invalids++
                    }
                    break;
                case 'phone':
                    if (item[1] === '') { // item[1] is the value field
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Bạn chưa nhập số điện thoại !'
                        }])
                        invalids++
                    }
                    else {
                        if (!(/^[0-9]+$/.test(item[1]))) {
                            setInvalidFields(prev => [...prev, {
                                name: item[0],
                                message: 'Số điện thoại không hợp lệ !'
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
            <div className='font-prata text-neutral-1-900 font-semibold text-header-1 border-b-2 border-neutral-2-200 pb-1 w-full px-4 rounded-xl shadow-title xl:text-heading-4'>Thêm nhân viên mới</div>
            <div className='relative mt-16 text-body-1 text-neutral-1-900 flex flex-col md:flex-row md:justify-between xl:justify-start xl:flex-col gap-6 mx-auto px-4 py-6 border-[3px] border-secondary-2 rounded-b-2xl rounded-tr-2xl xl:text-body-1'>
                <div className='absolute -top-6 left-0.5 bg-gradient-to-tr from-secondary-2 to-accent-4 border border-white outline-offset-2 outline outline-[3px] outline-secondary-2 rounded-t-xl w-[100px] h-5'></div>
                <div className='flex flex-col gap-6 xl:flex-row xl:justify-start xl:gap-40'>
                    <div className='flex gap-14 items-center'>
                        <div className='font-semibold'>Tên: </div>
                        <InputForm 
                            invalidFields={invalidFields} 
                            setInvalidFields={setInvalidFields}  
                            value={payload.fname}
                            setValue={setPayload} 
                            keyPayload={'fname'}
                            width='md:w-48 xl:w-52'
                            style2={true}
                            placeholder={'Nhập tên'}
                        />
                    </div>
                    <div className='flex gap-14 items-center'>
                        <div className='font-semibold'>Họ: </div>
                        <InputForm 
                            invalidFields={invalidFields} 
                            setInvalidFields={setInvalidFields}  
                            value={payload.lname}
                            setValue={setPayload} 
                            keyPayload={'lname'}
                            width='md:w-48 xl:w-52'
                            style2={true}
                            placeholder={'Nhập họ'}
                        />
                    </div>
                    <div className='flex gap-5 xl:gap-8 items-center'>
                        <div className='font-semibold'>Giới tính: </div>
                        { sexes?.map(item => {
                            if (payload.sex.includes(item)) {
                                return (
                                    <label><input type="radio" name="sex" value={item} className='w-2 h-2 md:w-3 md:h-3 accent-black cursor-pointer' checked/>
                                    {' ' + item}</label>
                                )
                            }
                            else {
                                return (
                                    <label><input type="radio" name="sex" value={item} className='w-2 h-2 md:w-3 md:h-3 accent-black cursor-pointer'
                                    onChange={(e) => setPayload(prev => ({...prev, 'sex': e.target.value}))}
                                    />{' ' + item}</label>
                                )
                            }
                        })}
                    </div>    
                </div>
                <div className='flex flex-col gap-6'>
                    <div className='flex gap-2 items-center'>
                        <div className='font-semibold'>Ngày sinh:</div>
                        <Datepicker width='w-48 xl:w-52'
                            // defaultValue={payload.departureDate}
                            // value={payload.departureDate}
                            setValue={setPayload} 
                            keyPayload={'departureDate'}
                            textColor='text-neutral-1-600'
                            bgColor='bg-neutral-3-50'
                            min={false}
                        />
                    </div>
                    <div className='flex gap-[50px] items-center'>
                        <div className='font-semibold'>SĐT:</div>
                        <InputForm 
                            invalidFields={invalidFields} 
                            setInvalidFields={setInvalidFields}  
                            value={payload.phone}
                            setValue={setPayload} 
                            keyPayload={'phone'}
                            width='w-48 xl:w-52'
                            style2={true}
                            placeholder={'Nhập số điện thoại'}
                        />
                    </div>
                </div>
            </div>
            <div className='pt-10 flex gap-10 justify-center items-center'>
                <Button2 text='Xác nhận' textColor='text-white' bgColor='bg-[#363837]' onClick={handleSubmit}/>
                <Button2 text='Hủy' textColor='text-white' bgColor='bg-accent-3' onClick={() => navigate('/manager/staff')}/>
            </div>
        </div>
    )
}

export default StaffNew
