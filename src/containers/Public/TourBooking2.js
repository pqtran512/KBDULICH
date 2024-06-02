import React, { useEffect, useState }  from 'react';
import { PayPal, Button } from '../../components'
import icons from '../../ultils/icons';
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { getTour } from '../../store/actions/tourPlaceAction'
import { splitDate } from '../../ultils/splitDateTime';
import { orderAdd } from '../../store/actions';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const { FaCheck } = icons

const TourBooking2 = () => {
    const location = useLocation();
    const dispatch = useDispatch() 
    const navigate = useNavigate()
    const payload = location.state.payload;
    const {tourID} = useParams();
    const { tour } = useSelector(state => state.tour)
    const [option, setOption] = useState('option1');
    const [submit, setSubmit] = useState(false)
    const { msg_order, order_data, update } = useSelector(state => state.order)
    useEffect(() => {
        dispatch(getTour({tour_ID: tourID}))
    }, [dispatch, tourID])
    const payByCash = () => {
        setSubmit(true)
        dispatch(orderAdd({
            ...payload,
              pay_method: 'cash'
          }))
    };
    useEffect(() => {
        if (msg_order !== '' && order_data && submit) {
          if (msg_order === 'success') {
            Swal.fire({
              title: "Xác nhận đơn thành công",
              text: "Vui lòng thanh toán tại văn phòng trong 7 ngày tới !",
              icon: "success",
              confirmButtonText: "Tiếp tục"
            }).then((result) => {
              if (result.isConfirmed) {
                  // Your EmailJS service ID, template ID, and Public Key
                  const serviceId = 'service_xkshgih';
                  const templateId = 'template_ook7ttp';
                  const publicKey = 'GMnxCkJbnTJAFDDgP';
                  // Create a new object that contains dynamic template params
                  const templateParams = {
                      payment: 'Thanh toán tiền mặt',
                      from_email: payload.email,
                      from_name: 'Kb Du Lịch',
                      to_name: payload.username,
                      message: payload.note,
                      phone_num: payload.phone,
                      tour_name: tour.name,
                      tour_days: tour.day_num + ' ngày ' + tour.night_num + ' đêm',
                      tour_order_id: order_data.order_ID, 
                      start_date: splitDate(tour.starting_date)[0] + '/' + splitDate(tour.starting_date)[1] + '/' + splitDate(tour.starting_date)[2],
                      num_passenger: payload.ticket_num,
                      amount_money: Number(tour.price*payload.ticket_num).toLocaleString() + ' VND',
                  };
                  // Send the email using EmailJS
                  emailjs.send(serviceId, templateId, templateParams, publicKey)
                      .then((response) => {
                          console.log('Email sent successfully!', response);
                      })
                      .catch((error) => {
                          console.error('Error sending email:', error);
                      });
                  navigate('/tour-booking3/'+ tour.tour_ID, { state: { 
                    ...order_data, 
                    total_bill: tour.price*payload.ticket_num 
                  }})
              }
            })
          }
          else Swal.fire('Oops !', msg_order, 'error')
        }
    }, [msg_order, update])
    return (
        <div>
            <section className="mx-auto w-full pt-10 xl:max-w-7xl">
                <div className="px-6 lg:px-2 2xl:px-0">
                    <div className="truncate w-full flex items-center py-[10px] gap-x-2">
                        <div className="text-neutral-1-600 text-body-1 leading-[34px] xl:text-header-2">Du lịch</div>
                        <div className="flex items-center justify-center w-6 h-6">
                            <i className="twi-22-chevron-line text-[16px] text-secondary-1 text-center"></i>
                        </div>
                        <div className="text-neutral-1-600 text-body-1 leading-[34px] xl:text-header-2">Du lịch trong nước</div>
                        <div className="flex items-center justify-center w-6 h-6">
                            <i className="twi-22-chevron-line text-[16px] text-secondary-1 text-center"></i>
                        </div>
                        <div className="text-neutral-1-600 text-body-1 leading-[34px] xl:text-header-2">{tour?.name}</div>
                        <div className="flex items-center justify-center w-6 h-6">
                            <i className="twi-22-chevron-line text-[16px] text-secondary-1 text-center"></i>
                        </div>
                        <div className="truncate text-neutral-1-900 text-body-1 leading-[34px] xl:text-header-2">Thanh toán</div>
                    </div>
                    <div className='pt-5 flex items-center justify-center px-20 xl:justify-between'>
                        <div className='flex flex-col gap-2 items-center justify-center'>
                            <div className='w-11 h-11 flex items-center justify-center rounded-full bg-accent-6 text-header-1'>
                                <FaCheck size={20} color='white'/>
                            </div>
                            <div className='text-body-1 text-accent-6 md:text-body-2'>Điền thông tin</div>
                        </div>
                        <div className='bg-neutral-3-300 w-60 h-[2px] hidden xl:block'></div>
                        <div className='flex-col gap-2 items-center justify-center hidden xl:flex'>
                            <div className='w-11 h-11 flex items-center justify-center rounded-full bg-accent-9 text-header-1 text-white'>2</div>
                            <div className='text-body-1 text-accent-9 md:text-body-2'>Thanh toán</div>
                        </div>
                        <div className='bg-neutral-3-300 w-60 h-[2px] hidden xl:block'></div>
                        <div className='flex-col gap-2 items-center justify-center hidden xl:flex'>
                            <div className='w-11 h-11 flex items-center justify-center rounded-full bg-neutral-1-300 text-header-1 text-white'>3</div>
                            <div className='text-body-1 text-neutral-1-500 md:text-body-2'>Xác nhận</div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mx-auto w-full pt-10 pb-[120px] md:pb-[120px] xl:pb-[80px] xl:max-w-7xl">
                <div className="px-6 lg:px-2 2xl:px-0">
                    <div className='xl:flex flex-row-reverse justify-center'>
                        <div className='w-full p-6 bg-neutral-3-100 rounded-3xl max-w-[450px] mx-auto xl:w-1/2'>
                            <div className='text-body-2 font-semibold text-neutral-900 pb-2 md:text-header-1'>Thông tin đặt tour</div>
                            <div className='py-3 flex gap-5 border-b-[3px] border-white'>
                                {tour.places && <img className='h-16 w-24 rounded-md' src={tour.places[0].images[0].images} alt='' />}
                                <div className="text-neutral-1-900 text-title-2 font-semibold xl:text-title-1">{tour?.name} | {tour?.day_num}N{tour?.night_num}Đ</div>
                            </div>
                            <div className="pt-5 flex flex-col gap-6 text-body-2">
                                <div className='flex justify-between'>
                                    <div className="text-neutral-1-500">Mã tour</div>
                                    <div className='text-neutral-1-900'>{tour?.tour_ID}</div>
                                </div>
                                <div className='flex justify-between'>
                                    <div className="text-neutral-1-500">Ngày khởi hành</div>
                                    <div className='text-neutral-1-900'>{splitDate(tour?.starting_date)[0]}/{splitDate(tour?.starting_date)[1]}/{splitDate(tour?.starting_date)[2]}</div>
                                </div>
                                <div className='flex justify-between'>
                                    <div className="text-neutral-1-500">Số khách</div>
                                    <div className='text-neutral-1-900'>{payload?.ticket_num} khách</div>
                                </div>
                                <div className='flex justify-between'>
                                    <div className="text-neutral-1-500">Giá 1 khách</div>
                                    <div className='text-neutral-1-900'>{Number(tour?.price).toLocaleString()} VND</div>
                                </div>
                                <div className='w-full h-[2px] mb-2 bg-white'></div>
                                <div className='flex font-semibold justify-between text-body-1'>
                                    <div className='text-neutral-1-900'>Tổng tiền</div>
                                    <div className='text-secondary-1'>{Number(tour?.price*payload?.ticket_num).toLocaleString()} VND</div>
                                </div>
                            </div>
                        </div>
                        <div className='pt-10 flex justify-between xl:pt-0 xl:w-1/2'>
                            <div className='flex flex-col w-44 gap-5'>
                                <div className='text-body-2 font-semibold text-neutral-900 text-center md:text-header-2'>Chọn phương thức thanh toán</div>
                                <button className={`${option === 'option1'? 'bg-neutral-1-900 text-white' : 'border-neutral-1-300 bg-cyan-50'} rounded-sm text-center py-3 px-1 xl:px-3 border-r border-b transition-all hover:bg-neutral-1-900 text-body-2 xl:text-body-1 hover:text-white`}
                                    onClick={() => setOption('option1')}>Thanh toán thẻ/<br/>ví điện tử</button>
                                <button className={`${option === 'option2'? 'bg-neutral-1-900 text-white' : 'border-neutral-1-300 bg-cyan-50'} rounded-sm text-center py-3 px-1 xl:px-3 border-r border-b transition-all hover:bg-neutral-1-900 text-body-2 xl:text-body-1 hover:text-white`}
                                    onClick={() => setOption('option2')}>Thanh toán tiền mặt</button>
                            </div>
                            {option === 'option1'?
                                <div className='flex flex-col gap-5 '>
                                    <div className='text-body-2 font-semibold text-neutral-900 md:text-header-1'>Lựa chọn ngân hàng bạn sẽ thanh toán</div>
                                    {payload && <PayPal payload={payload} tour={tour} />}
                                </div>
                            : 
                                <div className='max-w-[400px]'>
                                    <div className='pb-4 text-body-2 font-semibold text-neutral-900 md:text-header-1'>Thanh toán tại văn phòng</div>
                                    <p className='text-justify'>Sau khi đặt hàng thành công, bạn có thể đến văn phòng chúng tôi để thanh toán và tiến hành các thủ tục cần thiết. 
                                        Vui lòng xem địa chỉ cửa hàng ở mục Liên hệ.</p> 
                                    <p className='text-justify font-semibold'>*Lưu ý: Đơn không được thanh toán trong vòng 7 ngày sẽ bị hủy.</p>
                                    <div className='pt-40 w-fit ml-auto'>
                                        <Button text='Xác nhận đơn' textColor='text-white' bgColor='bg-primary-2' onClick={payByCash}/>   
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default TourBooking2
