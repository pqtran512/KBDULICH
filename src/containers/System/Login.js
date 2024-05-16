import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { InputForm, Button2 } from '../../components'
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Login = () => {
    // PARAMETERS
    const [invalidFields, setInvalidFields] = useState([])
    const [payload, setPayload] = useState({ 
        username: '',
        password: ''
    })
    const dispatch = useDispatch()
    const { isLoggedIn, msg, update, role } = useSelector(state => state.auth) // auth in rootReducer
    const {currentData} = useSelector(state => state.user)
    const navigate = useNavigate()
    const [submit, setSubmit] = useState(false)

    // FUNCTIONS
    // validate inputs and call API
    const handleSubmitManager = async () => {
        let invalids = validate(payload)
        if (invalids === 0) {
            setSubmit(true)
            dispatch(actions.managerLogin(payload))
        }
    }
    const handleSubmitStaff = async () => {
        let invalids = validate(payload)
        if (invalids === 0) {
            setSubmit(true)
            dispatch(actions.staffLogin(payload))
        }
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
                            message: 'Bạn chưa nhập email hoặc tên người dùng !'
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
                        if (item[1].length < 5) {
                            setInvalidFields(prev => [...prev, {
                                name: item[0],
                                message: 'Mật khẩu phải có tối thiểu 5 kí tự !'
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
        if (isLoggedIn && currentData.email && role !== 'customer') {
            console.log(currentData)
            if (role === 'staff' && currentData.firstLogin) {
                navigate('/system-auth/reset_pass2')
            }
            else {navigate('/'+role)}
        }   
    }, [isLoggedIn, currentData, role, navigate])
    // Popup msg when login failed
    useEffect(() => {
        msg && submit && Swal.fire('Oops !', msg, 'error')
    }, [msg, update]) // variable in [] -> dependency -> run when 1 of them changes

    return (
        <div className='mt-10 flex flex-col gap-5 bg-white w-[550px] rounded-xl p-8'>
            <div className='text-header-1 font-bold'>ĐĂNG NHẬP HỆ THỐNG</div>
            <InputForm 
                invalidFields={invalidFields} 
                setInvalidFields={setInvalidFields} 
                label='Email/ Tên' 
                placeholder='Nhập email hoặc tên người dùng' 
                value={payload.email} 
                setValue={setPayload} 
                keyPayload={'username'}
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
            <Link to={'/system-auth/reset_pass1'} className='text-body-2 text-black hover:text-secondary-1 ml-auto'>Quên mật khẩu</Link>
            <Button2 
                text='Đăng nhập với tư cách nhân viên'
                textColor='text-white' bgColor='bg-[#363837]' 
                onClick={handleSubmitStaff}
            />
            <Button2 
                text='Đăng nhập với tư cách quản lý'
                textColor='text-white' bgColor='bg-[#363837]' 
                onClick={handleSubmitManager}
            />
        </div>
    )
}

export default Login
