import React, { useEffect, useState } from 'react'
import { InputForm, Button2 } from '../../components'
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const ResetPass2 = () => {
    // PARAMETERS
    const [invalidFields, setInvalidFields] = useState([])
    const [payload, setPayload] = useState({ 
        password: '',
        password2: ''
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()

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
        fields.forEach(item => {
            switch (item[0]) {
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

    return (
        <div className='mt-10 flex flex-col gap-5 bg-white w-[550px] rounded-xl p-8'>
            <div className='text-header-1 font-bold'>ĐỔI MẬT KHẨU</div>
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
            <Button2 
                text='Xác nhận'
                textColor='text-white' bgColor='bg-[#363837]' 
                onClick={handleSubmit}
            />
        </div>
    )
}

export default ResetPass2
