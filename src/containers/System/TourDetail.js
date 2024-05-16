import React, { useState, useEffect } from 'react'
import icons from '../../ultils/icons';
import { Button2 } from '../../components';
import CustomerList from './CustomerList';
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getTour } from '../../store/actions/tourPlaceAction'
import { splitDate } from '../../ultils/splitDateTime';
import { ratingClassifier } from '../../ultils/ratingClassifier';
import { requestCancel } from '../../store/actions/requestAction';

const { FaCheck, FaStar } = icons

const TourDetail = () => {
    // PARAMS
    const {tourID} = useParams();
    const dispatch = useDispatch()
    const { tour } = useSelector(state => state.tour)
    const { role } = useSelector(state => state.auth)
    const { msg } = useSelector(state => state.request) 
    const navigate = useNavigate()
    const [submit, setSubmit] = useState(false)
    // FUNCTIONS
    useEffect(() => {
        dispatch(getTour({tour_ID: tourID}))
    }, [dispatch, tourID])
    const goToEditMode = () => {
        navigate('/'+role+'/tour-edit/'+tourID)
    };
    const showDestination= () => {
        let des = tour.places;
        var indents = [];
        for (var i = 0; i < des.length - 1; i++) {
            indents.push(
                <div key={i} className='font-normal'>{des[i].name} - </div>
            );
        }
        indents.push(<div key={des.length-1} className='font-normal'>{des[des.length-1].name}</div>);
        return indents;
    };
    const handleActivate = () => {
        Swal.fire({
            title: "Lí do hủy Tour",
            input: "text",
            inputAttributes: {
                spellcheck: "false"
            },
            showCancelButton: true,
            confirmButtonText: "Gửi",
            cancelButtonText: "Hủy",
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading(),
            inputValidator: (value) => {
                if (!value) {
                    return "Vui lòng điền lí do hủy Tour!";
                }
                }
        }).then((result) => {
            if (result.isConfirmed) {
                setSubmit(true)
                dispatch(requestCancel({
                    reason: result.value,
                    tour_ID: tourID
                }))
            }
        })
    }
    useEffect(() => {
        if (msg !== '' && submit) {
            if (msg === 'success') {
                Swal.fire('Gửi thành công', '', 'success').then((result) => {
                    setSubmit(false)
                })
            }
        }
    }, [msg])
    return (
        <div className='w-full px-6 pt-20 pb-10 xl:pb-20 xl:pt-7 lg:px-2 xl:pl-0 xl:pr-10 overflow-x-hidden'>
            <div className='pb-16'>
                <div className='font-prata text-neutral-1-900 font-semibold text-header-1 border-b-2 border-neutral-2-200 pb-1 w-full px-4 rounded-xl shadow-title xl:text-heading-4'>Thông tin Tour</div>
            </div>
            <div className='relative text-body-2 text-neutral-1-900 flex flex-col gap-6 mx-auto px-4 py-6 border-[3px] border-secondary-2 rounded-b-2xl rounded-tr-2xl xl:text-body-1'>
                <div className='absolute -top-6 left-0.5 bg-gradient-to-tr from-secondary-2 to-accent-4 border border-white outline-offset-2 outline outline-3 outline-secondary-2 rounded-t-xl w-[100px] h-5'></div>
                <div className='grid grid-rows-2 gap-6 md:grid-rows-1 md:grid-cols-2'>
                    <div className='font-semibold'>Mã tour: <span className='font-normal'>{tour?.tour_ID}</span></div>
                    <div className='flex gap-2 items-center'>
                        <div className='font-semibold whitespace-nowrap'>Trạng thái:</div>
                        {tour.isActive? 
                            <div className="flex items-center gap-[6px]">
                                <div className='w-2 h-2 rounded-full bg-[#1ABB9C]'></div>
                                Active
                            </div>
                            :
                            <div className="flex items-center gap-[6px]">
                                <div className='w-2 h-2 rounded-full bg-accent-3'></div>
                                Inactive
                            </div>
                        }
                    </div>  
                </div>
                <div className='font-semibold'>Tên chương trình: <span className='font-normal'>{tour?.name}</span></div>
                <div className='font-semibold'>Giá: <span className='font-normal'>{Number(tour?.price).toLocaleString()} VNĐ</span></div>
                <div className='grid grid-rows-2 gap-6 md:grid-rows-1 md:grid-cols-2'>
                    <div className='flex gap-2 items-center'>
                        <div className='font-semibold'>Ngày khởi hành:</div>
                        <div className='font-normal'>{splitDate(tour?.starting_date)[0]}/{splitDate(tour?.starting_date)[1]}/{splitDate(tour?.starting_date)[2]}</div>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div className='font-semibold'>Hạn chót đặt tour:</div>
                        <div className='font-normal'>{splitDate(tour?.bookingDeadline)[0]}/{splitDate(tour?.bookingDeadline)[1]}/{splitDate(tour?.bookingDeadline)[2]}</div>
                    </div>
                </div>
                <div className='flex gap-2 items-center'>
                    <div className='font-semibold'>Xuất phát:</div>
                    <div className='font-normal'>{tour?.departure}</div>
                </div>
                <div className='flex flex-wrap gap-2 items-center'>
                    <div className='font-semibold'>Điểm đến:</div>
                    <>{tour?.places && showDestination()}</> 
                </div>
                <div className='flex gap-2 items-center'>
                    <div className='font-semibold whitespace-nowrap'>Phương tiện:</div>
                    <div className='font-normal'>{tour?.vehicle}</div>
                </div>
                <div className='flex gap-2 items-center'>
                    <div className='font-semibold'>Số ghế:</div>
                    <div className='font-normal'>{tour?.seat_num}</div>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='font-semibold'>Lịch trình:</div>
                    <div className='pl-5 flex gap-2 items-center xl:pl-10'>
                        <div className='font-semibold'>Số ngày:</div>
                        <div className='font-normal'>{tour?.day_num} ngày {tour?.night_num} đêm</div>
                    </div>  
                    <div className='font-semibold pl-5 xl:pl-10'>Mô tả chi tiết:</div>
                    {tour.schedule?.map((item, i) => {
                            return (
                                <div key={i} className={`${i === 0? '' : 'pt-4'} pl-5 xl:pl-10`}>
                                    {i === (tour.schedule.length - 1)?
                                        <div className='font-normal text-justify whitespace-pre-wrap'>{item}</div>
                                        :
                                        <div className='font-normal text-justify whitespace-pre-wrap'>{item}</div>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
                <div className='flex flex-wrap gap-2 items-center'>
                    <div className='font-semibold'>Ghi chú:</div>
                    <div className='font-normal text-justify'>{tour?.note}</div>
                </div>
                <div className='flex gap-2 md:gap-5 xl:gap-8'>
                    <div className='font-semibold'>Dịch vụ bao gồm:</div>
                    <div className='flex flex-wrap justify-between gap-y-2 md:gap-5 xl:gap-16'>
                        {tour?.service?.map((item, i) => {
                                return (
                                    <div key={i} className='flex gap-1 items-center'>
                                        <FaCheck size={18} color={'black'}/>
                                        <div>{item}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                {role === 'staff' ? <></>
                    : 
                    <div className='flex gap-2 items-center'>
                        <div className='font-semibold'>Nhân viên đảm nhận:</div>
                        <div className='font-normal'>{tour?.staff?.lastName} {tour?.staff?.firstName}</div> 
                    </div>
                }
                <div className='flex gap-2 items-center'>
                    <div className='font-semibold'>Rating: </div>
                    <div className={`${ratingClassifier(tour?.rating) < 3? 'bg-[#1ABB9C]' : 'bg-accent-3'} flex items-center gap-1 w-fit px-2 rounded-full`}>
                        <div className='text-white'>{tour?.rating?.toFixed(1)}</div>
                        <FaStar size={14} className='text-secondary-2'/> 
                    </div>
                </div>
            </div>
            
            <div className='pt-6 xl:pt-10 flex gap-28 xl:gap-8 justify-center items-center'>
                <Button2 text='Chỉnh sửa thông tin tour' textColor='text-black' bgColor='bg-accent-5' onClick={goToEditMode}  />
                {tour?.isActive && role === 'staff' &&
                    <Button2 text='Đề xuất hủy tour' textColor='text-white' bgColor='bg-[#363837]' onClick={handleActivate}/>
                }
            </div>
            { role === 'staff' ? <CustomerList /> : <></> }
        </div>
    )
}

export default TourDetail
