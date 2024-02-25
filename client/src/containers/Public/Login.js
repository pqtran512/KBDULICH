import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { InputForm, Button } from '../../components'
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Login = () => {
    // PARAMETERS
    const [invalidFields, setInvalidFields] = useState([])
    const [payload, setPayload] = useState({ 
        email: '',
        password: ''
    })
    const dispatch = useDispatch()
    const { isLoggedIn, msg, update } = useSelector(state => state.auth) // auth in rootReducer
    const navigate = useNavigate()

    // FUNCTIONS
    // validate inputs and call API
    const handleSubmit = async () => {
        let invalids = validate(payload)
        if (invalids === 0) 
            dispatch(actions.login(payload))
    }
    // validate inputs function
    const validate = (payload) => {
        let invalids = 0 // number of invalid fields
        let fields = Object.entries(payload) // tranform an object {key: value} to array [key, value]
        fields.forEach(item => {
            switch (item[0]) {
                case 'email':
                    if (item[1] === '') { // item[1] is the value field
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Bạn chưa nhập email !'
                        }])
                        invalids++
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
                default:
                    break;
            }
        })
        return invalids
    } 
    // if isLoggedIn is true -> go to homepage
    useEffect(() => {
        isLoggedIn && navigate('/')
    }, [isLoggedIn, navigate])
    // Popup msg when login failed
    useEffect(() => {
        msg && Swal.fire('Oops !', msg, 'error')
    }, [msg, update]) // variable in [] -> dependency -> run when 1 of them changes

    return (
        <div className='mt-10 flex flex-col gap-5 bg-white w-[550px] rounded-xl p-8'>
            <div className='text-header-1 font-bold'>ĐĂNG NHẬP THÀNH VIÊN</div>
            <InputForm 
                invalidFields={invalidFields} 
                setInvalidFields={setInvalidFields} 
                label='Email/ Tên' 
                placeholder='Nhập email hoặc tên người dùng' 
                value={payload.email} 
                setValue={setPayload} 
                keyPayload={'email'}
                width='w-full'
            />
            <InputForm 
                invalidFields={invalidFields} 
                setInvalidFields={setInvalidFields} 
                label='Mật khẩu' 
                placeholder='Nhập mật khẩu' 
                value={payload.password} 
                setValue={setPayload} 
                keyPayload={'password'}
                type='password'
                width='w-full'
            />
            <Link to={'/auth/reset_pass'} className='text-body-2 text-primary-1 mt-2 ml-auto'>Quên mật khẩu</Link>
            <Button 
                text='Xác nhận'
                textColor='text-white' 
                bgColor='bg-primary-2'
                mt
                onClick={handleSubmit}
            />
            <div className='text-body-1 mx-auto'>
                Bạn chưa có tài khoản?  
                <Link to={'/auth/register'} className='pl-1 text-primary-1 hover:text-secondary-1 cursor-pointer'>
                    Đăng ký ngay
                </Link>
            </div>
        </div>
    )
}

export default Login
