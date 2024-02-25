import React, { useState } from 'react'
import { Button2, InputForm, Datepicker } from '../../components';
import Swal from 'sweetalert2'
import icons from '../../ultils/icons';

const { FaStar } = icons

const CustomerDetail = () => {
    // PARAMS
    const [invalidFields, setInvalidFields] = useState([])
    const [payload, setPayload] = useState({
        id: 1, 
        name: 'Nguyễn Ngọc Anh',
        phone: '0123456789',
        email: 'ngocanhnguyen@gmail.com',
        bookingDate: '09/09/2024',
        note: 'Ghế hàng đầu.',
        quantity: 3,
        rating: 4,
        comment: 'Khá hài lòng',
    })
    const [isEdit, setIsEdit] = useState(false)
    // FUNCTIONS
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
                <div className='font-prata text-neutral-1-900 font-semibold text-header-1 border-b-2 border-neutral-2-200 pb-1 w-full px-4 rounded-xl shadow-title md:text-heading-4'>Thông tin Khách hàng</div>
            </div>
            <div className='relative text-body-1 text-[#363837] grid gap-6 mx-auto px-4 py-6 border-[3px] border-secondary-2 rounded-b-2xl rounded-tr-2xl md:grid-cols-2 xl:gap-40 xl:w-[900px]'>
                <div className='absolute -top-6 left-0.5 bg-gradient-to-tr from-secondary-2 to-accent-4 border border-white outline-offset-2 outline outline-[3px] outline-secondary-2 rounded-t-xl w-[100px] h-5'></div>
                <div className='flex flex-col gap-6'>
                    <div className='font-semibold'>Mã: <span className='pl-[50px] font-normal'>{payload.id}</span></div>
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
                            <div className='font-normal'>{payload.name}</div>    
                        }
                    </div>    
                    <div className='flex gap-12 items-center'>
                        <div className='font-semibold'>SĐT:</div>
                        {isEdit? 
                            <InputForm
                                placeholder={'Nhập số điện thoại'}
                                invalidFields={invalidFields} 
                                setInvalidFields={setInvalidFields}  
                                value={payload.phone}
                                setValue={setPayload} 
                                keyPayload={'phone'}
                                width='w-64 md:w-48 xl:w-56'
                                style2={true}
                            />
                            :
                            <div className='font-normal'>{payload.phone}</div>
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
                            <div className='font-normal'>{payload.email}</div>
                        }
                    </div>
                </div>
                <div className='flex flex-col gap-6'>
                    <div className='flex gap-2 items-center'>
                        <div className='font-semibold'>Ngày đặt:</div>
                        {isEdit? 
                            <Datepicker width='w-32'
                                // defaultValue={payload.departureDate}
                                // value={payload.departureDate}
                                setValue={setPayload} 
                                keyPayload={'departureDate'}
                                textColor='text-neutral-1-600'
                                bgColor='bg-neutral-3-50'
                                min={true}
                            />
                            :
                            <div className='font-normal'>{payload.bookingDate}</div>
                        }
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div className='font-semibold'>Số lượng:</div>
                        {isEdit? 
                            <InputForm
                                placeholder={'Nhập ngày đặt'}
                                invalidFields={invalidFields} 
                                setInvalidFields={setInvalidFields}  
                                value={payload.quantity}
                                setValue={setPayload} 
                                keyPayload={'quantity'}
                                width='w-10'
                                style2={true}
                                type={'number'}
                            />
                            :
                            <div className='font-normal'>{payload.quantity}</div>
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
                            <div className='font-normal'>{payload.note}</div>
                        }
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div className='font-semibold'>Đánh giá:</div>
                        <td>
                            <div className='flex items-center gap-1 bg-[#1ABB9C] w-fit px-2 rounded-full'>
                                <div className='text-white'>{payload.rating}</div>
                                <FaStar size={15} className='text-secondary-2'/> 
                            </div>
                        </td>
                    </div>
                    <div className='flex flex-wrap gap-2 items-center'>
                        <div className='font-semibold'>Bình luận:</div>
                        <div className='font-normal'>{payload.comment}</div>
                    </div>
                </div>
            </div>
            
            <div className='pt-8 flex gap-10 justify-center items-center'>
            { isEdit? 
                <>
                <Button2 text='Lưu thay đổi' textColor='text-white' bgColor='bg-[#363837]' onClick={submitEdit}/>
                <Button2 text='Hủy' textColor='text-white' bgColor='bg-accent-3' onClick={() => setIsEdit(false)}/>
                </>
                
                : 
                <>
                <Button2 text='Chỉnh sửa thông tin' textColor='text-black' bgColor='bg-accent-5' onClick={changeToEditMode}/>
                <Button2 text='Xóa khách hàng' textColor='text-white' bgColor='bg-[#363837]' onClick={handleDelete}/>
                </> 
            }
            </div>
        </div>
    )
}

export default CustomerDetail
