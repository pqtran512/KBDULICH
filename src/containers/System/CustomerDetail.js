import React, { useState, useEffect } from 'react'
import { Button2, InputForm, SelectInput } from '../../components';
import Swal from 'sweetalert2'
import icons from '../../ultils/icons';
import { useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getOrder, orderUpdate, orderCancel } from '../../store/actions/orderFeedbackAction'
import { splitDateTime } from '../../ultils/splitDateTime';

const { FaStar } = icons
const refundStatus = [
    { value: true, label: 'Đã hoàn tiền'},
    { value: false, label: 'Chưa hoàn tiền' }
]
const CustomerDetail = () => {
    // PARAMS
    const {orderID} = useParams();
    const dispatch = useDispatch()
    const [invalidFields, setInvalidFields] = useState([])
    const { order, msg_order, update } = useSelector(state => state.order)
    const [payload, setPayload] = useState({
        order_ID: orderID,
        pay_method: '' ,
        name: '',
        phone_no: '',
        email: '',
        note: '',
        ticket_num: 1,
        is_cancel: false,
        is_refund: false,
    })
    const [isEdit, setIsEdit] = useState(false)
    const [submit, setSubmit] = useState(false)
    // FUNCTIONS
    useEffect(() => {
        dispatch(getOrder({order_ID: orderID}))
    }, [dispatch])
    useEffect(() => {
        if (order.name) { setPayload(prev => ({...prev, name: order.name})) }
        if (order.pay_method) { setPayload(prev => ({...prev, pay_method: order.pay_method})) }
        if (order.phone_no) { setPayload(prev => ({...prev, phone_no: order.phone_no})) }
        if (order.email) { setPayload(prev => ({...prev, email: order.email})) }
        if (order.note !== "No note") { setPayload(prev => ({...prev, note: order.note})) }
        if (order.ticket_num) { setPayload(prev => ({...prev, ticket_num: order.ticket_num})) }
        if (order.is_cancel) { setPayload(prev => ({...prev, is_cancel: order.is_cancel})) }
        if (order.cancel_percent) { setPayload(prev => ({...prev, cancel_percent: order.cancel_percent})) }
        if (order.cancel_datetime) { setPayload(prev => ({...prev, cancel_datetime: order.cancel_datetime})) }
        if (order.is_refund) { setPayload(prev => ({...prev, is_refund: order.is_refund})) }
    }, [order])
    const changeToEditMode = () => {
        window.scrollTo(0, 0);
        setIsEdit(true);
    };
    const submitEdit = async () => {
        let invalids = validate(payload)
        if (invalids === 0) {
            setSubmit(true)
            dispatch(orderUpdate(payload))
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
                        if (!(/^([a-z0-9ỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ ]+(_)*)+$/.test(item[1].toLowerCase()))) {
                            setInvalidFields(prev => [...prev, {
                                name: item[0],
                                message: 'Tên chỉ chứa ký tự, số và khoảng trắng !'
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
                case 'ticket_num':
                    if (item[1] <= 0) { // item[1] is the value field
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Số lượng vé không hợp lệ !'
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
    const handleCancel = () => {
        Swal.fire({
            title: 'Chắc chắn ?',
            text: "Bạn chắc chắn muốn hủy đơn đặt tour ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Chắc chắn",
            cancelButtonText: "Hủy",
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
            if (result.isConfirmed) {
                setSubmit(true)
                dispatch(orderCancel({order_ID: orderID}))
            }
        })
    }
    useEffect(() => {
        if (msg_order !== '' && submit) {
            if (msg_order === 'success') {
                Swal.fire('Đã lưu thay đổi', '', 'success').then((result) => {
                    if (result.isConfirmed) {
                        setIsEdit(false);
                        setSubmit(false)
                        dispatch(getOrder({order_ID: orderID}))
                    }
                })
            }
            else Swal.fire('Oops !', msg_order, 'error')
        }
    }, [msg_order, update])
    return (
        <div className='w-full px-6 pt-20 pb-10 xl:pt-7 xl:pb-20 lg:px-2 xl:pl-0 xl:pr-10 overflow-x-hidden'>
            <div className='pb-16'>
                <div className='font-prata text-neutral-1-900 font-semibold text-header-1 border-b-2 border-neutral-2-200 pb-1 w-full px-4 rounded-xl shadow-title md:text-heading-4'>Thông tin Đơn hàng</div>
            </div>
            <div className='relative text-body-1 text-[#363837] grid gap-6 mx-auto px-4 py-6 border-[3px] border-secondary-2 rounded-b-2xl rounded-tr-2xl md:grid-cols-2 xl:gap-40 xl:w-[900px]'>
                <div className='absolute -top-6 left-0.5 bg-gradient-to-tr from-secondary-2 to-accent-4 border border-white outline-offset-2 outline outline-[3px] outline-secondary-2 rounded-t-xl w-[100px] h-5'></div>
                <div className='flex flex-col gap-6'>
                    <div className='font-semibold'>Mã: <span className='pl-[64px] font-normal'>{orderID}</span></div>
                    <div className='flex gap-5 items-center'>
                        <div className='font-semibold'>Họ và tên: </div>
                        {isEdit? 
                            <InputForm 
                                placeholder={'Nhập họ tên'}
                                invalidFields={invalidFields} 
                                setInvalidFields={setInvalidFields}  
                                value={payload.name}
                                setValue={setPayload} 
                                keyPayload={'name'}
                                width='w-64 md:w-48 xl:w-56'
                                style2={true}
                            /> 
                            :
                            <div className='font-normal'>{order?.name}</div>    
                        }
                    </div>    
                    <div className='flex gap-[63px] items-center'>
                        <div className='font-semibold'>SĐT:</div>
                        {isEdit? 
                            <InputForm
                                placeholder={'Nhập số điện thoại'}
                                invalidFields={invalidFields} 
                                setInvalidFields={setInvalidFields}  
                                value={payload.phone_no}
                                setValue={setPayload} 
                                keyPayload={'phone_no'}
                                width='w-64 md:w-48 xl:w-56'
                                style2={true}
                            />
                            :
                            <div className='font-normal'>{order?.phone_no}</div>
                        }
                    </div>
                    <div className='flex gap-[51px] items-center'>
                        <div className='font-semibold'>Email:</div>
                        {isEdit? 
                            <InputForm 
                                placeholder={'Nhập email'}
                                invalidFields={invalidFields} 
                                setInvalidFields={setInvalidFields}  
                                value={payload.email}
                                setValue={setPayload} 
                                keyPayload={'email'}
                                width='w-64 md:w-48 xl:w-56'
                                style2={true}
                            />
                            :
                            <div className='font-normal'>{order?.email}</div>
                        }
                    </div>
                    <div className='flex flex-wrap gap-9 items-center'>
                        <div className='font-semibold'>Ghi chú:</div>
                        {isEdit? 
                            <InputForm
                                placeholder={'Nhập ghi chú'}
                                invalidFields={invalidFields} 
                                setInvalidFields={setInvalidFields}  
                                value={payload.note}
                                setValue={setPayload} 
                                keyPayload={'note'}
                                width='w-64 md:w-48 xl:w-56'
                                style2={true}
                            />
                            :
                            <div className='font-normal whitespace-nowrap'>{order?.note === "No note"? 'Không' : order.note}</div>
                        }
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div className='font-semibold'>Thanh toán:</div>
                        <div className='font-normal'>{order?.pay_method}</div>
                    </div>
                </div>
                <div className='flex flex-col gap-6'>
                    <div className='flex gap-2 items-center'>
                        <div className='font-semibold'>Ngày đặt:</div>
                        {order?.date_time && <div className='font-normal'>{splitDateTime(order?.date_time)[1]} {splitDateTime(order?.date_time)[0]}</div>}
                    </div>
                    <div className='flex gap-10 items-center'>
                        <div className='font-semibold'>SL vé:</div>
                        <div className='font-normal'>{order?.ticket_num}</div>
                    </div>
                    
                    <div className='flex gap-2 items-center'>
                        <div className='font-semibold'>Đánh giá:</div>
                        {order?.Feedback && 
                            <div className='flex gap-2'>
                                <div className='flex items-center gap-1 bg-[#1ABB9C] w-fit px-2 rounded-full'>
                                    <div className='text-white'>{order.Feedback?.ratings}</div>
                                    <FaStar size={15} className='text-secondary-2'/> 
                                </div>
                                <div className='text-neutral-1-600'>{splitDateTime(order.Feedback?.datetime)[1]} {splitDateTime(order.Feedback?.datetime)[0]} </div>
                            </div>
                        }
                    </div>
                    <div className='flex flex-wrap gap-2 items-center'>
                        <div className='font-semibold'>Bình luận:</div>
                        <div className='font-normal'>{order?.Feedback?.reviews}</div>
                    </div>
                    <div className='flex flex-wrap gap-2 items-center'>
                        <div className='font-semibold'>Trạng thái:</div>
                        {order?.is_cancel? 
                            <div className="flex items-center gap-[6px]">
                                <div className='w-2 h-2 rounded-full bg-accent-3'></div>
                                Hủy
                            </div>
                            :
                            <div className="flex items-center gap-[6px]">
                                <div className='w-2 h-2 rounded-full bg-[#1ABB9C]'></div>
                                Tiếp tục
                            </div>
                        }
                    </div>
                    <div className='flex flex-wrap gap-2 items-center'>
                        <div className='font-semibold'>Hoàn tiền:</div>
                        {isEdit? 
                            <SelectInput options={refundStatus} myStyle='w-[150px]' style2={true} placeholder={order?.is_refund? 'Đã hoàn tiền': 'Chưa hoàn tiền'}  keyPayload='is_refund' setValue={setPayload} />
                        : order?.is_refund? 
                            <div className="flex items-center gap-[6px]">
                                <div className='w-2 h-2 rounded-full bg-[#1ABB9C]'></div>
                                Đã hoàn tiền
                            </div>
                            :
                            <div className="flex items-center gap-[6px]">
                                <div className='w-2 h-2 rounded-full bg-accent-3'></div>
                                Chưa hoàn tiền
                            </div>
                        }
                    </div>
                </div>
            </div>
            
            <div className='pt-8 flex gap-10 justify-center items-center'>
            { isEdit? 
                <><Button2 text='Lưu thay đổi' textColor='text-white' bgColor='bg-[#363837]' onClick={submitEdit}/>
                <Button2 text='Trở về' textColor='text-white' bgColor='bg-accent-3' onClick={() => setIsEdit(false)}/>
                </>
                : 
                <><Button2 text='Chỉnh sửa thông tin' textColor='text-black' bgColor='bg-accent-5' onClick={changeToEditMode}/>
                {order?.is_cancel? <></>:
                    <Button2 text='Hủy đơn' textColor='text-white' bgColor='bg-[#363837]' onClick={handleCancel}/>}
                </> 
            }
            </div>
        </div>
    )
}

export default CustomerDetail
