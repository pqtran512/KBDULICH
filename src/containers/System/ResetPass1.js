import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { InputForm, Button2 } from '../../components'
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const ResetPass1 = () => {
    // PARAMETERS
    // check inputs
    const [invalidFields, setInvalidFields] = useState([])
    const [payload, setPayload] = useState({ 
        email: '',
    })
    const navigate = useNavigate()
    // FUNCTIONS
    // validate inputs and call API
    const handleSubmit = async () => {
        let invalids = validate(payload)
        if (invalids === 0) 
        //     dispatch(actions.changePassword(payload))
            navigate('/auth/reset_pass2') 
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
            <Button2 
                text='Gửi'
                textColor='text-white' bgColor='bg-[#363837]' 
                onClick={handleSubmit}
            />
            <Link to={'/system-auth/login'} className='pl-1 text-black hover:text-secondary-1 cursor-pointer'>
                Quay lại
            </Link>
        </div>
    )
}

export default ResetPass1
