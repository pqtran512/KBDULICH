import React, { useState, useEffect } from 'react'
import { Button2, InputForm } from '../../components';
import Swal from 'sweetalert2'
import icons from '../../ultils/icons';
import { useNavigate, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getOrder } from '../../store/actions/orderFeedbackAction'
import { splitDateTime } from '../../ultils/splitDateTime';

const { FaStar } = icons

const CustomerDetail = () => {
    // PARAMS
    const {orderID} = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [invalidFields, setInvalidFields] = useState([])
    const { order } = useSelector(state => state.order)
    const [payload, setPayload] = useState({
        order_ID: orderID,
        pay_method: '' ,
        name: '',
        phone_no: '',
        email: '',
        note: '',
        ticket_num: 1,
        is_cancel: false,
        cancel_percent: 0,
        cancel_datetime: null,
        is_refund: false,
    })
    const [isEdit, setIsEdit] = useState(false)
    // FUNCTIONS
    useEffect(() => {
        dispatch(getOrder({order_ID: orderID}))
    }, [dispatch])
    useEffect(() => {
        if (order.name) { setPayload(prev => ({...prev, name: order.name})) }
        if (order.pay_method) { setPayload(prev => ({...prev, pay_method: order.pay_method})) }
        if (order.phone_no) { setPayload(prev => ({...prev, phone_no: '0'+order.phone_no})) }
        if (order.email) { setPayload(prev => ({...prev, email: order.email})) }
        if (order.note) { setPayload(prev => ({...prev, note: order.note})) }
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
        Swal.fire('Đã lưu thay đổi', '', 'success')
        // console.log(payload)
    };
    const handleDelete = () => {
        Swal.fire({
            title: 'Chắc chắn ?',
            text: "Bạn chắc chắn muốn xóa khách hàng ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Chắc chắn",
            cancelButtonText: "Hủy",
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Xóa thành công', '', 'success')
            }
        })
    }
    return (
        <div className='w-full px-6 pt-20 pb-10 xl:pt-7 xl:pb-20 lg:px-2 xl:pl-0 xl:pr-10 overflow-x-hidden'>
            <div className='pb-16'>
                <div className='font-prata text-neutral-1-900 font-semibold text-header-1 border-b-2 border-neutral-2-200 pb-1 w-full px-4 rounded-xl shadow-title md:text-heading-4'>Thông tin Đơn hàng</div>
            </div>
            <div className='relative text-body-1 text-[#363837] grid gap-6 mx-auto px-4 py-6 border-[3px] border-secondary-2 rounded-b-2xl rounded-tr-2xl md:grid-cols-2 xl:gap-40 xl:w-[900px]'>
                <div className='absolute -top-6 left-0.5 bg-gradient-to-tr from-secondary-2 to-accent-4 border border-white outline-offset-2 outline outline-[3px] outline-secondary-2 rounded-t-xl w-[100px] h-5'></div>
                <div className='flex flex-col gap-6'>
                    <div className='font-semibold'>Mã: <span className='pl-[50px] font-normal'>{orderID}</span></div>
                    <div className='flex gap-2 items-center'>
                        <div className='font-semibold'>Họ và tên: </div>
                        {isEdit? 
                            <>
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
                            </>
                            :
                            <div className='font-normal'>{order?.name}</div>    
                        }
                    </div>    
                    <div className='flex gap-12 items-center'>
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
                    <div className='flex gap-9 items-center'>
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
                </div>
                <div className='flex flex-col gap-6'>
                    <div className='flex gap-2 items-center'>
                        <div className='font-semibold'>Ngày đặt:</div>
                        {order?.date_time && <div className='font-normal'>{splitDateTime(order?.date_time)[0]} {splitDateTime(order?.date_time)[1]}</div>}
                    </div>
                    <div className='flex gap-10 items-center'>
                        <div className='font-semibold'>SL vé:</div>
                        {isEdit? 
                            <InputForm
                                invalidFields={invalidFields} 
                                setInvalidFields={setInvalidFields}  
                                value={payload.ticket_num}
                                setValue={setPayload} 
                                keyPayload={'ticket_num'}
                                width='w-10'
                                style2={true}
                                type={'number'}
                            />
                            :
                            <div className='font-normal'>{order?.ticket_num}</div>
                        }
                    </div>
                    <div className='flex flex-wrap gap-5 items-center'>
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
                            <div className='font-normal'>{order?.note}</div>
                        }
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div className='font-semibold'>Đánh giá:</div>
                        {order?.Feedback && <div className='flex items-center gap-1 bg-[#1ABB9C] w-fit px-2 rounded-full'>
                            <div className='text-white'>{order.Feedback.ratings}</div>
                            <FaStar size={15} className='text-secondary-2'/> 
                        </div>}
                    </div>
                    <div className='flex flex-wrap gap-2 items-center'>
                        <div className='font-semibold'>Bình luận:</div>
                        <div className='font-normal'>{order?.Feedback?.reviews}</div>
                    </div>
                </div>
            </div>
            
            <div className='pt-8 flex gap-10 justify-center items-center'>
            { isEdit? 
                <><Button2 text='Lưu thay đổi' textColor='text-white' bgColor='bg-[#363837]' onClick={submitEdit}/>
                <Button2 text='Hủy' textColor='text-white' bgColor='bg-accent-3' onClick={() => setIsEdit(false)}/>
                </>
                : 
                <><Button2 text='Chỉnh sửa thông tin' textColor='text-black' bgColor='bg-accent-5' onClick={changeToEditMode}/>
                <Button2 text='Xóa đơn hàng' textColor='text-white' bgColor='bg-[#363837]' onClick={handleDelete}/>
                </> 
            }
            </div>
        </div>
    )
}

export default CustomerDetail
