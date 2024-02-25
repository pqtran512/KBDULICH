import React, { useState } from 'react'
import { Button2, SearchBar, InputForm,  Datepicker } from '../../components';
import Swal from 'sweetalert2'
import icons from '../../ultils/icons';
import { useNavigate } from 'react-router-dom';

const { CgArrowsExchangeAltV, FaStar, FaArrowUpRightFromSquare } = icons

const CustomerList = () => {
    const navigate = useNavigate()
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
        <div className='w-full xl:pt-10 overflow-hidden'>
            {/* Customer list */}
            <div className='mt-16 pb-1 font-prata text-neutral-1-900 font-semibold text-header-1 border-b-2 border-neutral-2-200 w-full px-4 rounded-xl shadow-title xl:text-heading-4'>Danh sách khách hàng</div>
            <div className='pt-10 w-full flex justify-end'>
                <SearchBar placeholder='Nhập ..' newPlaceholder='Nhập tìm kiếm . . .' width='w-12 md:w-24 xl:w-28' change={true} newWidth='w-[380px] md:w-[380px] xl:w-[620px]' 
                    person={true} phone={true} email={true} bookDate={true} note={true}
                />
            </div>
            <div className='pb-3 text-body-1 text-neutral-1-900'>Tổng số: 2</div>
            <table className="mb-8 mytable2 w-full text-caption-1 xl:text-body-2">
                <tr className="h-10 text-body-2 font-semibold tracking-wider bg-neutral-3-200 xl:text-body-1">
                    <td><div className='flex items-center'>
                        <div>#</div>
                        <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'/> 
                    </div></td>
                    <td><div className='flex items-center gap-2'>
                        <div>Họ và tên</div>
                        <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'/> 
                    </div></td>
                    <td className="hidden md:table-cell"><div className='flex items-center gap-2'>
                        <div>SĐT</div>
                        <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'/> 
                    </div></td>
                    <td className="hidden md:table-cell"><div className='flex items-center gap-2'>
                        <div>Email</div>
                        <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'/> 
                    </div></td>
                    <td className="hidden md:table-cell"><div className='flex items-center gap-1'>
                        <div>Ngày đặt</div>
                        <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'/> 
                    </div></td>
                    <td className="hidden md:table-cell"><div className='flex items-center'>
                        <div>SL</div>
                        <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'/> 
                    </div></td>
                    {/* <td className="hidden xl:table-cell"><div className='flex items-center gap-1'>
                        <div>Ghi chú</div>
                        <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'/> 
                    </div></td> */}
                    <td className="hidden xl:table-cell"><div className='flex items-center gap-1'>
                        <div>Đánh giá</div>
                        <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'/> 
                    </div></td>
                    {/* <td className="hidden xl:table-cell"><div className='flex items-center gap-1'>
                        <div>Bình luận</div>
                        <CgArrowsExchangeAltV size={24} className='text-neutral-1-200 rounded-md hover:text-neutral-1-300 hover:bg-neutral-3-300 cursor-pointer'/> 
                    </div></td> */}
                    <td>Chi tiết</td>
                </tr>
                <tr className='h-12 border-b-2 border-neutral-2-200'>
                    <td>1</td>
                    <td>Nguyễn Ngọc Anh</td>
                    <td className="hidden md:table-cell">0123456789</td>
                    <td className='hidden md:table-cell'>ngocanhnguyen@gmail.com</td>
                    <td className="hidden md:table-cell">09/09/2024</td>
                    <td className="hidden md:table-cell">03</td>
                    {/* <td className='hidden text-justify xl:table-cell'><div className='xl:max-w-[150px]'>Ghế hàng đầu</div></td> */}
                    <td className='hidden xl:table-cell'>
                        <div className='flex items-center gap-1 bg-[#1ABB9C] w-fit px-2 rounded-full'>
                            <div className='text-white'>4</div>
                            <FaStar size={15} className='text-secondary-2'/> 
                        </div>
                    </td>
                    {/* <td className='hidden text-justify xl:table-cell'><div className='xl:max-w-[200px]'>Khá hài lòng</div></td> */}
                    <td><FaArrowUpRightFromSquare onClick={() => (navigate('/staff/customer-detail'))} className='ml-5 text-[12px] text-neutral-1-600 hover:text-neutral-1-500 cursor-pointer xl:text-[14px]'/></td>
                </tr>
                <tr className='h-12 border-b-2 border-neutral-2-200'>
                    <td>2</td>
                    <td>Ngô Kiến Văn</td>
                    <td className="hidden md:table-cell">0123456789</td>
                    <td className='hidden md:table-cell'>ngocanhnguyen@gmail.com</td>
                    <td className="hidden md:table-cell">09/09/2024</td>
                    <td className="hidden md:table-cell">03</td>
                    {/* <td className='hidden text-justify xl:table-cell'><div className='xl:max-w-[150px]'></div></td> */}
                    <td className='hidden xl:table-cell'>
                        <div className='flex items-center gap-1 bg-accent-3 w-fit px-2 rounded-full'>
                            <div className='text-white'>2</div>
                            <FaStar size={15} className='text-secondary-2'/> 
                        </div>
                    </td>
                    {/* <td className='hidden text-justify xl:table-cell'><div className='xl:max-w-[200px]'>Dịch vụ tốt</div></td> */}
                    <td><FaArrowUpRightFromSquare onClick={() => (navigate('/staff/customer-detail'))} className='ml-5 text-[12px] text-neutral-1-600 hover:text-neutral-1-500 cursor-pointer xl:text-[14px]'/></td>
                </tr>
            </table>
            { addMode? 
                <Button2 text='Hủy' textColor='text-white' bgColor='bg-accent-3' redBtn onClick={() => setAddMode(false)}/>
            :
                <Button2 text='+ Thêm khách hàng' textColor='text-white' bgColor='bg-[#363837]' btn3={true}
                    onClick={() => {
                        setAddMode(true)
                        setPayload(initialValue)
                    }}/>
            }
            <div className={`max-h-0 overflow-hidden ${addMode? 'max-h-[500px] overflow-auto' : ''} transition-all duration-500`}>
                <div className='pt-4 pb-8 flex flex-col gap-4 xl:gap-5 xl:py-8'>
                    <div className='flex flex-col gap-4 md:flex-row xl:gap-20'>
                        <div className='flex gap-8 items-center'>
                            <div>Họ và tên:</div>
                            <InputForm 
                                invalidFields={invalidFields} 
                                setInvalidFields={setInvalidFields}
                                placeholder='Nhập tên khách hàng' 
                                value={payload.name} 
                                setValue={setPayload} 
                                keyPayload='name'
                                width='w-60'
                                style2={true}
                            />
                        </div>
                        <div className='flex items-center gap-2 xl:gap-4'>
                            <div>Số điện thoại:</div>
                            <InputForm 
                                invalidFields={invalidFields} 
                                setInvalidFields={setInvalidFields}
                                placeholder='Nhập số điện thoại' 
                                value={payload.phone} 
                                setValue={setPayload} 
                                keyPayload='phone'
                                width='w-60 md:w-40'
                                style2={true}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 md:flex-row md:items-center xl:gap-20'>
                        <div className='flex gap-[62px] items-center'>
                            <div>Email:</div>
                            <InputForm 
                                invalidFields={invalidFields} 
                                setInvalidFields={setInvalidFields}
                                placeholder='Nhập email' 
                                value={payload.email} 
                                setValue={setPayload} 
                                keyPayload='email'
                                width='w-60'
                                style2={true}
                            />
                        </div>
                        <div className='flex gap-9 xl:gap-11 items-center'>
                            <div>Ngày đặt:</div>
                            <Datepicker width='w-40'
                                // defaultValue={payload.departureDate}
                                // value={payload.departureDate}
                                setValue={setPayload} 
                                keyPayload={'departureDate'}
                                textColor='text-neutral-1-600'
                                bgColor='bg-neutral-3-50'
                                min={true}
                            />
                        </div>
                    </div>
                    <div className='flex gap-4 items-center'>
                        <div>Số lượng vé:</div>
                        <InputForm 
                            invalidFields={invalidFields} 
                            setInvalidFields={setInvalidFields} 
                            value={payload.quantity} 
                            setValue={setPayload} 
                            keyPayload='quantity'
                            type='number'
                            width='w-16'
                            style2={true}
                        />
                    </div>
                    <div className='flex gap-[46px] items-center'>
                        <div>Ghi chú:</div>
                        <InputForm 
                            invalidFields={invalidFields} 
                            setInvalidFields={setInvalidFields}  
                            placeholder='Nhập ghi chú' 
                            value={payload.note}
                            setValue={setPayload} 
                            keyPayload={'note'}
                            width='w-[240px] md:w-[520px] xl:w-[590px]'
                            style2={true}
                        />
                    </div>   
                </div>
                <Button2 text='Xác nhận' textColor='text-white' bgColor='bg-[#363837]' onClick={handleSubmit}/>
            </div>
        </div>
    )
}

export default CustomerList
