import React from 'react';
import { SearchBar } from '../../components';
import { Link } from 'react-router-dom';

const RequestList = () => {
    return (
        <div className='w-full px-6 pt-10 xl:pl-0 xl:pr-10 overflow-x-hidden'>
            <div className='pb-3 text-primary-2 font-semibold text-heading-4 md:text-heading-3 xl:text-[35px] xl:leading-[64px]'>Danh sách Đề xuất</div>
            <div className='pb-10 w-full flex justify-end'><SearchBar placeholder='. . .' width='w-1/3'/></div>
            <div className='pb-3 text-body-1 text-neutral-1-900'>Tổng số: 3</div>
            <table className="mb-8 mytable w-full text-body-2 xl:text-body-1">
                <tr className="h-14 font-semibold tracking-wider bg-neutral-3-200">
                    <td className="xl:min-w-[66px]">Mã</td>
                    <td className="">Tên Tour</td>
                    <td className="hidden md:table-cell xl:min-w-[100px]">Loại</td>
                    <td className="hidden md:table-cell xl:min-w-[141px]">Trạng thái</td>
                    <td className='hidden md:table-cell'>Ngày gửi</td>
                    <td className='hidden md:table-cell'>Ngày phản hồi</td>
                    <td className="hidden md:table-cell">Khác</td>
                </tr>
                <tr className='h-12 border-b-2 border-neutral-2-200'>
                    <td>3</td>
                    <td><Link to={'/staff/tour-detail'} className='w-[300px] block text-primary-1 hover:underline'>Du lịch Bà Nà Hills - Cầu Rồng - Bán Đảo Sơn Trà</Link></td>
                    <td className='hidden md:table-cell'>Tạo Tour</td>
                    <td className='hidden md:table-cell'>Chưa phản hồi</td>
                    <td className='hidden md:table-cell'>07/01/2024</td>
                    <td className='hidden md:table-cell'></td>
                    <td><Link to={'/staff/request-detail'} className='text-primary-1 hover:underline'>Xem thêm . . .</Link></td>
                </tr>
                <tr className='h-12 border-b-2 border-neutral-2-200'>
                    <td>2</td>
                    <td><Link to={'/staff/tour-detail'} className='w-[300px] text-primary-1 hover:underline'>Du lịch Bán Đảo Sơn Trà - Cầu Quay Sông Hàn</Link></td>
                    <td className='hidden md:table-cell'>Chỉnh sửa Tour</td>
                    <td className='hidden md:table-cell text-accent-6'>Đồng ý</td>
                    <td className='hidden md:table-cell'>01/01/2024</td>
                    <td className='hidden md:table-cell'>03/01/2024</td>
                    <td><Link to={'/staff/request-detail'} className='text-primary-1 hover:underline'>Xem thêm . . .</Link></td>
                </tr>
                <tr className='h-12 border-b-2 border-neutral-2-200'>
                    <td>1</td>
                    <td><Link to={'/staff/tour-detail'} className='w-[300px] text-primary-1 hover:underline'>Du lịch Bán Đảo Sơn Trà - Cầu Quay Sông Hàn</Link></td>
                    <td className='hidden md:table-cell'>Hủy Tour</td>
                    <td className='hidden md:table-cell text-accent-3'>Từ chối</td>
                    <td className='hidden md:table-cell'>21/12/2023</td>
                    <td className='hidden md:table-cell'>03/01/2024</td>
                    <td><Link to={'/staff/request-detail'} className='text-primary-1 hover:underline'>Xem thêm . . .</Link></td>
                </tr>
            </table>
        </div>
    )
}

export default RequestList
