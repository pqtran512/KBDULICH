import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { InputForm, Button } from '../../components'
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const ResetPass2 = () => {
    // PARAMETERS
    const {token} = useParams();
    const [invalidFields, setInvalidFields] = useState([])
    const [payload, setPayload] = useState({ 
        new_password: '',
        confirm_new_password: '',
        email_token: token,
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {change, msg, update } = useSelector(state => state.auth) // auth in rootReducer
    const [submit, setSubmit] = useState(false)
    // FUNCTIONS
    useEffect(() => {
        if (change) {
            msg && submit && Swal.fire('Đổi mật khẩu thành công !', '', 'success')
            navigate('/auth/login')
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
            dispatch(actions.changePassword(payload))
        }
    }
    // validate inputs function
    const validate = (payload) => {
        let invalids = 0 // number of invalid fields
        let fields = Object.entries(payload) // tranform an object {key: value} to array [key, value]
        fields.forEach(item => {
            switch (item[0]) {
                case 'new_password':
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
                case 'confirm_new_password':
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
        <div className='mt-10 flex flex-col gap-5 bg-white w-[350px] rounded-xl p-6 xl:p-8 xl:w-[550px]'>
            <div className='text-header-1 font-bold'>ĐỔI MẬT KHẨU</div>
            <InputForm 
                invalidFields={invalidFields} 
                setInvalidFields={setInvalidFields} 
                label='Mật khẩu' 
                placeholder='Nhập mật khẩu' 
                value={payload.new_password} 
                setValue={setPayload} 
                keyPayload='new_password'
                type='password'
                asterisk
                width='w-full'
            />
            <InputForm 
                invalidFields={invalidFields} 
                setInvalidFields={setInvalidFields} 
                label='Xác nhận mật khẩu' 
                placeholder='Nhập lại mật khẩu' 
                value={payload.confirm_new_password} 
                setValue={setPayload} 
                keyPayload='confirm_new_password'
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
        </div>
    )
}

export default ResetPass2
