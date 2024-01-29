import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import whiteLogo from '../../assets/img/header-footer/logo-white.png'
import { InputForm, Button } from '../../components'
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const ResetPass = () => {
    // PARAMETERS
    // check inputs
    const [invalidFields, setInvalidFields] = useState([])
    // Register API
    const [payload, setPayload] = useState({ 
        email: '',
        password: ''
    })
    // const { isLoggedIn, msg, update } = useSelector(state => state.auth) // auth in rootReducer

    // FUNCTIONS
    // validate inputs and call API
    const handleSubmit = async () => {
        let invalids = validate(payload)
        // if (invalids === 0) 
        //     dispatch(actions.login(payload)) 
    }
    // validate inputs function
    const validate = (payload) => {
        let invalids = 0 // number of invalid fields
        let fields = Object.entries(payload) // tranform an object {key: value} to array [key, value]
        if (fields[0][1] === '') { // item[1] is the value field
            setInvalidFields(prev => [...prev, {
                name: fields[0][0],
                message: 'Bạn chưa nhập email !'
            }])
            invalids++
        } 
        else {
            if (!(/\S+@\S+\.\S+/.test(fields[0][1]))) {
                setInvalidFields(prev => [...prev, {
                    name: fields[0][0],
                    message: 'Email không hợp lệ !'
                }])
                invalids++
            }
        }
        return invalids
    } 
    // Popup msg when login failed
    // useEffect(() => {
    //     msg && Swal.fire('Oops !', msg, 'error')
    // }, [msg, update]) // variable in [] -> dependency -> run when 1 of them changes

    return (
        <div className='mt-10 flex flex-col gap-5 bg-white w-[550px] rounded-xl p-8'>
            <div className='text-header-1 font-bold'>QUÊN MẬT KHẨU</div>
            <InputForm 
                invalidFields={invalidFields} 
                setInvalidFields={setInvalidFields} 
                label='Email' 
                placeholder='Nhập email' 
                value={payload.email} 
                setValue={setPayload} 
                keyPayload={'email'}
                width='w-full'
            />
            <Button 
                text='Gửi'
                textColor='text-white' 
                bgColor='bg-primary-2'
                mt
                onClick={handleSubmit}
            />
            <Link to={'/auth/login'} className='pl-1 text-primary-1 hover:text-secondary-1 cursor-pointer'>
                Quay lại
            </Link>
        </div>
    )
}

export default ResetPass
