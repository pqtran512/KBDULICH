import React, { useState } from 'react'
import { Button, SearchBar, InputForm,  Datepicker } from '../../components';
import Swal from 'sweetalert2'

const CustomerList = () => {
    const [invalidFields, setInvalidFields] = useState([])
    const [addMode, setAddMode] = useState(false)
    // Register API
    const initialValue = {
        name: '',
        phone: '', 
        email: '',
        departureDate: '',
        quantity: 0,
        note: ''
    };
    const [payload, setPayload] = useState(initialValue)
    const handleSubmit = async () => {
        let invalids = validate(payload)
        if (invalids === 0) {
            Swal.fire('Thêm thành công', '', 'success')
            setAddMode(false)
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
                            message: 'Bạn chưa nhập tên !'
                        }])
                        invalids++
                    } 
                    else if (item[1].length < 5) {
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Tên phải có tối thiểu 5 kí tự !'
                        }])
                        invalids++
                    }
                    else {
                        if (!(/^([a-zA-Z0-9]+(_)*)+$/.test(item[1]))) {
                            setInvalidFields(prev => [...prev, {
                                name: item[0],
                                message: 'Tên chỉ chứa ký tự, số và gạch chân (_) !'
                            }])
                            invalids++
                        }
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
                case 'email':
                    if (item[1] === '') { // item[1] is the value field
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Bạn chưa nhập email !'
                        }])
                        invalids++
                    } 
                    else {
                        if (!(/\S+@\S+\.\S+/.test(item[1]))) {
                            setInvalidFields(prev => [...prev, {
                                name: item[0],
                                message: 'Email không hợp lệ !'
                            }])
                            invalids++
                        }
                    }
                    break;
                case 'quantity':
                    if (item[1] === '') { // item[1] is the value field
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Bạn chưa nhập số lượng vé !'
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
            {/* Customer list */}
            <div className='pt-20 pb-1 text-primary-2 font-semibold text-header-2 md:text-header-1 xl:text-heading-4'>Danh sách khách hàng</div>
            <div className='pb-5 w-full flex justify-end'><SearchBar placeholder='. . .' width='w-1/3'/></div>
            <div className='pb-3 text-body-1 text-neutral-1-900'>Tổng số: 2</div>
            <table className="mb-8 mytable w-full text-body-2 xl:text-body-1">
                <tr className="h-14 font-semibold tracking-wider bg-neutral-3-200">
                    <td className="">Họ và Tên</td>
                    <td className="">SĐT</td>
                    <td className="">Email</td>
                    <td className="">Ngày đặt</td>
                    <td className="hidden md:table-cell">SL</td>
                    <td className="hidden md:table-cell">Ghi chú</td>
                    <td className="hidden md:table-cell">Đánh giá</td>
                    <td className="hidden md:table-cell">Bình luận</td>
                </tr>
                <tr className='h-12 border-b-2 border-neutral-2-200'>
                    <td>Nguyễn Ngọc Anh</td>
                    <td>0123456789</td>
                    <td>ngocanhnguyen@gmail.com</td>
                    <td>09/09/2024</td>
                    <td>03</td>
                    <td className='hidden md:table-cell'>Ghế hàng đầu</td>
                    <td className='hidden md:table-cell'>4 sao</td>
                    <td className='hidden md:table-cell'>Khá hài lòng</td>
                    {/* <td className='md:hidden'><BsThreeDotsVertical/></td> */}
                </tr>
                <tr className='h-12 border-b-2 border-neutral-2-200'>
                    <td>Ngô Kiến Văn</td>
                    <td>0123456789</td>
                    <td>ngocanhnguyen@gmail.com</td>
                    <td>09/09/2024</td>
                    <td>03</td>
                    <td className='hidden md:table-cell'>Không</td>
                    <td className='hidden md:table-cell'>5 sao</td>
                    <td className='hidden md:table-cell'>Dịch vụ tốt</td>
                    {/* <td className='md:hidden'><BsThreeDotsVertical/></td> */}
                </tr>
            </table>
            { addMode? 
                <Button text='Hủy' textColor='text-white' bgColor='bg-accent-3' redBtn onClick={() => setAddMode(false)}/>
            :
                <Button text='+ Thêm khách hàng' textColor='text-white' bgColor='bg-primary-2' 
                    onClick={() => {
                        setAddMode(true)
                        setPayload(initialValue)
                    }}/>
            }
            <div className={`max-h-0 overflow-hidden ${addMode? 'max-h-[500px] overflow-auto' : ''} transition-all duration-500`}>
                <div className='py-8 flex flex-col gap-5'>
                    <div className='flex gap-4'>
                        <InputForm 
                            invalidFields={invalidFields} 
                            setInvalidFields={setInvalidFields} 
                            label='Họ và tên' 
                            placeholder='Nhập tên khách hàng' 
                            value={payload.name} 
                            setValue={setPayload} 
                            keyPayload='name'
                            asterisk
                            width='w-80'
                        />
                        <InputForm 
                            invalidFields={invalidFields} 
                            setInvalidFields={setInvalidFields} 
                            label='Số điện thoại' 
                            placeholder='Nhập số điện thoại' 
                            value={payload.phone} 
                            setValue={setPayload} 
                            keyPayload='phone'
                            asterisk
                            width='w-64'
                        />
                        <InputForm 
                            invalidFields={invalidFields} 
                            setInvalidFields={setInvalidFields} 
                            label='Email' 
                            placeholder='Nhập email' 
                            value={payload.email} 
                            setValue={setPayload} 
                            keyPayload='email'
                            asterisk
                            width='w-80'
                        />
                    </div>
                    <div><span className='text-title-1 text-neutral-1-900'>Ngày đặt </span>
                        <Datepicker width='w-40'
                            setValue={setPayload} 
                            keyPayload={'departureDate'}
                            textColor='text-neutral-1-500'
                            bgColor='bg-neutral-3-50'
                        />
                    </div>
                    <InputForm 
                        invalidFields={invalidFields} 
                        setInvalidFields={setInvalidFields} 
                        label='Số lượng vé' 
                        value={payload.quantity} 
                        setValue={setPayload} 
                        keyPayload='quantity'
                        asterisk
                        type='number'
                        width='w-16'
                    />
                    <InputForm 
                            invalidFields={invalidFields} 
                            setInvalidFields={setInvalidFields} 
                            label='Ghi chú' 
                            placeholder='Nhập ghi chú' 
                            value={payload.note} 
                            setValue={setPayload} 
                            keyPayload='note'
                            width='w-full'
                        />
                    
                </div>
                <Button text='Xác nhận' textColor='text-white' bgColor='bg-primary-2' onClick={handleSubmit}/>
            </div>
        </div>
    )
}

export default CustomerList
