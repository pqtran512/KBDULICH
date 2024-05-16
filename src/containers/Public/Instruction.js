import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { InputForm, Button } from '../../components'
import { useNavigate } from 'react-router-dom'

const Instruction = () => {
    // PARAMETERS
    const navigate = useNavigate()
    return (
        <div className='mt-10 bg-white w-[350px] rounded-xl p-6 xl:p-8 xl:w-[550px]'>
            <div className='text-header-2 xl:text-header-1 font-bold'>CHỌN ĐĂNG NHẬP VỚI TƯ CÁCH</div>
            <div className='pt-7 text-neutral-1-600 text-body-2 xl:text-body-1'>
                <div>Khám phá KBDulich với tài khoản của khách hàng <span className='font-semibold'>Vũ Tuấn Anh</span></div>
                <div className='italic'>Tài khoản: <span className='font-semibold'>vutuananh1234@gmail.com</span></div>
                <div className='italic'>Mật khẩu: <span className='font-semibold'>123456</span></div>
            </div>
            <button type='button' className='text-white bg-[#363837] mt-3 py-2 rounded-[6px] shadow-shad1 hover:bg-black w-[170px] text-body-2 xl:text-body-1 xl:w-[200px]'
                onClick={() => navigate('/auth/login')}>Khách hàng
            </button>
            <div className='pt-7 text-neutral-1-600 text-body-2 xl:text-body-1'>
                <div>Khám phá hệ thống quản lý KBDulich với tài khoản của nhân viên <span className='font-semibold'>Trịnh Ngọc Hiếu</span></div>
                <div className='italic'>Tài khoản: <span className='font-semibold'>hieu.trinh@kbdulich.vn</span></div>
                <div className='italic'>Mật khẩu: <span className='font-semibold'>123456</span></div>
                <div>Hoặc quản lý</div>
                <div className='italic'>Tài khoản: <span className='font-semibold'>admin@kbdulich.vn</span></div>
                <div className='italic'>Mật khẩu: <span className='font-semibold'>admin</span></div>
            </div>
            <button type='button' className='text-white bg-[#363837] mt-3 py-2 rounded-[6px] shadow-shad1 hover:bg-black w-[170px] text-body-2 xl:text-body-1 xl:w-[200px]'
                onClick={() => navigate('/system-auth/login')}>Nhân viên/ Quản lý
            </button>
        </div>
    )
}
export default Instruction
