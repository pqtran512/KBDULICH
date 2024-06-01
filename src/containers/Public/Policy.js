import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { Button } from '../../components'

const Policy = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const [value, setVar] = useState(false)
    const tourID = location.state;
    return (
        <>
            <section className="w-full bg-neutral-1-50 pt-10 pb-12 md:pb-20">
                <div className="px-6 lg:px-2 2xl:px-0">
                    <div className="text-center pb-8 text-header-2 font-semibold text-neutral-1-900 md:text-heading-3 md:pb-16 xl:pb-8">
                        Chính sách đặt tour</div>
                    <div className="mx-auto bg-white py-8 px-12 rounded-2xl border-[3px] border-accent-5 md:max-w-3xl xl:max-w-7xl">
                        <div className="pb-2 font-semibold">* Trường hợp hủy vé landtour, quý khách vui lòng thanh toán các khoản sau:</div>
                        <p className="text-caption-1 text-justify leading-5 tracking-wider md:text-[14px]">
                            - Hủy vé trong vòng 24 giờ hoặc ngay ngày khởi hành, chịu phạt 100% tiền tour.<br/>
                            - Hủy vé trước ngày khởi hành từ 2 - 7 ngày, chịu phạt 80% tiền tour.<br/>
                            - Hủy vé trước ngày khởi hành từ 8 - 14 ngày, chịu phạt 50% tiền tour.<br/>
                            - Hủy vé trước ngày khởi hành từ 15 ngày trở lên, chịu phạt 30% tiền tour.<br/>
                            - Sau khi hủy tour, du khách vui lòng kiểm tra email từ KBDulich hoặc đến nhận tiền trong vòng 15 ngày kể từ ngày kết thúc tour. Chúng tôi chỉ thanh toán trong khỏang thời gian nói trên.
                        </p>
                        <div className="pt-4 pb-2 font-semibold">* Quy định vé máy bay:</div>
                        <p className="text-caption-1 text-justify leading-5 tracking-wider md:text-[14px]">
                            - Giá vé máy bay không bao gồm suất ăn/uống trên máy bay.<br/>
                            - Không được hoàn hoặc hủy vé máy bay. Nếu hủy, vui lòng chịu phạt 100% chi phí vé máy bay.<br/>
                            - Khi đăng ký VMB, quý khách cung cấp họ và tên, ngày tháng năm sinh (đúng từng ký tự ghi trong hộ chiếu hoặc CMND/CCCD).<br/>
                            - Không được thay đổi thông tin đặt chỗ: họ tên hành khách, chuyến bay, ngày bay, chặng bay, tách đoàn, gia hạn vé.<br/>
                            - Số lượng khách tối thiểu để tổ chức tour: <span className='font-semibold'>10 khách/đoàn.</span><br/>
                            - Du khách được miễn cước 1 KIỆN (23 kg) hành lý ký gởi và 1 KIỆN (10kg) hành lý xách tay.<br/>
                            - Trường hợp hủy tour do sự cố khách quan như thiên tai, dịch bệnh hoặc do máy bay hoãn - hủy chuyến, Lữ hành KBDulich sẽ không chịu trách nhiệm bồi thường thêm bất kỳ chi phí nào khác ngoài việc hoàn trả chi phí những dịch vụ chưa được sử dụng của tour đó (ngoại trừ chi phí vé máy bay).
                        </p>
                        <div className="pt-4 pb-2 font-semibold">* Hành lý và giấy tờ tùy thân:</div>
                        <p className="text-caption-1 text-justify leading-5 tracking-wider md:text-[14px]">
                        - Du khách mang theo giấy tờ tùy thân còn thời hạn sử dụng: Chứng Minh Nhân Dân / Căn cước Công Dân hoặc Hộ chiếu. Đối với du khách là Việt kiều, Quốc tế nhập cảnh Việt Nam bằng visa rời, vui lòng mang theo visa khi đăng ký và khi đi tour.<br/>
                        - Khách lớn tuổi (từ 70 tuổi trở lên), khách tàn tật tham gia tour, phải có thân nhân đi kèm và cam kết đảm bảo đủ sức khỏe khi tham gia tour du lịch.<br/>
                        - Trẻ em dưới 14 tuổi khi đi tour phải mang theo giấy khai sinh hoặc hộ chiếu. Trẻ em từ 14 tuổi trở lên phải mang theo giấy Chứng Minh Nhân Dân / Căn cước Công Dân. <br/>
                        <span className='font-semibold'>- Tất cả giấy tờ tùy thân mang theo đều phải bản chính.</span> <br/>
                        - Du khách mang theo hành lý gọn nhẹ và phải tự bảo quản hành lý, tiền bạc, tư trang trong suốt thời gian đi du lịch.<br/>
                        - Khách Việt Nam ở cùng phòng với khách Quốc tế hoặc Việt kiều yêu cầu phải có giấy hôn thú.<br/>
                        <span className='font-semibold'>- Quý khách có mặt tại sân bay trước 3 tiếng so với giờ khởi hành.</span>  
                        </p>
                        <div className='pb-5 flex gap-1 items-center w-fit ml-auto'>
                            <input type="checkbox" value={'yes'} className='w-3 h-3 xl:w-4 xl:h-4 accent-black'
                                onChange={() => {setVar(current => !current)}}/>
                            <div>Tôi đồng ý</div>
                        </div>
                    </div>
                    { value &&
                        <div className='mx-auto md:max-w-3xl xl:max-w-7xl'>
                            <div className='ml-auto w-fit pt-5 pr-7'>
                                <Button text='Tiếp tục' textColor='text-white' bgColor='bg-primary-2'onClick={() =>  navigate('/tour-booking/'+ tourID)}/>   
                            </div>
                        </div>
                    }
                </div>
            </section>
        </>
    )
}

export default Policy
