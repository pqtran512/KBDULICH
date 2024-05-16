import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { InputForm, Button } from '../../components'
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'

const ResetPass1 = () => {
    // PARAMETERS
    // check inputs
    const dispatch = useDispatch()
    const [invalidFields, setInvalidFields] = useState([])
    const [payload, setPayload] = useState({ 
        email: '',
    })
    const {change, msg, update } = useSelector(state => state.auth) // auth in rootReducer
    const [submit, setSubmit] = useState(false)
    // FUNCTIONS
    useEffect(() => {
        console.log(change, msg)
        if (change) {
            msg && submit && Swal.fire('Gửi email thành công !', msg, 'success')
            setSubmit(false)
        }
        else {
            msg && submit && Swal.fire('Oops !', msg, 'error')
            setSubmit(false)
        }
    }, [change, msg, update]) // variable in [] -> dependency -> run when 1 of them changes
    const handleSubmit = async () => {
        let invalids = validate(payload)
        if (invalids === 0) {
            setSubmit(true)
            dispatch(actions.forgotPassword(payload))
        }
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
        <div className='mt-10 flex flex-col gap-5 bg-white w-[350px] rounded-xl p-6 xl:p-8 xl:w-[550px]'>
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

export default ResetPass1
