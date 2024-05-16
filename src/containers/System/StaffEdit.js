import React, { useState, useEffect } from 'react'
import { Button2, InputForm, Datepicker } from '../../components';
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getStaff, staffUpdate } from '../../store/actions/userAction'

const StaffEdit = () => {
    // PARAMS
    const {staffID} = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [invalidFields, setInvalidFields] = useState([])
    const { staff, msg, update } = useSelector(state => state.staff)
    const [payload, setPayload] = useState({
        staff_ID: staffID, 
        firstName: '',
        lastName: '',
        gender: '',
        dateOfBirth: '', 
        phone_no: ''
    })
    const [defaultDate, setDefaultDate] = useState('')
    const [submit, setSubmit] = useState(false)
    const genders = ['Nam', 'Nữ']
    
    // FUNCTIONS
    useEffect(() => {
        dispatch(getStaff({staff_ID: staffID}))
    }, [dispatch, staffID])
    useEffect(() => {
        if (staff.firstName) { setPayload(prev => ({...prev, firstName: staff.firstName})) }
        if (staff.lastName) { setPayload(prev => ({...prev, lastName: staff.lastName})) }
        if (staff.gender) { setPayload(prev => ({...prev, gender: staff.gender})) }
        if (staff.phone_no) { setPayload(prev => ({...prev, phone_no: staff.phone_no})) }
        if (staff.dateOfBirth) { 
            const [year, month, day] = staff.dateOfBirth.split('-');
            setPayload(prev => ({...prev, dateOfBirth: year+'_'+month+'_'+day}))
            const myDate = new Date(Date.UTC(year, month - 1, day)); 
            setDefaultDate(myDate)
        }
    }, [staff])
    const submitEdit = async () => {
        let invalids = validate(payload)
        if (invalids === 0) {
            setSubmit(true)
            dispatch(staffUpdate(payload))
        }
    };
    const validate = (payload) => {
        let invalids = 0 // number of invalid fields
        let fields = Object.entries(payload) // tranform an object {key: value} to array [key, value]
        fields.forEach(item => {
            switch (item[0]) {
                case 'firstName':
                    if (item[1] === '') { // item[1] is the value field
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Bạn chưa nhập tên !'
                        }])
                        invalids++
                    }
                    break;
                case 'lastName':
                    if (item[1] === '') { // item[1] is the value field
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Bạn chưa nhập họ !'
                        }])
                        invalids++
                    }
                    break;
                case 'dateOfBirth':
                    if (item[1] === '') { // item[1] is the value field
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Bạn chưa chọn ngày tháng năm sinh !'
                        }])
                        invalids++
                    }
                    break;
                case 'phone_no':
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
    useEffect(() => {
        if (msg !== '' && submit) {
            if (msg === 'success') {
                Swal.fire('Đã lưu thay đổi', '', 'success').then((result) => {
                    navigate('/manager/staff-detail/'+staffID)
                })
            }
            else { 
                Swal.fire('Oops !', 'Lỗi đầu vào ! Vui lòng thử lại !', 'error')
                setSubmit(false) 
            }
        }
    }, [msg, update])

    return (
        <div className='w-full px-6 pt-20 pb-10 xl:pt-7 xl:pb-20 lg:px-2 xl:pl-0 xl:pr-10 overflow-x-hidden'>
            <div className='pb-16 flex gap-5 items-center'>
                <div className='font-prata text-neutral-1-900 font-semibold text-header-1 border-b-2 border-neutral-2-200 pb-1 w-full px-4 rounded-xl shadow-title md:text-heading-4'>Chỉnh sửa thông tin Nhân viên</div>
            </div>
            <div className='relative text-body-1 text-[#363837] grid gap-6 mx-auto px-4 py-6 border-[3px] border-secondary-2 rounded-b-2xl rounded-tr-2xl md:grid-cols-2 xl:gap-40 xl:w-[900px]'>
                <div className='absolute -top-6 left-0.5 bg-gradient-to-tr from-secondary-2 to-accent-4 border border-white outline-offset-2 outline outline-[3px] outline-secondary-2 rounded-t-xl w-[100px] h-5'></div>
                <div className='flex flex-col gap-6'>
                    <div className='font-semibold'>Mã: <span className='font-normal'>{staffID}</span></div>
                    <div className='flex flex-col gap-6 xl:flex-row xl:gap-10'>
                        <div className='flex gap-2 items-center'>
                            <div className='font-semibold'>Tên: </div>
                            <InputForm 
                                invalidFields={invalidFields} 
                                setInvalidFields={setInvalidFields}  
                                value={payload.firstName}
                                setValue={setPayload} 
                                keyPayload={'firstName'}
                                width='w-32'
                                style2={true}
                            /> 
                        </div>
                        <div className='flex gap-2 items-center'>
                            <div className='font-semibold'>Họ: </div>
                            <InputForm 
                                invalidFields={invalidFields} 
                                setInvalidFields={setInvalidFields}  
                                value={payload.lastName}
                                setValue={setPayload} 
                                keyPayload={'lastName'}
                                width='w-52'
                                style2={true}
                            />
                        </div>    
                    </div>
                    <div className='flex gap-5 items-center'>
                        <div className='font-semibold'>Giới tính: </div>
                        { genders?.map((item, i) => {
                                if (payload.gender?.includes(item)) {
                                    return (
                                        <label key={i}><input type="radio" name="gender" value={item} className='w-2 h-2 md:w-3 md:h-3 accent-black cursor-pointer' checked/>
                                        {' ' + item}</label>
                                    )
                                }
                                else {
                                    return (
                                        <label key={i}><input type="radio" name="gender" value={item} className='w-2 h-2 md:w-3 md:h-3 accent-black cursor-pointer'
                                                onChange={(e) => setPayload(prev => ({...prev, 'gender': e.target.value}))}
                                        />{' ' + item}</label>
                                    )
                                }
                            })
                        }
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div className='font-semibold'>Ngày sinh:</div>
                        <Datepicker width='w-[148px]' height='h-7' top='top-[6px]' outline defaultValue={defaultDate} keyPayload='dateOfBirth' setValue={setPayload} />
                    </div>
                </div>
                <div className='flex flex-col gap-6'>
                    <div className='flex gap-2 items-center'>
                        <div className='font-semibold'>SĐT:</div>
                        <InputForm 
                            invalidFields={invalidFields} 
                            setInvalidFields={setInvalidFields}  
                            value={payload.phone_no}
                            setValue={setPayload} 
                            keyPayload={'phone_no'}
                            width='w-52'
                            style2={true}
                        />
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div className='font-semibold'>Email:</div>
                        <div className='font-normal'>{staff?.email}</div>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div className='font-semibold'>Tình trạng:</div>
                        <div className="flex items-center gap-[6px]">
                            <div className='w-2 h-2 rounded-full bg-[#1ABB9C]'></div>
                            {staff?.isActive ? 'Active' : 'Inactive'}
                        </div>
                    </div>
                </div>
            </div>
            <div className='pt-8 flex gap-10 justify-center items-center'>
                <Button2 text='Lưu thay đổi' textColor='text-white' bgColor='bg-[#363837]' onClick={submitEdit}/>
                <Button2 text='Hủy' textColor='text-white' bgColor='bg-accent-3' onClick={() => navigate('/manager/staff-detail/'+staffID)}/>
            </div>
        </div>
    )
}

export default StaffEdit
