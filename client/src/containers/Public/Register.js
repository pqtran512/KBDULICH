import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { InputForm, Button } from '../../components'
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Register = () => {
    // PARAMETERS
    // check inputs
    const [invalidFields, setInvalidFields] = useState([])
    // Register API
    const [payload, setPayload] = useState({
        username: '',
        phone_no: '', 
        email: '',
        password: '',
        password2: ''
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoggedIn, msg, update } = useSelector(state => state.auth) // auth in rootReducer

    // FUNCTIONS
    // validate inputs and call API
    const handleSubmit = async () => {
        let invalids = validate(payload)
        if (invalids === 0) 
            dispatch(actions.register(payload)) 
    }
    // validate inputs function
    const validate = (payload) => {
        let invalids = 0 // number of invalid fields
        let fields = Object.entries(payload) // tranform an object {key: value} to array [key, value]
        fields.forEach(item => {
            switch (item[0]) {
                case 'username':
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
                case 'password':
                    if (item[1] === '') {
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Bạn chưa nhập mật khẩu !'
                        }])
                        invalids++
                    } else {
                        if (item[1].length < 6) {
                            setInvalidFields(prev => [...prev, {
                                name: item[0],
                                message: 'Mật khẩu phải có tối thiểu 6 kí tự !'
                            }])
                            invalids++
                        }
                    }
                    break;
                case 'password2':
                    if (item[1] === '') {
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Bạn chưa nhập lại mật khẩu !'
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
    /// if isLoggedIn is true -> go to homepage
    useEffect(() => {
        isLoggedIn && navigate('/')
    }, [isLoggedIn])
    // Popup msg when login failed
    useEffect(() => {
        msg && Swal.fire('Oops !', msg, 'error')
    }, [msg, update]) // variable in [] -> dependency -> run when 1 of them changes

    return (
        <div className='mt-4 flex flex-col gap-3 bg-white w-[550px] rounded-xl p-8'>
            <div className='text-header-1 font-bold'>ĐĂNG KÝ THÀNH VIÊN</div>
            <div className='flex gap-4'>
                <InputForm 
                    invalidFields={invalidFields} 
                    setInvalidFields={setInvalidFields} 
                    label='Tên người dùng' 
                    placeholder='Nhập tên người dùng' 
                    value={payload.username} 
                    setValue={setPayload} 
                    keyPayload='username'
                    asterisk
                    width='w-full'
                />
                <InputForm 
                    invalidFields={invalidFields} 
                    setInvalidFields={setInvalidFields} 
                    label='Số điện thoại' 
                    placeholder='Nhập số điện thoại' 
                    value={payload.phone_no} 
                    setValue={setPayload} 
                    keyPayload='phone_no'
                    asterisk
                    width='w-full'
                />
            </div>
            <InputForm 
                invalidFields={invalidFields} 
                setInvalidFields={setInvalidFields} 
                label='Email' 
                placeholder='Nhập email' 
                value={payload.email} 
                setValue={setPayload} 
                keyPayload='email'
                asterisk
                width='w-full'
            />
            <InputForm 
                invalidFields={invalidFields} 
                setInvalidFields={setInvalidFields} 
                label='Mật khẩu' 
                placeholder='Nhập mật khẩu' 
                value={payload.password} 
                setValue={setPayload} 
                keyPayload='password'
                type='password'
                asterisk
                width='w-full'
            />
            <InputForm 
                invalidFields={invalidFields} 
                setInvalidFields={setInvalidFields} 
                label='Xác nhận mật khẩu' 
                placeholder='Nhập lại mật khẩu' 
                value={payload.password2} 
                setValue={setPayload} 
                keyPayload='password2'
                type='password'
                asterisk
                width='w-full'
            />
            <Button 
                text='Xác nhận'
                textColor='text-white' 
                bgColor='bg-primary-2'
                mt
                onClick={handleSubmit}
            />
            <div className='text-body-1 mx-auto'>
                Bạn đã có tài khoản?  
                <Link to={'/auth/login'} className='pl-1 text-primary-1 hover:text-secondary-1 cursor-pointer'>
                    Đăng nhập ngay
                </Link>
            </div>
        </div>
    )
}

export default Register
