import React from 'react';
import { Button, SearchBar } from '../../components';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

const SHomepage = () => {
    const navigate = useNavigate()
    return (
        <div className='w-full px-6 pt-10 xl:pl-0 xl:pr-10 overflow-x-hidden'>
            <div className='pb-3 text-primary-2 font-semibold text-heading-4 md:text-heading-3 xl:text-[35px] xl:leading-[64px]'>Danh sách Tour</div>
            <div className='pb-10 w-full flex justify-end'><SearchBar placeholder='. . .' width='w-1/3'/></div>
            <div className='pb-3 text-body-1 text-neutral-1-900'>Tổng số: 2</div>
            <table className="mb-8 mytable w-full text-body-2 xl:text-body-1">
                <tr className="h-14 font-semibold tracking-wider bg-neutral-3-200">
                    <td className="xl:min-w-[66px]">Mã</td>
                    <td className="w-[100px] xl:min-w-[130px]">Tên Tour</td>
                    <td className="hidden md:table-cell xl:min-w-[100px]">Số chỗ</td>
                    <td className="hidden md:table-cell xl:min-w-[141px]">SL khách đã đặt</td>
                    <td className="hidden md:table-cell min-w-[100px] xl:min-w-[128px]">Ngày khởi hành</td>
                </tr>
                <tr className='h-12 border-b-2 border-neutral-2-200'>
                    <td>T1</td>
                    <td><Link to={'/staff/tour-detail'} className='w-[300px] block text-primary-1 hover:underline xl:w-[530px]'>Du lịch Bà Nà Hills - Cầu Rồng - Bán Đảo Sơn Trà</Link></td>
                    <td className='hidden md:table-cell pl-4'>30</td>
                    <td className='hidden md:table-cell pl-12'>20</td>
                    <td className='hidden md:table-cell'>01/01/2024</td>
                </tr>
                <tr className='h-12 border-b-2 border-neutral-2-200'>
                    <td>T2</td>
                    <td><Link to={'/staff/tour-detail'} className='w-[300px] text-primary-1 hover:underline xl:w-[530px]'>Tour Bán Đảo Sơn Trà - Cầu Quay Sông Hàn</Link></td>
                    <td className='hidden md:table-cell pl-4'>45</td>
                    <td className='hidden md:table-cell pl-12'>30</td>
                    <td className='hidden md:table-cell'>09/09/2024</td>
                </tr>
            </table>
            <Button text='+ Thêm tour mới' textColor='text-white' bgColor='bg-primary-2' onClick={() => navigate('/staff/new-tour')}/>
        </div>
    )
}

export default SHomepage
